import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      toggleTheme: () =>
        set((state: ThemeState) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme-storage" },
  ),
);

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isAnimating: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  triggerAnimation: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isAnimating: false,
      addItem: (item: CartItem) => {
        const currentItems = [...get().items];
        const itemId = item.id || (item as any)._id;
        
        if (!itemId) return;

        const existingItem = currentItems.find((i) => i.id === itemId);
        
        if (existingItem) {
          existingItem.qty += 1;
          set({ items: currentItems, isAnimating: true });
        } else {
          set({ 
            items: [...currentItems, { ...item, id: itemId }], 
            isAnimating: true 
          });
        }
        
        setTimeout(() => set({ isAnimating: false }), 500);
      },
      removeItem: (id: string) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQty: (id: string, qty: number) => {
        const items = [...get().items];
        const item = items.find((i) => i.id === id);
        if (item) {
          item.qty = Math.max(1, qty);
          set({ items });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce(
          (acc: number, item: CartItem) => acc + item.price * item.qty,
          0,
        ),
      triggerAnimation: () => {
        set({ isAnimating: true });
        setTimeout(() => set({ isAnimating: false }), 500);
      },
    }),
    { name: "cart-storage" },
  ),
);

interface CartUIState {
  isOpen: boolean;
  toggleCart: (open?: boolean) => void;
}

export const useCartUIStore = create<CartUIState>()((set, get) => ({
  isOpen: false,
  toggleCart: (open) =>
    set({ isOpen: open !== undefined ? open : !get().isOpen }),
}));

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
  clearQuery: () => set({ query: "" }),
}));

/* ── Shop Settings (fetched once, shared globally) ──────────── */
interface ShopSettings {
  shopName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  instagram?: string;
  profilePic: string;
  coverPhotos: string[];
  location: { lat: number; lng: number };
}

interface ShopState {
  settings: ShopSettings | null;
  loading: boolean;
  setSettings: (s: ShopSettings) => void;
  fetchSettings: () => Promise<void>;
}

export const useShopStore = create<ShopState>()((set, get) => ({
  settings: null,
  loading: false,
  setSettings: (s: ShopSettings) => set({ settings: s }),
  fetchSettings: async () => {
    if (get().settings || get().loading) return; // already fetched or in-progress
    set({ loading: true });
    try {
      const { shopApi } = await import("../api/shopApi");
      const { data } = await shopApi.getSettings();
      set({ settings: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));

/* ── Checkout Modal (global so any component can trigger it) ──── */
interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CheckoutState {
  isOpen: boolean;
  items: CheckoutItem[];
  total: number;
  openCheckout: (items: CheckoutItem[], total: number) => void;
  closeCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  isOpen: false,
  items: [],
  total: 0,
  openCheckout: (items, total) => set({ isOpen: true, items, total }),
  closeCheckout: () => set({ isOpen: false, items: [], total: 0 }),
}));
