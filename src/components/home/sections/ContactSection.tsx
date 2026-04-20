import { Mail, Clock, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  shopSettings: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    shopName?: string;
    location?: { lat: number; lng: number };
  } | null;
}

const ContactSection = ({ shopSettings }: ContactSectionProps) => {
  const phone = shopSettings?.phone || '+91 12345 67890';
  const whatsapp = shopSettings?.whatsapp || phone;
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
                        { label: 'Direct Line (WhatsApp)', value: whatsapp, icon: MessageSquare, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` },
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

            {/* 🖼️ The Contact Detail Hub - Replacing the Image visual */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-white/[0.03] to-transparent rounded-[4rem] border border-white/10 p-12 md:p-20 flex flex-col justify-center items-center text-center space-y-12 shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
            >
                <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full -z-10" />
                
                <h3 className="text-3xl md:text-5xl font-serif font-black italic text-white">Direct Connect.</h3>
                
                <div className="w-full space-y-4">
                    {[
                        { label: 'Studio Email', value: email, icon: Mail, href: `mailto:${email}` },
                        { label: 'Voice Line', value: phone, icon: Send, href: `tel:${phone.replace(/\D/g, '')}` },
                        { label: 'WhatsApp', value: whatsapp, icon: MessageSquare, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` }
                    ].map((item, i) => (
                        <motion.a 
                            key={i}
                            href={item.href}
                            whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            className="flex items-center gap-6 p-6 rounded-3xl border border-white/5 bg-white/[0.02] transition-all group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                <item.icon size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-[7px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">{item.label}</p>
                                <p className="text-white font-bold text-sm md:text-lg">{item.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
  );
};
export default ContactSection;

