/**
 * Main Application Script for Restaurant Menu & Order Visualizer
 */

// Fallback menu in case opened directly via file:// protocol where fetch is blocked by CORS
const FALLBACK_MENU = [
  {
    "id": 1,
    "name": "Truffle Mushroom Arancini",
    "category": "Starters",
    "price": 9.50,
    "emoji": "🧆",
    "description": "Crispy golden risotto balls infused with black winter truffle and melted mozzarella core.",
    "dietary": ["Vegetarian"]
  },
  {
    "id": 2,
    "name": "Avocado & Tomato Bruschetta",
    "category": "Starters",
    "price": 8.00,
    "emoji": "🥖",
    "description": "Charred sourdough topped with ripe heirloom tomatoes, smashed avocado, basil, and aged balsamic glaze.",
    "dietary": ["Vegan", "Vegetarian"]
  },
  {
    "id": 3,
    "name": "Gluten-Free Garlic Prawns",
    "category": "Starters",
    "price": 12.50,
    "emoji": "🍤",
    "description": "Pan-seared jumbo tiger prawns tossed in garlic-infused olive oil, white wine, chili flakes, and fresh parsley.",
    "dietary": ["Gluten-Free", "Non-Veg"]
  },
  {
    "id": 4,
    "name": "Crispy Tandoori Paneer Bites",
    "category": "Starters",
    "price": 9.00,
    "emoji": "🧀",
    "description": "Spiced cottage cheese cubes charred in tandoor spices, served with mint-coriander chutney.",
    "dietary": ["Vegetarian", "Gluten-Free"]
  },
  {
    "id": 5,
    "name": "Smoked Chicken Yakitori",
    "category": "Starters",
    "price": 10.50,
    "emoji": "🍢",
    "description": "Skewered tender chicken thigh glazed with sweet tare sauce, sesame seeds, and scallions.",
    "dietary": ["Non-Veg"]
  },
  {
    "id": 6,
    "name": "Artisanal Margherita Pizza",
    "category": "Mains",
    "price": 14.50,
    "emoji": "🍕",
    "description": "Slow-fermented Neapolitan crust, San Marzano tomato sauce, fresh buffalo mozzarella, and sweet basil leaves.",
    "dietary": ["Vegetarian"]
  },
  {
    "id": 7,
    "name": "Green Garden Thai Curry",
    "category": "Mains",
    "price": 15.00,
    "emoji": "🍲",
    "description": "Fragrant coconut green curry packed with bamboo shoots, baby corn, snap peas, and tofu, served with jasmine rice.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 8,
    "name": "Grilled Atlantic Salmon",
    "category": "Mains",
    "price": 22.00,
    "emoji": "🐟",
    "description": "Herb-crusted wild Atlantic salmon fillet served over roasted asparagus and lemon-dill velouté.",
    "dietary": ["Gluten-Free", "Non-Veg"]
  },
  {
    "id": 9,
    "name": "Prime Angus Truffle Burger",
    "category": "Mains",
    "price": 18.50,
    "emoji": "🍔",
    "description": "Handmade Angus beef patty, aged cheddar, caramelized shallots, arugula, and truffle mayo on brioche.",
    "dietary": ["Non-Veg"]
  },
  {
    "id": 10,
    "name": "Wild Mushroom Quinoa Bowl",
    "category": "Mains",
    "price": 14.00,
    "emoji": "🥗",
    "description": "Warm organic tricolor quinoa, roasted portobello mushrooms, kale chips, avocado, and tahini-lemon dressing.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 11,
    "name": "Molten Belgian Chocolate Cake",
    "category": "Desserts",
    "price": 8.50,
    "emoji": "🍫",
    "description": "Warm dark chocolate fondant with a luscious gooey center, dusted with Dutch cocoa.",
    "dietary": ["Vegetarian"]
  },
  {
    "id": 12,
    "name": "Vegan Wild Berry Panna Cotta",
    "category": "Desserts",
    "price": 7.50,
    "emoji": "🍓",
    "description": "Silk coconut cream panna cotta topped with wild blackberry coulis and fresh mint.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 13,
    "name": "Classic Venetian Tiramisu",
    "category": "Desserts",
    "price": 8.00,
    "emoji": "🍰",
    "description": "Espresso-soaked ladyfingers layered with rich mascarpone zabaglione and bittersweet cocoa.",
    "dietary": ["Vegetarian"]
  },
  {
    "id": 14,
    "name": "Gluten-Free Almond Lemon Tart",
    "category": "Desserts",
    "price": 7.00,
    "emoji": "🍋",
    "description": "Zesty Sicilian lemon curd set in a delicate toasted almond meal crust.",
    "dietary": ["Vegetarian", "Gluten-Free"]
  },
  {
    "id": 15,
    "name": "Artisan Alphonso Mango Gelato",
    "category": "Desserts",
    "price": 6.50,
    "emoji": "🍨",
    "description": "Double-churned Alphonso mango sorbet crafted with organic cane sugar and lime zest.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 16,
    "name": "Fresh Passionfruit Mojito",
    "category": "Drinks",
    "price": 6.50,
    "emoji": "🍹",
    "description": "Sparkling mocktail with crushed mint, lime juice, organic passionfruit pulp, and cane soda.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 17,
    "name": "Kyoto Iced Matcha Latte",
    "category": "Drinks",
    "price": 5.50,
    "emoji": "🍵",
    "description": "Ceremonial-grade Japanese matcha whisked with velvety oat milk and vanilla bean.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 18,
    "name": "Cold Brew Nitro Espresso",
    "category": "Drinks",
    "price": 5.00,
    "emoji": "☕",
    "description": "18-hour cold steeped single-origin Ethiopian beans infused with nitrogen for a creamy head.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 19,
    "name": "Sicilian Blood Orange Spritz",
    "category": "Drinks",
    "price": 6.00,
    "emoji": "🍊",
    "description": "Sun-ripened blood orange extract, sparkling mineral water, rosemary sprig, and crushed ice.",
    "dietary": ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    "id": 20,
    "name": "Spiced Karak Masala Chai",
    "category": "Drinks",
    "price": 4.50,
    "emoji": "🫖",
    "description": "Slow-brewed Assam black tea simmered with whole cardamom, ginger, cloves, and whole milk.",
    "dietary": ["Vegetarian", "Gluten-Free"]
  }
];

