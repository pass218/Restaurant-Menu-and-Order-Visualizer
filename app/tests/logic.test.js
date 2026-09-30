const {
  filterMenu,
  calculateCartTotal,
  calculateTotalQuantity,
  generateOrderId
} = require('../logic');

const sampleMenu = [
  {
    id: 1,
    name: "Truffle Mushroom Arancini",
    category: "Starters",
    price: 9.50,
    dietary: ["Vegetarian"]
  },
  {
    id: 2,
    name: "Avocado & Tomato Bruschetta",
    category: "Starters",
    price: 8.00,
    dietary: ["Vegan", "Vegetarian"]
  },
  {
    id: 3,
    name: "Gluten-Free Garlic Prawns",
    category: "Starters",
    price: 12.50,
    dietary: ["Gluten-Free", "Non-Veg"]
  },
  {
    id: 7,
    name: "Green Garden Thai Curry",
    category: "Mains",
    price: 15.00,
    dietary: ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    id: 9,
    name: "Prime Angus Truffle Burger",
    category: "Mains",
    price: 18.50,
    dietary: ["Non-Veg"]
  },
  {
    id: 15,
    name: "Artisan Alphonso Mango Gelato",
    category: "Desserts",
    price: 6.50,
    dietary: ["Vegan", "Vegetarian", "Gluten-Free"]
  },
  {
    id: 18,
    name: "Cold Brew Nitro Espresso",
    category: "Drinks",
    price: 5.00,
    dietary: ["Vegan", "Vegetarian", "Gluten-Free"]
  }
];

describe('Restaurant Menu Filter Logic (filterMenu)', () => {
  test('returns all items when category is "All" and dietary tag is "All"', () => {
    const result = filterMenu(sampleMenu, 'All', 'All');
    expect(result).toHaveLength(sampleMenu.length);
  });

  test('correctly filters by category "Starters"', () => {
    const result = filterMenu(sampleMenu, 'Starters', 'All');
    expect(result).toHaveLength(3);
    result.forEach(item => expect(item.category).toBe('Starters'));
  });

  test('correctly filters by category "Mains"', () => {
    const result = filterMenu(sampleMenu, 'Mains', 'All');
    expect(result).toHaveLength(2);
    result.forEach(item => expect(item.category).toBe('Mains'));
  });

  test('correctly filters by dietary tag "Vegan"', () => {
    const result = filterMenu(sampleMenu, 'All', 'Vegan');
    expect(result).toHaveLength(4);
    result.forEach(item => expect(item.dietary).toContain('Vegan'));
  });

  test('correctly filters by dietary tag "Vegetarian"', () => {
    const result = filterMenu(sampleMenu, 'All', 'Vegetarian');
    expect(result).toHaveLength(5);
    result.forEach(item => expect(item.dietary).toContain('Vegetarian'));
  });

  test('correctly filters by dietary tag "Gluten-Free"', () => {
    const result = filterMenu(sampleMenu, 'All', 'Gluten-Free');
    expect(result).toHaveLength(4);
    result.forEach(item => expect(item.dietary).toContain('Gluten-Free'));
  });

  test('correctly filters by dietary tag "Non-Veg"', () => {
    const result = filterMenu(sampleMenu, 'All', 'Non-Veg');
    expect(result).toHaveLength(2);
    result.forEach(item => expect(item.dietary).toContain('Non-Veg'));
  });

  test('combines both category and dietary tag correctly', () => {
    const result = filterMenu(sampleMenu, 'Starters', 'Non-Veg');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gluten-Free Garlic Prawns');
  });

  test('returns empty array when no dishes match both criteria', () => {
    const result = filterMenu(sampleMenu, 'Drinks', 'Non-Veg');
    expect(result).toHaveLength(0);
  });

  test('handles invalid or empty inputs gracefully', () => {
    expect(filterMenu(null)).toEqual([]);
    expect(filterMenu(undefined)).toEqual([]);
    expect(filterMenu([])).toEqual([]);
  });
});

describe('Cart Total Calculation Logic (calculateCartTotal)', () => {
  test('returns 0.00 for an empty cart', () => {
    expect(calculateCartTotal([])).toBe(0.00);
    expect(calculateCartTotal(null)).toBe(0.00);
  });

  test('calculates total for a single item with quantity 1', () => {
    const cart = [{ price: 9.50, quantity: 1 }];
    expect(calculateCartTotal(cart)).toBe(9.50);
  });

  test('calculates total for a single item with quantity > 1', () => {
    const cart = [{ price: 9.50, quantity: 3 }];
    expect(calculateCartTotal(cart)).toBe(28.50);
  });

  test('calculates total for multiple items with various quantities', () => {
    const cart = [
      { price: 9.50, quantity: 2 },  // 19.00
      { price: 14.50, quantity: 1 }, // 14.50
      { price: 6.50, quantity: 3 }   // 19.50
    ];
    // 19.00 + 14.50 + 19.50 = 53.00
    expect(calculateCartTotal(cart)).toBe(53.00);
  });

  test('handles floating point precision properly', () => {
    const cart = [
      { price: 0.10, quantity: 1 },
      { price: 0.20, quantity: 1 }
    ];
    // 0.1 + 0.2 in JS float math equals 0.30000000000000004
    expect(calculateCartTotal(cart)).toBe(0.30);
  });

  test('supports nested item object structure { item: { price }, quantity }', () => {
    const cart = [
      { item: { price: 8.00 }, quantity: 2 },
      { item: { price: 12.50 }, quantity: 1 }
    ];
    expect(calculateCartTotal(cart)).toBe(28.50);
  });
});

describe('Cart Quantity Calculation (calculateTotalQuantity)', () => {
  test('returns 0 for empty cart', () => {
    expect(calculateTotalQuantity([])).toBe(0);
    expect(calculateTotalQuantity(null)).toBe(0);
  });

  test('sums quantities correctly across cart items', () => {
    const cart = [
      { quantity: 2 },
      { quantity: 4 },
      { quantity: 1 }
    ];
    expect(calculateTotalQuantity(cart)).toBe(7);
  });
});

describe('Order ID Generation (generateOrderId)', () => {
  test('generates valid order ID with default prefix', () => {
    const orderId = generateOrderId();
    expect(orderId).toMatch(/^ORD-[A-Z0-9]{6}$/);
  });

  test('generates unique IDs across calls', () => {
    const id1 = generateOrderId();
    const id2 = generateOrderId();
    expect(id1).not.toBe(id2);
  });
});
