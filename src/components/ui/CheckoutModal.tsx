import { useState, useEffect, useRef } from 'react';
import { X, Phone, MapPin, Navigation, Send, ArrowLeft, Loader2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

// Fix for default marker icon in Leaflet + bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom red marker for better visibility on satellite view
const deliveryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  shopPhone?: string;
}

/* ── Sub-component: click-to-place marker ──────────────────────── */
const LocationPicker = ({ position, setPosition }: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker
      position={position}
      draggable
      icon={deliveryIcon}
      eventHandlers={{
        dragend(e) {
          const marker = e.target;
          const p = marker.getLatLng();
          setPosition([p.lat, p.lng]);
        },
      }}
    />
  );
};

/* ── Sub-component: fly map to new center ──────────────────────── */
const FlyTo = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 16, { duration: 1.2 });
  }, [center, map]);
  return null;
};

/* ── Main Modal ────────────────────────────────────────────────── */
const CheckoutModal = ({ isOpen, onClose, items, total, shopPhone }: CheckoutModalProps) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.209]);
  const [locating, setLocating] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [includeLocation, setIncludeLocation] = useState(false);
  const [locationSet, setLocationSet] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; address?: string }>({});
  const [mapStyle, setMapStyle] = useState<'satellite' | 'street'>('satellite');
  const mapRef = useRef<L.Map | null>(null);

  /* Request GPS — tries high accuracy first, falls back to low accuracy */
  const requestGPS = () => {
    if (!navigator.geolocation) {
      setMapReady(true);
      return;
    }
    setLocating(true);

    const onSuccess = (pos: GeolocationPosition) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
      setLocationSet(true);
      setLocating(false);
      setMapReady(true);
    };

    const onFallback = () => {
      // Retry without high accuracy (uses network/cell tower — faster on mobile)
      navigator.geolocation.getCurrentPosition(
        onSuccess,
        () => { setLocating(false); setMapReady(true); },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
      );
    };

    // First try: high accuracy GPS
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onFallback,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  /* Handle the toggle */
  const handleToggleLocation = () => {
    const next = !includeLocation;
    setIncludeLocation(next);
    if (next && !mapReady) {
      requestGPS();
    }
  };

  /* Wrap setPosition so tapping / dragging also marks locationSet */
  const handlePositionChange = (pos: [number, number]) => {
    setPosition(pos);
    setLocationSet(true);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setLocating(true);

    const onSuccess = (pos: GeolocationPosition) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
      setLocationSet(true);
      setLocating(false);
    };

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      () => {
        // Fallback: low accuracy
        navigator.geolocation.getCurrentPosition(
          onSuccess,
          () => setLocating(false),
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    /* Build WhatsApp message */
    let msg = `🛒 *New Order*\n\n`;
    items.forEach((item) => {
      msg += `▸ ${item.name} × ${item.qty} — ₹${item.price * item.qty}\n`;
      msg += `  🖼️ ${item.image}\n`;
    });
    msg += `\n💰 *Total: ₹${total}*\n\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `📍 *Address:* ${address}\n`;
    if (includeLocation && locationSet) {
      const mapsLink = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
      msg += `🗺️ *Location:* ${mapsLink}\n`;
    }

    const whatsappNumber = (shopPhone || '').replace(/[^0-9]/g, '');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative w-full max-w-lg bg-white dark:bg-zinc-950 rounded-t-[2.5rem] md:rounded-[2.5rem] max-h-[92vh] overflow-hidden flex flex-col shadow-luxury"
        >
          {/* ── Header ───────────────────────────────────────── */}
          <div className="p-5 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-black tracking-tighter uppercase">Delivery Details</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Scrollable Body ───────────────────────────────── */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {/* Phone Field */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })); }}
                  placeholder="Enter your phone number"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border ${errors.phone ? 'border-red-400 dark:border-red-500' : 'border-zinc-200 dark:border-white/10'} bg-zinc-50 dark:bg-zinc-900/50 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">{errors.phone}</p>}
            </div>

            {/* Address Field */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                Delivery Address
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-4 text-zinc-400" />
                <textarea
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: undefined })); }}
                  placeholder="Building, street, landmark..."
                  rows={3}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border ${errors.address ? 'border-red-400 dark:border-red-500' : 'border-zinc-200 dark:border-white/10'} bg-zinc-50 dark:bg-zinc-900/50 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none dark:text-white`}
                />
              </div>
              {errors.address && <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">{errors.address}</p>}
            </div>

            {/* ── Location Toggle ──────────────────────────────── */}
            <div>
              <button
                onClick={handleToggleLocation}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  includeLocation
                    ? 'border-brand-primary/30 bg-brand-primary/5 dark:bg-brand-primary/10'
                    : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin size={18} className={includeLocation ? 'text-brand-primary' : 'text-zinc-400'} />
                  <div className="text-left">
                    <p className={`text-sm font-bold ${includeLocation ? 'text-brand-primary' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      Share my location
                    </p>
                    <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                      {includeLocation ? 'Location will be included in your order' : 'Tap to pin your delivery location on the map'}
                    </p>
                  </div>
                </div>
                {/* Toggle switch */}
                <div className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${includeLocation ? 'bg-brand-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${includeLocation ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                </div>
              </button>
            </div>

            {/* ── Map Section (shown only when toggle is ON) ──── */}
            {includeLocation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                    Pin Your Location
                  </label>
                  <button
                    onClick={handleLocateMe}
                    disabled={locating}
                    className="flex items-center gap-1.5 text-brand-primary text-xs font-bold hover:opacity-80 transition-opacity disabled:opacity-50"
                  >
                    {locating ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                    {locating ? 'Locating...' : 'Use My Location'}
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 h-[240px] md:h-[280px] relative">
                  {mapReady ? (
                    <MapContainer
                      center={position}
                      zoom={16}
                      scrollWheelZoom
                      className="h-full w-full z-0"
                      ref={mapRef}
                    >
                      {mapStyle === 'satellite' ? (
                        <TileLayer
                          attribution='&copy; Esri'
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                          maxZoom={19}
                        />
                      ) : (
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      )}
                      <LocationPicker position={position} setPosition={handlePositionChange} />
                      <FlyTo center={position} />
                    </MapContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
                      <Loader2 size={28} className="animate-spin text-brand-primary" />
                    </div>
                  )}

                  {/* Map style toggle */}
                  {mapReady && (
                    <button
                      onClick={() => setMapStyle((s) => s === 'satellite' ? 'street' : 'satellite')}
                      className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-white/10 shadow-lg text-[11px] font-bold text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 transition-all"
                    >
                      <Layers size={14} />
                      {mapStyle === 'satellite' ? 'Street' : 'Satellite'}
                    </button>
                  )}
                </div>

                <p className="text-zinc-400 text-[10px] font-medium mt-2 text-center">
                  Tap on the map or drag the marker to set your delivery location
                </p>
              </motion.div>
            )}
          </div>

          {/* ── Footer / Submit ────────────────────────────────── */}
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Order Total</span>
              <span className="text-2xl font-black tracking-tighter">₹{total}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white py-4 rounded-2xl font-black text-base shadow-xl shadow-[#25D366]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Send size={18} />
              Confirm & Send via WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
