import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Sparkles, ArrowRight, Filter, ChevronDown } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All Products');
    const [isBackendOffline, setIsBackendOffline] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
                setProducts(res.data);
                setIsBackendOffline(false);
            } catch {
                console.warn("Backend offline, using high-quality mock data");
                setIsBackendOffline(true);
                const mockProducts = [
                    { _id: '1', name: 'Aquarium Stones - Decorative', price: 299, category: 'Accessories', image: 'https://images.unsplash.com/photo-1520302630592-fac87dcd6ee4?auto=format&fit=crop&w=800&q=80', available: true, description: 'Colorful decorative stones for fish tanks', stock: 30 },
                    { _id: '2', name: 'Automatic Pet Feeder', price: 2500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80', available: true, description: 'Programmable automatic feeder for pets', stock: 12 },
                    { _id: '3', name: 'Betta Fish', price: 250, category: 'Pets', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80', available: true, description: 'Colorful Betta fish with flowing fins, perfect for small aquariums', stock: 10 },
                    { _id: '4', name: 'Bird Cage - Medium Size', price: 2800, category: 'Accessories', image: 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&w=800&q=80', available: true, description: 'Medium-sized bird cage perfect for small birds', stock: 18 },
                    { _id: '5', name: 'Cute British Shorthair', price: 45000, category: 'Cats', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80', available: true, description: 'Graceful and friendly British Shorthair kitten', stock: 2 },
                    { _id: '6', name: 'Green Parrot', price: 12000, category: 'Birds', image: 'https://images.unsplash.com/photo-1552728089-57bdde30ebd3?auto=format&fit=crop&w=800&q=80', available: true, description: 'Vibrant and intelligent talking parrot', stock: 5 },
                    { _id: '7', name: 'Premium Puppy Food', price: 1200, category: 'Pet Food', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80', available: true, description: 'High-protein nutritional kibble for growth', stock: 50 },
                    { _id: '8', name: 'Luxury Cat Bed', price: 3500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80', available: true, description: 'Soft velvet cloud bed for your feline friend', stock: 15 }
                ];
                setProducts(mockProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = category === 'All Products' ? products : products.filter(p => p.category === category);
    const categories = ['All Products', 'Cats', 'Birds', 'Fish', 'Pet Food', 'Accessories'];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="soft-orange-bg pt-20 pb-32 px-6 relative overflow-hidden">
                {/* Decorative floating icons */}
                <div className="absolute top-20 left-[10%] text-6xl opacity-10 animate-float">🐕</div>
                <div className="absolute bottom-20 right-[15%] text-6xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🐈</div>
                <div className="absolute top-40 right-[10%] text-5xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🦜</div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                        <Sparkles size={14} /> From Treats to Toys — Catzo Delivers Joy.
                    </div>
                    
                    <div className="mb-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-premium flex items-center justify-center mb-6 animate-float">
                            <span className="text-5xl">🐱</span>
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-4">
                            Catzo
                        </h1>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-10 leading-tight">
                        Your One-Stop <span className="text-primary italic">Pet<br/>Paradise</span>
                    </h2>
                    
                    <p className="text-gray-500 max-w-2xl mx-auto mb-14 text-xl font-medium leading-relaxed">
                        Discover the finest selection of companions and supplies. We bring premium quality joy to every pet family.
                    </p>
                    
                    <button 
                        onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="orange-gradient text-white px-12 py-5 rounded-3xl font-black shadow-orange hover:-translate-y-1 active:scale-95 transition-all duration-300 text-xl flex items-center gap-3 mx-auto"
                    >
                        Start Shopping <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            {/* Offline Alert */}
            {isBackendOffline && (
                <div className="bg-orange-50 border-y border-orange-100 py-2.5 text-center">
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                        Browsing Demo Mode (Offline)
                    </p>
                </div>
            )}

            {/* Shopping Area */}
            <div id="products-grid" className="max-w-7xl mx-auto px-6 py-16">
                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-16">
                    <div className="w-full">
                        <div className="flex items-center gap-2 mb-6">
                            <Filter size={16} className="text-primary" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Categories</h3>
                        </div>
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${category === cat ? 'bg-gray-900 text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <select className="appearance-none w-full bg-gray-50 border border-gray-100 pl-6 pr-12 py-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                                <option>All Prices</option>
                                <option>Under ₹500</option>
                                <option>₹500 - ₹2000</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="h-[400px] bg-gray-50 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
                
                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                        <div className="text-6xl mb-6 opacity-20">🔍</div>
                        <h3 className="text-2xl font-black text-gray-800 mb-2">No pets found</h3>
                        <p className="text-gray-400 font-medium">Try another category or search term</p>
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <footer className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-3xl mb-4">🐱</div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Catzo</h2>
                    <p className="text-gray-400 text-sm font-medium">Premium Pet Supplies & Companions</p>
                    <div className="mt-10 pt-10 border-t border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        &copy; 2026 Catzo Pet Shop. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
