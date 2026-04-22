import { motion } from 'framer-motion';

interface ProductCardImageProps {
  image: string;
  name: string;
  scentType: string;
  inStock?: boolean;
}

const ProductCardImage = ({ image, name, scentType, inStock = true }: ProductCardImageProps) => {
  return (
    <div className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <motion.img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Scent Type Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 rounded-md border border-zinc-200 dark:border-white/10 shadow-sm">
          {scentType}
        </span>
      </div>

      {/* Out of Stock Overlay */}
      {!inStock && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white whitespace-nowrap">
              Not Available
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardImage;
