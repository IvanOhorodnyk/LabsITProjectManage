// Спрощена бізнес-логіка кошика для MVP
class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item, quantity = 1) {
        if (!item || !item.id || !item.price) {
            throw new Error("Invalid item");
        }
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...item, quantity });
        }
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clear() {
        this.items = [];
    }
    
    // Метод, який використовує "зовнішню" функцію знижки (для демонстрації mock)
    applyDiscount(discountService) {
        const discount = discountService.getDiscount(this.getTotalPrice());
        return this.getTotalPrice() - discount;
    }
}

module.exports = Cart;
