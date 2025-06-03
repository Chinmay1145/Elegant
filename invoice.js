document.addEventListener('DOMContentLoaded', function() {
    // Generate invoice number
    const invoiceNumber = 'INV-' + new Date().getFullYear() + '-' + 
        Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    document.getElementById('invoiceNumber').textContent = invoiceNumber;

    // Set current date
    const currentDate = new Date().toLocaleDateString();
    document.getElementById('invoiceDate').textContent = currentDate;

    // Load customer information
    const customerInfo = JSON.parse(localStorage.getItem('customerInfo'));
    if (customerInfo) {
        document.getElementById('customerInfo').innerHTML = `
            <p>${customerInfo.fullName}</p>
            <p>${customerInfo.email}</p>
            <p>${customerInfo.phone}</p>
            <p>${customerInfo.address}</p>
            <p>${customerInfo.city}, ${customerInfo.postalCode}</p>
        `;
        document.getElementById('shippingInfo').innerHTML = `
            <p>${customerInfo.fullName}</p>
            <p>${customerInfo.address}</p>
            <p>${customerInfo.city}, ${customerInfo.postalCode}</p>
        `;
    }

    // Load cart items
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
        const orderItems = document.getElementById('orderItems');
        let subtotal = 0;

        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            subtotal += price;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>Premium Collection</td>
                <td>$${price.toFixed(2)}</td>
            `;
            orderItems.appendChild(row);
        });

        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;

        // Save invoice data for payment
        localStorage.setItem('currentInvoice', JSON.stringify({
            invoiceNumber,
            date: currentDate,
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        }));
    }

    // Print invoice
    document.getElementById('printInvoice').addEventListener('click', function() {
        window.print();
    });

    // Proceed to payment
    document.getElementById('proceedToPayment').addEventListener('click', function() {
        window.location.href = 'payment.html';
    });
});