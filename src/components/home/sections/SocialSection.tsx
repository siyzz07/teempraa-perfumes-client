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
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 bg-emerald-500/5 shadow-[0_0_50px_rgba(16,185,129,0.1)] mb-4"
                    >
                        <Instagram size={48} md-size={64} strokeWidth={1} />
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
                            { 
                                name: 'Instagram', 
                                label: shopSettings?.instagram?.startsWith('@') ? shopSettings.instagram : `@${shopSettings?.instagram?.split('/').pop() || 'manor'}`, 
                                icon: Instagram,
                                href: shopSettings?.instagram?.startsWith('http') ? shopSettings.instagram : `https://instagram.com/${shopSettings?.instagram?.replace('@', '')}`
                            },
                        ].map((social, i) => (
                            <motion.a 
                                key={i}
                                href={social.href} 
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5 }}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                                    <social.icon size={28} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-emerald-500 transition-colors mb-1">{social.name}</p>
                                    <p className="text-white text-lg md:text-2xl font-serif font-bold italic tracking-tight uppercase leading-none">{social.label}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>

         
                </div>
            </motion.div>
        </div>
    </section>
  );
};

export default SocialSection;
