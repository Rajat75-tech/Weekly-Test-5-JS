const products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 }
  ];

  let cart = [];

  const productsContainer = document.getElementById('products');
  const cartContainer = document.getElementById('cart');
  const totalPriceEl = document.getElementById('totalPrice');

  function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach((product) => {
      const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <span>${product.name}</span>
        <span>${product.price}</span>
        <div class="buttons">
          <button onclick="removeFromCart(${product.id})">-</button>
          <span>${quantity}</span>
          <button onclick="addToCart(${product.id})">+</button>
        </div>
      `;
      productsContainer.appendChild(productDiv);
    });
  }

  function renderCart() {
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>No Product added to the cart</p>';
    } else {
      cart.forEach((item) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
          <span>${item.name} - ${item.quantity} × ${item.price}</span>
        `;
        cartContainer.appendChild(cartItemDiv);
      });
    }
    updateTotal();
  }

  function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceEl.textContent = total;
  }

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderProducts();
    renderCart();
  }

  function removeFromCart(productId) {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      product.quantity--;
      if (product.quantity === 0) {
        cart = cart.filter((item) => item.id !== productId);
      }
    }
    renderProducts();
    renderCart();
  }

  renderProducts();
 
  renderCart();