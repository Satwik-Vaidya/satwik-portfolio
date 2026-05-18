import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Rocket, Heart, Award } from "lucide-react";

export default function Activities() {
  const activities = [
    {
      title: "Founder & CEO - AppX Student Startup",
      description: "Spearheaded development and growth of student-led innovation startup, mentoring 12 peers and driving initiatives across technology, marketing, and team leadership",
      icon: Rocket,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Club Leadership",
      description: "Founded and led multiple departmental clubs, integrating technical, leadership, and social learning through 15+ events and workshops",
      icon: Award,
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      title: "Social Service - Youth for Seva & U&I",
      description: "Lead Volunteer managing educational programs through Chhote Scientist Program. Taught Science, Technology, and English to underprivileged kids through hands-on experiments",
      icon: Heart,
      gradient: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section id="activities" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Beyond Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
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
                
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activity.gradient} flex items-center justify-center mb-6`}>
                    <activity.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {activity.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}