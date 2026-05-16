import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessModal = () => {
    const { isSuccessOpen, setIsSuccessOpen, orderId } = useCartStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    if (!isSuccessOpen) return null;

    const handleClose = () => {
        setIsSuccessOpen(false);
        navigate('/');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-gray-100 flex justify-end">
                    <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 flex flex-col items-center text-center overflow-y-auto custom-scrollbar">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <Send size={40} className="transform -rotate-45 ml-2 mt-2" />
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed Successfully! 🎉</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you {user?.name || 'Guest'}! Your order #{orderId} has been confirmed.
                    </p>

                    <div className="w-full bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Order Summary:</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Order ID:</span>
                                <span className="font-medium text-gray-900">{orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Payment:</span>
                                <span className="font-medium text-gray-900">Processing</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-8 space-y-2">
                        <p>📧 Order confirmation email sent to: <span className="font-bold text-gray-700">{user?.email || 'your email'}</span></p>
                        <p>💬 WhatsApp confirmation opened for updates</p>
                    </div>

                    <button 
                        onClick={handleClose}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 w-full md:w-auto"
                    >
                        Place Another Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
