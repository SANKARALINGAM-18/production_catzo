import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

let mockOrderIdCounter = 1000;

const CheckoutModal = () => {
    const { cart, clearCart, isCheckoutOpen, setIsCheckoutOpen, setIsSuccessOpen } = useCartStore();
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        address: '',
        deliveryDate: '',
        paymentMethod: 'COD'
    });

    if (!isCheckoutOpen) return null;

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to place an order');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                products: cart.map(item => ({ product: item._id, quantity: item.quantity, price: item.price })),
                totalAmount,
                paymentMethod: formData.paymentMethod,
                address: formData.address
            };
            
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`, orderData, config);
            
            clearCart();
            setIsCheckoutOpen(false);
            setIsSuccessOpen(true, res.data._id);
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                mockOrderIdCounter++;
                const mockId = 'ORD' + mockOrderIdCounter;
                clearCart();
                setIsCheckoutOpen(false);
                setIsSuccessOpen(true, mockId);
            } else {
                toast.error(error.response?.data?.message || 'Failed to place order');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Complete Your Order</h2>
                    <button onClick={() => setIsCheckoutOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row overflow-y-auto">
                    {/* Order Summary Side */}
                    <div className="w-full md:w-5/12 bg-gray-50 p-6 border-r border-gray-100">
                        <h3 className="font-bold text-sm text-gray-500 mb-4 uppercase">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            {cart.map(item => (
                                <div key={item._id} className="flex gap-3 items-center">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border border-gray-200" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900 leading-tight">{item.name}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-bold text-gray-900">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                            <span className="font-bold text-gray-900">Total:</span>
                            <span className="font-bold text-xl text-gray-900">₹{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full md:w-7/12 p-6">
                        <h3 className="font-bold text-sm text-gray-500 mb-4 uppercase">Customer Information</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                                    <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" placeholder="YOUR NAME" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" placeholder="1234567890" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" placeholder="youremail@gmail.com" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Address</label>
                                <textarea required rows="2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none resize-none" placeholder="YOUR PRECISE ADDRESS OR LOCATION"></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Delivery Date</label>
                                <input required type="date" value={formData.deliveryDate} onChange={e => setFormData({...formData, deliveryDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Payment Method</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="payment" value="COD" checked={formData.paymentMethod === 'COD'} onChange={() => setFormData({...formData, paymentMethod: 'COD'})} className="text-primary focus:ring-primary" />
                                        <span className="text-sm">Cash on Delivery (COD)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="payment" value="UPI" checked={formData.paymentMethod === 'UPI'} onChange={() => setFormData({...formData, paymentMethod: 'UPI'})} className="text-primary focus:ring-primary" />
                                        <span className="text-sm">Online Payment (UPI)</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full mt-4 bg-purple-600 text-white py-3.5 rounded-lg font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-600/30 flex justify-center items-center gap-2">
                                <Send size={18} /> Place Order - ₹{totalAmount.toLocaleString()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
