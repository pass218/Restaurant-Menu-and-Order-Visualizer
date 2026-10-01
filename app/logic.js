/**
 * Desi Tadka - Business Logic Module
 * Provides pure business logic functions for filtering, cart calculations,
 * GST computation, Indian Rupee formatting, and order tracking.
 * Compatible with Node.js CommonJS (Jest testing) and Browser globals.
 */

/**
 * Filter menu items by category and dietary classification.
 * @param {Array<Object>} items - Array of dish objects from menu.json
 * @param {string} category - Category filter ('All', 'Starters', 'Mains', 'Breads & Rice', 'Desserts', 'Drinks')
 * @param {string} dietaryTag - Dietary filter ('All', 'Veg', 'Non-Veg', 'Vegan', 'Jain', 'Gluten-Free')
 * @returns {Array<Object>} Filtered array of dish objects
 */
function filterMenu(items, category = 'All', dietaryTag = 'All') {
  if (!Array.isArray(items)) {
    return [];
  }

  const normalizedCategory = (category || 'All').trim().toLowerCase();
  const normalizedDietary = (dietaryTag || 'All').trim().toLowerCase();

  return items.filter(item => {
    if (!item) return false;

    // Check category match
    const matchesCategory =
      normalizedCategory === 'all' ||
      (item.category && item.category.trim().toLowerCase() === normalizedCategory);

    // Check dietary match
    const matchesDietary =
      normalizedDietary === 'all' ||
      (Array.isArray(item.dietary) &&
        item.dietary.some(tag => tag && tag.trim().toLowerCase() === normalizedDietary));

    return matchesCategory && matchesDietary;
  });
}

/**
 * Calculate the cart subtotal in Indian Rupees (INR).
 * All prices are whole numbers.
 * @param {Array<Object>} cartItems - Array of { price, quantity } or { item: { price }, quantity }
 * @returns {number} Subtotal as an integer
 */
function calculateCartSubtotal(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return 0;
  }

  const rawSubtotal = cartItems.reduce((acc, entry) => {
    if (!entry) return acc;
    const price = typeof entry.price === 'number'
      ? entry.price
      : (entry.item && typeof entry.item.price === 'number' ? entry.item.price : 0);
    const quantity = typeof entry.quantity === 'number' && entry.quantity > 0 ? entry.quantity : 1;
    return acc + Math.round(price * quantity);
  }, 0);

  return Math.max(0, Math.round(rawSubtotal));
}

/**
 * Calculate 5% Goods and Services Tax (GST) on restaurant food services.
 * Rounded to nearest whole rupee.
 * @param {number} subtotal - Cart subtotal in INR
 * @param {number} rate - GST rate (default 0.05 for 5% restaurant GST)
 * @returns {number} Rounded GST amount
 */
function calculateGST(subtotal, rate = 0.05) {
  if (typeof subtotal !== 'number' || isNaN(subtotal) || subtotal <= 0) {
    return 0;
  }
  return Math.round(subtotal * rate);
}

/**
 * Calculate Grand Total = Subtotal + GST.
 * @param {number} subtotal - Subtotal in INR
 * @param {number} gst - GST in INR
 * @returns {number} Grand total in INR
 */
function calculateGrandTotal(subtotal, gst = 0) {
  const safeSubtotal = typeof subtotal === 'number' && !isNaN(subtotal) ? subtotal : 0;
  const safeGst = typeof gst === 'number' && !isNaN(gst) ? gst : 0;
  return Math.max(0, Math.round(safeSubtotal + safeGst));
}

/**
 * Calculate total quantity of items in cart.
 * @param {Array<Object>} cartItems
 * @returns {number} Total count of items
 */
function calculateTotalQuantity(cartItems) {
  if (!Array.isArray(cartItems)) return 0;
  return cartItems.reduce((acc, entry) => {
    if (!entry) return acc;
    const qty = typeof entry.quantity === 'number' ? entry.quantity : 1;
    return acc + Math.max(0, qty);
  }, 0);
}

/**
 * Format currency amount into Indian Rupee standard format (₹) with no decimals.
 * Uses Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).
 * @param {number} amount - Amount in INR
 * @returns {string} Formatted Indian Rupee string (e.g. ₹380, ₹1,250)
 */
function formatINR(amount) {
  const numericAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(numericAmount);
}

/**
 * Generate a unique production-grade order identifier with restaurant prefix.
 * Example format: DT-20261001-8K3N
 * @param {string} prefix - Restaurant identifier prefix (default 'DT')
 * @returns {string} Unique order identifier
 */
function generateOrderId(prefix = 'DT') {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomCode = '';
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${prefix}-${dateStr}-${randomCode}`;
}

// Export for Node.js (Jest) or Browser (window.AppLogic)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    filterMenu,
    calculateCartSubtotal,
    calculateGST,
    calculateGrandTotal,
    calculateTotalQuantity,
    formatINR,
    generateOrderId
  };
}

if (typeof window !== 'undefined') {
  window.AppLogic = {
    filterMenu,
    calculateCartSubtotal,
    calculateGST,
    calculateGrandTotal,
    calculateTotalQuantity,
    formatINR,
    generateOrderId
  };
}
