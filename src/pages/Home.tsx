import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { productApi, shopApi } from "../api";

import ContactSection from "../components/home/sections/ContactSection";
import SocialSection from "../components/home/sections/SocialSection";
import HeroSection from "../components/home/sections/HeroSection";
import BrandIdentitySection from "../components/home/sections/BrandIdentitySection";
import HorizontalPerfumes from "../components/home/sections/HorizontalPerfumes";
import ProductDetailsModal from "../components/ui/ProductDetailsModal";
import { Product } from "../types";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [shopSettings, setShopSettings] = useState<any>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    fetchShopSettings();
    fetchProducts();

    const hash = window.location.hash.replace("#", "");
    if (hash === "contact") {
      setTimeout(
        () =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" }),
        500,
      );
    }
  }, []);

  const fetchShopSettings = async () => {
    try {
      const { data } = await shopApi.getSettings();
      setShopSettings(data);
    } catch (error) {
      console.error("Error fetching shop settings:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await productApi.getAll();
      const mappedProducts = Array.isArray(data)
        ? data.map((p: any) => ({
            ...p,
            id: p._id,
          }))
        : [];
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${shopSettings?.shopName || "Store"}
N:;${shopSettings?.shopName?.split(" ")[0] || "Store"};;;
TEL;TYPE=CELL:${shopSettings?.phone || "+911234567890"}
EMAIL;TYPE=WORK:${shopSettings?.email || "support@zuvo.com"}
ORG:${shopSettings?.shopName || "Store"}
ADR;TYPE=WORK:;;${shopSettings?.address || "123 Premium Street, Hub Lane;Gadget City;;India"}
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${shopSettings?.shopName || "Store"}_Contact.vcf`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#011a14] font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden"
    >
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <HeroSection
        scrollYProgress={scrollYProgress}
        mousePos={mousePos}
        shopSettings={shopSettings}
        onExplore={() =>
          document
            .getElementById("horizontal-perfumes")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onBookAtelier={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <BrandIdentitySection
        scrollYProgress={scrollYProgress}
        shopSettings={shopSettings}
        onSaveContact={handleSaveContact}
      />

      <div id="horizontal-perfumes">
        <HorizontalPerfumes
          products={products}
          onProductClick={openProductDetails}
        />
      </div>

      <div id="contact" className="relative z-10 bg-[#011a14]">
        <ContactSection shopSettings={shopSettings} />
      </div>

      {/* Social Resonance */}
      <div id="social" className="relative z-10">
        <SocialSection shopSettings={shopSettings} />
      </div>
    </div>
  );
};

export default Home;
