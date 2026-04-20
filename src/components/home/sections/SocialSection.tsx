import { Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialSectionProps {
  shopSettings: any;
}

const SocialSection = ({ shopSettings }: SocialSectionProps) => {
  return (
    <section className="py-32 md:py-48 px-6 bg-[#011a14]">
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-[4rem] md:rounded-[6rem] overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 p-12 md:p-24 lg:p-32"
            >
                {/* 🏺 Background Texture / Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500"
                    >
                        <Instagram size={32} strokeWidth={1} />
                    </motion.div>

                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-8xl font-serif font-black italic text-white tracking-tighter leading-none">
                            Our Digital <br />
                            <span className="text-emerald-500">Residence.</span>
                        </h2>
                        <p className="text-zinc-500 text-xl font-light tracking-wide max-w-2xl mx-auto italic">
                            "Our digital manor is an extension of {shopSettings?.shopName || 'our physical atelier'}. Join the resonance of the modern aristocrat."
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        {[
                            { name: 'Instagram', label: `@${shopSettings?.shopName?.toLowerCase().replace(/\s+/g, '') || 'perfume'}_olfactive`, icon: Instagram },
                            { name: 'X Collection', label: `${shopSettings?.shopName?.toLowerCase().replace(/\s+/g, '') || 'perfume'}_manor`, icon: Twitter },
                            { name: 'Facebook', label: shopSettings?.shopName || 'Maison Imperial', icon: Facebook }
                        ].map((social, i) => (
                            <motion.a 
                                key={i}
                                href="#" 
                                whileHover={{ y: -5 }}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                                    <social.icon size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-emerald-500 transition-colors">{social.name}</p>
                                    <p className="text-white text-[10px] font-bold tracking-widest uppercase">{social.label}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-12 bg-emerald-500 text-black px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:bg-white transition-all flex items-center gap-4"
                    >
                        Enter the Manor <ExternalLink size={14} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    </section>
  );
};

export default SocialSection;
