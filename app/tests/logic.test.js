/**
 * Desi Tadka — Automated Unit Test Suite
 * Validates business logic, dietary filters, cart arithmetic, 5% GST calculation,
 * INR currency formatting, and asset integrity (image existence and alt texts).
 */

const fs = require('fs');
const path = require('path');
const {
  filterMenu,
  calculateCartSubtotal,
  calculateGST,
  calculateGrandTotal,
  calculateTotalQuantity,
  formatINR,
  generateOrderId
} = require('../logic');

// Load production menu.json
const menuPath = path.join(__dirname, '..', 'menu.json');
const rawMenuData = fs.readFileSync(menuPath, 'utf8');
const menuItems = JSON.parse(rawMenuData);

describe('1. Menu Dietary & Category Filtering (filterMenu)', () => {
  test('returns all items when category and dietary tags are "All"', () => {
    const results = filterMenu(menuItems, 'All', 'All');
    expect(results).toHaveLength(menuItems.length);
  });

  test('filters correctly by category "Starters"', () => {
    const starters = filterMenu(menuItems, 'Starters', 'All');
    expect(starters.length).toBeGreaterThanOrEqual(5);
    starters.forEach(item => expect(item.category).toBe('Starters'));
  });

  test('filters correctly by category "Mains"', () => {
    const mains = filterMenu(menuItems, 'Mains', 'All');
    expect(mains.length).toBeGreaterThanOrEqual(8);
    mains.forEach(item => expect(item.category).toBe('Mains'));
  });

  test('filters correctly by category "Breads & Rice"', () => {
    const breads = filterMenu(menuItems, 'Breads & Rice', 'All');
    expect(breads.length).toBeGreaterThanOrEqual(5);
    breads.forEach(item => expect(item.category).toBe('Breads & Rice'));
  });

  test('filters correctly by category "Desserts"', () => {
    const desserts = filterMenu(menuItems, 'Desserts', 'All');
    expect(desserts.length).toBeGreaterThanOrEqual(4);
    desserts.forEach(item => expect(item.category).toBe('Desserts'));
  });

  test('filters correctly by category "Drinks"', () => {
    const drinks = filterMenu(menuItems, 'Drinks', 'All');
    expect(drinks.length).toBeGreaterThanOrEqual(5);
    drinks.forEach(item => expect(item.category).toBe('Drinks'));
  });

  test('filters correctly by dietary tag "Veg"', () => {
    const vegItems = filterMenu(menuItems, 'All', 'Veg');
    expect(vegItems.length).toBeGreaterThan(10);
    vegItems.forEach(item => expect(item.dietary).toContain('Veg'));
  });

  test('filters correctly by dietary tag "Non-Veg"', () => {
    const nonVegItems = filterMenu(menuItems, 'All', 'Non-Veg');
    expect(nonVegItems.length).toBeGreaterThanOrEqual(5);
    nonVegItems.forEach(item => expect(item.dietary).toContain('Non-Veg'));
  });

  test('filters correctly by dietary tag "Vegan"', () => {
    const veganItems = filterMenu(menuItems, 'All', 'Vegan');
    expect(veganItems.length).toBeGreaterThanOrEqual(4);
    veganItems.forEach(item => expect(item.dietary).toContain('Vegan'));
  });

  test('filters correctly by dietary tag "Jain"', () => {
    const jainItems = filterMenu(menuItems, 'All', 'Jain');
    expect(jainItems.length).toBeGreaterThanOrEqual(2);
    jainItems.forEach(item => expect(item.dietary).toContain('Jain'));
  });

  test('filters correctly by dietary tag "Gluten-Free"', () => {
    const gfItems = filterMenu(menuItems, 'All', 'Gluten-Free');
    expect(gfItems.length).toBeGreaterThan(10);
    gfItems.forEach(item => expect(item.dietary).toContain('Gluten-Free'));
  });

  test('cross-filters category and dietary simultaneously', () => {
    const vegMains = filterMenu(menuItems, 'Mains', 'Veg');
    expect(vegMains.length).toBeGreaterThanOrEqual(3);
    vegMains.forEach(dish => {
      expect(dish.category).toBe('Mains');
      expect(dish.dietary).toContain('Veg');
    });
  });

  test('handles null, undefined, or empty arrays gracefully', () => {
    expect(filterMenu(null)).toEqual([]);
    expect(filterMenu(undefined)).toEqual([]);
    expect(filterMenu([])).toEqual([]);
  });
});

