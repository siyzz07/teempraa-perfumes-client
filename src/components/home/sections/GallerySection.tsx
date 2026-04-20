import { motion } from 'framer-motion';

const GallerySection = () => {
  const images = [
    'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=800',
    'https://images.unsplash.com/photo-1592892111425-15e04305f961?q=80&w=800',
    'https://images.unsplash.com/photo-1541108564883-fa8126040660?q=80&w=800',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800',
    'https://images.unsplash.com/photo-1583522362566-c32fed35a64a?q=80&w=800',
    'https://images.unsplash.com/photo-1591524383181-6784403079b7?q=80&w=800'
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#011a14]/50">
        <div className="max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 md:mb-24 text-center"
            >
                <div className="w-12 h-[1px] bg-emerald-500 mx-auto mb-8" />
                <h3 className="text-4xl md:text-6xl font-serif font-black italic text-white tracking-tighter mb-4">The Muse.</h3>
                <p className="text-zinc-500 text-sm tracking-[0.3em] font-black uppercase">Visual Chronicles</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {images.map((img, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl shadow-black/40 border border-white/5 group relative ${i % 2 === 1 ? 'lg:translate-y-12' : ''}`}
                    >
                        <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                        <motion.img 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 1 }}
                            src={img} 
                            className="w-full aspect-[4/5] object-cover cursor-crosshair" 
                            alt="Gallery item" 
                        />
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-24 md:mt-40 flex flex-col items-center">
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[1em] mb-4">Capturing Presence</p>
                <div className="w-px h-24 bg-gradient-to-b from-emerald-500 to-transparent" />
            </div>
        </div>
    </section>
  );
};

export default GallerySection;
