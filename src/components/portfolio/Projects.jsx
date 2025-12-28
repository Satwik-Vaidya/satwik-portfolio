import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Brain, Droplet, Calendar, Users } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "AI-Based Urban Flood Detection & Rescue System",
      description: "ML-driven flood prediction and rescue recommendation using geo-spatial fluid dynamics analysis with historic data for optimized response",
      tech: ["Scikit-learn", "TensorFlow", "GeoPandas", "Python"],
      achievements: [
        "Best Project Award",
        "Best Paper Award",
        "Published in Taylor & Francis proceedings"
      ],
      icon: Brain,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "ML-Based Water Leakage Detection",
      description: "Recurrent Neural Network model to detect water leakage anomalies and minimize waste through predictive analysis",
      tech: ["RNN", "Python", "TensorFlow"],
      icon: Droplet,
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      title: "Event Management System",
      description: "Full-stack event management platform with server-side logic and relational data management for seamless event organization",
      tech: ["ExpressJS", "MySQL", "Node.js"],
      icon: Calendar,
      gradient: "from-teal-500 to-green-500"
    },
    {
      title: "Samyog - ISE Student Chapter",
      description: "Digital hub for students featuring live polling, event creation, real-time notifications, and academic resource sharing",
      tech: ["React", "Firebase", "Tailwind CSS"],
      link: "https://samyogappx.netlify.app/",
      icon: Users,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
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
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6`}>
                    <project.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Achievements */}
                  {project.achievements && (
                    <div className="mb-6 space-y-2">
                      {project.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2 text-cyan-400 text-sm">
                          <Award className="w-4 h-4" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}