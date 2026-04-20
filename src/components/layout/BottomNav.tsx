import { Home, Search, ShoppingBag, UserPlus, Sparkles } from "lucide-react";
import { useCartStore, useShopStore, useCartUIStore } from "../../store/useStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "home", icon: Home, label: "Manor", path: "/" },
  { id: "perfumes", icon: Sparkles, label: "Scents", path: "/perfumes" },
  { id: "cart", icon: ShoppingBag, label: "Cart", path: null },
  { id: "contact", icon: UserPlus, label: "Save", path: null },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const { items, isAnimating } = useCartStore();
  const { toggleCart } = useCartUIStore();
  const shop = useShopStore((s) => s.settings);
  const cartCount = items.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    if (current) setActiveTab(current.id);
  }, [location.pathname]);

  const handleSaveContact = () => {
    const name = shop?.shopName || "Imperial";
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
N:;${name};;;
TEL;TYPE=CELL:${shop?.phone || ""}
EMAIL;TYPE=WORK:${shop?.email || ""}
ORG:${name}
TITLE:Premium Perfume Store
ADR;TYPE=WORK:;;${shop?.address || ""}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabClick = (id: string, path: string | null) => {
    if (id === "cart") {
      toggleCart(true);
    } else if (id === "contact") {
      handleSaveContact();
    } else if (path) {
      navigate(path);
      setActiveTab(id);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050706] to-transparent -top-20 pointer-events-none" />

        <div className="bg-[#050706]/80 backdrop-blur-3xl border-t border-white/10 px-4 pb-8 pt-4 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex justify-around items-end relative gap-1 max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              const isCartItem = item.id === "cart";

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id, item.path)}
                  className={`relative flex flex-col items-center justify-center transition-all duration-500 z-10 ${
                    isActive ? "text-emerald-400" : "text-zinc-500"
                  }`}
                >
                  <motion.div
                    animate={
                      isCartItem && isAnimating
                        ? {
                            scale: [1, 1.4, 1],
                            rotate: [0, -10, 10, -10, 10, 0],
                          }
                        : {}
                    }
                    whileTap={{ scale: 0.8 }}
                    className={`p-3 rounded-2xl transition-all duration-500 ${isActive ? "bg-emerald-500/10 mb-2" : "bg-transparent"}`}
                  >
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      className={`transition-all duration-500 ${isActive ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" : ""}`}
                    />
                    {isCartItem && cartCount > 0 && (
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-1 -right-1 bg-amber-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full border border-[#050706]"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </motion.div>

                  <span
                    className={`text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 h-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Floating Cart - Elegantly redesigned */}
      <div className="hidden md:block fixed bottom-12 right-12 z-50">
        <motion.button
          onClick={() => toggleCart(true)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          animate={
            isAnimating
              ? {
                  scale: [1, 1.2, 1],
                  y: [0, -20, 0],
                }
              : {}
          }
          className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center relative group border border-emerald-400/20 active:scale-95 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-emerald-700 rounded-full" />
          <ShoppingBag size={24} className="relative z-10" />
          {cartCount > 0 && (
            <AnimatePresence mode="wait">
              <motion.span
                key={cartCount}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg z-20 border-2 border-[#050706]"
              >
                {cartCount}
              </motion.span>
            </AnimatePresence>
          )}
          <div className="absolute inset-0 bg-white/20 translate-y-0 group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
        </motion.button>
      </div>
    </>
  );
};

export default BottomNav;
