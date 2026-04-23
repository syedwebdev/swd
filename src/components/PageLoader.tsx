import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const PageLoader = () => {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
    setShow(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={key}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background pointer-events-none"
        >
          {/* Sliding panels */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="absolute inset-x-0 top-0 h-1/2 bg-background"
          />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
          />

          {/* Center divider glow line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-1/2 h-px origin-center"
            style={{ background: 'var(--gradient-text)', boxShadow: '0 0 20px hsl(var(--cyan) / 0.6)' }}
          />

          {/* Logo reveal */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan to-magenta flex items-center justify-center shadow-[0_0_60px_hsl(var(--cyan)/0.5)]"
            >
              <motion.span
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="font-display font-bold text-primary-foreground text-4xl"
              >
                S
              </motion.span>
              {/* Pulsing ring */}
              <motion.span
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl border-2 border-cyan"
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="overflow-hidden"
            >
              <div className="font-display font-bold text-xl tracking-wide">
                <span className="text-foreground">Syed</span>
                <span className="gradient-text"> Web</span>
              </div>
            </motion.div>

            {/* Loader bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-px bg-border overflow-hidden relative"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity }}
                className="absolute inset-0"
                style={{ background: 'var(--gradient-text)' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
