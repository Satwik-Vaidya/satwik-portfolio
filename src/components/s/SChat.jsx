import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Typewriter from './Typewriter';
import {
  dialogue,
  finalQuestionPrompt,
  initialChips,
  CONTACT,
} from './dialogue';
import { askS, resolveMaxQuestions } from './llmClient';

// ============================================================
// SChat — Donna-coded waiting-room chat.
//
// Architecture:
//   - First chip click (visitor type) sets visitorType state.
//   - Each subsequent message → calls askS() (the real API).
//   - If API call throws, falls back to mocked dialogue.js path.
//   - Question count capped at maxQuestions:
//       * Dev (Vite DEV mode): Infinity → stress-test freely
//       * Prod: 4 → graceful exit
//
// onExit(reason) fires when the visitor leaves S.
//   reason: 'curtain-decline' | 'mid-conversation' | 'exit-screen'
// ============================================================

const CHIP_TO_VISITOR_TYPE = {
  friend: 'friend',
  theone: 'theone',
  recruiter: 'recruiter',
  meta: 'meta',
};

export default function SChat({ onExit }) {
  const [messages, setMessages] = useState([]);
  const [currentChips, setCurrentChips] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [exitTriggered, setExitTriggered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [greetingDone, setGreetingDone] = useState(false);
  const [visitorType, setVisitorType] = useState('unknown');
  const [engineLabel, setEngineLabel] = useState(null);
  const chatEndRef = useRef(null);

  const maxQuestions = resolveMaxQuestions();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const t = setTimeout(() => {
      setMessages([
        {
          from: 's',
          text: "oh — hi.\n\nyou're here for satwik. tell me who you are, i'll figure out if he's free.",
          typewriter: true,
        },
      ]);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (greetingDone && currentChips.length === 0 && questionCount === 0) {
      const t = setTimeout(() => setCurrentChips(initialChips), 350);
      return () => clearTimeout(t);
    }
  }, [greetingDone]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendToS = async ({ userText, chipId, isFreetext }) => {
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    setCurrentChips([]);
    setIsTyping(true);

    const newCount = questionCount + 1;
    setQuestionCount(newCount);

    let nextVisitorType = visitorType;
    if (questionCount === 0 && chipId && CHIP_TO_VISITOR_TYPE[chipId]) {
      nextVisitorType = CHIP_TO_VISITOR_TYPE[chipId];
      setVisitorType(nextVisitorType);
    }

    const historyForApi = [
      ...messages,
      { from: 'user', text: userText },
    ].filter((m) => !m.isExit);

    try {
      const result = await askS({
        visitorType: nextVisitorType,
        questionNumber: newCount,
        maxQuestions,
        conversationHistory: historyForApi,
        currentUserMessage: userText,
        isFreetext: !!isFreetext,
      });

      setIsTyping(false);
      setEngineLabel(result.engine_used);

      setMessages((prev) => [
        ...prev,
        { from: 's', text: result.response },
      ]);

      const atCap = Number.isFinite(maxQuestions) && newCount >= maxQuestions;

      if (atCap) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              from: 's',
              text: finalQuestionPrompt.response,
              isExit: true,
            },
          ]);
          setExitTriggered(true);
        }, 1200);
      } else if (result.next_chips && result.next_chips.length > 0) {
        setCurrentChips(result.next_chips);
      } else {
        setCurrentChips([
          { id: 'auto-more', label: 'tell me more' },
          { id: 'auto-different', label: 'something different' },
        ]);
      }
    } catch (err) {
      console.warn('[SChat] askS failed, falling back to mock:', err.message);
      setEngineLabel('mock');

      const entry = chipId ? dialogue[chipId] : null;

      setIsTyping(false);

      const fallbackResponse = entry?.response
        ? entry.response
        : "hm, my line to the model just dropped. real-life satwik is one email away — emailing is free anyway 😎\n\n— S";

      setMessages((prev) => [
        ...prev,
        { from: 's', text: fallbackResponse },
      ]);

      const atCap = Number.isFinite(maxQuestions) && newCount >= maxQuestions;

      if (atCap || !entry?.chips) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              from: 's',
              text: finalQuestionPrompt.response,
              isExit: true,
            },
          ]);
          setExitTriggered(true);
        }, 1200);
      } else {
        setCurrentChips(entry.chips);
      }
    }
  };

  const handleChipClick = (chip) => {
    if (chip.isExit) {
      onExit('mid-conversation');
      return;
    }
    sendToS({ userText: chip.label, chipId: chip.id, isFreetext: false });
  };

  const handleFreeText = (e) => {
    if (e.key === 'Enter' && userInput.trim() && !isTyping) {
      const text = userInput.trim();
      setUserInput('');
      sendToS({ userText: text, chipId: null, isFreetext: true });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to bottom, #0c0a08 0%, #161210 100%)',
        color: '#e8ddc7',
        fontFamily: '"EB Garamond", Georgia, serif',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 40,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center top, rgba(212, 163, 115, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <header
        style={{
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 163, 115, 0.1)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 28,
            fontStyle: 'italic',
            color: '#d4a373',
            letterSpacing: 1,
          }}
        >
          S
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: '#8a7a65',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            <span
              className="s-blink"
              style={{ color: '#d4a373', marginRight: 8 }}
            >
              ●
            </span>
            {Number.isFinite(maxQuestions)
              ? `${questionCount}/${maxQuestions}`
              : `q${questionCount} · dev`}
            {engineLabel && (
              <span style={{ marginLeft: 10, opacity: 0.7 }}>
                · {engineLabel}
              </span>
            )}
          </div>
          <button
            onClick={() => onExit('mid-conversation')}
            title="leave S, go to standard portfolio"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 500,
              padding: '8px 14px',
              background: 'transparent',
              color: '#8a7a65',
              border: '1px solid rgba(138, 122, 101, 0.3)',
              borderRadius: 4,
              cursor: 'pointer',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#d4a373';
              e.currentTarget.style.borderColor = '#d4a373';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#8a7a65';
              e.currentTarget.style.borderColor =
                'rgba(138, 122, 101, 0.3)';
            }}
          >
            ✕ exit AI
          </button>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 24px',
          position: 'relative',
          zIndex: 2,
        }}
        className="s-scrollbar-hidden"
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  marginBottom: 24,
                  display: 'flex',
                  justifyContent:
                    msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    fontSize: msg.from === 's' ? 19 : 16,
                    lineHeight: 1.55,
                    color: msg.from === 's' ? '#e8ddc7' : '#a8967a',
                    fontStyle: msg.from === 's' ? 'normal' : 'italic',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.from === 's' && (
                    <div
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 10,
                        color: '#8a7a65',
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        marginBottom: 6,
                      }}
                    >
                      — S
                    </div>
                  )}
                  {msg.typewriter ? (
                    <Typewriter
                      text={msg.text}
                      onDone={() => {
                        if (i === 0) setGreetingDone(true);
                      }}
                    />
                  ) : (
                    msg.text
                  )}

                  {msg.isExit && (
                    <div
                      style={{
                        marginTop: 24,
                        display: 'flex',
                        gap: 12,
                        flexWrap: 'wrap',
                      }}
                    >
                      <button
                        onClick={() => onExit('exit-screen')}
                        style={{
                          fontFamily:
                            '"JetBrains Mono", monospace',
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '12px 20px',
                          background: '#d4a373',
                          color: '#1a1410',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          letterSpacing: 1,
                        }}
                      >
                        ▸ browse the standard page
                      </button>

                      <a
                        href={`mailto:${CONTACT.email}`}
                        style={{
                          fontFamily:
                            '"JetBrains Mono", monospace',
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '12px 20px',
                          background: 'transparent',
                          color: '#d4a373',
                          border: '1px solid #d4a373',
                          borderRadius: 4,
                          textDecoration: 'none',
                          letterSpacing: 1,
                        }}
                      >
                        ▸ email satwik (it's free anyway 😎)
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 24,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  color: '#8a7a65',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                — S
              </div>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    width: 6,
                    height: 6,
                    background: '#d4a373',
                    borderRadius: '50%',
                    marginLeft: i === 0 ? 8 : 0,
                  }}
                />
              ))}
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>
      </main>
            {!exitTriggered && (
        <footer
          style={{
            padding: '20px 24px 28px',
            borderTop: '1px solid rgba(212, 163, 115, 0.1)',
            position: 'relative',
            zIndex: 2,
            background: 'rgba(12, 10, 8, 0.6)',
          }}
        >
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <AnimatePresence>
              {currentChips.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  {currentChips.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleChipClick(chip)}
                      style={{
                        fontFamily: '"EB Garamond", serif',
                        fontSize: 15,
                        padding: '10px 16px',
                        background: chip.isExit
                          ? 'transparent'
                          : 'rgba(212, 163, 115, 0.08)',
                        color: chip.isExit ? '#8a7a65' : '#e8ddc7',
                        border: `1px solid ${
                          chip.isExit
                            ? 'rgba(138, 122, 101, 0.3)'
                            : 'rgba(212, 163, 115, 0.3)'
                        }`,
                        borderRadius: 4,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          'rgba(212, 163, 115, 0.18)';
                        e.currentTarget.style.borderColor = '#d4a373';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = chip.isExit
                          ? 'transparent'
                          : 'rgba(212, 163, 115, 0.08)';
                        e.currentTarget.style.borderColor = chip.isExit
                          ? 'rgba(138, 122, 101, 0.3)'
                          : 'rgba(212, 163, 115, 0.3)';
                      }}
                    >
                      {chip.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: 'rgba(232, 221, 199, 0.04)',
                border: '1px solid rgba(212, 163, 115, 0.15)',
                borderRadius: 4,
              }}
            >
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: '#d4a373',
                  fontSize: 14,
                }}
              >
                ▸
              </span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleFreeText}
                placeholder="or ask anything..."
                disabled={isTyping}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#e8ddc7',
                  fontFamily: '"EB Garamond", serif',
                  fontSize: 16,
                }}
              />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}