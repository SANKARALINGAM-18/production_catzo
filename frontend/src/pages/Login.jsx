import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, { email, password });
            setUser(res.data);
            toast.success('Logged in successfully');
            if (res.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            // If backend is not available, mock a successful login for demonstration
            if (error.code === 'ERR_NETWORK') {
                 const mockUser = { _id: 'mock123', name: 'Demo User', email, role: email === 'admin@catzo.com' ? 'admin' : 'customer', token: 'mockToken123' };
                 setUser(mockUser);
                 toast.success('Mock Login Successful (Backend Offline)');
                 navigate(mockUser.role === 'admin' ? '/admin' : '/');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        required 
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input 
                        type="password" 
                        required 
                        autoComplete="current-password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition disabled:bg-primary/50"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center text-gray-600">
                <p>Or continue with</p>
                <div className="flex gap-4 mt-4">
                    <button className="flex-1 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">Google</button>
                    <button className="flex-1 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">Phone</button>
                </div>
            </div>

            <p className="mt-8 text-center text-gray-600">
                Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
