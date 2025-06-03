// Navigation protection and flow control
function checkPageAccess() {
    const currentPage = window.location.pathname.split('/').pop();
    const cartItems = localStorage.getItem('cartItems');
    const customerInfo = localStorage.getItem('customerInfo');
    const invoiceData = localStorage.getItem('currentInvoice');

    switch (currentPage) {
        case 'customer-info.html':
            if (!cartItems) {
                window.location.href = 'home.html';
            }
            break;
        case 'invoice.html':
            if (!customerInfo || !cartItems) {
                window.location.href = 'home.html';
            }
            break;
        case 'payment.html':
            if (!invoiceData || !customerInfo || !cartItems) {
                window.location.href = 'home.html';
            }
            break;
    }
}

// Run check when page loads
document.addEventListener('DOMContentLoaded', checkPageAccess);