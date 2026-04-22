import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Edit2,
  ShoppingBag,
  DollarSign,
  Activity,
  Search,
  Plus,
  List,
  LayoutGrid,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { productApi } from "../../api/productApi";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setViewMode("grid");
      else setViewMode("table");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productApi.getAll({ limit: 1000 });
      const items = (data.products || []).map((p: any) => ({
        ...p,
        id: p.id || p._id,
      }));
      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await productApi.delete(id);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product.");
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.scentType?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Manage your products and view store statistics."
    >
      {/* 📊 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total Products",
            value: products.length,
            icon: ShoppingBag,
            color: "text-brand-primary",
            bg: "bg-brand-primary/10",
          },
          {
            label: "Total Revenue",
            value: "₹14.2M",
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Store Status",
            value: "Active",
            icon: Activity,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🛠️ Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white dark:bg-zinc-900 py-3.5 pl-11 pr-4 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex-1 md:flex-none bg-brand-primary text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 active:scale-95 transition-all"
          >
            <Plus size={18} /> Add Product
          </button>

          <div className="hidden md:flex bg-white dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "table" ? "bg-zinc-100 dark:bg-zinc-800 text-brand-primary" : "text-zinc-400"}`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-zinc-100 dark:bg-zinc-800 text-brand-primary" : "text-zinc-400"}`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 📦 Products Table/Grid */}
      <div className="relative">
        {viewMode === "table" ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Scent Type
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((p) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black/20 overflow-hidden">
                              <img
                                src={p.images?.[0]}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                            <span className="font-bold text-zinc-900 dark:text-white text-sm">
                              {p.name || "Unnamed"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg text-xs font-bold">
                            {p.scentType || "N/A"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-zinc-900 dark:text-white">
                            ₹{p.price?.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${p.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
                              {p.inStock ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                navigate(`/admin/edit-product/${p.id}`)
                              }
                              className="p-2 text-zinc-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 border border-zinc-100 dark:border-zinc-800">
                  <img
                    src={p.images?.[0]}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-lg text-zinc-900 dark:text-white truncate">
                      {p.name}
                    </h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-zinc-500">{p.scentType}</p>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className={`text-[9px] font-bold uppercase ${p.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
                          {p.inStock ? 'In Stock' : 'Out'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="font-bold text-brand-primary">
                      ₹{p.price?.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/edit-product/${p.id}`)}
                        className="p-2 text-zinc-400 hover:text-brand-primary bg-zinc-50 dark:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-50 dark:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 📱 Mobile FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/admin/add-product")}
        className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-brand-primary text-white rounded-full shadow-xl flex items-center justify-center z-[60]"
      >
        <Plus size={28} />
      </motion.button>
    </AdminLayout>
  );
};

export default AdminDashboard;
