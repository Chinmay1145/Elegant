document.addEventListener('DOMContentLoaded', function() {
    // Load invoice data
    const invoiceData = JSON.parse(localStorage.getItem('currentInvoice'));
    if (invoiceData) {
        document.getElementById('invoiceNumber').textContent = invoiceData.invoiceNumber;
        document.getElementById('totalAmount').textContent = `$${invoiceData.total}`;
    }

    // Payment method switching
    const methodButtons = document.querySelectorAll('.method-btn');
    const cardDetails = document.querySelector('.card-details');
    const bankDetails = document.querySelector('.bank-details');

    methodButtons.forEach(button => {
        button.addEventListener('click', () => {
            methodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (button.dataset.method === 'card') {
                cardDetails.style.display = 'block';
                bankDetails.style.display = 'none';
            } else {
                cardDetails.style.display = 'none';
                bankDetails.style.display = 'block';
            }
        });
    });

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    });

    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // Payment form submission
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulate payment processing
        const submitButton = document.querySelector('.submit-payment');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        setTimeout(() => {
            alert('Payment processed successfully!');
            
            // Clear cart and related data
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cartCount');
            localStorage.removeItem('currentInvoice');
            localStorage.removeItem('customerInfo');

            // Redirect to home page
            window.location.href = 'home.html';
        }, 2000);
    });
});