import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  SortAsc,
  Filter,
} from "lucide-react";
import { productApi } from "../api";
import { Product } from "../types";
import ProductCard from "../components/ui/ProductCard";
import ProductDetailsModal from "../components/ui/ProductDetailsModal";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const Perfumes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [scentTypes, setScentTypes] = useState<string[]>(["All"]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedScentType, setSelectedScentType] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    // Initial load: Fetch categories (scent types)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await productApi.getAll({ limit: 1000 });
                const types = [
                    "All",
                    ...Array.from(new Set((data.products || []).map((p: any) => p.scentType || "Other")))
                ] as string[];
                setScentTypes(types);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 600);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Handle filter/page changes
    useEffect(() => {
        fetchFilteredProducts();
    }, [debouncedSearch, selectedScentType, sortBy, currentPage]);

    const fetchFilteredProducts = async () => {
        setLoading(true);
        try {
            const { data } = await productApi.getAll({
                search: debouncedSearch,
                category: selectedScentType,
                sortBy,
                page: currentPage,
                limit: ITEMS_PER_PAGE,
            });

            const mappedProducts = (data.products || []).map((p: any) => ({
                ...p,
                id: p._id,
            }));

            setProducts(mappedProducts);
            setTotalItems(data.total || 0);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const openDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedScentType("All");
        setSortBy("newest");
        setCurrentPage(1);
    };

    const isFiltered = searchQuery !== "" || selectedScentType !== "All" || sortBy !== "newest";

    const sortOptions = [
        { label: "Default (Newest)", value: "newest" },
        { label: "Price: Low to High", value: "price-low" },
        { label: "Price: High to Low", value: "price-high" },
    ];

  return (
    <div className="min-h-screen bg-[#050706] text-white pt-24 md:pt-32 pb-40 px-6">
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Subtle Royal Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-500/[0.07] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-emerald-500/[0.02] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-zinc-500 hover:text-emerald-400 transition-all group"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 transition-all">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">
              Inventory Hub
            </span>
          </button>

          <div className="flex items-center gap-4 text-emerald-500/20">
            <div className="w-12 h-[1px] bg-current" />
            <span className="text-[9px] font-black uppercase tracking-[1em]">
              Vault
            </span>
          </div>
        </div>

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-none italic mb-6"
          >
            The{" "}
            <span className="text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]">
              Inventory.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 text-[10px] md:text-xs tracking-[0.6em] font-black uppercase max-w-xl mx-auto"
          >
            A Curated Treasury of Olfactory Resonance
          </motion.p>
        </div>
      </div>

      {/* 💎 Responsive Filter Bar */}
      <div className="max-w-7xl mx-auto mb-16 relative z-[50]">
        <div className="bg-white/[0.02] border border-white/5 p-3 lg:p-2 rounded-3xl lg:rounded-full shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-2 group hover:border-white/10 transition-colors">
          {/* Search Field */}
          <div className="relative flex-1 group/search">
            <Search
              className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/search:text-emerald-400 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Discover your signature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] lg:bg-transparent border border-white/0 focus:border-white/5 rounded-2xl lg:rounded-full py-4 lg:py-5 pl-14 lg:pl-16 pr-8 text-sm lg:text-base outline-none placeholder:text-zinc-800 text-white transition-all"
            />
          </div>

          <div className="hidden lg:block w-[1px] h-10 bg-white/5 my-auto" />

          {/* Scent Type Select */}
          <div className="relative flex-1 lg:flex-none lg:w-56">
            <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 text-zinc-700 pointer-events-none">
              <Filter size={15} />
            </div>
            <select
              value={selectedScentType}
              onChange={(e) => setSelectedScentType(e.target.value)}
              className="w-full appearance-none bg-white/[0.03] lg:bg-transparent hover:bg-white/[0.05] border border-white/0 hover:border-white/5 rounded-2xl lg:rounded-full py-4 lg:py-5 pl-14 lg:pl-16 pr-10 text-[9px] lg:text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-zinc-500 hover:text-white transition-all font-sans"
            >
              {scentTypes.map((type) => (
                <option key={type} value={type} className="bg-[#050706] py-2">
                  {type === "All" ? "All Scents" : type}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 text-zinc-700 pointer-events-none"
            />
          </div>

          {/* Sort Select */}
          <div className="relative flex-1 lg:flex-none lg:w-56">
            <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 text-zinc-700 pointer-events-none">
              <SortAsc size={17} />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white/[0.03] lg:bg-transparent hover:bg-white/[0.05] border border-white/0 hover:border-white/5 rounded-2xl lg:rounded-full py-4 lg:py-5 pl-14 lg:pl-16 pr-10 text-[9px] lg:text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-zinc-500 hover:text-white transition-all font-sans"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#050706] py-2">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 text-zinc-700 pointer-events-none"
            />
          </div>

          {/* Reset Button */}
          <AnimatePresence>
            {isFiltered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={resetFilters}
                className="w-full lg:w-auto px-8 py-4 lg:py-5 bg-emerald-500 text-black rounded-2xl lg:rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between px-4 lg:px-8 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">
              Active Vault
            </span>
          </div>
          <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.5em] text-emerald-500/30">
            {totalItems} Profiles Found
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-[500px] gap-10">
            <div className="relative">
              <div className="w-24 h-24 border border-emerald-500/10 rounded-full animate-ping" />
              <div className="absolute inset-0 w-24 h-24 border-t-2 border-emerald-500 rounded-full animate-spin" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-[0.8em] text-emerald-500 animate-pulse text-center">
              Decanting Royal Inventory...
            </span>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
            >
              <AnimatePresence mode="popLayout">
                {products.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard {...p} onClick={() => openDetails(p)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Luxury Pagination */}
            {totalPages > 1 && (
              <div className="mt-48 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-20 gap-12 md:gap-0">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 hover:text-emerald-400 disabled:opacity-5 transition-all duration-700 group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-emerald-500/50">
                    <ChevronLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                  </div>
                  Previous Collection
                </button>

                <div className="flex items-center gap-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className="w-14 h-14 rounded-2xl relative group flex items-center justify-center transition-all duration-500"
                    >
                      {currentPage === i + 1 ? (
                        <motion.div
                          layoutId="pagination-luxe"
                          className="absolute inset-0 bg-emerald-500 rounded-2xl shadow-[0_15px_30px_rgba(16,185,129,0.4)]"
                        />
                      ) : (
                        <div className="absolute inset-1 border border-white/5 rounded-2xl group-hover:border-emerald-500/30 transition-colors" />
                      )}
                      <span
                        className={`relative z-10 text-[11px] font-black transition-colors duration-500 ${currentPage === i + 1 ? "text-black" : "text-zinc-600 group-hover:text-white"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 hover:text-emerald-400 disabled:opacity-5 transition-all duration-700 group"
                >
                  Next Collection
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-emerald-500/50">
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              </div>
            )}
          </>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-72 border border-white/5 rounded-[6rem] bg-gradient-to-b from-white/[0.01] to-transparent relative group overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <Search
              className="mx-auto mb-12 text-zinc-800 group-hover:text-emerald-500 transition-colors duration-1000"
              size={80}
              strokeWidth={0.5}
            />
            <p className="text-zinc-600 text-xs font-black uppercase tracking-[1.5em] mb-10 translate-x-[0.75em]">
              Void of Resonance
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedScentType("All");
              }}
              className="px-16 py-6 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.6em] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-700 hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)]"
            >
              Reset Atmosphere
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfumes;
