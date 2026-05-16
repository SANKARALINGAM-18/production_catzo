import { useCartStore } from '../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCartStore();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-6">🛒</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any pets or accessories yet.</p>
                <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition shadow-lg shadow-orange-500/30">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 space-y-4">
                    {cart.map((item) => (
                        <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                            
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                <div className="text-primary font-bold">${item.price}</div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <button 
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    className="p-1 text-gray-500 hover:text-primary transition"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="font-medium w-6 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    className="p-1 text-gray-500 hover:text-primary transition"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            
                            <div className="font-bold text-lg w-20 text-right">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            
                            <button 
                                onClick={() => removeFromCart(item._id)}
                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Remove item"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6 text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-xl text-gray-900">
                                <span>Total</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-hover transition flex justify-center items-center gap-2 shadow-lg shadow-orange-500/30"
                        >
                            Proceed to Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
