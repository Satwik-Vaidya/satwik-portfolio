import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "iLeap.io - Thinkleap Labs",
      role: "AI Consultant & Former AI Intern",
      location: "Bangalore, India",
      period: "Nov 2024 – July 2025",
      promoted: true,
      achievements: [
        "Promoted from AI Intern to AI Consultant within 4 months",
        "Architected AI utilities including OCR, document summarization, and no-code ML system",
        "Led UI-UX and R&D team of 7 engineers for scalable AI solutions"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      company: "Zurn Elkay Water Solutions",
      role: "IoT Intern",
      location: "Hyderabad, India",
      period: "May 2024 – Oct 2024",
      achievements: [
        "Automated data pipelines via Python API integration for GI HLL Alarm",
        "Developed hybrid ML model for predictive maintenance system",
        "Reduced human dependency by 90% in grease interceptor monitoring"
      ],
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      company: "CrowToGrow",
      role: "Lead Web Developer & Marketing Specialist",
      location: "Bangalore, India",
      period: "Apr 2022 – Oct 2023",
      achievements: [
        "Led development of landing pages with 78% visual engagement rate",
        "Directed social media strategy delivering 200+ quality leads",
        "Managed cross-functional team for growth initiatives"
      ],
      gradient: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="space-y-12 relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className="flex-1 w-full">
                <div className={`inline-block w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm text-left">
                    {exp.promoted && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-4">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-cyan-400 font-medium">Promoted</span>
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-bold mb-2 text-white">{exp.role}</h3>
                    <h4 className={`text-xl font-semibold mb-4 bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>
                      {exp.company}
                    </h4>
                    
                    <div className="flex flex-wrap gap-4 mb-6 text-gray-400 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 text-left">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.gradient} flex-shrink-0`} />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="hidden md:block relative flex-shrink-0">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-lg`}>
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}