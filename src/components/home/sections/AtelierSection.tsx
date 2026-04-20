import { motion } from 'framer-motion';
import { Wind, Droplets, Sparkles, MapPin, Compass } from 'lucide-react';

interface AtelierSectionProps {
    shopSettings: any;
}

const AtelierSection = ({ shopSettings }: AtelierSectionProps) => {
    const features = [
        {
            icon: Compass,
            title: "Olfactive Heritage",
            desc: "Tracing rare resins from the heart of the Orient to the archives of Paris. A journey of pure essence."
        },
        {
            icon: Wind,
            title: "Eternal Sillage",
            desc: "Designed to linger with an imperial resonance, commanding the air with grace and silent power."
        },
        {
            icon: Droplets,
            title: "Rare Distillates",
            desc: "Petals harvested at dawn, resins aged in emerald glass. We use only the zenith of nature's bounty."
        },
        {
            icon: Sparkles,
            title: "High Atelier",
            desc: "Each bottle is a vault of secrets, hand-finished by master blenders who speak the language of scent."
        }
    ];

    return (
        <section className="py-32 md:py-56 px-6 bg-[#011a14] overflow-hidden relative selection:bg-emerald-500 selection:text-black">
            {/* 🏺 Imperial Aura Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-24 md:mb-40 gap-12">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 mb-10"
                        >
                            <div className="h-[1px] w-16 bg-emerald-500/50" />
                            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-emerald-500/80">The Art of Perfumery</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-[9rem] font-serif font-black italic tracking-tighter text-white leading-[0.8] mb-8"
                        >
                            The Atelier <br />
                            <span className="text-emerald-500 drop-shadow-[0_0_50px_rgba(16,185,129,0.2)]">Exhibition.</span>
                        </motion.h2>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="max-w-md lg:text-right space-y-6"
                    >
                        <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed">
                            A sanctuary where high-perfumery meets the vision of {shopSettings?.shopName || 'our house'}. Every creation is a dialogue between botanical soul and human nobility.
                        </p>
                        <div className="h-[1px] w-20 bg-emerald-500/20 lg:ml-auto" />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                            whileHover={{ y: -15 }}
                            className="group p-10 md:p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-emerald-500/30 transition-all duration-700 relative overflow-hidden active:scale-95"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                <item.icon size={120} strokeWidth={0.5} className="text-emerald-500" />
                            </div>

                            <div className="w-16 h-16 rounded-3xl bg-emerald-500/5 flex items-center justify-center text-emerald-500 mb-10 group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-700">
                                <item.icon size={28} strokeWidth={1.5} />
                            </div>

                            <h4 className="text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                            <p className="text-zinc-500 text-base leading-relaxed font-medium group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* 🎞️ Cinematic Narrative Section */}
                <div className="mt-32 md:mt-56 grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[4rem] overflow-hidden group aspect-[4/5] md:aspect-[16/10] lg:aspect-square shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5"
                    >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                        <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 2 }}
                            src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                            alt="Maison Laboratory"
                        />
                        <div className="absolute top-12 left-12 z-20 flex items-center gap-4">
                            <MapPin size={16} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Master Distillation Lab</span>
                        </div>
                    </motion.div>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h3 className="text-5xl md:text-7xl font-serif font-black italic text-white tracking-tighter leading-none">
                                The Masterpiece <br />
                                <span className="text-emerald-500">Method.</span>
                            </h3>
                            <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-xl italic">
                                "We do not sell bottles; we preserve moments of existence. A TEEMPRAA scent is a time-capsule of emotion, distilled through three generations of secret wisdom."
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
                            {[
                                { label: 'Hand Finish', val: '100%' },
                                { label: 'Rare Notes', val: '24+' },
                                { label: 'Aura Reach', val: 'Imperial' },
                                { label: 'Longevity', val: 'Eternal' }
                            ].map((s, idx) => (
                                <div key={idx}>
                                    <p className="text-3xl font-serif font-black text-white italic tracking-tighter mb-1">{s.val}</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/60">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AtelierSection;
