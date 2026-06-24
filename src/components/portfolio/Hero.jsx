import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero({ opacity }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20" />
        {(() => {
          const det = (n) => Math.abs(Math.sin(n));
          const stars = Array.from({ length: 50 }).map((_, i) => {
            const left = `${(det(i * 12.9898 + 78.233) * 100).toFixed(2)}%`;
            const top = `${(det(i * 7.123 + 3.14) * 100).toFixed(2)}%`;
            const duration = 3 + det(i * 5.123 + 12) * 2;
            const delay = det(i * 3.7 + 7) * 2;
            return { left, top, duration, delay };
          });
          return stars.map((s, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{ left: s.left, top: s.top }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
            />
          ));
        })()}
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Available for opportunities</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4">
            <motion.span
              className="inline-block bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Satwik
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-200 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Girish 
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Vaidya
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-4xl font-light text-gray-300 tracking-wide">
            AI Enthusiast · Educator · Strategic Leader
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into impact through artificial intelligence,
            <br className="hidden md:block" />
            innovative solutions, and passionate mentorship
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-6 mt-12"
        >
          {/* Primary Actions Row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-4 border border-gray-700 text-gray-300 font-medium rounded-full hover:bg-gray-800/50 transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.a>
          </div>

          {/* New Dimension CTA */}
          <motion.a
            href="/capture.html"
            className="group relative inline-flex items-center gap-2 px-8 py-4 border border-cyan-500/40 text-cyan-300 italic font-light rounded-full hover:bg-cyan-500/10 hover:border-cyan-400/70 hover:text-cyan-200 transition-all backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter a new dimension
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 not-italic">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <ChevronDown className="w-8 h-8 text-gray-500" />
      </motion.button>
    </section>
  );
}   