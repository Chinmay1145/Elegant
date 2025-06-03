// Cart variables
let cartCount = 0;
let cartItemsData = [];
const cartLink = document.getElementById('cart-link');
const cartCountSpan = document.getElementById('cart-count');
const cartDropdown = document.querySelector('.cart-dropdown');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');
const clearCartButton = document.getElementById('clear-cart-button');

// Load cart data
function loadCart() {
    const storedCartCount = localStorage.getItem('cartCount');
    const storedCartItems = localStorage.getItem('cartItems');
    cartCount = storedCartCount ? parseInt(storedCartCount) : 0;
    cartItemsData = storedCartItems ? JSON.parse(storedCartItems) : [];
    updateCart();
}

// Save cart data
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItemsData));
    localStorage.setItem('cartCount', cartCount);
}

// Update cart display
function updateCart() {
    cartCountSpan.textContent = cartCount;
    cartItems.innerHTML = '';

    if (cartCount > 0) {
        let total = 0;
        cartItemsData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${item.price}</span>
                    <div class="item-quantity">
                        <button onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItem('${item.id}')">×</button>
            `;
            cartItems.appendChild(itemElement);
            total += parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity;
        });

        // Add total to cart
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.textContent = `Total: Rp ${total.toLocaleString()}`;
        cartItems.appendChild(totalElement);
        checkoutButton.disabled = false;
    } else {
        cartItems.textContent = 'Cart is empty';
        checkoutButton.disabled = true;
    }
}

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const product = {
            id: generateProductId(productCard.querySelector('h3').textContent),
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('.price').textContent,
            image: productCard.querySelector('img').src,
            quantity: 1
        };

        // Check if item already exists
        const existingItem = cartItemsData.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItemsData.push(product);
        }

        cartCount = getTotalQuantity();
        saveCart();
        updateCart();

        // Show added to cart feedback
        button.textContent = 'Added to Cart';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.disabled = false;
        }, 1000);
    });
});

// Helper functions
function generateProductId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

function getTotalQuantity() {
    return cartItemsData.reduce((total, item) => total + item.quantity, 0);
}

function updateQuantity(productId, change) {
    const item = cartItemsData.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(productId);
        } else {
            cartCount = getTotalQuantity();
            saveCart();
            updateCart();
        }
    }
}

function removeItem(productId) {
    cartItemsData = cartItemsData.filter(item => item.id !== productId);
    cartCount = getTotalQuantity();
    saveCart();
    updateCart();
}

// Cart dropdown visibility
cartLink.addEventListener('mouseenter', () => {
    cartDropdown.style.display = 'block';
    cartDropdown.style.opacity = '1';
});

cartDropdown.addEventListener('mouseenter', () => {
    cartDropdown.style.display = 'block';
    cartDropdown.style.opacity = '1';
});

cartLink.addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget || !cartDropdown.contains(e.relatedTarget)) {
        cartDropdown.style.display = 'none';
        cartDropdown.style.opacity = '0';
    }
});

cartDropdown.addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget || !cartLink.contains(e.relatedTarget)) {
        cartDropdown.style.display = 'none';
        cartDropdown.style.opacity = '0';
    }
});

// Clear cart functionality
clearCartButton.addEventListener('click', () => {
    cartCount = 0;
    cartItemsData = [];
    saveCart();
    updateCart();
});

// Initialize cart
loadCart();
document.getElementById('logout-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

loadCart();
