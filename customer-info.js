document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customerData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value
    };
    
    // Save customer data to localStorage
    localStorage.setItem('customerInfo', JSON.stringify(customerData));
    
    // Redirect to invoice page
    window.location.href = 'invoice.html';
});