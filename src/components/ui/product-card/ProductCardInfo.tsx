import { Star } from 'lucide-react';

interface ProductCardInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
}

const ProductCardInfo = ({ name, price, originalPrice }: ProductCardInfoProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <h4 className="font-bold text-sm md:text-lg leading-tight line-clamp-2 h-10 md:h-14 text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
        {name}
      </h4>
      
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-base md:text-xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-[10px] md:text-xs text-zinc-400 line-through opacity-60">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardInfo;
