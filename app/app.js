/**
 * Desi Tadka — Interactive Frontend Application Controller
 * Manages reactive menu rendering, dietary filters, cart state,
 * modal workflows, and Indian Rupee financial computations.
 */

// Fallback catalog in case index.html is opened via local file:// protocol
const DESI_TADKA_FALLBACK = [
  {
    "id": 1,
    "name": "Paneer Tikka",
    "price": 260,
    "category": "Starters",
    "emoji": "🧀",
    "image": "images/dishes/paneer-tikka.webp",
    "alt": "Skewered cottage cheese cubes charred in a clay tandoor with capsicum and onions",
    "dietary": ["Veg", "Jain", "Gluten-Free"],
    "spice": "Medium",
    "description": "Succulent cubes of artisanal cottage cheese marinated in spiced hung curd, ajwain, and Kashmiri chili, roasted in a clay tandoor."
  },
  {
    "id": 2,
    "name": "Veg Samosa",
    "price": 120,
    "category": "Starters",
    "emoji": "🥟",
    "image": "images/dishes/veg-samosa.webp",
    "alt": "Two golden crispy pastry cones filled with spiced potatoes and peas",
    "dietary": ["Veg", "Vegan"],
    "spice": "Medium",
    "description": "Crisp flaky pastry triangles filled with tempered cumin potatoes, green peas, and whole spices, served with tamarind and mint chutneys."
  },
  {
    "id": 3,
    "name": "Chicken 65",
    "price": 290,
    "category": "Starters",
    "emoji": "🍗",
    "image": "images/dishes/chicken-65.webp",
    "alt": "Fiery red deep-fried chicken bites garnished with fried curry leaves and split green chilies",
    "dietary": ["Non-Veg"],
    "spice": "Hot",
    "description": "Iconic Chennai-style crispy boneless chicken chunks infused with fiery red chilies, crushed black pepper, fresh curry leaves, and garlic."
  },
  {
    "id": 4,
    "name": "Hara Bhara Kebab",
    "price": 220,
    "category": "Starters",
    "emoji": "🥬",
    "image": "images/dishes/hara-bhara-kebab.webp",
    "alt": "Pan-seared spinach and green pea patties crowned with half a cashew nut",
    "dietary": ["Veg", "Vegan", "Gluten-Free"],
    "spice": "Mild",
    "description": "Pan-seared nutritious patties made from farm-fresh spinach, green peas, and potatoes seasoned with roasted cumin and chaat masala."
  },
  {
    "id": 5,
    "name": "Fish Amritsari",
    "price": 340,
    "category": "Starters",
    "emoji": "🐟",
    "image": "images/dishes/fish-amritsari.webp",
    "alt": "Golden batter-fried river sole fish fillets dusted with chaat masala",
    "dietary": ["Non-Veg", "Gluten-Free"],
    "spice": "Medium",
    "description": "Fresh river sole fish goujons steeped in ginger-garlic paste and carom seeds (ajwain), coated in crisp gram-flour batter."
  },
  {
    "id": 6,
    "name": "Butter Chicken",
    "price": 380,
    "category": "Mains",
    "emoji": "🍲",
    "image": "images/dishes/butter-chicken.webp",
    "alt": "Rich orange creamy tomato gravy with charred tandoori chicken pieces and butter swirl",
    "dietary": ["Non-Veg"],
    "spice": "Mild",
    "description": "Char-grilled tandoori chicken simmered slowly in a decadent, silky gravy of San Marzano style tomatoes, butter, cashew paste, and kasoori methi."
  },
  {
    "id": 7,
    "name": "Palak Paneer",
    "price": 310,
    "category": "Mains",
    "emoji": "🧀",
    "image": "images/dishes/palak-paneer.webp",
    "alt": "Vibrant emerald green spinach gravy with soft cottage cheese cubes",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Medium",
    "description": "Farm-fresh spinach blanched and puréed with garlic, cumin, and green chilies, finished with soft cottage cheese cubes and fresh cream."
  },
  {
    "id": 8,
    "name": "Dal Makhani",
    "price": 280,
    "category": "Mains",
    "emoji": "🥣",
    "image": "images/dishes/dal-makhani.webp",
    "alt": "Slow-cooked black lentils in creamy tomato gravy with a dollop of white butter",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Whole black lentils and kidney beans slow-simmered over live charcoal for 16 hours with butter, fresh tomato purée, and delicate aromatics."
  },
  {
    "id": 9,
    "name": "Chole Masala",
    "price": 250,
    "category": "Mains",
    "emoji": "🍛",
    "image": "images/dishes/chole-masala.webp",
    "alt": "Dark spiced chickpea curry garnished with ginger juliennes and fresh coriander",
    "dietary": ["Veg", "Vegan", "Gluten-Free"],
    "spice": "Medium",
    "description": "Kabuli chickpeas cooked tender in an authentic Amritsari blend of roasted pomegranate seeds, black cardamom, and dried mango powder."
  },
  {
    "id": 10,
    "name": "Hyderabadi Chicken Biryani",
    "price": 390,
    "category": "Mains",
    "emoji": "🍚",
    "image": "images/dishes/hyderabadi-chicken-biryani.webp",
    "alt": "Fragrant layered basmati rice with marinated chicken pieces, caramelized onions, and saffron",
    "dietary": ["Non-Veg"],
    "spice": "Spicy",
    "description": "Kacchi dum biryani layered with marinated chicken, long-grain aged basmati rice, brown onions, fresh mint, and saffron milk."
  },
  {
    "id": 11,
    "name": "Veg Dum Biryani",
    "price": 320,
    "category": "Mains",
    "emoji": "🥘",
    "image": "images/dishes/veg-biryani.webp",
    "alt": "Basmati rice cooked in a sealed pot with assorted vegetables, paneer, and whole spices",
    "dietary": ["Veg", "Jain", "Gluten-Free"],
    "spice": "Medium",
    "description": "Flavourful aged basmati rice slow-cooked in a sealed clay pot (handi) with garden vegetables, cottage cheese, saffron, and kewra essence."
  },
  {
    "id": 12,
    "name": "Mutton Rogan Josh",
    "price": 460,
    "category": "Mains",
    "emoji": "🥩",
    "image": "images/dishes/mutton-rogan-josh.webp",
    "alt": "Deep red Kashmiri mutton curry with bone-in tender meat in fragrant thin gravy",
    "dietary": ["Non-Veg", "Gluten-Free"],
    "spice": "Spicy",
    "description": "Traditional Kashmiri delicacy of tender spring lamb simmered with Kashmiri dry red chilies, fennel powder, dried ginger, and ratan jot."
  },
  {
    "id": 13,
    "name": "Chettinad Chicken",
    "price": 370,
    "category": "Mains",
    "emoji": "🌶️",
    "image": "images/dishes/chettinad-chicken.webp",
    "alt": "Dark rustic South Indian chicken curry loaded with freshly roasted peppercorns and curry leaves",
    "dietary": ["Non-Veg", "Gluten-Free"],
    "spice": "Hot",
    "description": "A spicy and aromatic curry from Tamil Nadu prepared with freshly roasted kalpasi (stone flower), black peppercorns, grated coconut, and shallots."
  },
  {
    "id": 14,
    "name": "Butter Naan",
    "price": 60,
    "category": "Breads & Rice",
    "emoji": "🫓",
    "image": "images/dishes/butter-naan.webp",
    "alt": "Tear-drop shaped tandoor-baked flatbread glazed with melted yellow butter",
    "dietary": ["Veg"],
    "spice": "Mild",
    "description": "Traditional leavened white flour bread slapped onto tandoor walls and baked till bubbly, basted with rich melted butter."
  },
  {
    "id": 15,
    "name": "Garlic Naan",
    "price": 80,
    "category": "Breads & Rice",
    "emoji": "🧄",
    "image": "images/dishes/garlic-naan.webp",
    "alt": "Pillowy tandoor naan topped with minced roasted garlic, butter, and green coriander",
    "dietary": ["Veg"],
    "spice": "Mild",
    "description": "Tandoor-baked leavened bread studded with freshly crushed garlic cloves, fresh cilantro, and finished with golden butter."
  },
  {
    "id": 16,
    "name": "Tandoori Roti",
    "price": 40,
    "category": "Breads & Rice",
    "emoji": "🍞",
    "image": "images/dishes/tandoori-roti.webp",
    "alt": "Whole wheat circular flatbread with charred spots from the clay oven",
    "dietary": ["Veg", "Vegan"],
    "spice": "Mild",
    "description": "Crisp and wholesome stone-ground whole wheat flatbread baked directly over red-hot charcoal in an authentic clay tandoor."
  },
  {
    "id": 17,
    "name": "Jeera Rice",
    "price": 180,
    "category": "Breads & Rice",
    "emoji": "🌾",
    "image": "images/dishes/jeera-rice.webp",
    "alt": "Long-grain white basmati rice tossed with cracked cumin seeds and coriander",
    "dietary": ["Veg", "Vegan", "Jain", "Gluten-Free"],
    "spice": "Mild",
    "description": "Aromatic steamed aged basmati rice tempered in fragrant desi ghee with roasted cumin seeds and fresh green coriander."
  },
  {
    "id": 18,
    "name": "Masala Dosa",
    "price": 190,
    "category": "Breads & Rice",
    "emoji": "🥞",
    "image": "images/dishes/masala-dosa.webp",
    "alt": "Crispy golden crepe rolled over spiced mashed potato filling served with coconut chutney and sambar",
    "dietary": ["Veg", "Vegan", "Gluten-Free"],
    "spice": "Medium",
    "description": "Crispy fermented rice and urad dal crepe filled with turmeric-tempered potato masala, served with piping hot sambar and fresh coconut chutney."
  },
  {
    "id": 19,
    "name": "Gulab Jamun",
    "price": 140,
    "category": "Desserts",
    "emoji": "🍯",
    "image": "images/dishes/gulab-jamun.webp",
    "alt": "Warm golden-brown milk dumplings immersed in fragrant sugar syrup with pistachio garnish",
    "dietary": ["Veg"],
    "spice": "Mild",
    "description": "Golden fried dumplings made from fresh reduced milk solids (khoya), steeped in warm saffron, cardamom, and rose water syrup."
  },
  {
    "id": 20,
    "name": "Rasmalai",
    "price": 160,
    "category": "Desserts",
    "emoji": "🥛",
    "image": "images/dishes/rasmalai.webp",
    "alt": "Spongy white cottage cheese patties floating in chilled saffron-pistachio thickened milk",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Soft and spongy poached chenna patties soaked in thick, chilled malai sweetened with cane sugar and infused with saffron and slivered pistachios."
  },
  {
    "id": 21,
    "name": "Gajar Halwa",
    "price": 170,
    "category": "Desserts",
    "emoji": "🥕",
    "image": "images/dishes/gajar-halwa.webp",
    "alt": "Warm vibrant orange grated carrot pudding garnished with roasted cashews and raisins",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Classic winter dessert prepared by slow-simmering tender red Delhi carrots in full-cream milk, pure desi ghee, khoya, and green cardamom."
  },
  {
    "id": 22,
    "name": "Royal Malai Kulfi",
    "price": 130,
    "category": "Desserts",
    "emoji": "🍦",
    "image": "images/dishes/kulfi.webp",
    "alt": "Traditional dense Indian ice cream stick on a terracotta plate topped with chopped almonds and saffron threads",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Rich and dense frozen Indian dairy dessert crafted by caramelizing milk over several hours with cardamom, crushed almonds, and saffron."
  },
  {
    "id": 23,
    "name": "Masala Chai",
    "price": 70,
    "category": "Drinks",
    "emoji": "☕",
    "image": "images/dishes/masala-chai.webp",
    "alt": "Steaming hot Indian tea served in a traditional clay kulhad",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Robust Assam black tea leaves boiled with whole buffalo milk, crushed fresh ginger, green cardamom, cinnamon, and cloves."
  },
  {
    "id": 24,
    "name": "Sweet Punjabi Lassi",
    "price": 110,
    "category": "Drinks",
    "emoji": "🥤",
    "image": "images/dishes/sweet-lassi.webp",
    "alt": "Frothy churned sweet yoghurt in a tall glass topped with a layer of thick cream",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Traditional North Indian beverage made from thick curd churned with powdered sugar and rose water, crowned with dense malai."
  },
  {
    "id": 25,
    "name": "Mango Lassi",
    "price": 140,
    "category": "Drinks",
    "emoji": "🥭",
    "image": "images/dishes/mango-lassi.webp",
    "alt": "Creamy golden-yellow mango yoghurt smoothie with crushed pistachio topping",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Velvety blend of fresh thick yoghurt, sweet Ratnagiri Alphonso mango pulp, a hint of cardamom, and a touch of wild honey."
  },
  {
    "id": 26,
    "name": "South Indian Filter Coffee",
    "price": 80,
    "category": "Drinks",
    "emoji": "☕",
    "image": "images/dishes/filter-coffee.webp",
    "alt": "Foamy aromatic South Indian filter coffee in a brass dabarah and tumbler set",
    "dietary": ["Veg", "Gluten-Free"],
    "spice": "Mild",
    "description": "Strong coffee decoction brewed through a traditional brass filter with chicory blend, poured back and forth with hot milk for a frothy crown."
  },
  {
    "id": 27,
    "name": "Chilled Jaljeera",
    "price": 90,
    "category": "Drinks",
    "emoji": "🍹",
    "image": "images/dishes/jaljeera.webp",
    "alt": "Iced tangy green cumin cooler served with floating crisp boondi and mint sprig",
    "dietary": ["Veg", "Vegan", "Jain", "Gluten-Free"],
    "spice": "Medium",
    "description": "Refreshing traditional digestive cooler prepared with roasted cumin, fresh mint, black salt, amchur (dried mango), and crispy boondi."
  }
];

