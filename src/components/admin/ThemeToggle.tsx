import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-3 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors border border-zinc-200 dark:border-white/5 shadow-sm"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
