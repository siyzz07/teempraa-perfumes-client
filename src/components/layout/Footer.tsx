import React from 'react';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useShopStore } from '../../store/useStore';

const Footer: React.FC = () => {
  const shopSettings = useShopStore((s) => s.settings);
  
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="px-6 py-40 bg-[#011a14] border-t border-white/5 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

       <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
             {/* Brand Column */}
             <div className="lg:col-span-4 space-y-12">
                <h4 className="font-serif font-black text-6xl tracking-tighter text-white italic">
                  {shopSettings?.shopName || 'TEEMPRAA'}<span className="text-emerald-500">.</span>
                </h4>
                <p className="text-zinc-400 text-lg leading-relaxed font-light tracking-wide max-w-sm">
                  The standard of excellence. We define the future of high olfaction through rare botanical mastery.
                </p>
                <div className="flex gap-8">
                   {[Instagram, Twitter, Facebook].map((Social, i) => (
                     <motion.div key={i} whileHover={{ y: -5, color: '#10b981' }} className="cursor-pointer text-zinc-500">
                       <Social size={22} />
                     </motion.div>
                   ))}
                </div>
             </div>
             
             {/* Links Grid */}
             <div className="lg:col-span-4 grid grid-cols-2 gap-12">
               <div className="space-y-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 block">Maison</span>
                  <ul className="space-y-6">
                    {[
                      { name: 'Collection', id: 'horizontal-perfumes' },
                      { name: 'Visuals', id: 'gallery' },
                      { name: 'Atelier', id: 'contact' },
                      { name: 'Heritage', id: 'gallery' }
                    ].map((link) => (
                      <li key={link.name}>
                        <button 
                          onClick={() => scrollToId(link.id)} 
                          className="text-zinc-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="space-y-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 block">Support</span>
                  <ul className="space-y-6">
                    {[
                      { name: 'Contact', id: 'contact' },
                      { name: 'Shipping', id: '#' },
                      { name: 'Privacy', id: '#' },
                      { name: 'Atelier Booking', id: 'contact' }
                    ].map((link) => (
                      <li key={link.name}>
                        <button 
                          onClick={() => scrollToId(link.id)}
                          className="text-zinc-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
               </div>
             </div>

             {/* Newsletter Column */}
             <div className="lg:col-span-4 space-y-12">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 block">Newsletter</span>
                <p className="text-zinc-400 text-sm font-light tracking-wide">
                  Receive TEEMPRAA updates and invitation-only collection previews.
                </p>
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white text-xs font-medium tracking-widest outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-emerald-500 hover:text-[#011a14] rounded-full transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
             </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.5em]">
                © {new Date().getFullYear()} {shopSettings?.shopName || 'TEEMPRAA'} • TEEMPRAA OLFACTIVE
              </p>
              <div className="flex gap-8">
                {['English', 'French', 'Arabic'].map((lang) => (
                  <span key={lang} className="text-[9px] font-black text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-emerald-500">{lang}</span>
                ))}
              </div>
            </div>
            
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] text-center">
              Crafted in Paris • Dedicated to Eternity
            </p>
          </div>
       </div>
    </footer>
  );
};

export default Footer;
