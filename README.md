# Professional Invoice PDF Generator

A modern, professional invoice generator built with React, TypeScript, and Vite. Generate beautiful, single-page PDF invoices with a clean and professional design.

## Features

- **Professional Design**: Clean, minimal PDF layout suitable for business use
- **Single-Page PDFs**: Optimized to fit all content on one page
- **Company Branding**: Upload and display company logos
- **Multi-Currency Support**: Support for various currencies (USD, EUR, GBP, INR, etc.)
- **Tax & Discount Calculations**: Automatic calculations for taxes and discounts
- **Payment Tracking**: Track payment modes and transaction IDs
- **Additional Information**: Include delivery timelines, warranty info, and notes
- **Real-time Preview**: Live preview of the invoice as you type
- **Export to PDF**: High-quality PDF generation

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/emmyshane/pdf-gen.git
cd pdf-gen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Company Information**: Fill in your company details including name, address, phone, and email
2. **Upload Logo**: Add your company logo for professional branding
3. **Customer Details**: Enter customer information
4. **Invoice Details**: Set invoice number, date, currency, and payment mode
5. **Add Items**: Add products/services with descriptions, quantities, and prices
6. **Configure Totals**: Set tax rates and discounts
7. **Additional Info**: Add notes, delivery timelines, and warranty information
8. **Generate PDF**: Click the download button to generate a professional PDF

## Project Structure

```
src/
├── components/
│   ├── InvoiceForm.tsx      # Main form component
│   └── InvoicePreview.tsx   # PDF preview component
├── types/
│   └── invoice.ts           # TypeScript interfaces
├── utils/
│   └── pdfGenerator.ts      # PDF generation utility
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## Key Features Explained

### Professional PDF Design
- Clean, minimal layout without distracting colors or gradients
- Proper typography and spacing for business documents
- Single-page optimization to prevent content overflow

### Smart PDF Generation
- Automatic scaling to fit content on one page
- Maintains aspect ratio for professional appearance
- Optimized canvas rendering for crisp text and graphics

### Responsive Design
- Works on desktop and mobile devices
- Intuitive form layout with proper validation
- Real-time calculations and updates

## Customization

You can customize the invoice design by modifying:
- `InvoicePreview.tsx` for PDF layout and styling
- `InvoiceForm.tsx` for form fields and validation
- `invoice.ts` for data structures and currency symbols

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue on GitHub.