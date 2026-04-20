import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  useThemeStore,
  useShopStore,
  useCheckoutStore,
} from "./store/useStore";
import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";
import Home from "./pages/Home";
import Perfumes from "./pages/Perfumes";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
import CheckoutModal from "./components/ui/CheckoutModal";
import LoadingScreen from "./components/ui/LoadingScreen";
import CartModal from "./components/ui/CartModal";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import StoreSettings from "./pages/admin/StoreSettings";
import ScentTypeManagement from "./pages/admin/CategoryManagement";

// Auth Guards
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const { isOpen, items, total, closeCheckout } = useCheckoutStore();
  const shopPhone = useShopStore((s) => s.settings?.phone || "");

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {!isAdminPage && <Navbar />}
      <main className={`flex-grow ${!isAdminPage ? "pb-32 md:pb-0" : ""}`}>
        {children}
      </main>
      {!isAdminPage && <BottomNav />}
      {!isAdminPage && <Footer />}

      {/* Global Checkout Modal */}
      <CheckoutModal
        isOpen={isOpen}
        onClose={closeCheckout}
        items={items}
        total={total}
        shopPhone={shopPhone}
      />

      {/* Global Cart Modal */}
      {!isAdminPage && <CartModal />}
    </div>
  );
};

function App() {
  const { theme } = useThemeStore();
  const fetchSettings = useShopStore((s) => s.fetchSettings);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    fetchSettings();

    // Smooth initial entrance
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [fetchSettings]);

  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <LoadingScreen isLoading={isInitialLoading} />
      <MainLayout>
        <Routes>
          {/* Public Customer Route */}
          <Route path="/" element={<Home />} />
          <Route path="/perfumes" element={<Perfumes />} />
          <Route path="/about" element={<About />} />

          {/* Admin Login — redirects to dashboard if already logged in */}
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* Protected Admin Routes — requires valid JWT */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <StoreSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <ScentTypeManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
