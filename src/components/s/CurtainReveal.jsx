import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

// ============================================================
// CurtainReveal — Door-style curtain with multi-stage flow.
//
// Internal stages:
//   'ask'        → curtain closed, asks the question
//   'opening'    → user clicked yes; doors split open w/ push-forward
//   'titlecard'  → "welcome to S." title card appears
//   onAccept fires → parent swaps to SChat
//
// If user clicks "nah", onDecline fires immediately and parent
// flashes the decline message before swapping to Portfolio.
// ============================================================
export default function CurtainReveal({ onAccept, onDecline }) {
  const [stage, setStage] = useState('ask');

  const handleAccept = () => {
    setStage('opening');
    setTimeout(() => setStage('titlecard'), 1400);
    setTimeout(() => onAccept(), 2800);
  };

  const topDoorY =
    stage === 'opening' || stage === 'titlecard' ? '-150%' : '-50%';
  const bottomDoorY =
    stage === 'opening' || stage === 'titlecard' ? '150%' : '50%';
  const innerScale =
    stage === 'opening' || stage === 'titlecard' ? 1.08 : 1.0;

  // While the doors are closing, what's behind them stays
  // cool/dark (matches the portfolio peek). After "yes",
  // it warms up to the candle-amber room.
  const innerBg =
    stage === 'ask'
      ? 'radial-gradient(ellipse at top, #0a1929 0%, #050810 60%, #000 100%)'
      : 'linear-gradient(to bottom, #0c0a08 0%, #161210 100%)';

  const spotlightBg =
    stage === 'ask'
      ? 'radial-gradient(circle, rgba(34, 211, 238, 0.10) 0%, transparent 60%)'
      : 'radial-gradient(circle, rgba(212, 163, 115, 0.20) 0%, transparent 60%)';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Behind-the-doors room (scales on open) */}
      <motion.div
        animate={{ scale: innerScale }}
        transition={{ duration: 1.6, ease: [0.32, 0, 0.32, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: innerBg,
          transition: 'background 0.8s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 800,
            height: 800,
            background: spotlightBg,
            transition: 'background 0.8s ease-out',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Title card — appears once doors have opened */}
        <AnimatePresence>
          {stage === 'titlecard' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontStyle: 'italic',
                color: '#d4a373',
                letterSpacing: 1,
                textAlign: 'center',
                zIndex: 5,
              }}
            >
              welcome to S.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Door panels — black during 'ask', warm-edged when opening */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: topDoorY }}
        transition={
          stage === 'ask'
            ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            : { duration: 1.4, ease: [0.85, 0, 0.15, 1] }
        }
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background:
            stage === 'ask'
              ? 'linear-gradient(to bottom, #000000 0%, #050505 70%, #0a0a0a 100%)'
              : 'linear-gradient(to bottom, #000000 0%, #0c0a08 70%, #1a1410 100%)',
          transition: 'background 0.6s ease-out',
          boxShadow:
            stage !== 'ask' ? '0 12px 32px rgba(0, 0, 0, 0.6)' : 'none',
        }}
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: bottomDoorY }}
        transition={
          stage === 'ask'
            ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            : { duration: 1.4, ease: [0.85, 0, 0.15, 1] }
        }
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100%',
          background:
            stage === 'ask'
              ? 'linear-gradient(to top, #000000 0%, #050505 70%, #0a0a0a 100%)'
              : 'linear-gradient(to top, #000000 0%, #0c0a08 70%, #1a1410 100%)',
          transition: 'background 0.6s ease-out',
          boxShadow:
            stage !== 'ask' ? '0 -12px 32px rgba(0, 0, 0, 0.6)' : 'none',
        }}
      />

      {/* The question + CTAs — visible only during 'ask' */}
      <AnimatePresence>
        {stage === 'ask' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '0 24px',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 600,
                height: 600,
                background:
                  'radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, transparent 60%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              style={{
                fontFamily:
                  '"Instrument Serif", "EB Garamond", serif',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontStyle: 'italic',
                color: '#e8ddc7',
                maxWidth: 720,
                lineHeight: 1.2,
                marginBottom: 48,
                zIndex: 2,
              }}
            >
              wait — do you wanna do<br />something interesting?
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
              style={{
                display: 'flex',
                gap: 20,
                flexWrap: 'wrap',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <button
                onClick={handleAccept}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  fontWeight: 500,
                  padding: '16px 32px',
                  background: '#d4a373',
                  color: '#1a1410',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  letterSpacing: 1,
                  textTransform: 'lowercase',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e8c19e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#d4a373';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                yes, show me →
              </button>
              <button
                onClick={onDecline}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 400,
                  padding: '16px 24px',
                  background: 'transparent',
                  color: '#8a7a65',
                  border: '1px solid #3a3024',
                  borderRadius: 4,
                  cursor: 'pointer',
                  letterSpacing: 1,
                  textTransform: 'lowercase',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#d4a373')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#8a7a65')
                }
              >
                nah, just the portfolio
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}