// Application State
const AppState = {
  menu: [],
  selectedCategory: 'All',
  selectedDietary: 'All',
  cart: {}, // { [dishId]: { item, quantity } }
  activeModalDish: null
};

// DOM References
const DOM = {
  categoryTabs: document.getElementById('category-tabs'),
  dietaryButtons: document.getElementById('dietary-buttons'),
  dishesGrid: document.getElementById('dishes-grid'),
  dishCounter: document.getElementById('dish-counter'),
  menuTitle: document.getElementById('menu-current-title'),
  emptyState: document.getElementById('empty-state'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  
  // Cart
  cartToggleBtn: document.getElementById('cart-toggle-btn'),
  cartCloseBtn: document.getElementById('cart-close-btn'),
  cartDrawer: document.getElementById('cart-drawer'),
  cartBackdrop: document.getElementById('cart-backdrop'),
  cartItemsContainer: document.getElementById('cart-items-container'),
  navCartBadge: document.getElementById('nav-cart-badge'),
  billSubtotal: document.getElementById('bill-subtotal'),
  billGst: document.getElementById('bill-gst'),
  billGrandTotal: document.getElementById('bill-grand-total'),
  checkoutOpenBtn: document.getElementById('checkout-open-btn'),
  
  // Detail Modal
  detailModal: document.getElementById('detail-modal'),
  detailModalClose: document.getElementById('detail-modal-close'),
  detailModalImg: document.getElementById('detail-modal-img'),
  detailModalEmoji: document.getElementById('detail-modal-emoji'),
  detailModalName: document.getElementById('detail-modal-name'),
  detailModalPrice: document.getElementById('detail-modal-price'),
  detailModalDesc: document.getElementById('detail-modal-desc'),
  detailTagsRow: document.getElementById('detail-tags-row'),
  detailFssaiIndicator: document.getElementById('detail-fssai-indicator'),
  detailSpiceLevel: document.getElementById('detail-spice-level'),
  detailAddCartBtn: document.getElementById('detail-add-cart-btn'),
  
  // Checkout Modal
  checkoutModal: document.getElementById('checkout-modal'),
  checkoutModalClose: document.getElementById('checkout-modal-close'),
  checkoutCancelBtn: document.getElementById('checkout-cancel-btn'),
  checkoutForm: document.getElementById('checkout-form'),
  customerNameInput: document.getElementById('customer-name'),
  tableNumberInput: document.getElementById('table-number'),
  modalBillSubtotal: document.getElementById('modal-bill-subtotal'),
  modalBillGst: document.getElementById('modal-bill-gst'),
  modalBillTotal: document.getElementById('modal-bill-total'),
  
  // Confirmation Modal
  confirmationModal: document.getElementById('confirmation-modal'),
  confirmationCloseBtn: document.getElementById('confirmation-close-btn'),
  receiptOrderId: document.getElementById('receipt-order-id'),
  receiptCustomerName: document.getElementById('receipt-customer-name'),
  receiptTableNum: document.getElementById('receipt-table-num'),
  receiptPaymentMode: document.getElementById('receipt-payment-mode'),
  receiptTimestamp: document.getElementById('receipt-timestamp'),
  receiptGrandTotal: document.getElementById('receipt-grand-total')
};

/**
 * Initialize Application
 */
async function initApp() {
  loadCartFromStorage();
  await loadMenuData();
  setupEventListeners();
  renderMenu();
  updateCartUI();
}

/**
 * Fetch menu.json with fallback
 */
async function loadMenuData() {
  try {
    const res = await fetch('menu.json');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    AppState.menu = await res.json();
  } catch (err) {
    console.warn('Using embedded Desi Tadka menu fallback (Offline/CORS mode):', err);
    AppState.menu = DESI_TADKA_FALLBACK;
  }
}

/**
 * Filter & Render Dishes
 */
function renderMenu() {
  const filtered = window.AppLogic.filterMenu(
    AppState.menu,
    AppState.selectedCategory,
    AppState.selectedDietary
  );

  DOM.dishCounter.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? '' : 's'}`;
  DOM.menuTitle.textContent = AppState.selectedCategory === 'All' 
    ? 'Explore Our Menu' 
    : `${AppState.selectedCategory} Selection`;

  if (filtered.length === 0) {
    DOM.dishesGrid.innerHTML = '';
    DOM.emptyState.classList.remove('hidden');
    return;
  }

  DOM.emptyState.classList.add('hidden');
  DOM.dishesGrid.innerHTML = filtered.map(dish => createDishCardHtml(dish)).join('');
}

/**
 * Create Dish Card HTML
 */
function createDishCardHtml(dish) {
  const cartEntry = AppState.cart[dish.id];
  const qty = cartEntry ? cartEntry.quantity : 0;
  const isVeg = dish.dietary && dish.dietary.includes('Veg');
  const fssaiClass = isVeg ? 'fssai-veg' : 'fssai-nonveg';
  const spiceClass = `spice-${(dish.spice || 'medium').toLowerCase()}`;
  const formattedPrice = window.AppLogic.formatINR(dish.price);

  return `
    <article class="dish-card" id="dish-card-${dish.id}" data-id="${dish.id}">
      <div class="dish-image-wrapper" onclick="openDishDetail(${dish.id})">
        <img 
          src="${dish.image}" 
          alt="${escapeHtml(dish.alt || dish.name)}" 
          class="dish-card-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageFallback(this, '${dish.emoji}', '${escapeHtml(dish.category)}')"
        >
        <div class="dish-top-badges">
          <div class="fssai-card-badge">
            <span class="fssai-indicator ${fssaiClass}" title="${isVeg ? 'Vegetarian' : 'Non-Vegetarian'}">
              <span class="fssai-dot"></span>
            </span>
          </div>
          <span class="spice-tag ${spiceClass}">${dish.spice}</span>
        </div>
      </div>

      <div class="dish-card-body">
        <div class="dish-header-row">
          <h4 class="dish-title">${escapeHtml(dish.name)}</h4>
          <span class="dish-price">${formattedPrice}</span>
        </div>
        
        <div class="dish-category-label">${escapeHtml(dish.category)}</div>
        <p class="dish-description">${escapeHtml(dish.description)}</p>

        <div class="dietary-tags-list">
          ${dish.dietary.map(t => `<span class="mini-diet-tag">${escapeHtml(t)}</span>`).join('')}
        </div>

        <div class="dish-card-action">
          ${qty > 0 ? `
            <div class="card-qty-control">
              <button class="qty-btn" onclick="updateItemQuantity(${dish.id}, -1)" aria-label="Decrease">&minus;</button>
              <span class="qty-display">${qty} in order</span>
              <button class="qty-btn" onclick="updateItemQuantity(${dish.id}, 1)" aria-label="Increase">+</button>
            </div>
          ` : `
            <button class="add-btn" onclick="addToCart(${dish.id})">
              <span>+ Add to Order</span>
            </button>
          `}
        </div>
      </div>
    </article>
  `;
}

/**
 * Image fallback on error: replaces img with emoji on saffron background
 */
function handleImageFallback(imgEl, emoji, category) {
  const parent = imgEl.parentElement;
  if (!parent) return;

  const fallback = document.createElement('div');
  fallback.className = 'dish-fallback-img';
  fallback.innerHTML = `
    <span class="dish-fallback-emoji">${emoji || '🍲'}</span>
    <span class="dish-fallback-text">${category || 'Desi Tadka'}</span>
  `;
  parent.replaceChild(fallback, imgEl);
}

/**
 * Open Dish Detail Modal
 */
function openDishDetail(dishId) {
  const dish = AppState.menu.find(d => d.id === dishId);
  if (!dish) return;

  AppState.activeModalDish = dish;

  DOM.detailModalImg.src = dish.image;
  DOM.detailModalImg.alt = dish.alt;
  DOM.detailModalEmoji.textContent = dish.emoji;
  DOM.detailModalName.textContent = dish.name;
  DOM.detailModalPrice.textContent = window.AppLogic.formatINR(dish.price);
  DOM.detailModalDesc.textContent = dish.description;
  DOM.detailSpiceLevel.textContent = dish.spice;

  // FSSAI badge
  const isVeg = dish.dietary.includes('Veg');
  DOM.detailFssaiIndicator.className = `fssai-indicator ${isVeg ? 'fssai-veg' : 'fssai-nonveg'}`;

  // Tags
  DOM.detailTagsRow.innerHTML = dish.dietary
    .map(t => `<span class="mini-diet-tag">${escapeHtml(t)}</span>`)
    .join('');

  DOM.detailModal.classList.remove('hidden');
}

function closeDishDetail() {
  DOM.detailModal.classList.add('hidden');
  AppState.activeModalDish = null;
}

/**
 * Cart State Operations
 */
function addToCart(dishId) {
  const dish = AppState.menu.find(d => d.id === dishId);
  if (!dish) return;

  if (AppState.cart[dishId]) {
    AppState.cart[dishId].quantity += 1;
  } else {
    AppState.cart[dishId] = {
      dish: dish,
      price: dish.price,
      quantity: 1
    };
  }

  saveCartToStorage();
  updateCartUI();
  renderMenu();
}

function updateItemQuantity(dishId, change) {
  if (!AppState.cart[dishId]) return;

  AppState.cart[dishId].quantity += change;

  if (AppState.cart[dishId].quantity <= 0) {
    delete AppState.cart[dishId];
  }

  saveCartToStorage();
  updateCartUI();
  renderMenu();
}

/**
 * Update Cart UI (drawer, badge count, subtotal, 5% GST, grand total)
 */
function updateCartUI() {
  const cartEntries = Object.values(AppState.cart);
  const totalCount = window.AppLogic.calculateTotalQuantity(cartEntries);
  const subtotal = window.AppLogic.calculateCartSubtotal(cartEntries);
  const gst = window.AppLogic.calculateGST(subtotal);
  const grandTotal = window.AppLogic.calculateGrandTotal(subtotal, gst);

  // Update Nav Badge
  DOM.navCartBadge.textContent = totalCount;

  // Update Drawer Bill
  DOM.billSubtotal.textContent = window.AppLogic.formatINR(subtotal);
  DOM.billGst.textContent = window.AppLogic.formatINR(gst);
  DOM.billGrandTotal.textContent = window.AppLogic.formatINR(grandTotal);

  DOM.checkoutOpenBtn.disabled = cartEntries.length === 0;

  // Render Items inside drawer
  if (cartEntries.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="cart-empty-text">
        <span style="font-size:2.5rem; display:block; margin-bottom:0.5rem;">🍽️</span>
        Your dining cart is empty.<br>Select royal dishes from our menu to start your order.
      </div>
    `;
    return;
  }

  DOM.cartItemsContainer.innerHTML = cartEntries.map(entry => {
    const d = entry.dish;
    const itemTotal = entry.price * entry.quantity;
    return `
      <div class="cart-item-row" id="cart-item-${d.id}">
        <img src="${d.image}" alt="${escapeHtml(d.name)}" class="cart-item-thumb" onerror="this.src='images/placeholder.svg'">
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(d.name)}</div>
          <div class="cart-item-unit-price">${window.AppLogic.formatINR(entry.price)} each</div>
          <div class="cart-item-calc">${window.AppLogic.formatINR(itemTotal)}</div>
        </div>
        <div class="cart-item-actions">
          <button class="cart-mini-qty-btn" onclick="updateItemQuantity(${d.id}, -1)">&minus;</button>
          <span class="cart-mini-qty">${entry.quantity}</span>
          <button class="cart-mini-qty-btn" onclick="updateItemQuantity(${d.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Storage Helpers
 */
function saveCartToStorage() {
  try {
    localStorage.setItem('desi_tadka_cart', JSON.stringify(AppState.cart));
  } catch (e) {
    // Ignore storage errors in restricted iframe
  }
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem('desi_tadka_cart');
    if (raw) AppState.cart = JSON.parse(raw);
  } catch (e) {
    AppState.cart = {};
  }
}

/**
 * Checkout Workflow
 */
function openCheckoutModal() {
  const cartEntries = Object.values(AppState.cart);
  if (cartEntries.length === 0) return;

  const subtotal = window.AppLogic.calculateCartSubtotal(cartEntries);
  const gst = window.AppLogic.calculateGST(subtotal);
  const grandTotal = window.AppLogic.calculateGrandTotal(subtotal, gst);

  DOM.modalBillSubtotal.textContent = window.AppLogic.formatINR(subtotal);
  DOM.modalBillGst.textContent = window.AppLogic.formatINR(gst);
  DOM.modalBillTotal.textContent = window.AppLogic.formatINR(grandTotal);

  DOM.checkoutModal.classList.remove('hidden');
  closeCartDrawer();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const customerName = DOM.customerNameInput.value.trim();
  const tableNumber = DOM.tableNumberInput.value.trim();
  const paymentMode = (document.querySelector('input[name="paymentMode"]:checked') || {}).value || 'UPI';

  if (!customerName || !tableNumber) {
    alert('Please provide your name and table number.');
    return;
  }

  const cartEntries = Object.values(AppState.cart);
  const subtotal = window.AppLogic.calculateCartSubtotal(cartEntries);
  const gst = window.AppLogic.calculateGST(subtotal);
  const grandTotal = window.AppLogic.calculateGrandTotal(subtotal, gst);
  const orderId = window.AppLogic.generateOrderId('DT');
  const now = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  // Populate Confirmation Receipt
  DOM.receiptOrderId.textContent = orderId;
  DOM.receiptCustomerName.textContent = customerName;
  DOM.receiptTableNum.textContent = `Table #${tableNumber}`;
  DOM.receiptPaymentMode.textContent = paymentMode;
  DOM.receiptTimestamp.textContent = now;
  DOM.receiptGrandTotal.textContent = window.AppLogic.formatINR(grandTotal);

  // Close checkout modal & show confirmation
  DOM.checkoutModal.classList.add('hidden');
  DOM.confirmationModal.classList.remove('hidden');

  // Clear Cart
  AppState.cart = {};
  saveCartToStorage();
  updateCartUI();
  renderMenu();
  DOM.checkoutForm.reset();
}

/**
 * Cart Drawer Open / Close
 */
function openCartDrawer() {
  DOM.cartDrawer.classList.add('open');
  DOM.cartBackdrop.classList.add('open');
}

function closeCartDrawer() {
  DOM.cartDrawer.classList.remove('open');
  DOM.cartBackdrop.classList.remove('open');
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  // Category Tabs
  DOM.categoryTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    DOM.categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    AppState.selectedCategory = btn.dataset.category;
    renderMenu();
  });

  // Dietary Buttons
  DOM.dietaryButtons.addEventListener('click', (e) => {
    const btn = e.target.closest('.diet-btn');
    if (!btn) return;

    DOM.dietaryButtons.querySelectorAll('.diet-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    AppState.selectedDietary = btn.dataset.dietary;
    renderMenu();
  });

  // Reset Filters
  DOM.resetFiltersBtn.addEventListener('click', () => {
    AppState.selectedCategory = 'All';
    AppState.selectedDietary = 'All';

    DOM.categoryTabs.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === 'All');
    });
    DOM.dietaryButtons.querySelectorAll('.diet-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.dietary === 'All');
    });

    renderMenu();
  });

  // Cart Drawer
  DOM.cartToggleBtn.addEventListener('click', openCartDrawer);
  DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
  DOM.cartBackdrop.addEventListener('click', closeCartDrawer);

  // Detail Modal
  DOM.detailModalClose.addEventListener('click', closeDishDetail);
  DOM.detailModal.addEventListener('click', (e) => {
    if (e.target === DOM.detailModal) closeDishDetail();
  });
  DOM.detailAddCartBtn.addEventListener('click', () => {
    if (AppState.activeModalDish) {
      addToCart(AppState.activeModalDish.id);
      closeDishDetail();
    }
  });

  // Checkout Modal
  DOM.checkoutOpenBtn.addEventListener('click', openCheckoutModal);
  DOM.checkoutModalClose.addEventListener('click', () => DOM.checkoutModal.classList.add('hidden'));
  DOM.checkoutCancelBtn.addEventListener('click', () => {
    DOM.checkoutModal.classList.add('hidden');
    openCartDrawer();
  });
  DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  // Confirmation Modal Close
  DOM.confirmationCloseBtn.addEventListener('click', () => {
    DOM.confirmationModal.classList.add('hidden');
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeDishDetail();
      DOM.checkoutModal.classList.add('hidden');
      DOM.confirmationModal.classList.add('hidden');
    }
  });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

// Global exposure for inline events
window.addToCart = addToCart;
window.updateItemQuantity = updateItemQuantity;
window.openDishDetail = openDishDetail;
window.handleImageFallback = handleImageFallback;

// Start App on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
