'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'idle' | 'enter' | 'textOut' | 'exit' | 'done';

export default function LogoIntro() {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    // t=0   : overlay visible, start enter animation
    // t=1.4s: text slides out
    // t=2.2s: overlay fades out
    // t=2.8s: unmount
    const t0 = setTimeout(() => setPhase('enter'),   20);
    const t1 = setTimeout(() => setPhase('textOut'), 1400);
    const t2 = setTimeout(() => setPhase('exit'),    2200);
    const t3 = setTimeout(() => setPhase('done'),    2800);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, []);

  if (phase === 'done') return null;

  return (
    <motion.div
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

        {/* Icon — always visible once entered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase === 'idle' ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/assets/Confideleap-icon.png"
            alt="ConfideLeap"
            style={{ height: '72px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
          />
        </motion.div>

        {/* Company name — slides in then out */}
        <AnimatePresence>
          {(phase === 'enter') && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.35 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}
            >
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                color: '#0e2530',
                letterSpacing: '-0.04em',
              }}>
                ConfideLeap
              </span>
              <span style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
                color: '#0ea5c6',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}>
                Partners
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={phase === 'idle' ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.9, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #0ea5c6, #8b5cf6)',
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  );
}
