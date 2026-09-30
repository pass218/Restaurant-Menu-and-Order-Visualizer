/**
 * Business Logic Module for Restaurant Menu & Order Visualizer
 * Supports both CommonJS (for Jest testing) and Browser Global environments.
 */

/**
 * Filter menu items by category and dietary requirements.
 * @param {Array<Object>} items - Array of dish objects
 * @param {string} category - "All", "Starters", "Mains", "Desserts", or "Drinks"
 * @param {string} dietaryTag - "All", "Vegan", "Vegetarian", "Gluten-Free", or "Non-Veg"
 * @returns {Array<Object>} Filtered array of dish objects
 */
function filterMenu(items, category = 'All', dietaryTag = 'All') {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(item => {
    // Category check
    const matchesCategory =
      !category || category === 'All' || item.category.toLowerCase() === category.toLowerCase();

    // Dietary check
    const matchesDietary =
      !dietaryTag ||
      dietaryTag === 'All' ||
      (Array.isArray(item.dietary) &&
        item.dietary.some(tag => tag.toLowerCase() === dietaryTag.toLowerCase()));

    return matchesCategory && matchesDietary;
  });
}

/**
 * Calculate the total price of all items currently in the cart.
 * Ensures precise 2-decimal point floating point rounding.
 * @param {Array<Object>} cartItems - Array of cart objects ({ price, quantity } or { item: { price }, quantity })
 * @returns {number} Rounded total price (e.g., 29.50)
 */
function calculateCartTotal(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return 0.00;
  }

  const rawTotal = cartItems.reduce((acc, entry) => {
    if (!entry) return acc;
    const price = typeof entry.price === 'number'
      ? entry.price
      : (entry.item && typeof entry.item.price === 'number' ? entry.item.price : 0);
    const quantity = typeof entry.quantity === 'number' ? entry.quantity : 1;
    return acc + (price * quantity);
  }, 0);

  return Math.round((rawTotal + Number.EPSILON) * 100) / 100;
}

/**
 * Calculate the total item count in the cart.
 * @param {Array<Object>} cartItems
 * @returns {number} Total count of items
 */
function calculateTotalQuantity(cartItems) {
  if (!Array.isArray(cartItems)) return 0;
  return cartItems.reduce((acc, entry) => {
    const qty = typeof entry.quantity === 'number' ? entry.quantity : 1;
    return acc + Math.max(0, qty);
  }, 0);
}

/**
 * Generate a unique, formatted order ID.
 * Example format: ORD-7K4M92
 * @param {string} prefix - Optional prefix (default "ORD")
 * @returns {string} Unique order identifier
 */
function generateOrderId(prefix = 'ORD') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${randomPart}`;
}

// Module export for Node/Jest, fallback to window.AppLogic in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    filterMenu,
    calculateCartTotal,
    calculateTotalQuantity,
    generateOrderId
  };
} else if (typeof window !== 'undefined') {
  window.AppLogic = {
    filterMenu,
    calculateCartTotal,
    calculateTotalQuantity,
    generateOrderId
  };
}
