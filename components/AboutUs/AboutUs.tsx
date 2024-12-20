"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Shield, Target, Award } from "lucide-react";

const stats = [
  { 
    icon: <Users className="w-6 h-6" />,
    value: "10M+", 
    label: "Active Users" 
  },
  { 
    icon: <Shield className="w-6 h-6" />,
    value: "99.9%", 
    label: "Security Score" 
  },
  { 
    icon: <Target className="w-6 h-6" />,
    value: "95%", 
    label: "Accuracy Rate" 
  },
  { 
    icon: <Award className="w-6 h-6" />,
    value: "#1", 
    label: "Rated Platform" 
  },
];

const features = [
  {
    title: "Advanced AI Technology",
    description: "Our cutting-edge facial recognition algorithms provide unmatched accuracy and speed in identifying and matching faces.",
  },
  {
    title: "Privacy First",
    description: "We prioritize user privacy with end-to-end encryption and strict data protection protocols that exceed industry standards.",
  },
  {
    title: "Global Database",
    description: "Access to an extensive, constantly updated database of images while maintaining complete compliance with privacy regulations.",
  },
];

export default function AboutUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-light-background dark:bg-dark-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-50" />

      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-blue-200 mb-4">
            Revolutionizing Face Search Technology
          </h2>
          <p className="text-lg text-slate-600 dark:text-blue-100">
            At FaceSearch AI, we combine cutting-edge technology with unwavering privacy 
            protection to deliver the most accurate and secure facial recognition platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-[#0c1222]/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.2] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02] group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-blue-200/80">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/[0.1]">
              <Image
                src="/about-us/image3.jpg"
                alt="FaceSearch AI Technology"
                fill
                className="object-cover"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-600/20 dark:bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-indigo-600/20 dark:bg-indigo-400/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-[#0c1222]/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.2] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
              >
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02] group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                
                <div className="relative">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-blue-100/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
