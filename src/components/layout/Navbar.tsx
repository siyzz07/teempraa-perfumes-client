import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Perfumes", path: "/perfumes" },
    { name: "Heritage", path: "/#gallery" },
  ];

  const handleNav = (path: string) => {
    if (path.startsWith("/#")) {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        const id = path.split("#")[1];
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 font-display hidden md:flex ${
        isScrolled
          ? "py-6 px-10 md:px-24 bg-black/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl"
          : "py-12 px-12 md:px-24 bg-transparent"
      }`}
    >
      <div className="max-w-[2200px] h-10 md:h-20 w-full mx-auto flex justify-between items-center">
        {/* Left Section: Brand Anchor (Logo Area) */}
        <div className="flex-1 flex justify-start">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer relative"
          >
            {/* Logo would go here if available */}
          </motion.div>
        </div>

        {/* Center Section: Core Navigation */}
        <div className="flex-[2] flex justify-center items-center gap-16">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNav(link.path)}
              className="group relative text-[13px] font-bold font-black uppercase tracking-[0.6em] text-white hover:text-white transition-all duration-500 whitespace-nowrap"
            >
              {link.name}
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </button>
          ))}
        </div>

        {/* Right Section: Focus Bag */}
        <div className="flex-1 flex items-center justify-end gap-10">
          {/* Bag Icon or Search could go here */}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
