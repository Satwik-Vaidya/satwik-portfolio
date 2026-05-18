import { useState, useEffect, useRef } from 'react';

// ============================================================
// Typewriter — types text character-by-character with a
// blinking caret. Calls onDone when finished.
// ============================================================
export default function Typewriter({ text, speed = 22, onDone }) {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setShown('');
    setDone(false);

    const interval = setInterval(() => {
      idxRef.current += 1;
      if (idxRef.current >= text.length) {
        setShown(text);
        setDone(true);
        clearInterval(interval);
        if (onDone) onDone();
      } else {
        setShown(text.slice(0, idxRef.current));
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      {shown}
      {!done && <span className="s-caret" />}
    </>
  );
}