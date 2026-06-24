import React from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Experience from "./components/portfolio/Experience";
import Projects from "./components/portfolio/Projects";
import Awards from "./components/portfolio/Awards";
import Education from "./components/portfolio/Education";
import Activities from "./components/portfolio/Activities";
import Contact from "./components/portfolio/Contact";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#0A0A0A] text-gray-100 min-h-screen overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <Hero opacity={opacity} />

      {/* Main Content */}
      <main className="relative z-10">
        <About />
        <Experience />
        <Projects />
        <Awards /> 
        <Education />
        <Activities />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        <p className="text-sm">
          © 2025 Satwik G Vaidya. Crafted with passion and code.
        </p>
      </footer>
    </div>
  );
}