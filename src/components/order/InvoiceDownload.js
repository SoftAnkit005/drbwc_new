// src/components/InvoiceDownload.js

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/images/logo/logo.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

const InvoiceDownload = ({ orderItem, productsData }) => {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const { taxdata } = useSelector((state) => state.taxes);


  console.log('productsData', productsData);
 

  const generateInvoice = () => {
    const doc = new jsPDF();

    // Add logo image
    const imgWidth = 40; // Set the desired width of the logo
    const imgHeight = (imgWidth * 1) / 2; // Maintain aspect ratio
    doc.addImage(logo, 'PNG', 14, 7, imgWidth, imgHeight); // x, y, width, height

    // Order subtitle
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text("Tax Invoice/Bill of Supply/Cash Memo", 120, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("(Original for Recipient)", 162, 23);

    // Owner Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Sold by: DrBWC", 14, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Address: VIP road, Vesu Surat, Gujarat - 395007, India", 14, 50);
    doc.text("Email: info@DrBWC.com", 14, 55);
    doc.text("Phone: +91 9825735973", 14, 60);

    // Customer Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Shipping To: ${user?.full_name}`, 14, 70);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${orderItem.shipping_address}`, 14, 75);
    doc.text(`Email: ${user?.email}`, 14, 80);
    doc.text(`Phone: ${orderItem.customer_phone}`, 14, 85);

    // Order Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold"); // Set bold for "Order Number" label
    doc.text(`Order Number: `, 14, 95);  // Add label without the order prefix

    doc.setFont("helvetica", "normal"); // Set font back to normal for the order prefix
    doc.text(`${orderItem.order_prefix}`, 45, 95);  // Adjusted x position to continue after the label

    doc.setFont("helvetica", "bold"); // Set back to bold for "Order Date" label
    doc.text(`Order Date: `, 14, 102);

    doc.setFont("helvetica", "normal"); // Set font back to normal for the order date
    doc.text(`${new Date(orderItem.created_at).toLocaleString()}`, 45, 102); // Adjusted x position to continue after the label


    // Products
    const productIds = orderItem.product_id.split(',').map(id => parseInt(id));
    const quantities = orderItem.qty.split(',').map(qty => parseInt(qty));
    const orderedProducts = productIds.map(productId =>
      productsData.find(product => product.id === productId)
    );

    const tableData = orderedProducts.map((product, index) => [
      { content: `${product ? product.product_name : "Unknown Product"} x ${quantities[index] || 0}`, styles: { fontStyle: 'bold' } }, // Make product name bold
      product ? `INR. ${(orderedProducts[index].price || 0) * (quantities[index] || 0)}` : "N/A"
    ]);

    // Calculate subtotal (price before tax)
    const subtotal = orderedProducts.reduce((acc, product, index) => {
      return acc + (product ? (product.price || 0) * (quantities[index] || 0) : 0);
    }, 0);

    // Filter taxes using tax_id
    const taxIds = orderItem.tax_id.split(',').map(id => parseInt(id));
    const applicableTaxes = taxdata?.taxes.filter(tax => taxIds.includes(tax.id));

    // Calculate tax amounts and total tax
    let totalTaxAmount = 0;
    let discount = 0;
    applicableTaxes.forEach(tax => {
      const taxAmount = subtotal * (parseFloat(tax.tax_rate) / 100);
      totalTaxAmount += taxAmount;

      // Add each tax row to the table
      tableData.push([
        { content: `${tax.tax_name} (${tax.tax_rate}%)`, styles: { halign: 'left' } },
        `INR. ${taxAmount.toFixed(2)}`
      ]);
    });

  

    // Add the subtotal row to the table
    tableData.push([
      { content: "Subtotal", styles: { halign: 'left' } },  // Merged two columns for "Subtotal" and make it bold
      `INR. ${subtotal.toFixed(2)}`  // Subtotal in the last column
    ]);

    if (orderItem.discount !== null) {
      discount = parseFloat(orderItem.discount);
      tableData.push([
        { content: "Discount", styles: { halign: 'left' } },  // Merged two columns for "Subtotal" and make it bold
        `INR. ${orderItem.discount}`  // Subtotal in the last column
      ]);
    }

    // Add the total tax row to the table
    tableData.push([
      { content: "Total Tax", styles: { halign: 'left' } },  // Merged two columns for "Total Tax" and make it bold
      `INR. ${totalTaxAmount.toFixed(2)}`  // Total tax amount in the last column
    ]);

    // Calculate total (subtotal + total tax)
    const totalPrice = subtotal + totalTaxAmount - discount;

    // Add the total row to the table
    tableData.push([
      { content: "Total", styles: { halign: 'left', fontStyle: 'bold', fontSize: 12 } },  // Total label styled
      { content: `INR. ${totalPrice.toFixed(2)}`, styles: { fontStyle: 'bold', fontSize: 12 } }  // Total amount styled
    ]);



    // Table Header Style
    const headStyles = {
      fillColor: '#2d2d2d',
      textColor: [255, 255, 255],
      fontSize: 12,
      halign: 'left',
    };

    // Table Body Style
    const bodyStyles = {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontSize: 9,
      halign: 'left',
    };

    // Table
    doc.autoTable({
      head: [['Product Name', 'Price']],
      body: tableData,
      startY: 115,  // Adjusted starting Y position for the table
      headStyles: headStyles,
      bodyStyles: bodyStyles,
      theme: 'grid', // Use grid theme for table borders
      styles: {
        lineColor: null,  // Remove border color
        lineWidth: 0,     // Remove border width
      },
    });

    // Footer
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("For DrBWC", 173, doc.autoTable.previous.finalY + 70);
    doc.text("Authorized Signatory", 153, doc.autoTable.previous.finalY + 90);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your order!", 14, doc.autoTable.previous.finalY + 110);

    // Create a blob from the PDF and open it in a new tab
    // const blob = doc.output('blob');
    // const url = URL.createObjectURL(blob);
    // window.open(url, '_blank');  // Open in a new tab

    // // Clean up
    // URL.revokeObjectURL(url);
    doc.save(`invoice_${orderItem.order_prefix}.pdf`);
  };

  return (
    <Link className="fw-semibold desc-xs" onClick={generateInvoice}>
      <FiDownload className='me-1' />
      Download Invoice
    </Link>
  );
};

export default InvoiceDownload;
