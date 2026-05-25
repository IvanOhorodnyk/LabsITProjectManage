const Cart = require('../src/cart');

describe('Cart Business Logic Tests', () => {
    let cart;

    beforeEach(() => {
        cart = new Cart();
    });

    test('Test 1: should add a valid item to the cart', () => {
        const item = { id: 1, name: 'Laptop', price: 1000 };
        cart.addItem(item);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].name).toBe('Laptop');
    });

    test('Test 2: should throw an error when adding an invalid item', () => {
        const item = { name: 'Free Gift' }; // missing id and price
        expect(() => cart.addItem(item)).toThrow('Invalid item');
    });

    test('Test 3: should increase quantity when adding an existing item', () => {
        const item = { id: 1, name: 'Laptop', price: 1000 };
        cart.addItem(item, 1);
        cart.addItem(item, 2);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].quantity).toBe(3);
    });

    test('Test 4: should correctly calculate the total price', () => {
        cart.addItem({ id: 1, name: 'Laptop', price: 1000 }, 1);
        cart.addItem({ id: 2, name: 'Mouse', price: 50 }, 2);
        expect(cart.getTotalPrice()).toBe(1100);
    });

    test('Test 5: should remove an item from the cart', () => {
        cart.addItem({ id: 1, name: 'Laptop', price: 1000 });
        cart.addItem({ id: 2, name: 'Mouse', price: 50 });
        cart.removeItem(1);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].id).toBe(2);
    });

    test('Test 6: should clear the cart completely', () => {
        cart.addItem({ id: 1, name: 'Laptop', price: 1000 });
        cart.clear();
        expect(cart.items.length).toBe(0);
        expect(cart.getTotalPrice()).toBe(0);
    });

    test('Test 7: should calculate final price with mock discount service', () => {
        cart.addItem({ id: 1, name: 'Laptop', price: 1000 });
        
        // Mock-об'єкт для ізоляції логіки знижок
        const mockDiscountService = {
            getDiscount: jest.fn().mockReturnValue(100)
        };

        const finalPrice = cart.applyDiscount(mockDiscountService);
        
        expect(mockDiscountService.getDiscount).toHaveBeenCalledWith(1000);
        expect(finalPrice).toBe(900);
    });
});
