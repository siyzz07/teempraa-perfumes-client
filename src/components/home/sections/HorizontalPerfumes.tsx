import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types';
import ProductCard from '../../ui/ProductCard';

interface HorizontalPerfumesProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const HorizontalPerfumes: React.FC<HorizontalPerfumesProps> = ({ products, onProductClick }) => {
  const navigate = useNavigate();
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-24 bg-[#050c08] relative overflow-hidden group/section">
      {/* 🌌 Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-emerald-500"
            >
              <div className="w-8 h-[1px] bg-emerald-500/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-sm">Imperial Selections</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-black text-white italic tracking-tighter leading-none"
            >
              Our <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">some of </span> collection.
            </motion.h2>
          </div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/perfumes')}
            className="flex items-center gap-3 group px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 group-hover:text-emerald-400">Explore more</span>
            <ArrowRight size={14} className="text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </motion.button>
        </div>

        <div className="relative">
          {/* Scroll Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050c08] to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050c08] to-transparent z-10 pointer-events-none hidden md:block" />

          <div 
            className="flex gap-6 overflow-x-auto no-scrollbar pb-16 pt-2 px-4 scroll-smooth snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {displayProducts.map((product, idx) => (
              <motion.div 
                key={product.id || idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex-shrink-0 w-[240px] md:w-[320px] snap-start"
              >
                <div 
                  onClick={() => onProductClick(product)}
                  className="transform-gpu transition-all duration-700 hover:-translate-y-2"
                >
                  <ProductCard 
                    id={product.id || ''} 
                    name={product.name} 
                    price={product.price}
                    originalPrice={product.originalPrice}
                    images={product.images}
                    scentType={product.scentType}
                    inStock={product.inStock}
                    onClick={() => onProductClick(product)}
                  />
                </div>
              </motion.div>
            ))}
            
            {/* The Final Invitation Card */}
            <div className="flex-shrink-0 w-[240px] md:w-[300px] snap-start">
              <motion.div 
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.2)" }}
                onClick={() => navigate('/perfumes')}
                className="h-[400px] md:h-[480px] rounded-[2rem] border border-white/5 flex flex-col items-center justify-center cursor-pointer group transition-all duration-700 bg-white/[0.01] relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 relative z-10">
                  <ArrowRight size={20} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
                </div>
                
                <div className="text-center mt-6 relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-emerald-400 transition-colors">See Complete</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-emerald-400 transition-colors">Masterpieces</p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                  <span className="text-[7px] font-black uppercase tracking-[1em] text-emerald-400/50 whitespace-nowrap">Explore the set</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalPerfumes;
