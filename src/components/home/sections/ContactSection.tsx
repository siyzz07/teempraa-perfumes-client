import { Mail, MessageSquare, Phone, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  shopSettings: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    instagram?: string;
    shopName?: string;
  } | null;
}

const ContactSection = ({ shopSettings }: ContactSectionProps) => {
  const phone = shopSettings?.phone || '+91 12345 67890';
  const whatsapp = shopSettings?.whatsapp || phone;
  const email = shopSettings?.email || 'heritage@teempraa.com';
  const instagram = shopSettings?.instagram || 'teempraa_official';

  const contactMethods = [
    { 
        label: 'Call', 
        value: phone, 
        icon: Phone, 
        href: `tel:${phone.replace(/\D/g, '')}`,
        color: 'emerald'
    },
    { 
        label: 'WhatsApp', 
        value: whatsapp, 
        icon: MessageSquare, 
        href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`,
        color: 'emerald'
    },
    { 
        label: 'Mail', 
        value: email, 
        icon: Mail, 
        href: `mailto:${email}`,
        color: 'emerald'
    },
    { 
        label: 'Social (Instagram)', 
        value: instagram.startsWith('@') ? instagram : `@${instagram.split('/').pop()}`, 
        icon: Instagram, 
        href: instagram.startsWith('http') ? instagram : `https://instagram.com/${instagram.replace('@', '')}`,
        color: 'emerald'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-48">
        <div className="flex flex-col items-center text-center space-y-16 md:space-y-24">
            {/* 📝 Header: The Invitation */}
            <div className="space-y-8 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center space-y-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-px bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/70">Connect with the Teempraa</span>
                        <div className="w-12 h-px bg-emerald-500" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-serif font-black italic text-white tracking-tighter leading-none">
                        Contact <span className="text-emerald-500">Us.</span>
                    </h2>
                </motion.div>
            </div>

            {/* 📱 The Communication Hub Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full">
                {contactMethods.map((item, i) => (
                    <motion.a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-500 flex flex-col items-center text-center space-y-6 md:space-y-10 min-h-[160px] md:min-h-[320px] justify-center"
                    >
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-emerald-500/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0)] group-hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                            <item.icon size={24} md-size={36} strokeWidth={1} />
                        </div>
                        <div className="space-y-2">
                            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-emerald-500/70 transition-colors uppercase">{item.label}</p>
                            <p className="text-white text-[10px] sm:text-xs md:text-xl font-bold tracking-tight line-clamp-1">{item.value}</p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    </section>
  );
};

export default ContactSection;


