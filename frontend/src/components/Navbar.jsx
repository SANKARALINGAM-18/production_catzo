import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart, User, LogOut, Search, Phone, Mail, Menu, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ onOpenCart }) => {
    const { user, logout } = useAuthStore();
    const { cart } = useCartStore();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Top Contact Bar */}
            <div className="bg-white border-b border-gray-50 py-1.5 hidden md:block">
                <div className="max-w-7xl mx-auto px-6 flex justify-end gap-6">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                        <Phone size={12} /> 8637498818
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                        <Mail size={12} /> catzowithao@gmail.com
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                            <span className="text-2xl">🐱</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-primary transition-colors">
                            Catzo
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6 ml-2">
                        <Link to="/shop" className="text-sm font-bold text-gray-500 hover:text-primary transition-all">
                            Shop
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative hidden lg:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search for pets, food, accessories..." 
                            className="w-full bg-gray-50/50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5">
                        <button 
                            onClick={onOpenCart}
                            className="p-2.5 text-gray-600 hover:text-primary transition-all rounded-2xl hover:bg-primary/5 relative"
                        >
                            <ShoppingCart size={22} strokeWidth={2.5} />
                            {cartCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="h-6 w-px bg-gray-100 mx-1 hidden sm:block"></div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="p-2.5 text-gray-400 hover:text-primary transition-all rounded-2xl hover:bg-primary/5" title="Admin Dashboard">
                                        <LayoutDashboard size={20} />
                                    </Link>
                                )}
                                <Link to="/orders" className="flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-2xl hover:bg-gray-50 transition-all group">
                                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                        <User size={20} />
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">Welcome back</p>
                                        <p className="text-sm font-bold text-gray-800 leading-none">{user.name.split(' ')[0]}</p>
                                    </div>
                                </Link>
                                <button onClick={handleLogout} className="p-2.5 text-gray-400 hover:text-red-500 transition-all rounded-2xl hover:bg-red-50">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-3 px-6 py-2.5 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-orange active:scale-95">
                                Login
                            </Link>
                        )}
                        
                        <button className="lg:hidden p-2 text-gray-600">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
