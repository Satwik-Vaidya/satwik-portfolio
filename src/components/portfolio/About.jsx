import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Award, Brain, Users, Sparkles } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Built production-ready ML systems at iLeap & Zurn Elkay"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Best Project, Best Paper, All Rounder awards"
    },
    {
      icon: Users,
      title: "Leadership",
      description: "Founded AppX startup, led 12+ peers, 15+ seminars"
    },
    {
      icon: Sparkles,
      title: "Published Research",
      description: "Taylor & Francis publication on AI flood detection"
    }
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center">
            AI enthusiast, educator, and strategic leader with a track record of{" "}
            <span className="text-cyan-400 font-semibold">transforming ideas into impact</span>.
            Founded startups, spearheaded student tech clubs, and built real-world AI solutions
            at Zurn Elkay and iLeap. Dedicated to teaching and mentorship through U&I and
            Youth for Seva, with research published in{" "}
            <span className="text-blue-400 font-semibold">Taylor & Francis</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}