import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface BrandIdentityProps {
  scrollYProgress: MotionValue<number>;
  shopSettings: any;
  onSaveContact: () => void;
}

const BrandIdentity: React.FC<BrandIdentityProps> = ({
  scrollYProgress,
  shopSettings,
  onSaveContact,
}) => {
  const yMistSlow = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section className="py-32 bg-[#022c22] px-6 relative overflow-hidden">
      {/* Parallax Mist Overlay for Section */}
      <motion.div
        style={{ y: yMistSlow }}
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
      >
        <img
          src="/mist_overlay.png"
          className="w-full h-full object-cover"
          alt="Mist"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10">
              <img
                src="/emerald_spray.png"
                className="w-full h-full object-cover"
                alt="Royal Studio"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-accent rounded-full flex flex-col items-center justify-center text-[#011a14] shadow-2xl rotate-12">
              <span className="text-[8px] font-black uppercase tracking-widest mb-1">
                Authentic
              </span>
              <span className="text-xl font-serif font-black italic">
                Emerald
              </span>
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">
                Certified
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-left"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-brand-accent" />
              <span className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em]">
                Imperium
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-10 tracking-tighter leading-none">
              The Crown <br /> of{" "}
              <span className="text-brand-accent italic">Fragrance.</span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-12 font-light tracking-wide">
              {shopSettings?.description ||
                "Reserved for those of discerning taste. Our emerald collection uses rare essential oils derived from high-altitude botanicals, aged to perfection."}
            </p>

            <div className="grid grid-cols-2 gap-10 mb-16">
              {[
                { label: "Royal Reserve", value: "Private" },
                { label: "Emerald Extract", value: "Pure" },
                { label: "Aromatic Aura", value: "Prime" },
                { label: "Global Elite", value: "Exclusive" },
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <span className="block text-3xl font-serif font-black text-white group-hover:text-brand-accent transition-colors">
                    {stat.value}
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.3em] font-black text-brand-accent/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-6">
              <button
                onClick={onSaveContact}
                className="bg-brand-accent text-[#011a14] px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
              >
                Save Royal Contact
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandIdentity;
