import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

export default function Education() {
  const education = [
    {
      institution: "Northeastern University",
      degree: "Master of Science in Computer Science",
      location: "Boston, MA",
      period: "2025 – 2027",
      gradient: "from-blue-500 to-cyan-500",
      upcoming: true
    },
    {
      institution: "JSS Academy of Technical Education",
      degree: "B.E. in Information Science and Engineering",
      location: "Bangalore, India",
      period: "2021 – 2025",
      gpa: "8.7/10",
      gradient: "from-cyan-500 to-teal-500"
    }
  ];

  return (
    <section id="education" className="py-32 px-6 bg-gradient-to-b from-gray-900/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${edu.gradient} flex items-center justify-center mb-6`}>
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>

                  {/* Upcoming Badge */}
                  {edu.upcoming && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-4">
                      <span className="text-xs text-cyan-400 font-medium">Upcoming</span>
                    </div>
                  )}

                  {/* Institution */}
                  <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent`}>
                    {edu.institution}
                  </h3>

                  {/* Degree */}
                  <p className="text-xl text-white font-semibold mb-6">
                    {edu.degree}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
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