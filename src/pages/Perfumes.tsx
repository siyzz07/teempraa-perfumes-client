import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { productApi } from '../api';
import { Product } from '../types';
import ProductCard from '../components/ui/ProductCard';
import ProductDetailsModal from '../components/ui/ProductDetailsModal';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

const Perfumes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScentType, setSelectedScentType] = useState('All');
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productApi.getAll();
      const mappedProducts = Array.isArray(data) ? data.map((p: any) => ({
        ...p,
        id: p._id,
      })) : [];
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = products;

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p as any).scentType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedScentType !== 'All') {
      result = result.filter(p => (p as any).scentType === selectedScentType);
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, selectedScentType, products]);

  const scentTypes = ['All', ...Array.from(new Set(products.map(p => (p as any).scentType || 'Other')))];

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050706] text-white pt-24 md:pt-32 pb-40 px-6">
      <ProductDetailsModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-6 md:mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Manor</span>
        </button>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-8xl font-serif font-black tracking-tighter mb-6 md:mb-8 italic"
        >
          The <span className="text-emerald-400">Library.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-base md:text-xl font-light tracking-wide max-w-2xl"
        >
          Curated olfactive compositions for the modern aristocrat. Explore our entire heritage in one exhibition.
        </motion.p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="relative w-full md:w-[400px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search scent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 md:py-5 pl-16 pr-8 text-xs md:text-sm tracking-[0.2em] uppercase font-bold outline-none focus:border-emerald-500/30 transition-all dark:text-white"
            />
          </div>

          <div className="relative w-full md:w-auto overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050706] to-transparent z-10 pointer-events-none md:hidden" />
            <div className="flex gap-3 overflow-x-auto no-scrollbar w-full md:w-auto py-2 pr-12 md:pr-0">
              {scentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedScentType(type)}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap border ${
                    selectedScentType === type 
                      ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                      : 'bg-white/5 text-zinc-500 border-white/5 hover:border-emerald-500/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-[400px] gap-4">
            <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500/50">Decanting Portfolio...</span>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-12"
            >
              <AnimatePresence mode="popLayout">
                {currentItems.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard 
                      {...p} 
                      onClick={() => openDetails(p)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-24 flex items-center justify-center gap-8">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-20"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                        currentPage === i + 1 ? 'text-emerald-400 scale-125' : 'text-zinc-600 hover:text-white'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-20"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-40 border border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[1em] mb-2">No resonance found.</p>
            <p className="text-zinc-800 text-[8px] uppercase tracking-[0.5em]">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfumes;