// App State
const state = {
  menuItems: [],
  activeCategory: 'All',
  activeDietary: 'All',
  searchQuery: '',
  cart: [] // Array of { id, name, price, emoji, quantity }
};

// DOM Elements
const el = {
  grid: document.getElementById('menu-items-grid'),
  cartList: document.getElementById('cart-items-list'),
  cartSubtotal: document.getElementById('cart-subtotal-val'),
  cartTax: document.getElementById('cart-tax-val'),
  cartGrandTotal: document.getElementById('cart-grand-total-val'),
  navCartBadge: document.getElementById('nav-cart-badge'),
  sidebarCartBadge: document.getElementById('sidebar-cart-badge'),
  proceedBtn: document.getElementById('proceed-to-checkout-btn'),
  clearCartBtn: document.getElementById('cart-clear-all-btn'),
  cartToggleBtn: document.getElementById('cart-toggle-btn'),
  searchInput: document.getElementById('menu-search-input'),
  categoryBtns: document.querySelectorAll('.category-btn'),
  dietaryBtns: document.querySelectorAll('.dietary-btn'),
  // Checkout Modal
  checkoutOverlay: document.getElementById('checkout-modal-overlay'),
  checkoutCloseBtn: document.getElementById('checkout-close-btn'),
  checkoutCancelBtn: document.getElementById('checkout-cancel-btn'),
  checkoutForm: document.getElementById('checkout-form'),
  checkoutSummaryBox: document.getElementById('checkout-items-summary'),
  checkoutFinalAmount: document.getElementById('checkout-final-amount'),
  customerNameInput: document.getElementById('customer-name-input'),
  tableNumberInput: document.getElementById('table-number-input'),
  specialNotesInput: document.getElementById('special-notes-input'),
  // Confirmation Modal
  confOverlay: document.getElementById('confirmation-modal-overlay'),
  confCloseBtn: document.getElementById('confirmation-close-btn'),
  confDoneBtn: document.getElementById('confirmation-done-btn'),
  confOrderId: document.getElementById('confirmed-order-id'),
  confGuestName: document.getElementById('conf-guest-name'),
  confTableNumber: document.getElementById('conf-table-number'),
  confTotalAmount: document.getElementById('conf-total-amount'),
  toast: document.getElementById('action-toast'),
  toastMsg: document.getElementById('toast-message')
};

// Access AppLogic functions (provided by logic.js)
const logic = window.AppLogic || {
  filterMenu: (items) => items,
  calculateCartTotal: (cart) => cart.reduce((s, i) => s + (i.price * i.quantity), 0),
  calculateTotalQuantity: (cart) => cart.reduce((s, i) => s + i.quantity, 0),
  generateOrderId: () => 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase()
};

/**
 * Initialize Application
 */
async function initApp() {
  await loadMenuData();
  setupEventListeners();
  renderMenu();
  renderCart();
}

/**
 * Load menu data from menu.json or fallback
 */
