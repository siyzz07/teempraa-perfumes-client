import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Save, Camera, Store, Phone, Mail, X, 
    Image as ImageIcon, Map as MapIcon,
    User, Upload, Loader2
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AdminLayout from '../../components/admin/AdminLayout';
import { shopApi } from '../../api/shopApi';
import { uploadApi } from '../../api/uploadApi';
import { authApi } from '../../api/authApi';
import toast from 'react-hot-toast';

// Fix for default marker icon in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const StoreSettings = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'brand' | 'media' | 'geo' | 'profile'>('brand');
    
    // Shop Metadata
    const [shopData, setShopData] = useState({
        shopName: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        location: { lat: 28.6139, lng: 77.2090 }
    });

    // Images
    const [profilePic, setProfilePic] = useState('');
    const [coverPhotos, setCoverPhotos] = useState<string[]>([]);
    const [coverInput, setCoverInput] = useState('');

    useEffect(() => {
        fetchSettings();
        fetchAdminProfile();
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
                    location: data.location || { lat: 28.6139, lng: 77.2090 }
                });
                setCoverPhotos(data.coverPhotos || []);
                if (data.profilePic) setProfilePic(data.profilePic);
            }
        } catch (error) {
            console.error('Error fetching shop settings:', error);
        } finally {
            setInitialLoading(false);
        }
    };

    const fetchAdminProfile = async () => {
        try {
            const userStr = localStorage.getItem('adminUser');
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user.profilePic) setProfilePic(user.profilePic);
            }
        } catch (e) {
            console.error('Failed to parse admin user profile');
        }
    };

    const handleFileUpload = async (type: 'profile' | 'banner', e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(type);
        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const { data } = await uploadApi.uploadImage(uploadData);
            if (type === 'profile') {
                setProfilePic(data.url);
            } else {
                setCoverInput(data.url);
            }
            toast.success("Image uploaded");
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload failed');
        } finally {
            setUploading(null);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await shopApi.updateSettings({ ...shopData, coverPhotos, profilePic });
            await authApi.updateProfile({ profilePic });

            toast.success('Settings saved successfully.');
            let adminUser = {};
            try {
                adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
            } catch (e) {}
            localStorage.setItem('adminUser', JSON.stringify({ ...adminUser, profilePic }));
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Failed to save settings.');
        } finally {
            setLoading(false);
        }
    };


    const addCoverPhoto = () => {
        if (coverInput && coverPhotos.length < 4) {
            setCoverPhotos([...coverPhotos, coverInput]);
            setCoverInput('');
        }
    };

    const removeCoverPhoto = (idx: number) => {
        setCoverPhotos(coverPhotos.filter((_, i) => i !== idx));
    };

    const LocationPicker = () => {
        useMapEvents({
            click(e) {
                setShopData({ ...shopData, location: { lat: e.latlng.lat, lng: e.latlng.lng } });
            },
        });
        return (
            <Marker position={[shopData.location.lat, shopData.location.lng]} />
        );
    };

    const tabs = [
        { id: 'brand', label: 'Store', icon: Store },
        { id: 'media', label: 'Banners', icon: ImageIcon },
        { id: 'geo', label: 'Location', icon: MapIcon },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    if (initialLoading) return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <AdminLayout 
            title="Settings" 
            subtitle="Update your store information and portal preferences."
        >
            <div className="max-w-4xl">
                {/* 📱 Tab Switcher */}
                <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-xl mb-8 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Tab Content: Store Identity */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'brand' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase px-1">Store Name</label>
                                        <input 
                                            value={shopData.shopName}
                                            onChange={(e) => setShopData({ ...shopData, shopName: e.target.value })}
                                            placeholder="Your Store Name"
                                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 font-bold text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase px-1">Store Address</label>
                                        <input 
                                            value={shopData.address}
                                            onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                                            placeholder="Street, City, State"
                                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 font-bold text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase px-1">Store Description</label>
                                    <textarea 
                                        value={shopData.description}
                                        onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                                        rows={4}
                                        placeholder="Add a brief description of your store..."
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-sm dark:text-white outline-none focus:border-brand-primary transition-all resize-none"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase px-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                                            <input 
                                                value={shopData.phone}
                                                onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 font-bold text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase px-1">Support Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                                            <input 
                                                value={shopData.email}
                                                onChange={(e) => setShopData({ ...shopData, email: e.target.value })}
                                                placeholder="support@yourstore.com"
                                                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 font-bold text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'media' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <AnimatePresence mode="popLayout">
                                        {coverPhotos.map((img, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="group relative aspect-video rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800"
                                            >
                                                <img src={img} className="w-full h-full object-cover" alt="" />
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeCoverPhoto(idx)}
                                                    className="absolute top-2 right-2 w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all active:scale-90 shadow-lg"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                
                                {coverPhotos.length < 4 && (
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <input 
                                                value={coverInput}
                                                onChange={(e) => setCoverInput(e.target.value)}
                                                placeholder="Banner Image URL or upload"
                                                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 pr-12 text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                                            />
                                            <label className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-brand-primary cursor-pointer transition-colors">
                                                <input 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload('banner', e)}
                                                />
                                                {uploading === 'banner' ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                                            </label>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={addCoverPhoto}
                                            className="px-6 bg-brand-primary text-white font-bold text-xs rounded-xl hover:opacity-90 transition-all"
                                        >
                                            Add
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'geo' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
                            >
                                <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 z-0">
                                    <MapContainer 
                                        center={[shopData.location.lat, shopData.location.lng]} 
                                        zoom={13} 
                                        scrollWheelZoom={false}
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <LocationPicker />
                                    </MapContainer>
                                </div>
                                <div className="p-2 flex items-center gap-4 text-xs font-mono text-zinc-500">
                                    <span>LAT: {shopData.location.lat.toFixed(4)}</span>
                                    <span>LNG: {shopData.location.lng.toFixed(4)}</span>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center gap-6"
                            >
                                <div className="relative w-32 h-32 group">
                                    <label className="w-full h-full rounded-full border-4 border-brand-primary/20 overflow-hidden bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center cursor-pointer relative group">
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload('profile', e)}
                                        />
                                        {profilePic ? (
                                            <img src={profilePic} className="w-full h-full object-cover group-hover:opacity-50 transition-all" alt="Profile" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                <Camera size={40} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/20">
                                            {uploading === 'profile' ? <Loader2 size={32} className="text-white animate-spin" /> : <Upload size={32} className="text-white" />}
                                        </div>
                                    </label>
                                </div>
                                <div className="w-full max-w-sm space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase px-1">Profile Photo URL</label>
                                    <input 
                                        value={profilePic}
                                        onChange={(e) => setProfilePic(e.target.value)}
                                        placeholder="Image URL"
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-sm dark:text-white outline-none focus:border-brand-primary transition-all text-center"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ✅ Save Action */}
                    <div className="pt-6 pb-24">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            {loading ? 'Saving Settings...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default StoreSettings;