describe('2. Cart Subtotal Arithmetic (calculateCartSubtotal)', () => {
  test('returns 0 for empty or invalid cart', () => {
    expect(calculateCartSubtotal([])).toBe(0);
    expect(calculateCartSubtotal(null)).toBe(0);
    expect(calculateCartSubtotal(undefined)).toBe(0);
  });

  test('calculates subtotal for single item with quantity 1', () => {
    const cart = [{ price: 380, quantity: 1 }]; // Butter Chicken
    expect(calculateCartSubtotal(cart)).toBe(380);
  });

  test('calculates subtotal for single item with multiple quantity', () => {
    const cart = [{ price: 60, quantity: 4 }]; // 4 Butter Naans
    expect(calculateCartSubtotal(cart)).toBe(240);
  });

  test('calculates subtotal across diverse cart items', () => {
    const cart = [
      { price: 260, quantity: 2 }, // 520 (Paneer Tikka)
      { price: 380, quantity: 1 }, // 380 (Butter Chicken)
      { price: 60, quantity: 3 },  // 180 (Butter Naan)
      { price: 140, quantity: 2 }  // 280 (Gulab Jamun)
    ];
    // 520 + 380 + 180 + 280 = 1360
    expect(calculateCartSubtotal(cart)).toBe(1360);
  });

  test('supports nested item object structure { item: { price }, quantity }', () => {
    const cart = [
      { item: { price: 310 }, quantity: 2 }, // 620
      { item: { price: 80 }, quantity: 2 }   // 160
    ];
    expect(calculateCartSubtotal(cart)).toBe(780);
  });
});

describe('3. GST (5%) & Grand Total Calculation', () => {
  test('calculates 5% GST accurately with integer rounding', () => {
    expect(calculateGST(100)).toBe(5);
    expect(calculateGST(200)).toBe(10);
    expect(calculateGST(380)).toBe(19);  // 380 * 0.05 = 19
    expect(calculateGST(1360)).toBe(68); // 1360 * 0.05 = 68
    expect(calculateGST(255)).toBe(13);  // 255 * 0.05 = 12.75 -> 13
  });

  test('returns 0 GST for zero or negative subtotal', () => {
    expect(calculateGST(0)).toBe(0);
    expect(calculateGST(-100)).toBe(0);
    expect(calculateGST(null)).toBe(0);
  });

  test('calculates Grand Total = Subtotal + GST', () => {
    const subtotal = 1000;
    const gst = calculateGST(subtotal); // 50
    expect(calculateGrandTotal(subtotal, gst)).toBe(1050);
  });

  test('handles zero or missing values in Grand Total', () => {
    expect(calculateGrandTotal(0, 0)).toBe(0);
    expect(calculateGrandTotal(500, null)).toBe(500);
  });
});

describe('4. Indian Rupee (INR) Formatting (formatINR)', () => {
  test('formats whole numbers with the Indian Rupee symbol (₹)', () => {
    const formatted = formatINR(380);
    expect(formatted).toContain('₹');
    expect(formatted).toMatch(/₹\s?380/);
  });

  test('never outputs dollar sign ($)', () => {
    const samplePrices = [0, 60, 260, 380, 1360, 10000];
    samplePrices.forEach(price => {
      const formatted = formatINR(price);
      expect(formatted).not.toContain('$');
    });
  });

  test('formats without decimal points (maximumFractionDigits: 0)', () => {
    const formatted = formatINR(460);
    expect(formatted).not.toContain('.00');
  });

  test('applies Indian numbering system commas for values >= 1000', () => {
    const formatted = formatINR(1360);
    // e.g. "₹1,360"
    expect(formatted).toMatch(/1,360/);
  });
});

describe('5. Order ID Generation (generateOrderId)', () => {
  test('generates order ID starting with DT- prefix and date string', () => {
    const orderId = generateOrderId('DT');
    expect(orderId).toMatch(/^DT-\d{8}-[A-Z0-9]{4}$/);
  });

  test('produces unique order identifiers across consecutive calls', () => {
    const id1 = generateOrderId();
    const id2 = generateOrderId();
    expect(id1).not.toBe(id2);
  });
});

describe('6. Menu Asset & Accessibility Integrity Check', () => {
  test('menu.json contains at least 20 authentic dishes', () => {
    expect(menuItems.length).toBeGreaterThanOrEqual(20);
  });

  test('every dish has a positive integer price and valid fields', () => {
    menuItems.forEach(dish => {
      expect(dish.id).toBeDefined();
      expect(typeof dish.id).toBe('number');
      expect(dish.name).toBeTruthy();
      expect(dish.price).toBeGreaterThan(0);
      expect(Number.isInteger(dish.price)).toBe(true);
      expect(dish.category).toBeTruthy();
      expect(['Starters', 'Mains', 'Breads & Rice', 'Desserts', 'Drinks']).toContain(dish.category);
      expect(Array.isArray(dish.dietary)).toBe(true);
      expect(dish.dietary.length).toBeGreaterThan(0);
    });
  });

  test('every dish has a non-empty alt text for accessibility', () => {
    menuItems.forEach(dish => {
      expect(dish.alt).toBeDefined();
      expect(typeof dish.alt).toBe('string');
      expect(dish.alt.trim().length).toBeGreaterThan(10);
    });
  });

  test('every dish has an existing WebP image file on disk in app/images/dishes/', () => {
    menuItems.forEach(dish => {
      expect(dish.image).toBeDefined();
      expect(dish.image).toMatch(/^images\/dishes\/[a-z0-9-]+\.webp$/);

      const diskPath = path.join(__dirname, '..', dish.image);
      const exists = fs.existsSync(diskPath);
      expect(exists).toBe(true);

      const stats = fs.statSync(diskPath);
      expect(stats.size).toBeGreaterThan(0);
      // Ensure under 80 KB
      expect(stats.size).toBeLessThan(80 * 1024);
    });
  });
});
