import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCartStore, useCartUIStore, useShopStore } from '../../store/useStore';
import { generateWhatsAppOrderUrl } from '../../utils/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';

const CartModal = () => {
  const { items, removeItem, updateQty, getTotal, clearCart } = useCartStore();
  const { isOpen, toggleCart } = useCartUIStore();
  const settings = useShopStore((s) => s.settings);
  const whatsappNumber = settings?.whatsapp || settings?.phone || "";

  const handleOrderClick = () => {
    if (items.length === 0) return;
    const url = generateWhatsAppOrderUrl(items, getTotal(), whatsappNumber);
    window.open(url, '_blank');
    toggleCart(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center md:items-center p-0 md:p-6">
          {/* Enhanced Glass Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          {/* Premium Luxury Modal */}
          <motion.div 
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 md:rounded-[3rem] rounded-t-[3rem] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          >
            {/* Design Element: Decorative Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

            {/* Header: Imperial Style */}
            <div className="px-8 py-10 flex border-b border-white/5 items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <ShoppingCart className="text-emerald-500" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white line-height-tight">Your Selection</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Imperial Collection
                  </p>
                </div>
              </div>
              <button 
                onClick={() => toggleCart(false)} 
                className="group p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <X size={20} className="text-zinc-400 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Scrollable Scent List */}
            <div className="flex-grow overflow-y-auto px-8 py-6 max-h-[50vh] no-scrollbar">
              {items.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center space-y-4 opacity-30">
                   <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5">
                     <ShoppingBag size={32} strokeWidth={1.5} className="text-emerald-500" />
                   </div>
                   <p className="font-medium text-lg text-zinc-400 text-center">Your bag is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex gap-5 p-3 bg-white/5 hover:bg-white/[0.08] rounded-2xl border border-white/5 transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                        <img 
                          src={item.image} 
                          className="w-full h-full object-cover transition-transform duration-500" 
                          alt={item.name} 
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow flex flex-col justify-between py-0.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-white line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/50">
                              Premium Fragrance
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className="text-zinc-600 hover:text-red-400 p-1.5 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl p-1 px-2.5">
                            <button 
                              onClick={() => updateQty(item.id, item.qty - 1)} 
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold text-white w-4 text-center">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.id, item.qty + 1)} 
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="text-right">
                             <p className="text-xl font-bold text-emerald-500">
                               ₹{item.price.toLocaleString()}
                             </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary & Actions */}
            <div className="p-8 pt-4 bg-zinc-900/50 border-t border-white/5">
              <div className="flex justify-between items-end mb-6 px-2">
                <div className="space-y-0.5">
                   <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Subtotal</p>
                   <p className="text-zinc-600 text-[10px]">Including taxes</p>
                </div>
                <p className="text-4xl font-bold text-white tracking-tight">
                  ₹{getTotal().toLocaleString()}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 px-1">
                <motion.button 
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  onClick={clearCart} 
                  className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl border border-white/10 text-zinc-500 hover:text-red-400 transition-all text-[11px] font-bold uppercase tracking-wider"
                >
                  <Trash2 size={16} />
                  Clear Bag
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleOrderClick}
                  disabled={items.length === 0}
                  className="flex-1 relative overflow-hidden bg-emerald-500 text-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg active:shadow-none transition-all disabled:opacity-50"
                >
                  <span className="relative z-10 font-bold uppercase text-[12px] tracking-wider flex items-center gap-2">
                    Order via WhatsApp
                    <ArrowRight size={18} />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
