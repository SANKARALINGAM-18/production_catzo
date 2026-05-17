import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cart, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);
    const [upiPaid, setUpiPaid] = useState(false);

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    if (!user) {
        toast.error('Please login to checkout');
        navigate('/login');
        return null;
    }

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleOrderPlacement = async () => {
        if (!address) {
            toast.error('Please enter delivery address');
            return;
        }

        if (paymentMethod === 'UPI' && !upiPaid) {
            toast.error('Please confirm UPI payment first');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                products: cart.map(item => ({ product: item._id, quantity: item.quantity, price: item.price })),
                totalAmount,
                paymentMethod,
                address
            };
            
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`, orderData, config);
            
            toast.success('Order placed successfully!');
            clearCart();
            navigate('/orders');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
            if (error.code === 'ERR_NETWORK') {
                toast.success('Mock Order Placed (Backend Offline)');
                clearCart();
                navigate('/orders');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
                        <textarea 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none"
                            rows="4"
                            placeholder="Enter your full address..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        <div className="space-y-3">
                            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'COD' ? 'border-primary bg-orange-50' : 'border-gray-200'}`}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="COD" 
                                    checked={paymentMethod === 'COD'} 
                                    onChange={() => setPaymentMethod('COD')} 
                                    className="text-primary focus:ring-primary w-5 h-5"
                                />
                                <span className="ml-3 font-medium">Cash on Delivery (COD)</span>
                            </label>
                            
                            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'UPI' ? 'border-primary bg-orange-50' : 'border-gray-200'}`}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="UPI" 
                                    checked={paymentMethod === 'UPI'} 
                                    onChange={() => setPaymentMethod('UPI')}
                                    className="text-primary focus:ring-primary w-5 h-5" 
                                />
                                <span className="ml-3 font-medium">UPI Payment</span>
                            </label>
                        </div>
                        
                        {paymentMethod === 'UPI' && (
                            <div className="mt-6 p-6 border border-dashed border-gray-300 rounded-xl text-center bg-gray-50">
                                <h3 className="font-bold mb-2">Scan to Pay</h3>
                                <div className="w-48 h-48 mx-auto bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="UPI QR" className="w-40 h-40" />
                                </div>
                                <p className="text-xl font-bold text-gray-900 mb-4">Amount: ${totalAmount.toFixed(2)}</p>
                                <button 
                                    onClick={() => setUpiPaid(true)}
                                    disabled={upiPaid}
                                    className={`px-6 py-2 rounded-lg font-bold transition ${upiPaid ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-hover'}`}
                                >
                                    {upiPaid ? 'Payment Confirmed ✓' : 'I Have Paid'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between items-center pb-4 border-b border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                        <div>
                                            <div className="font-medium text-sm line-clamp-1">{item.name}</div>
                                            <div className="text-gray-500 text-xs">Qty: {item.quantity}</div>
                                        </div>
                                    </div>
                                    <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-xl mb-6">
                            <span>Total</span>
                            <span className="text-primary">${totalAmount.toFixed(2)}</span>
                        </div>

                        <button 
                            onClick={handleOrderPlacement}
                            disabled={loading}
                            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition disabled:bg-gray-400"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
