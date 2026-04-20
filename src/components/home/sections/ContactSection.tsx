import { Mail, Clock, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  shopSettings: {
    phone?: string;
    email?: string;
    address?: string;
    shopName?: string;
    location?: { lat: number; lng: number };
  } | null;
}

const ContactSection = ({ shopSettings }: ContactSectionProps) => {
  const phone = shopSettings?.phone || '+91 12345 67890';
  const email = shopSettings?.email || 'heritage@teempraa.com';
  const address = shopSettings?.address || 'The Imperial Pavilion, Emerald District, Grasse';
  const lat = shopSettings?.location?.lat || 0;
  const lng = shopSettings?.location?.lng || 0;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* 📝 The Booking Form / Inquiry */}
            <div className="space-y-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-px bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/70">Atelier Booking</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black italic text-white tracking-tighter leading-none">
                        Request a <br />
                        <span className="text-emerald-500">Dialogue.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md">
                        Our curators are at your disposal for bespoke olfactory consultations and private collection previews.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {[
                        { label: 'Studio Correspondence', value: email, icon: Mail, href: `mailto:${email}` },
                        { label: 'Direct Line (WhatsApp)', value: phone, icon: MessageSquare, href: `https://wa.me/${phone.replace(/\s+/g, '')}` },
                        { label: 'Exhibition Pavilion', value: address, icon: MapPin, href: mapsUrl }
                    ].map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.href}
                            target={item.label === 'Exhibition Pavilion' ? '_blank' : undefined}
                            rel={item.label === 'Exhibition Pavilion' ? 'noopener noreferrer' : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                                <item.icon size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-1.5">{item.label}</p>
                                <p className="text-white text-sm md:text-base font-bold tracking-tight">{item.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* 🖼️ The Visual Anchor */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square lg:aspect-[4/5] rounded-[4rem] md:rounded-[6rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/5"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#011a14] via-transparent to-transparent z-10" />
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 3 }}
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
                    alt="The Sovereign Bottle"
                />
                
                <div className="absolute bottom-16 left-12 right-12 z-20 text-center space-y-8">
                    <div className="p-8 md:p-12 rounded-[3.5rem] bg-black/40 backdrop-blur-2xl border border-white/10">
                        <Clock size={32} className="text-emerald-500 mx-auto mb-6 animate-pulse" />
                        <h4 className="text-2xl font-serif font-black italic text-white mb-2">Private Hours</h4>
                        <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.4em]">10:00 — 20:30 (GMT+2)</p>
                    </div>
                    
                    <a 
                        href="#gallery"
                        className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 hover:text-white transition-colors"
                    >
                        Explore the archives <Send size={14} />
                    </a>
                </div>
            </motion.div>
        </div>
    </section>
  );
};
export default ContactSection;

