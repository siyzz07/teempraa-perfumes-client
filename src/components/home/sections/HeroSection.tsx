import React, { useRef } from 'react';
import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
  mousePos: { x: number, y: number };
  shopSettings: any;
  onExplore: () => void;
  onBookAtelier: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  scrollYProgress, 
  mousePos, 
  onExplore, 
  onBookAtelier 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax & Depth transforms
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Smooth mouse movement for immersive depth
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mousePos.x, springConfig);
  const smoothMouseY = useSpring(mousePos.y, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#000502] selection:bg-emerald-500 selection:text-white"
    >
      {/* Immersive 3D Background Layer */}
      <motion.div 
        style={{ 
          scale: scaleBg,
          y: yBg,
          rotateX,
          rotateY,
          perspective: 1000
        }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000502]/40 to-[#000502] z-10" />
        <img 
          src="/teempra_vortex.png" 
          className="w-full h-full object-cover brightness-110 saturate-[1.1]" 
          alt="The Singularity" 
        />
      </motion.div>

      {/* Floating Particles / Dust */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 2000, 
              y: Math.random() * 1000, 
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [0, 0.4, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-[2px]"
          />
        ))}
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center px-6">
        
        {/* Large Cinematic Title (Backgrounded) */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none"
        >
          <h2 className="text-[12rem] md:text-[22rem] font-serif font-black text-white/[0.03] tracking-[-0.05em] leading-none uppercase">
            TEEMPRAA
          </h2>
        </motion.div>

        {/* The Exhibition Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-12 max-w-4xl"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
               initial={{ width: 0 }}
               animate={{ width: "60px" }}
               transition={{ duration: 1.5, delay: 1.5 }}
               className="h-[1px] bg-emerald-500 shadow-[0_0_20px_#10b981]"
            />
            <span className="text-[10px] font-black uppercase tracking-[1.5em] text-emerald-500/80">
              {/* Extrait De Parfum */}
            </span>
          </div>

          <h1 className="text-5xl md:text-[10rem] font-serif text-white leading-none tracking-tighter">
            TEEMPRAA <span className="italic font-light text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">Perfume Store</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            A fragrance crafted to express confidence, elegance, and leave a lasting impression wherever you go.
          </p>

          {/* <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={onExplore}
              className="px-16 py-6 bg-transparent border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              The Grand Collection
            </motion.button>
            <button 
              onClick={onBookAtelier}
              className="text-[9px] font-black text-emerald-500 hover:text-white uppercase tracking-[0.4em] transition-colors"
            >
              Discover The Heritage →
            </button>
          </div> */}
        </motion.div>

        {/* Floating Technical Specs (Holographic) */}
        {/* <div className="absolute inset-0 pointer-events-none hidden lg:block">
           <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 6, repeat: Infinity }}
             className="absolute top-1/3 left-1/4 flex flex-col items-start gap-2"
           >
             <span className="text-[8px] text-emerald-500/40 font-black uppercase tracking-widest">Gravity</span>
             <span className="text-[11px] text-white/40 font-serif italic">1.042 S.G.</span>
           </motion.div>

           <motion.div 
             animate={{ y: [0, 20, 0] }}
             transition={{ duration: 7, repeat: Infinity }}
             className="absolute bottom-1/4 right-1/4 flex flex-col items-end gap-2"
           >
             <span className="text-[8px] text-emerald-500/40 font-black uppercase tracking-widest">Batch</span>
             <span className="text-[11px] text-white/40 font-serif italic">NO. 09/24-B</span>
           </motion.div>
        </div> */}
      </div>

      {/* Performance Footer */}
      <div className="absolute bottom-12 left-12 right-12 z-40 flex justify-between items-end">
        {/* <div className="flex flex-col gap-4">
           {['Top: Bulgarian Rose', 'Heart: Malaysian Oud', 'Base: Liquid Gold'].map((note, i) => (
             <div key={i} className="flex items-center gap-4">
               <div className="w-1 h-1 rounded-full bg-emerald-500" />
               <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.3em] font-display">{note}</span>
             </div>
           ))}
        </div> */}
        
        {/* <div className="flex flex-col items-end gap-6">
           <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.4em]">Active Resonance</span>
           </div>
           <p className="text-[10px] text-zinc-700 font-serif italic">© 2024 TEEMPRAA LUXE ARCHIVE</p>
        </div> */}
      </div>

      {/* Interactive Depth Filter */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#000502] via-transparent to-transparent z-30" />
    </section>
  );
};

export default HeroSection;
