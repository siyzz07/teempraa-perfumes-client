import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Save, Phone, Mail, MessageSquare, Instagram as InstagramIcon, Store, Globe
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { shopApi } from '../../api/shopApi';
import toast from 'react-hot-toast';

const StoreSettings = () => {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    
    // Core Communication Data
    const [shopData, setShopData] = useState({
        shopName: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        whatsapp: '',
        instagram: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await shopApi.getSettings();
            if (data) {
                setShopData({
                    shopName: data.shopName || '',
                    description: data.description || '',
                    address: data.address || '',
                    phone: data.phone || '',
                    email: data.email || '',
                    whatsapp: data.whatsapp || '',
                    instagram: data.instagram || ''
                });
            }
        } catch (error) {
            console.error('Error fetching shop settings:', error);
        } finally {
            setInitialLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await shopApi.updateSettings(shopData);
            toast.success('Communication settings updated.');
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Failed to update settings.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <AdminLayout 
            title="Channel Settings" 
            subtitle="Manage how your customers connect with the manor."
        >
            <div className="max-w-3xl">
                <form onSubmit={handleSave} className="space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900 overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                    >
                        {/* Header Section */}
                        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h3 className="font-serif font-black text-xl text-zinc-900 dark:text-white">Communication Hub</h3>
                                    <p className="text-xs text-zinc-400 font-medium tracking-wide">Sync your WhatsApp, Instagram, and Contact channels</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Core Communication Channels */}
                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-1 font-sans">Contact Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={16} />
                                        <input 
                                            value={shopData.phone}
                                            onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full bg-emerald-50/10 dark:bg-emerald-500/5 border border-emerald-500/10 dark:border-emerald-500/20 rounded-2xl py-4 pl-12 pr-4 font-black text-sm dark:text-white outline-none focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#25D366] uppercase tracking-[0.2em] px-1 font-sans">WhatsApp Number</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-[#25D366]" size={16} />
                                        <input 
                                            value={shopData.whatsapp}
                                            onChange={(e) => setShopData({ ...shopData, whatsapp: e.target.value })}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full bg-[#25D366]/5 border border-[#25D366]/10 rounded-2xl py-4 pl-12 pr-4 font-black text-sm dark:text-white outline-none focus:border-[#25D366] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#E4405F] uppercase tracking-[0.2em] px-1 font-sans">Instagram ID</label>
                                    <div className="relative">
                                        <InstagramIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E4405F]" size={16} />
                                        <input 
                                            value={shopData.instagram}
                                            onChange={(e) => setShopData({ ...shopData, instagram: e.target.value })}
                                            placeholder="@teempraa"
                                            className="w-full bg-[#E4405F]/5 border border-[#E4405F]/10 rounded-2xl py-4 pl-12 pr-4 font-black text-sm dark:text-white outline-none focus:border-[#E4405F] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Support Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                        <input 
                                            value={shopData.email}
                                            onChange={(e) => setShopData({ ...shopData, email: e.target.value })}
                                            placeholder="concierge@manor.com"
                                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm dark:text-white outline-none focus:border-emerald-500 transition-all font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Button */}
                    <div className="flex justify-end pt-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-[2rem] font-bold text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center gap-3"
                        >
                            <Save size={18} />
                            {loading ? 'Propagating Changes...' : 'Save Communication Channels'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default StoreSettings;
