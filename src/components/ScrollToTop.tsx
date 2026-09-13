import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverBlue, setIsOverBlue] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsVisible(scrollY > 300);

      const footer = document.getElementById('app-footer') || document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const buttonY = window.innerHeight * 0.5;
        setIsOverBlue(rect.top <= buttonY && rect.bottom >= buttonY);
      } else {
        setIsOverBlue(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40"
          style={{ position: 'fixed', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', zIndex: 40 }}
          id="scroll-to-top-container"
        >
          <button
            type="button"
            onClick={scrollToTop}
            style={{
              backgroundColor: isOverBlue ? '#ea580c' : '#ffffff',
              color: isOverBlue ? '#ffffff' : '#0f172a',
              borderColor: isOverBlue ? '#f97316' : '#e2e8f0',
              boxShadow: isOverBlue
                ? '0 10px 25px -3px rgba(234, 88, 12, 0.6), 0 4px 12px -2px rgba(0, 0, 0, 0.3)'
                : '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            }}
            className="group relative h-12 w-12 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:-translate-y-1"
            aria-label="Volver arriba de la página"
            title="Volver arriba"
            id="scroll-to-top-btn"
          >
            <ArrowUp
              className="h-5 w-5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5"
              style={{ stroke: isOverBlue ? '#ffffff' : '#0f172a' }}
            />

            {/* Hover Tooltip */}
            <span className="absolute right-14 bg-slate-950/95 border border-slate-800 text-white font-medium text-[11px] py-1 px-2.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-sans">
              Volver arriba
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
