import React, { forwardRef } from 'react';
import { InvoiceData, CURRENCY_SYMBOLS } from '../types/invoice';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoiceData }, ref) => {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    return (
      <div
        ref={ref}
        className="bg-white max-w-4xl mx-auto"
        style={{ minHeight: 'auto', padding: '0.75in' }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-300">
          <div className="flex items-center gap-4">
            {invoiceData.companyLogo && (
              <img
                src={invoiceData.companyLogo}
                alt="Company Logo"
                className="h-24 w-24 object-contain"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {invoiceData.companyName}
              </h1>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">INVOICE</h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p><span className="font-medium">Invoice #:</span> <span className="font-semibold text-gray-900">{invoiceData.invoiceNumber}</span></p>
              <p><span className="font-medium">Date:</span> <span className="font-semibold text-gray-900">{formatDate(invoiceData.invoiceDate)}</span></p>
            </div>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div className="grid grid-cols-2 gap-12 mb-8">
          {/* From Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              From
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-semibold text-gray-900">{invoiceData.companyName}</p>
              <div className="whitespace-pre-line">{invoiceData.companyAddress}</div>
              {invoiceData.companyPhone && <p>{invoiceData.companyPhone}</p>}
              {invoiceData.companyEmail && <p>{invoiceData.companyEmail}</p>}
            </div>
          </div>

          {/* Bill To Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Bill To
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-semibold text-gray-900">{invoiceData.customerName || 'Customer Name'}</p>
              <div className="whitespace-pre-line">{invoiceData.customerAddress || 'Customer Address'}</div>
              {invoiceData.customerPhone && <p>{invoiceData.customerPhone}</p>}
              {invoiceData.customerEmail && <p>{invoiceData.customerEmail}</p>}
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mb-8 py-3 border-y border-gray-200">
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <span className="font-medium text-gray-600">Payment Mode:</span>
              <span className="ml-2 font-semibold text-gray-900">{invoiceData.paymentMode}</span>
            </div>
            {invoiceData.transactionId && (
              <div>
                <span className="font-medium text-gray-600">Transaction ID:</span>
                <span className="ml-2 font-semibold text-gray-900">{invoiceData.transactionId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Payment Status
          </h3>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <span className="font-medium text-gray-600">Status:</span>
              <span className={`ml-2 font-semibold uppercase tracking-wide ${
                invoiceData.paymentStatus === 'paid' ? 'text-green-700' :
                invoiceData.paymentStatus === 'partial' ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {invoiceData.paymentStatus === 'paid' ? 'PAID' :
                 invoiceData.paymentStatus === 'partial' ? 'PARTIAL' : 'DUE'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Amount Paid:</span>
              <span className="ml-2 font-semibold text-gray-900">
                {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.amountPaid.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Amount Due:</span>
              <span className={`ml-2 font-semibold ${
                invoiceData.amountDue > 0 ? 'text-red-700' : 'text-green-700'
              }`}>
                {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.amountDue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Description
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 uppercase tracking-wide w-20">
                  Qty
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 uppercase tracking-wide w-32">
                  Unit Price
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 uppercase tracking-wide w-32">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-4 py-4 text-sm text-center text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-900">
                    {CURRENCY_SYMBOLS[invoiceData.currency]}{item.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm text-right font-semibold text-gray-900">
                    {CURRENCY_SYMBOLS[invoiceData.currency]}{item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-gray-900">
                  {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.subtotal.toFixed(2)}
                </span>
              </div>
              
              {invoiceData.taxRate > 0 && (
                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-600">Tax ({invoiceData.taxRate}%):</span>
                  <span className="font-semibold text-gray-900">
                    {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.tax.toFixed(2)}
                  </span>
                </div>
              )}
              
              {invoiceData.discount > 0 && (
                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-semibold text-gray-900">
                    -{CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.discount.toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="border-t-2 border-gray-900 pt-4 flex justify-between text-lg font-bold">
                <span className="text-gray-900">TOTAL:</span>
                <span className="text-gray-900">
                  {CURRENCY_SYMBOLS[invoiceData.currency]}{invoiceData.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6 mb-8">
          {invoiceData.notes && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Notes:</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">{invoiceData.notes}</p>
            </div>
          )}
          
          {(invoiceData.deliveryTimeline || invoiceData.warrantyInfo) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm border-t border-gray-200 pt-6">
              {invoiceData.deliveryTimeline && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Delivery Timeline:</h4>
                  <p className="text-gray-700">{invoiceData.deliveryTimeline}</p>
                </div>
              )}
              
              {invoiceData.warrantyInfo && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Warranty/Returns:</h4>
                  <p className="text-gray-700">{invoiceData.warrantyInfo}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-gray-300 pt-6">
          <p className="text-lg font-semibold text-gray-900 mb-2">Thank You</p>
          <p className="text-sm text-gray-600">
            We appreciate your business and look forward to serving you again.
          </p>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;