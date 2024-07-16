function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(productId => {
        fetch(`/api/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <button onclick="removeFromCart('${productId}')">Remove</button>
                `;
                cartList.appendChild(cartItem);
            });
    });
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}
