import { useCartStore } from '../store/useCartStore';
import { X, Trash2, Plus, Minus } from 'lucide-react';

const CartModal = () => {
    const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, setIsCheckoutOpen } = useCartStore();

    if (!isCartOpen) return null;

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">🛒</div>
                            <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                            <p className="text-gray-500 text-sm">Add some amazing pets or accessories!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item._id} className="flex gap-4 items-center">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                                        <p className="text-xs text-gray-400">₹{item.price.toLocaleString()} each</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 hover:text-primary transition"><Minus size={14} /></button>
                                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 hover:text-primary transition"><Plus size={14} /></button>
                                    </div>

                                    <div className="w-20 text-right font-bold text-gray-900 text-sm">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>

                                    <button onClick={() => removeFromCart(item._id)} className="p-2 text-red-400 hover:text-red-600 transition" title="Remove">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                            <span>Subtotal:</span>
                            <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                            <span>Delivery:</span>
                            <span className="font-medium text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-lg text-gray-900">Total:</span>
                            <span className="font-bold text-xl text-gray-900">₹{totalAmount.toLocaleString()}</span>
                        </div>
                        <button 
                            onClick={() => {
                                setIsCartOpen(false);
                                setIsCheckoutOpen(true);
                            }}
                            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
