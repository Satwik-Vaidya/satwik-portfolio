import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Portfolio from './Portfolio';
import CurtainReveal from './components/s/CurtainReveal';
import SChat from './components/s/SChat';
import { declineMessage, exitMessage } from './components/s/dialogue';

const SExperienceStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

    @keyframes s-blink-kf {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .s-blink { animation: s-blink-kf 1.2s infinite; }
    .s-caret {
      display: inline-block;
      width: 2px;
      height: 0.9em;
      background: #d4a373;
      margin-left: 3px;
      vertical-align: text-bottom;
      animation: s-blink-kf 0.9s infinite;
    }
    .s-scrollbar-hidden::-webkit-scrollbar { display: none; }
    .s-scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }

    body.s-overlay-active { overflow: hidden; }
  `}</style>
);

export default function SExperience({ onComplete }) {
  const [phase, setPhase] = useState('peek');
  const [flashText, setFlashText] = useState('');
  const [exitReason, setExitReason] = useState(null);

  useEffect(() => {
    if (phase === 'peek') {
      const t = setTimeout(() => setPhase('curtain'), 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'flash') {
      const t = setTimeout(() => {
        setPhase('done');
        if (onComplete) onComplete(exitReason);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete, exitReason]);

  useEffect(() => {
    const overlayActive =
      phase === 'curtain' ||
      phase === 's' ||
      phase === 'flash' ||
      phase === 'peek';
    if (overlayActive) {
      document.body.classList.add('s-overlay-active');
    } else {
      document.body.classList.remove('s-overlay-active');
    }
    return () => document.body.classList.remove('s-overlay-active');
  }, [phase]);

  const handleCurtainDecline = () => {
    setExitReason('curtain-decline');
    setFlashText(declineMessage);
    setPhase('flash');
  };

  const handleSExit = (reason) => {
    setExitReason(reason);
    setFlashText(exitMessage);
    setPhase('flash');
  };

  const showBackdrop = phase === 's' || phase === 'flash';

  return (
    <>
      <SExperienceStyles />
      <Portfolio />

      <AnimatePresence>
        {showBackdrop && (
          <motion.div
            key="s-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'linear-gradient(to bottom, #0c0a08 0%, #161210 100%)',
              zIndex: 35,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'curtain' && (
          <motion.div key="curtain">
            <CurtainReveal
              onAccept={() => setPhase('s')}
              onDecline={handleCurtainDecline}
            />
          </motion.div>
        )}

        {phase === 's' && (
          <motion.div
            key="s"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SChat onExit={handleSExit} />
          </motion.div>
        )}

        {phase === 'flash' && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              textAlign: 'center',
              fontFamily: '"Instrument Serif", "EB Garamond", serif',
              zIndex: 200,
            }}
          >
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontStyle: 'italic',
                color: '#d4a373',
                lineHeight: 1.5,
                maxWidth: 720,
                whiteSpace: 'pre-line',
              }}
            >
              {flashText}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