async function loadMenuData() {
  try {
    const res = await fetch('menu.json');
    if (!res.ok) throw new Error('Network error');
    state.menuItems = await res.json();
  } catch (err) {
    console.warn('Loading fallback menu data:', err);
    state.menuItems = FALLBACK_MENU;
  }
}

/**
 * Set up user interactions and listeners
 */
function setupEventListeners() {
  // Category tabs
  el.categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.categoryBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      state.activeCategory = btn.dataset.category;
      renderMenu();
    });
  });

  // Dietary filter buttons
  el.dietaryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.dietaryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeDietary = btn.dataset.dietary;
      renderMenu();
    });
  });

  // Search input
  el.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    renderMenu();
  });

  // Clear cart button
  el.clearCartBtn.addEventListener('click', () => {
    if (state.cart.length > 0 && confirm('Are you sure you want to clear your cart?')) {
      state.cart = [];
      renderCart();
      renderMenu();
      showToast('Cart cleared');
    }
  });

  // Cart scroll on mobile
  el.cartToggleBtn.addEventListener('click', () => {
    document.getElementById('cart-panel-sidebar').scrollIntoView({ behavior: 'smooth' });
  });

  // Checkout modal openers / closers
  el.proceedBtn.addEventListener('click', openCheckoutModal);
  el.checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  el.checkoutCancelBtn.addEventListener('click', closeCheckoutModal);
  el.checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === el.checkoutOverlay) closeCheckoutModal();
  });

  // Checkout form submission
  el.checkoutForm.addEventListener('submit', handleOrderSubmit);

  // Confirmation modal closers
  el.confCloseBtn.addEventListener('click', closeConfirmationModal);
  el.confDoneBtn.addEventListener('click', closeConfirmationModal);
  el.confOverlay.addEventListener('click', (e) => {
    if (e.target === el.confOverlay) closeConfirmationModal();
  });
}

/**
 * Filter items according to category, dietary tag, and search query
 */
function getFilteredItems() {
  let filtered = logic.filterMenu(state.menuItems, state.activeCategory, state.activeDietary);

  if (state.searchQuery) {
    filtered = filtered.filter(item => {
      const matchName = item.name.toLowerCase().includes(state.searchQuery);
      const matchDesc = item.description.toLowerCase().includes(state.searchQuery);
      const matchCategory = item.category.toLowerCase().includes(state.searchQuery);
      return matchName || matchDesc || matchCategory;
    });
  }

  return filtered;
}

/**
 * Render menu cards into the grid
 */
function renderMenu() {
  const items = getFilteredItems();

  if (items.length === 0) {
    el.grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🍽️</div>
        <h3>No dishes found</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your category or dietary filter.</p>
      </div>
    `;
    return;
  }

  el.grid.innerHTML = items.map(dish => {
    const cartItem = state.cart.find(c => c.id === dish.id);
    const qty = cartItem ? cartItem.quantity : 0;

    const dietaryBadges = (dish.dietary || []).map(tag => {
      const tagClass = tag.toLowerCase().replace(/\s+/g, '-');
      return `<span class="tag-badge ${tagClass}">${tag}</span>`;
    }).join('');

    const actionButtonHtml = qty > 0
      ? `
        <div class="card-qty-controls">
          <button class="qty-mini-btn" onclick="updateItemQuantity(${dish.id}, -1)" aria-label="Decrease quantity of ${dish.name}">-</button>
          <span class="qty-count">${qty}</span>
          <button class="qty-mini-btn" onclick="updateItemQuantity(${dish.id}, 1)" aria-label="Increase quantity of ${dish.name}">+</button>
        </div>
      `
      : `
        <button class="add-btn" onclick="addItemToCart(${dish.id})" aria-label="Add ${dish.name} to order">
          <span>+ Add</span>
        </button>
      `;

    return `
      <article class="menu-card" id="dish-card-${dish.id}">
        <div>
          <div class="card-top">
            <div class="card-emoji">${dish.emoji}</div>
            <span class="card-category-badge">${dish.category}</span>
          </div>
          <h3 class="card-title">${dish.name}</h3>
          <p class="card-desc">${dish.description}</p>
          <div class="card-tags">
            ${dietaryBadges}
          </div>
        </div>
        <div class="card-footer">
          <div class="card-price">$${dish.price.toFixed(2)}</div>
          ${actionButtonHtml}
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Add a dish to cart
 */
window.addItemToCart = function(dishId) {
  const dish = state.menuItems.find(d => d.id === dishId);
  if (!dish) return;

  const existing = state.cart.find(c => c.id === dishId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      emoji: dish.emoji,
      quantity: 1
    });
  }

  renderCart();
  renderMenu();
  showToast(`Added ${dish.name} to order`);
};

