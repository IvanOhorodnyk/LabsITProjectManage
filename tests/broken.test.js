const Cart = require('../src/cart');

describe('Broken Test Suite (Step 5)', () => {
    test('Обов\'язково падаючий тест: навмисний баг', () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'Phone', price: 500 });
        
        // НАВМИСНИЙ БАГ: Очікуємо 2 товари, хоча додали лише 1
        expect(cart.items.length).toBe(2);
    });
});
