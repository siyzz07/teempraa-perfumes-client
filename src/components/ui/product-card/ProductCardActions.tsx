import { ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProductCardActionsProps {
  onAddCart: () => void;
  onOrderNow: () => void;
}

const ProductCardActions = ({ onAddCart, onOrderNow }: ProductCardActionsProps) => {
  return (
    <div className="flex flex-col gap-2 mt-auto pt-4">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onOrderNow();
        }}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCardActions;
