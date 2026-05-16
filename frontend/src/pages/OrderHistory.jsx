import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { Package } from 'lucide-react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get('http://localhost:5000/api/orders/user', config);
                setOrders(res.data);
            } catch (error) {
                console.error(error);
                // Mock data for demo if backend is offline
                if (error.code === 'ERR_NETWORK') {
                    setOrders([
                        {
                            _id: 'ord12345',
                            createdAt: new Date().toISOString(),
                            status: 'Shipped',
                            totalAmount: 140,
                            paymentMethod: 'UPI',
                            products: [
                                { product: { name: 'Cat Tree Tower', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80', price: 120 }, quantity: 1 }
                            ]
                        }
                    ]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) return <div className="text-center py-20 text-xl">Please login to view your orders.</div>;
    if (loading) return <div className="text-center py-20">Loading orders...</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-purple-100 text-purple-800';
            case 'Out for Delivery': return 'bg-orange-100 text-orange-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Package className="text-primary" /> My Orders
            </h1>
            
            {orders.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID</p>
                                    <p className="font-mono font-medium">{order._id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {order.products.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <img 
                                            src={item.product?.image || 'https://via.placeholder.com/150'} 
                                            alt={item.product?.name || 'Product'} 
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity} x ${item.product?.price || 0}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
