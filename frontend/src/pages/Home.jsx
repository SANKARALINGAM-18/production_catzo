import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Truck } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <ShieldCheck size={28} className="text-primary" />,
            title: "Premium & Certified",
            desc: "All our companions and premium food items are vet-checked and certified for maximum health and joy."
        },
        {
            icon: <Heart size={28} className="text-primary" />,
            title: "Curated With Love",
            desc: "Every accessory and toy is carefully hand-picked by animal lovers to guarantee your pet's happiness."
        },
        {
            icon: <Truck size={28} className="text-primary" />,
            title: "Light-speed Delivery",
            desc: "Express doorstep delivery across the city so your little friend never has to wait for their favorite treats."
        }
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            {/* Hero Section */}
            <section className="soft-orange-bg pt-24 pb-36 px-6 relative overflow-hidden flex-grow flex items-center">
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
                        onClick={() => navigate('/shop')}
                        className="orange-gradient text-white px-12 py-5 rounded-3xl font-black shadow-orange hover:-translate-y-1 active:scale-95 transition-all duration-300 text-xl flex items-center gap-3 mx-auto"
                    >
                        Start Shopping <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            {/* Premium Features Block */}
            <section className="py-24 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Why Catzo</h3>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">The Premium Pet Experience</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feat, index) => (
                        <div key={index} className="bg-gray-50/50 p-10 rounded-[32px] border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-premium transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                                {feat.icon}
                            </div>
                            <h4 className="text-xl font-black text-gray-900 mb-3">{feat.title}</h4>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-2xl mb-4">🐱</div>
                    <h2 className="text-xl font-black text-gray-900 mb-1 tracking-tighter">Catzo</h2>
                    <p className="text-gray-400 text-xs font-medium">Premium Pet Supplies & Companions</p>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        &copy; 2026 Catzo Pet Shop. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
