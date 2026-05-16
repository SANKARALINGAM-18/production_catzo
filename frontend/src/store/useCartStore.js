import { create } from 'zustand';

export const useCartStore = create((set) => ({
    cart: JSON.parse(localStorage.getItem('catzo_cart')) || [],
    isCartOpen: false,
    isCheckoutOpen: false,
    isSuccessOpen: false,
    orderId: null,
    
    setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
    setIsCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
    setIsSuccessOpen: (isOpen, orderId = null) => set({ isSuccessOpen: isOpen, orderId }),
    
    addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item._id === product._id);
        let newCart;
        if (existing) {
            newCart = state.cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
            newCart = [...state.cart, { ...product, quantity: 1 }];
        }
        localStorage.setItem('catzo_cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),
    removeFromCart: (productId) => set((state) => {
        const newCart = state.cart.filter(item => item._id !== productId);
        localStorage.setItem('catzo_cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),
    updateQuantity: (productId, quantity) => set((state) => {
        const newCart = state.cart.map(item => item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item);
        localStorage.setItem('catzo_cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),
    clearCart: () => {
        localStorage.removeItem('catzo_cart');
        set({ cart: [] });
    }
}));
