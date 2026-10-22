import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoicePDF = (order) => {
    const doc = new jsPDF();

    // -- Header --
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Emerald-600
    doc.text("Junk Dealer", 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Marketplace for Recycled Materials", 20, 26);

    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text("123 Green Earth Road", 20, 35);
    doc.text("Eco City, Earth 404", 20, 40);
    doc.text("support@junkdealer.com", 20, 45);

    // -- Invoice Details --
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("INVOICE", 150, 20);

    doc.setFontSize(10);
    doc.text(`Invoice #: INV-${order.id.replace('ORD-', '')}`, 150, 30);
    doc.text(`Date: ${order.date}`, 150, 35);
    doc.text(`Order ID: ${order.id}`, 150, 40);

    // -- Bill To --
    doc.setFontSize(12);
    doc.text("Bill To:", 20, 60);
    doc.setFontSize(10);
    doc.text(order.shipping.fullName, 20, 66);
    doc.text(order.shipping.phone, 20, 71);
    doc.text(order.shipping.address, 20, 76);
    doc.text(`${order.shipping.city}, ${order.shipping.zipCode}`, 20, 81);

    // -- Products Table --
    const tableColumn = ["Item Description", "Quantity", "Unit Price", "Total"];
    const tableRows = [];

    order.items.forEach(item => {
        const itemData = [
            item.name,
            item.quantity,
            `Rs. ${item.price}`,
            `Rs. ${(item.price * item.quantity).toFixed(2)}`
        ];
        tableRows.push(itemData);
    });

    autoTable(doc, {
        startY: 90,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] }, // Emerald Header
        styles: { fontSize: 10 },
    });

    // -- Totals --
    const finalY = doc.lastAutoTable.finalY || 90;

    doc.setFontSize(10);
    doc.text(`Subtotal:`, 140, finalY + 10);
    doc.text(`Rs. ${order.total.toFixed(2)}`, 180, finalY + 10, { align: 'right' });

    doc.text(`Shipping:`, 140, finalY + 16);
    doc.text(`Free`, 180, finalY + 16, { align: 'right' });

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total:`, 140, finalY + 25);
    doc.text(`Rs. ${order.total.toFixed(2)}`, 180, finalY + 25, { align: 'right' });

    // -- Footer --
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Thank you for your business and for helping the planet!", 105, 280, { align: "center" });

    // Save
    doc.save(`Invoice_${order.id}.pdf`);
};
