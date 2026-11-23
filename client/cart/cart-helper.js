const cart = {
    itemTotal() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                return JSON.parse(localStorage.getItem("cart")).length;
            }
        }
        return 0;
    },
    addItem(item, cb) {
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            const existingItem = cart.find(
                (cartItem) => cartItem.product._id === item._id
            );
            if (existingItem) {
                existingItem.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                if (cb) cb();
                return;
            }
            cart.push({
                product: item,
                quantity: 1,
                shop: item.shop?._id || null,
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            cb();
        }
    },
    updateCart(itemIndex, quantity) {
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart[itemIndex].quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    },
    getCart() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                return JSON.parse(localStorage.getItem("cart"));
            }
        }
        return [];
    },
    removeItem(itemIndex) {
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.splice(itemIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        return cart;
    },
    emptyCart(cb) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
            cb();
        }
    },
};

export default cart;

