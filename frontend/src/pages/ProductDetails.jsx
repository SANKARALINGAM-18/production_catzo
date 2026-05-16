import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Attempt to fetch from backend
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`).catch(() => null);
                if (res && res.data) {
                    setProduct(res.data);
                } else {
                    // Mock data fallback
                    const mockProducts = [
                        { _id: '1', name: 'Golden Retriever Puppy', price: 800, category: 'Pets', image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=800&q=80', available: true, description: 'A beautiful, friendly, and energetic Golden Retriever puppy ready for a loving home. Vaccinated and vet-checked.', stock: 3 },
                        { _id: '2', name: 'Cat Tree Tower', price: 120, category: 'Accessories', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80', available: true, description: 'Multi-level cat tree tower with scratching posts, hammocks, and cozy hideouts. Perfect for active cats.', stock: 10 },
                        { _id: '3', name: 'Persian Kitten', price: 600, category: 'Pets', image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80', available: true, description: 'Gorgeous purebred Persian kitten. Very affectionate and loves to cuddle. Comes with papers.', stock: 1 },
                        { _id: '4', name: 'Premium Dog Food', price: 45, category: 'Accessories', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80', available: true, description: 'Nutritionally balanced, grain-free dog food made with real salmon and sweet potatoes.', stock: 50 }
                    ];
                    setProduct(mockProducts.find(p => p._id === id) || null);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading details...</div>;
    if (!product) return <div className="text-center py-20">Product not found!</div>;

    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Added to cart!');
    };

    return (
        <div className="max-w-5xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-6 transition">
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 bg-gray-50 aspect-square md:aspect-auto">
                    <img 
                        src={product.image || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-sm text-primary font-bold tracking-wider uppercase mb-2">{product.category}</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <div className="text-3xl font-bold text-gray-900 mb-6">${product.price}</div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>
                    
                    <div className="mb-8">
                        {product.available ? (
                            <div className="flex items-center text-green-600 font-medium bg-green-50 w-fit px-3 py-1 rounded-full">
                                <Check size={18} className="mr-2" /> In Stock {product.stock ? `(${product.stock} available)` : ''}
                            </div>
                        ) : (
                            <div className="flex items-center text-red-600 font-medium bg-red-50 w-fit px-3 py-1 rounded-full">
                                <AlertCircle size={18} className="mr-2" /> Out of Stock
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={handleAddToCart}
                        disabled={!product.available}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition ${product.available ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-orange-500/30' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
