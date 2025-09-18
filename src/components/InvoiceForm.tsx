import React from 'react';
import { Plus, Trash2, Upload, Building2, FileText } from 'lucide-react';
import { InvoiceData, InvoiceItem, CURRENCY_SYMBOLS } from '../types/invoice';

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  onInputChange: (field: keyof InvoiceData, value: any) => void;
  onItemChange: (itemId: string, field: keyof InvoiceItem, value: any) => void;
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
  onTaxChange: (taxRate: number) => void;
  onDiscountChange: (discount: number) => void;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaymentStatusChange: (status: 'paid' | 'partial' | 'due') => void;
  onAmountPaidChange: (amountPaid: number) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoiceData,
  onInputChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onTaxChange,
  onDiscountChange,
  onLogoUpload,
  onPaymentStatusChange,
  onAmountPaidChange,
}) => {
  return (
    <div className="space-y-10">
      {/* Company Information */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Company Name
            </label>
            <input
              type="text"
              value={invoiceData.companyName}
              onChange={(e) => onInputChange('companyName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Company Logo
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
                <Upload size={16} />
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={onLogoUpload}
                  className="hidden"
                />
              </label>
              {invoiceData.companyLogo && (
                <img
                  src={invoiceData.companyLogo}
                  alt="Company Logo"
                  className="h-20 w-20 object-contain rounded-xl border border-gray-200 shadow-sm"
                />
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Address
            </label>
            <textarea
              value={invoiceData.companyAddress}
              onChange={(e) => onInputChange('companyAddress', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Phone
              </label>
              <input
                type="tel"
                value={invoiceData.companyPhone}
                onChange={(e) => onInputChange('companyPhone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Email
              </label>
              <input
                type="email"
                value={invoiceData.companyEmail}
                onChange={(e) => onInputChange('companyEmail', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Bill To</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Customer Name
            </label>
            <input
              type="text"
              value={invoiceData.customerName}
              onChange={(e) => onInputChange('customerName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Customer Email
            </label>
            <input
              type="email"
              value={invoiceData.customerEmail}
              onChange={(e) => onInputChange('customerEmail', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Customer Address
            </label>
            <textarea
              value={invoiceData.customerAddress}
              onChange={(e) => onInputChange('customerAddress', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Customer Phone
            </label>
            <input
              type="tel"
              value={invoiceData.customerPhone}
              onChange={(e) => onInputChange('customerPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Invoice Number (Auto-generated)
            </label>
            <input
              type="text"
              value={invoiceData.invoiceNumber}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: 7284 - Customer Name (updates automatically when customer name is entered)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceData.invoiceDate}
              onChange={(e) => onInputChange('invoiceDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Currency
            </label>
            <select
              value={invoiceData.currency}
              onChange={(e) => onInputChange('currency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            >
              {Object.entries(CURRENCY_SYMBOLS).map(([code, symbol]) => (
                <option key={code} value={code}>
                  {code} ({symbol})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Payment Mode
            </label>
            <select
              value={invoiceData.paymentMode}
              onChange={(e) => onInputChange('paymentMode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="ACH/Wire Transfer">ACH/Wire Transfer</option>
              <option value="PayPal">PayPal</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Transaction ID (Optional)
            </label>
            <input
              type="text"
              value={invoiceData.transactionId}
              onChange={(e) => onInputChange('transactionId', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Payment Status</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Payment Status
            </label>
            <select
              value={invoiceData.paymentStatus}
              onChange={(e) => onPaymentStatusChange(e.target.value as 'paid' | 'partial' | 'due')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            >
              <option value="due">Due</option>
              <option value="partial">Partially Paid</option>
              <option value="paid">Fully Paid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Amount Paid ({CURRENCY_SYMBOLS[invoiceData.currency]})
            </label>
            <input
              type="number"
              min="0"
              max={invoiceData.total}
              step="0.01"
              value={invoiceData.amountPaid}
              onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              disabled={invoiceData.paymentStatus === 'due'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Amount Due ({CURRENCY_SYMBOLS[invoiceData.currency]})
            </label>
            <div className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-gray-100 text-gray-700 font-semibold">
              {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.amountDue.toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Payment Status Indicator */}
        <div className="mt-6 p-4 rounded-xl border-2 border-dashed">
          {invoiceData.paymentStatus === 'paid' && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Fully Paid - No outstanding balance</span>
            </div>
          )}
          {invoiceData.paymentStatus === 'partial' && (
            <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-3 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium">
                Partially Paid - {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.amountDue.toFixed(2)} remaining
              </span>
            </div>
          )}
          {invoiceData.paymentStatus === 'due' && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium">
                Payment Due - {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.amountDue.toFixed(2)} outstanding
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Items</h2>
          </div>
          <button
            onClick={onAddItem}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-800">Description</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-800 w-20">Qty</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-800 w-32">Unit Price</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-800 w-32">Total</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => onItemChange(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => onItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-semibold text-gray-900">
                    {CURRENCY_SYMBOLS[invoiceData.currency]}{item.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    {invoiceData.items.length > 1 && (
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex justify-end">
          <div className="w-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Subtotal:</span>
              <span className="font-semibold text-gray-900">{CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700 font-medium">Tax Rate (%):</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={invoiceData.taxRate}
                  onChange={(e) => onTaxChange(parseFloat(e.target.value) || 0)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <span className="font-semibold text-gray-900">{CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700 font-medium">Discount:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={invoiceData.discount}
                  onChange={(e) => onDiscountChange(parseFloat(e.target.value) || 0)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total:</span>
              <span className="text-blue-600 text-xl">{CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.total.toFixed(2)}</span>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Additional Information</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Notes
            </label>
            <textarea
              value={invoiceData.notes}
              onChange={(e) => onInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none"
              placeholder="Payment terms, thank you message, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Delivery Timeline
            </label>
            <input
              type="text"
              value={invoiceData.deliveryTimeline}
              onChange={(e) => onInputChange('deliveryTimeline', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              placeholder="e.g., Standard delivery: 5-7 business days"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Warranty/Return Policy
            </label>
            <input
              type="text"
              value={invoiceData.warrantyInfo}
              onChange={(e) => onInputChange('warrantyInfo', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              placeholder="e.g., 1 year warranty on all products"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;