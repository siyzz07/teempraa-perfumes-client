import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "../../types";
import { useCartStore, useShopStore } from "../../store/useStore";
import { generateWhatsAppOrderUrl } from "../../utils/whatsapp";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const settings = useShopStore((s) => s.settings);
  const whatsappNumber = settings?.whatsapp || settings?.phone || "";
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [product, isOpen]);

  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl(
      [{
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.images[0]
      }],
      product.price,
      whatsappNumber
    );
    window.open(url, "_blank");
    onClose();
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIdx(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Bottom Sheet / Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 150 }}
            className="fixed inset-x-0 bottom-0 z-[101] bg-[#011a14] text-white rounded-t-[3rem] shadow-[0_-20px_80px_rgba(0,0,0,0.5)] max-h-[96vh] overflow-y-auto no-scrollbar border-t border-emerald-500/10"
          >
            {/* Handle Bar */}
            <div className="w-12 h-1 bg-emerald-500/20 rounded-full mx-auto mt-6 mb-2" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
              {/* Close Button - Sticky */}
              <div className="flex justify-end sticky top-6 z-30">
                <button
                  onClick={onClose}
                  className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-emerald-500/30 transition-all duration-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-4">
                {/* 1. Cinematic Gallery Section */}
                <div className="flex flex-col gap-8">
                  <div className="relative aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden bg-black/40 border border-emerald-500/10 group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImageIdx}
                        src={product.images[activeImageIdx]}
                        alt={product.name}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 pointer-events-none">
                        <button
                          onClick={prevImage}
                          className="w-12 h-12 bg-black/40 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all pointer-events-auto"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="w-12 h-12 bg-black/40 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all pointer-events-auto"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    )}

                    {/* Scent Type Overlay */}
                    <div className="absolute top-8 left-8">
                      <div className="px-6 py-2 bg-[#011a14]/80 backdrop-blur-xl border border-emerald-500/20 rounded-full shadow-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                          {product.scentType}
                        </span>
                      </div>
                    </div>

                    {/* Cinematic Grain Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                  </div>

                  {/* Curated Thumbnails */}
                  <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 flex-shrink-0 relative ${
                          activeImageIdx === idx 
                          ? "border-emerald-500 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                          : "border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100"
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Imperial Info Section */}
                <div className="flex flex-col py-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-8 bg-emerald-500/40" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500">The Collection</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-white leading-tight">
                      {product.name}
                    </h2>

                    <div className="flex items-center gap-8 py-6 border-y border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">Maison Price</span>
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-black text-emerald-400 tracking-tighter">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xl text-zinc-600 line-through font-bold">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="h-10 w-[1px] bg-white/5" />
                      
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">Status</span>
                        <span className={`text-sm font-black uppercase tracking-widest ${product.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
                          {product.inStock ? 'In Resonance' : 'Faded from Vault'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-12 mt-4">
                      {/* Heritage Narrative */}
                      <div className="space-y-4">
                        <p className="text-zinc-400 text-lg leading-relaxed font-light">
                          {product.description || `Experience the essence of aristocrat luxury with ${product.name}. A curated olfactive composition that defines the modern spirit of high-perfumery.`}
                        </p>
                      </div>

                      {/* Signature Accords (Notes) */}
                      {product.notes && (
                        <div className="relative p-8 rounded-[3rem] bg-gradient-to-br from-emerald-500/[0.05] to-emerald-500/[0.01] border border-emerald-500/10 overflow-hidden group">
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <ShoppingBag size={60} className="text-emerald-500" />
                          </div>
                          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-6 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Olfactive Signature
                          </h3>
                          <p className="text-white font-serif italic text-2xl md:text-3xl leading-snug tracking-tight">
                            "{product.notes}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 3. Transactional Actions */}
                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                      <button
                        onClick={handleWhatsAppOrder}
                        disabled={!product.inStock}
                        className={`flex-[2] py-6 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(16,185,129,0.2)] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-4 group ${
                          product.inStock 
                          ? "bg-emerald-500 hover:bg-emerald-400 text-[#011a14]" 
                          : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 shadow-none border border-white/5"
                        }`}
                      >
                        {product.inStock ? "Reserve on WhatsApp" : "Not Available"}
                        <MessageCircle size={20} className={product.inStock ? "group-hover:rotate-12 transition-transform" : ""} />
                      </button>

                      <button
                        onClick={() => {
                          if (!product || !product.inStock) return;
                          const id = product.id || (product as any)._id || Math.random().toString();
                          addItem({
                            id: id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            qty: 1,
                          } as any);
                          onClose();
                        }}
                        disabled={!product.inStock}
                        className={`flex-1 py-6 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.3em] backdrop-blur-xl active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-4 border ${
                          product.inStock 
                          ? "bg-white/5 hover:bg-white/10 text-white border-white/10" 
                          : "bg-transparent text-zinc-600 border-white/5 cursor-not-allowed opacity-40"
                        }`}
                      >
                        {product.inStock ? "Add to Bag" : "Sold Out"}
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                    {/* Imperial Reviews (Social Proof) */}
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="mt-16 pt-16 border-t border-white/5">
                        <div className="flex items-center gap-4 mb-12">
                          <div className="h-[1px] w-8 bg-orange-500/40" />
                          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-orange-500">Imperial Feedback</span>
                        </div>

                        <div className="space-y-6">
                          {product.reviews.map((rev, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                              className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all duration-300"
                            >
                              <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                  <div className="flex gap-1.5 p-1 rounded-full bg-black/20 border border-white/5 w-fit">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        size={14} 
                                        className={rev.rating >= star ? "text-emerald-400" : "text-white/5"} 
                                        fill={rev.rating >= star ? "currentColor" : "none"} 
                                      />
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <CheckCircle size={10} className="text-emerald-500" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Verified Patron</span>
                                  </div>
                                </div>

                                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8">
                                  "{rev.comment}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-sm">
                                    {rev.user.charAt(0)}
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                                      {rev.user}
                                    </h4>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Verified Customer</p>
                                  </div>
                                </div>
                              </div>

                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
