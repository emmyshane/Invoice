export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  // Company details
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyLogo: string;
  
  // Customer details
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  
  // Shipping details
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  shippingEmail: string;
  
  // Invoice details
  invoiceNumber: string;
  invoiceDate: string;
  paymentMode: string;
  transactionId: string;
  currency: string;
  
  // Payment status
  paymentStatus: 'paid' | 'partial' | 'due';
  amountPaid: number;
  amountDue: number;
  
  // Items
  items: InvoiceItem[];
  
  // Totals
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  total: number;
  
  // Notes
  notes: string;
  deliveryTimeline: string;
  warrantyInfo: string;
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  INR: '₹',
  CNY: '¥',
};