import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";

export default function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "satwikgvaidya@gmail.com",
      href: "mailto:satwikgvaidya@gmail.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 857 867 2825",
      href: "tel:+18578672825",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Satwik-Vaidya",
      href: "https://github.com/Satwik-Vaidya",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/satwikgvaidya",
      href: "https://linkedin.com/in/satwikgvaidya",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <contact.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {contact.label}
                  </h3>
                  
                  <p className="text-gray-400 text-sm break-all">
                    {contact.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="mailto:satwikgvaidya@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            <Send className="w-5 h-5" />
            Send me a message
          </a>
        </motion.div>
      </div>
    </section>
  );
}