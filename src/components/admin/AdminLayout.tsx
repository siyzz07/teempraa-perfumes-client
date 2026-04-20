import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Plus, LogOut, 
    Settings, ShieldCheck, ChevronRight, Menu, X, Home, Grid
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useShopStore } from '../../store/useStore';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const getAdminUser = () => {
        try {
            const user = localStorage.getItem('adminUser');
            return user ? JSON.parse(user) : {};
        } catch (e) {
            return {};
        }
    };

    const adminUser = getAdminUser();
    const shopName = useShopStore((s) => s.settings?.shopName || 'Store');

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Plus, label: 'Add Product', path: '/admin/add-product' },
        { icon: Grid, label: 'Scent Types', path: '/admin/categories' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex transition-colors duration-300 font-sans">
            {/* 🖥️ Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-col p-6 fixed h-full z-40">
                <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                        <ShieldCheck className="text-white" size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight dark:text-white">{shopName} Admin</span>
                </div>

                <nav className="space-y-1 flex-grow">
                    {navItems.map((item, i) => {
                        const active = location.pathname === item.path;
                        return (
                            <button 
                                key={i} 
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${active ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3 px-2 mb-6">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                             <img src={adminUser.profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} className="w-full h-full object-cover" alt="Admin" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate dark:text-white">{adminUser.name || 'Admin'}</p>
                            <p className="text-xs text-zinc-400 truncate mt-0.5">{adminUser.email}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ThemeToggle />
                        <button onClick={() => setShowLogoutConfirm(true)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all">
                            <LogOut size={14} /> Log Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* 📱 Mobile Top Bar */}
            <header className="lg:hidden fixed top-0 w-full z-50 px-4 py-3 flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                        <ShieldCheck className="text-white" size={16} />
                    </div>
                    <span className="font-bold text-lg dark:text-white">{shopName} Admin</span>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    >
                        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </header>

            {/* 📱 Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 w-full z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex justify-around items-center safe-area-bottom">
                {navItems.map((item, i) => {
                    const active = location.pathname === item.path;
                    return (
                        <button 
                            key={i} 
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${active ? 'text-brand-primary' : 'text-zinc-400'}`}
                        >
                            <item.icon size={20} strokeWidth={active ? 2.5 : 2} />
                            <span className="text-[10px] font-bold">{item.label}</span>
                        </button>
                    );
                })}
                <button 
                    onClick={() => navigate('/')}
                    className="flex flex-col items-center gap-1 p-2 text-zinc-400"
                >
                    <Home size={20} />
                    <span className="text-[10px] font-bold">Exit</span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-20 px-6 pb-24 flex flex-col"
                    >
                        <div className="flex-grow space-y-4">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 px-4">Menu</p>
                            {navItems.map((item, i) => {
                                const active = location.pathname === item.path;
                                return (
                                    <button 
                                        key={i} 
                                        onClick={() => navigate(item.path)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${active ? 'bg-brand-primary text-white shadow-lg' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={20} />
                                            <span>{item.label}</span>
                                        </div>
                                        <ChevronRight size={18} />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-4 px-4 mb-6">
                                <div className="w-12 h-12 rounded-full border-2 border-brand-primary p-0.5">
                                    <img src={adminUser.profilePic} className="w-full h-full object-cover rounded-full" alt="" />
                                </div>
                                <div>
                                    <p className="font-bold dark:text-white">{adminUser.name || 'Admin'}</p>
                                    <p className="text-xs text-zinc-400">{adminUser.email}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowLogoutConfirm(true)} className="w-full py-4 rounded-2xl font-bold text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 active:scale-95 transition-all">
                                <LogOut size={18} className="inline mr-2" /> Log Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 🧩 Main Content Viewport */}
            <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-10 pt-20 lg:pt-10 pb-24 lg:pb-10 max-w-7xl mx-auto w-full">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        {title}
                    </h1>
                    {subtitle && <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>}
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
            {/* 🚪 Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLogoutConfirm(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <LogOut size={100} />
                            </div>

                            <div className="relative z-10 space-y-8 text-center">
                                <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 mx-auto">
                                    <ShieldCheck size={32} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold dark:text-white">Exit Gateway?</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        You are about to end your administrative session. Are you certain?
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full py-4 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm shadow-xl active:scale-95 transition-all"
                                    >
                                        Yes, Log Out
                                    </button>
                                    <button 
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="w-full py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold text-sm active:scale-95 transition-all"
                                    >
                                        Stay Signed In
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;
