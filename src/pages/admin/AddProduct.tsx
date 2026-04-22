import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Tag,
  IndianRupee,
  ImageIcon,
  Zap,
  Eye,
  X,
  Upload,
  Loader2,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { scentTypeApi } from "../../api/categoryApi";
import { uploadApi } from "../../api/uploadApi";
import { productApi } from "../../api/productApi";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    scentType: "",
    description: "",
    images: [""],
    inStock: true,
  });

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await scentTypeApi.getAll();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleFileUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(index);
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const { data } = await uploadApi.uploadImage(uploadData);
      handleImageChange(index, data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await productApi.create({
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : undefined,
      });
      toast.success("Product successfully added.");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const PreviewContent = () => (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Preview
        </span>
        <button
          className="lg:hidden p-2 text-zinc-400"
          onClick={() => setShowPreview(false)}
        >
          <X size={20} />
        </button>
      </div>

      <div className="aspect-square rounded-2xl bg-zinc-50 dark:bg-zinc-800 overflow-hidden mb-6 border border-zinc-100 dark:border-zinc-800">
        {formData.images[0] ? (
          <img
            src={formData.images[0]}
            className="w-full h-full object-cover"
            alt=""
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-2">
            <ImageIcon size={48} strokeWidth={1} />
            <span className="text-xs font-bold uppercase tracking-widest">
              No Image
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white truncate">
            {formData.name || "Product Name"}
          </h3>
          {formData.scentType && (
            <p className="text-brand-primary font-bold text-xs uppercase mt-1">
              {formData.scentType}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${formData.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${formData.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
            {formData.inStock ? 'Available' : 'Out of Stock'}
          </span>
        </div>
      </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2">
          {formData.description || "Product description will appear here."}
        </p>

        <div className="flex items-end justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <p className="text-xs text-zinc-400 font-bold mb-1">Price</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              ₹{formData.price || "0"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white">
            <Zap size={20} fill="currentColor" />
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout
      title="Add Product"
      subtitle="Fill in the details below to add a new product to your store."
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 📝 Product Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg">
                <Tag size={20} />
              </div>
              <h3 className="font-bold text-lg dark:text-white">
                Product Details
              </h3>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase px-1">
                    Product Name
                  </label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Wireless Headphones"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 rounded-xl text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase px-1">
                    Scent Type
                  </label>
                  <select
                    name="scentType"
                    required
                    value={formData.scentType}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 rounded-xl text-sm dark:text-white outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Scent Type</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase px-1">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell something about this product..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 rounded-xl text-sm dark:text-white outline-none focus:border-brand-primary transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <IndianRupee size={20} />
              </div>
              <h3 className="font-bold text-lg dark:text-white">Pricing</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase px-1">
                  Sale Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 rounded-xl font-bold text-lg dark:text-white outline-none focus:border-brand-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase px-1">
                  Regular Price (₹)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 rounded-xl font-bold text-lg dark:text-zinc-500 outline-none focus:border-brand-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${formData.inStock ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Product Availability</h3>
                  <p className="text-xs text-zinc-500">Toggle whether this product is visible/purchasable</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, inStock: !prev.inStock }))}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${formData.inStock ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${formData.inStock ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <ImageIcon size={20} />
                </div>
                <h3 className="font-bold text-lg dark:text-white">Images</h3>
              </div>
              <button
                type="button"
                onClick={addImageField}
                className="text-xs font-bold text-brand-primary hover:underline"
              >
                + Add More
              </button>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {formData.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          value={img}
                          onChange={(e) =>
                            handleImageChange(idx, e.target.value)
                          }
                          placeholder="Image URL or upload"
                          className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 pr-12 rounded-xl text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                        />
                        <label className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-brand-primary cursor-pointer transition-colors">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(idx, e)}
                          />
                          {uploading === idx ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Upload size={18} />
                          )}
                        </label>
                      </div>
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(idx)}
                          className="w-12 h-12 flex items-center justify-center text-red-500 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20 active:scale-95 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-4 pb-12">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Adding Product..." : "Save Product"}
            </button>
          </div>
        </form>

        {/* Desktop Preview */}
        <aside className="hidden lg:block w-80">
          <div className="sticky top-24">
            <PreviewContent />
          </div>
        </aside>

        {/* Mobile Preview Toggle */}
        <button
          onClick={() => setShowPreview(true)}
          className="lg:hidden fixed bottom-24 right-4 w-12 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl shadow-xl z-50 flex items-center justify-center"
        >
          <Eye size={20} />
        </button>

        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4 flex flex-col justify-center"
            >
              <PreviewContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
