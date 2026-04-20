import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, Globe, Zap, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "../../components/admin/ThemeToggle";
import { authApi } from "../../api/authApi";
import { useShopStore } from "../../store/useStore";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the page the user was trying to visit, or dashboard
  const from = (location.state as any)?.from?.pathname || "/admin/dashboard";
  const shopName = useShopStore((s) => s.settings?.shopName || "Store");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await authApi.login({ email, password });
      localStorage.setItem("adminAccessToken", data.accessToken);
      localStorage.setItem("adminRefreshToken", data.refreshToken);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      navigate(from, { replace: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Connection failed. Please check your internet.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex overflow-hidden font-sans transition-colors duration-500">
      {/* 🎨 Left Side: Elegant Minimalist Context */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-[20s] scale-110"
            alt="Minimal Tech"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900" />
        </div>

        <div className="relative z-10 p-16 flex flex-col justify-between w-full h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-xl shadow-brand-primary/20">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight uppercase">
              {shopName}
            </span>
          </div>

          <div className="max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-white tracking-tight leading-tight mb-6"
            >
              Manage your <br />{" "}
              <span className="text-brand-primary">Store.</span>
            </motion.h1>
            <p className="text-zinc-400 font-medium text-lg leading-relaxed">
              Access your administrative dashboard to manage inventory, track
              sales, and customize your retail presence.
            </p>
          </div>

          <div className="flex items-center gap-8 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 underline underline-offset-4">
              <Globe size={14} /> Global Hub
            </span>
            <span className="flex items-center gap-2">
              <Zap size={14} /> Ultra Fast
            </span>
          </div>
        </div>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      </div>

      {/* 🔐 Right Side: Clean Login Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm"
        >
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Admin Login
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">
                Welcome back! Please enter your details.
              </p>
            </div>
            <ThemeToggle />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1 italic">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand-primary transition-colors"
                  size={16}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl py-4 pl-12 pr-5 font-semibold text-sm focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none dark:text-white shadow-sm"
                  placeholder="admin@zuvo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1 italic">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand-primary transition-colors"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl py-4 pl-12 pr-12 font-semibold text-sm focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none dark:text-white shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-3 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-[11px] font-bold text-center">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/5 mt-4 group"
            >
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && (
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </button>
          </form>

          <div className="mt-12 flex items-center justify-center opacity-40">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              <ShieldCheck size={14} />
              <span>Enterprise Security v2.4</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
