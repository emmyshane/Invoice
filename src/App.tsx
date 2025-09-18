import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, Upload, Save, FolderOpen, Printer, FileText, Building2 } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import TimeWidget from './components/TimeWidget';
import { generatePDF } from './utils/pdfGenerator';
import { InvoiceData, InvoiceItem } from './types/invoice';

function App() {
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    // Company details
    companyName: 'Your Company Name',
    companyAddress: '123 Business St, Suite 100\nCity, State 12345',
    companyPhone: '+1 (555) 123-4567',
    companyEmail: 'hello@yourcompany.com',
    companyLogo: '',
    
    // Customer details
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: '',
    
    // Invoice details
    invoiceNumber: '7284',
    invoiceDate: new Date().toISOString().split('T')[0],
    paymentMode: 'Credit Card',
    transactionId: '',
    currency: 'USD',
    
    // Payment status
    paymentStatus: 'due',
    amountPaid: 0,
    amountDue: 100,
    
    // Items
    items: [
      {
        id: '1',
        description: 'Sample Product',
        quantity: 1,
        unitPrice: 100,
        total: 100
      }
    ],
    
    // Totals
    subtotal: 100,
    tax: 0,
    taxRate: 0,
    discount: 0,
    total: 100,
    
    // Notes
    notes: 'Thank you for your business! Payment is due within 30 days.',
    deliveryTimeline: 'Standard delivery: 5-7 business days',
    warrantyInfo: '1 year warranty on all products'
  });

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [savedTemplates, setSavedTemplates] = useState<string[]>([]);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  // Load saved templates on mount
  React.useEffect(() => {
    const templates = localStorage.getItem('invoice-templates');
    if (templates) {
      setSavedTemplates(JSON.parse(templates));
    }
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showTemplateDropdown && !target.closest('.template-dropdown')) {
        setShowTemplateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTemplateDropdown]);

  const handleInputChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      
      // Auto-generate invoice number when customer name changes
      if (field === 'customerName' && value) {
        // Extract numeric part from current invoice number or default to 7284
        const currentInvoiceNum = prev.invoiceNumber.split(' - ')[0] || '7284';
        updated.invoiceNumber = `${currentInvoiceNum} - ${value}`;
      }
      
      return updated;
    });
  };

  const handleItemChange = (itemId: string, field: keyof InvoiceItem, value: any) => {
    setInvoiceData(prev => {
      const updatedItems = prev.items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              [field]: value,
              total: field === 'quantity' || field === 'unitPrice' 
                ? (field === 'quantity' ? value : item.quantity) * (field === 'unitPrice' ? value : item.unitPrice)
                : item.total
            }
          : item
      );
      
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * (prev.taxRate / 100);
      const total = subtotal + tax - prev.discount;
      
      // Update amount due based on payment status
      const amountDue = prev.paymentStatus === 'paid' ? 0 :
                       prev.paymentStatus === 'partial' ? total - prev.amountPaid : total;
      
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        tax,
        total,
        amountDue
      };
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (itemId: string) => {
    setInvoiceData(prev => {
      const updatedItems = prev.items.filter(item => item.id !== itemId);
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * (prev.taxRate / 100);
      const total = subtotal + tax - prev.discount;
      
      // Update amount due based on payment status
      const amountDue = prev.paymentStatus === 'paid' ? 0 :
                       prev.paymentStatus === 'partial' ? total - prev.amountPaid : total;
      
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        tax,
        total,
        amountDue
      };
    });
  };

  const handleTaxChange = (taxRate: number) => {
    setInvoiceData(prev => {
      const tax = prev.subtotal * (taxRate / 100);
      const total = prev.subtotal + tax - prev.discount;
      
      // Update amount due based on payment status
      const amountDue = prev.paymentStatus === 'paid' ? 0 :
                       prev.paymentStatus === 'partial' ? total - prev.amountPaid : total;
      
      return {
        ...prev,
        taxRate,
        tax,
        total,
        amountDue
      };
    });
  };

  const handleDiscountChange = (discount: number) => {
    setInvoiceData(prev => {
      const total = prev.subtotal + prev.tax - discount;
      
      // Update amount due based on payment status
      const amountDue = prev.paymentStatus === 'paid' ? 0 :
                       prev.paymentStatus === 'partial' ? total - prev.amountPaid : total;
      
      return {
        ...prev,
        discount,
        total,
        amountDue
      };
    });
  };

  const handlePaymentStatusChange = (status: 'paid' | 'partial' | 'due') => {
    setInvoiceData(prev => {
      let amountPaid = 0;
      let amountDue = prev.total;
      
      if (status === 'paid') {
        amountPaid = prev.total;
        amountDue = 0;
      } else if (status === 'partial') {
        amountPaid = prev.amountPaid;
        amountDue = prev.total - amountPaid;
      } else {
        amountPaid = 0;
        amountDue = prev.total;
      }
      
      return {
        ...prev,
        paymentStatus: status,
        amountPaid,
        amountDue
      };
    });
  };

  const handleAmountPaidChange = (amountPaid: number) => {
    setInvoiceData(prev => {
      const amountDue = prev.total - amountPaid;
      let paymentStatus: 'paid' | 'partial' | 'due';
      
      if (amountPaid >= prev.total) {
        paymentStatus = 'paid';
      } else if (amountPaid > 0) {
        paymentStatus = 'partial';
      } else {
        paymentStatus = 'due';
      }
      
      return {
        ...prev,
        amountPaid,
        amountDue: Math.max(0, amountDue),
        paymentStatus
      };
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('companyLogo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveTemplate = () => {
    const templateName = prompt('Enter template name:');
    if (templateName) {
      const templates = [...savedTemplates, templateName];
      setSavedTemplates(templates);
      localStorage.setItem('invoice-templates', JSON.stringify(templates));
      localStorage.setItem(`template-${templateName}`, JSON.stringify(invoiceData));
    }
  };

  const loadTemplate = (templateName: string) => {
    const template = localStorage.getItem(`template-${templateName}`);
    if (template) {
      setInvoiceData(JSON.parse(template));
      setShowTemplateDropdown(false);
    }
  };

  const toggleTemplateDropdown = () => {
    if (savedTemplates.length === 0) {
      alert('No saved templates found!');
      return;
    }
    setShowTemplateDropdown(!showTemplateDropdown);
  };

  const downloadPDF = async () => {
    if (previewRef.current) {
      try {
        await generatePDF(previewRef.current, `invoice-${invoiceData.invoiceNumber}.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      }
    }
  };

  const printPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Invoice Generator Pro
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">Create professional invoices with ease</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={saveTemplate}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Save size={16} />
                Save Template
              </button>
              
              <div className="relative template-dropdown">
                <button
                  onClick={toggleTemplateDropdown}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FolderOpen size={16} />
                  Load Template
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showTemplateDropdown && savedTemplates.length > 0 && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                        Saved Templates
                      </div>
                      {savedTemplates.map((templateName, index) => (
                        <button
                          key={index}
                          onClick={() => loadTemplate(templateName)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 flex items-center gap-2"
                        >
                          <FileText size={14} />
                          {templateName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={printPDF}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Printer size={16} />
                Print
              </button>
              
              <button
                onClick={downloadPDF}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
          
          <div className="flex border-b border-gray-200/50">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-8 py-4 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === 'form'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Invoice Details
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-8 py-4 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === 'preview'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Preview & Generate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'form' ? (
          <InvoiceForm
            invoiceData={invoiceData}
            onInputChange={handleInputChange}
            onItemChange={handleItemChange}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onTaxChange={handleTaxChange}
            onDiscountChange={handleDiscountChange}
            onLogoUpload={handleLogoUpload}
            onPaymentStatusChange={handlePaymentStatusChange}
            onAmountPaidChange={handleAmountPaidChange}
          />
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-gray-200/50">
            <InvoicePreview
              ref={previewRef}
              invoiceData={invoiceData}
            />
          </div>
        )}
      </div>
      
      {/* Time Widget - Only visible in UI, not in PDF */}
      <TimeWidget />
    </div>
  );
}

export default App;