/**
 * Increment or decrement item quantity in cart
 */
window.updateItemQuantity = function(dishId, delta) {
  const index = state.cart.findIndex(c => c.id === dishId);
  if (index === -1) return;

  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  renderCart();
  renderMenu();
};

/**
 * Remove an item completely from cart
 */
window.removeItemFromCart = function(dishId) {
  state.cart = state.cart.filter(c => c.id !== dishId);
  renderCart();
  renderMenu();
  showToast('Item removed');
};

/**
 * Render the live cart sidebar
 */
function renderCart() {
  const totalQty = logic.calculateTotalQuantity(state.cart);
  const subtotal = logic.calculateCartTotal(state.cart);
  const tax = Math.round((subtotal * 0.08 + Number.EPSILON) * 100) / 100;
  const grandTotal = Math.round(((subtotal + tax) + Number.EPSILON) * 100) / 100;

  // Update badges
  el.navCartBadge.textContent = totalQty;
  el.sidebarCartBadge.textContent = totalQty;

  // Update summary numbers
  el.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  el.cartTax.textContent = `$${tax.toFixed(2)}`;
  el.cartGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;

  // Enable/disable checkout button
  el.proceedBtn.disabled = state.cart.length === 0;

  if (state.cart.length === 0) {
    el.cartList.innerHTML = `
      <div class="cart-empty-message">
        <div style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;">🛒</div>
        <p>Your cart is empty.</p>
        <p style="font-size: 0.8rem; margin-top: 0.25rem;">Select dishes to begin ordering.</p>
      </div>
    `;
    return;
  }

  el.cartList.innerHTML = state.cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-info">
        <span class="cart-item-emoji">${item.emoji}</span>
        <div class="cart-item-meta">
          <div class="cart-item-name" title="${item.name}">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn" onclick="updateItemQuantity(${item.id}, -1)" aria-label="Decrease quantity">-</button>
        <span class="cart-item-qty">${item.quantity}</span>
        <button class="cart-qty-btn" onclick="updateItemQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');
}

/**
 * Open Checkout Modal
 */
function openCheckoutModal() {
  if (state.cart.length === 0) return;

  const subtotal = logic.calculateCartTotal(state.cart);
  const tax = Math.round((subtotal * 0.08 + Number.EPSILON) * 100) / 100;
  const grandTotal = Math.round(((subtotal + tax) + Number.EPSILON) * 100) / 100;

  el.checkoutSummaryBox.innerHTML = state.cart.map(i => `
    <div class="order-review-item">
      <span>${i.emoji} ${i.name} &times; ${i.quantity}</span>
      <strong>$${(i.price * i.quantity).toFixed(2)}</strong>
    </div>
  `).join('') + `
    <div class="order-review-item" style="color: var(--text-dim); margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px dashed var(--border-subtle);">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="order-review-item" style="color: var(--text-dim);">
      <span>Taxes & Service (8%)</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
  `;

  el.checkoutFinalAmount.textContent = `$${grandTotal.toFixed(2)}`;
  el.checkoutOverlay.classList.add('active');
  el.customerNameInput.focus();
}

/**
 * Close Checkout Modal
 */
function closeCheckoutModal() {
  el.checkoutOverlay.classList.remove('active');
}

/**
 * Handle checkout submission and order placement
 */
function handleOrderSubmit(e) {
  e.preventDefault();

  const customerName = el.customerNameInput.value.trim();
  const tableNumber = el.tableNumberInput.value.trim();

  if (!customerName || !tableNumber) return;

  const subtotal = logic.calculateCartTotal(state.cart);
  const tax = Math.round((subtotal * 0.08 + Number.EPSILON) * 100) / 100;
  const grandTotal = `$${(subtotal + tax).toFixed(2)}`;

  // Generate order reference
  const orderId = logic.generateOrderId();

  // Populate confirmation modal
  el.confOrderId.textContent = orderId;
  el.confGuestName.textContent = customerName;
  el.confTableNumber.textContent = tableNumber;
  el.confTotalAmount.textContent = grandTotal;

  // Reset form and cart
  el.checkoutForm.reset();
  state.cart = [];
  closeCheckoutModal();
  renderCart();
  renderMenu();

  // Show confirmation modal
  el.confOverlay.classList.add('active');
}

/**
 * Close confirmation modal
 */
function closeConfirmationModal() {
  el.confOverlay.classList.remove('active');
}

/**
 * Micro Toast Notification helper
 */
let toastTimeout;
function showToast(message) {
  if (toastTimeout) clearTimeout(toastTimeout);
  el.toastMsg.textContent = message;
  el.toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    el.toast.classList.remove('show');
  }, 2500);
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
