import { motion } from "framer-motion";
import { Instagram, MessageSquare, Mail, Award, ShieldCheck } from "lucide-react";
import { useShopStore } from "../store/useStore";

const About = () => {
  const shop = useShopStore((s) => s.settings);

  return (
    <div className="min-h-screen bg-[#011a14] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ✨ Simple & Premium Header */}
        {/* <header className="mb-24 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6 justify-center lg:justify-start"
          >
            <div className="w-12 h-[1px] bg-emerald-500" />
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">The Atelier Story</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-black mb-8 tracking-tighter leading-none"
          >
            Modern <br /> Heritage <span className="text-emerald-500 italic">Atelier.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg md:text-2xl max-w-2xl font-light italic leading-relaxed"
          >
            "Olfactive architecture for the modern aristocrat. A sanctuary where rare molecules meet cinematic resonance."
          </motion.p>
        </header> */}

        {/* 🌿 Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-emerald-500/10 relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover aspect-[4/5] transform group-hover:scale-105 transition-transform duration-1000"
              alt="Our Atelier"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011a14] via-transparent to-transparent opacity-40" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight">
                About <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8 italic">Us.</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
               Teempraa is built on a simple idea: true fragrance takes time.
From carefully selected botanicals to slow maturation, every creation is designed to reveal its richness gradually.
              </p>
              <p className="text-zinc-500 leading-relaxed italic border-l border-emerald-500/30 pl-8">
                {shop?.description || "Every bottle represents a cinematic journey—from the high-altitude botanicals to the final imperial seal. Quality is our only metric."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: Award, label: "Imperial Quality", val: "Elite" },
                { icon: ShieldCheck, label: "Aged Extracts", val: "Pure" },
              ].map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className="text-emerald-500 mb-4 transform transition-transform group-hover:scale-110">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="block text-2xl font-serif font-bold text-white mb-1 group-hover:text-emerald-500 transition-colors">{item.val}</span>
                  <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 📞 Premium Contact Layout */}
        <section className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-[4rem] p-12 md:p-20 border border-emerald-500/10 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] -mr-40 -mt-40" />
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-black italic mb-4">Contact Us.</h2>
            <p className="text-zinc-500 text-sm font-light tracking-widest uppercase mb-12">Connect with the Manor</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 relative z-10">
            {/* WhatsApp */}
            <motion.a 
              href={`https://wa.me/${(shop?.whatsapp || shop?.phone)?.replace(/\D/g, '') || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-8 bg-zinc-900/50 border border-emerald-500/5 rounded-[2.5rem] hover:border-emerald-500 hover:bg-emerald-500 group transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-white group-hover:text-black transition-all">
                <MessageSquare size={24} />
              </div>
              <h4 className="text-lg font-bold mb-1 group-hover:text-black transition-colors">WhatsApp</h4>
              <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest group-hover:text-black/60 transition-colors">Direct Chat</p>
            </motion.a>

            {/* Instagram */}
            <motion.a 
              href={shop?.instagram?.startsWith('http') ? shop.instagram : `https://instagram.com/${shop?.instagram?.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-8 bg-zinc-900/50 border border-emerald-500/5 rounded-[2.5rem] hover:border-emerald-500 hover:bg-emerald-500 group transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-white group-hover:text-black transition-all">
                <Instagram size={24} />
              </div>
              <h4 className="text-lg font-bold mb-1 group-hover:text-black transition-colors">Instagram</h4>
              <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest group-hover:text-black/60 transition-colors">Follow Manor</p>
            </motion.a>

            {/* Email / Address */}
            <div className="flex flex-col items-center p-8 bg-zinc-900/50 border border-emerald-500/5 rounded-[2.5rem] col-span-2 md:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                <Mail size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2">Email</h4>
              <p className="text-zinc-500 text-[10px] text-center font-bold tracking-tight mb-2 break-all">{shop?.email || 'atelier@teempraa.com'}</p>
              <p className="text-emerald-500/60 text-[9px] uppercase font-black tracking-[0.2em]">{shop?.address?.split(',')[0] || 'Central Manor'}</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
