import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';
import { Plus, ArrowUpRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCartStore();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        toast.success(`Added ${product.name} to cart!`, {
            style: {
                borderRadius: '16px',
                background: '#333',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600'
            },
        });
    };

    return (
        <div className="group bg-white rounded-[32px] border border-gray-100 p-3 shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden rounded-[24px] bg-gray-50">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-gray-900 shadow-sm uppercase tracking-wider">
                        {product.category}
                    </span>
                    {product.stock < 5 && product.available && (
                        <span className="bg-orange-500 px-3 py-1 rounded-full text-[9px] font-black text-white shadow-sm uppercase tracking-wider animate-pulse">
                            Low Stock
                        </span>
                    )}
                </div>

                {!product.available && (
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
                        <span className="bg-white px-4 py-2 rounded-2xl text-[11px] font-black text-gray-900 shadow-xl uppercase tracking-widest">
                            Out of Stock
                        </span>
                    </div>
                )}
                
                {/* Hover Action Button */}
                <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center text-primary shadow-xl">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="px-3 pt-5 pb-2 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                </h3>
                
                <p className="text-xs text-gray-400 font-medium line-clamp-2 mb-6 flex-1 leading-relaxed">
                    {product.description}
                </p>
                
                <div className="flex items-end justify-between gap-4 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Price</span>
                        <span className="font-black text-2xl text-gray-900 tracking-tighter">
                            ₹{product.price.toLocaleString()}
                        </span>
                    </div>
                    
                    <button 
                        onClick={handleAddToCart}
                        disabled={!product.available}
                        className={`w-12 h-12 rounded-2xl transition-all duration-300 flex items-center justify-center ${product.available ? 'bg-primary text-white hover:bg-gray-900 hover:scale-105 shadow-orange group-hover:shadow-xl' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                    >
                        <Plus size={24} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
