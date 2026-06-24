import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Award } from "lucide-react";

export default function Awards() {
  // recent -> oldest
  const awards = [
    {
      date: "Late 2025",
      title: "Emerging Graduate Leader",
      org: "Lead360 · Northeastern University",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      date: "Mid 2025",
      title: "Apex: All Rounder Award",
      org: "JSS · Undergraduate",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      date: "Mid 2025",
      title: "Best Project Award",
      org: "AI Urban Flood Detection & Rescue System",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      date: "Mid 2025",
      title: "Best Paper Award",
      org: "AI Urban Flood Detection & Rescue System",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      date: "Mid 2025",
      title: "Taylor & Francis Publication",
      org: "Peer-reviewed book chapter",
      gradient: "from-teal-500 to-green-500"
    },
    {
      date: "Mid 2024",
      title: "Manthan Finalist",
      org: "Government of Karnataka · Hubs",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="awards" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Awards & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex items-start gap-5">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${award.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    {/* Date */}
                    <span className="text-cyan-400 text-sm font-medium">{award.date}</span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mt-1 mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                      {award.title}
                    </h3>

                    {/* Org */}
                    <p className="text-gray-400 leading-relaxed">
                      {award.org}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}