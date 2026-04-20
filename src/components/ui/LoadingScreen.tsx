import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  // 🔒 Scroll Management: prevents body jumping during transition
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#010503] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 💎 Background Atmosphere: Deep Emerald Aurora */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] bg-gradient-to-tr from-emerald-600/10 via-transparent to-emerald-900/10 blur-[120px]"
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-24">
            {/* 🏺 The Essence Jar: High-Fidelity Abstract Animation */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Pulsing Outer Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0.8, 1.5],
                    opacity: [0.3, 0],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 1,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 border border-emerald-500/30 rounded-full"
                />
              ))}

              {/* Central Liquid Sphere */}
              <motion.div
                animate={{ 
                  borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-900 shadow-[0_0_50px_rgba(16,185,129,0.4)] relative overflow-hidden"
              >
                {/* Internal Refraction Shimmer */}
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20"
                />
              </motion.div>

              {/* Floating Particles Around Sphere */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 10 + i * 2, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute w-full h-full"
                >
                  <div className="w-1 h-1 bg-emerald-400 rounded-full absolute top-0 left-1/2 blur-[1px]" />
                </motion.div>
              ))}
            </div>

            {/* 🖋️ Cinematic Branding & Progress */}
            <div className="flex flex-col items-center gap-12">
              <div className="relative overflow-hidden group">
                <motion.h2 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl font-serif font-light tracking-[0.6em] text-white/90 uppercase text-center"
                >
                  TEEMPRAA
                </motion.h2>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="h-[0.5px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mt-4"
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: [0.1, 0.6, 0.1],
                        backgroundColor: ["#10b98144", "#10b981", "#10b98144"]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                      className="w-[2px] h-3 rounded-full"
                    />
                  ))}
                </div>
                <motion.span 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-[9px] uppercase tracking-[1em] text-emerald-400/80 font-bold ml-4"
                >
                  Distilling Imperial Scents
                </motion.span>
              </div>
            </div>
          </div>

          {/* ✨ High-Fidelity Floating Dust */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100 - Math.random() * 200],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${80 + Math.random() * 20}%`,
              }}
              className="absolute w-[2px] h-[2px] bg-emerald-400/40 rounded-full blur-[1px]"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
