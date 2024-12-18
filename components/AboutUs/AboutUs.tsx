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
    <section className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Revolutionizing Face Search Technology
          </h2>
          <p className="text-lg text-slate-600">
            At FaceSearch AI, we combine cutting-edge technology with unwavering privacy 
            protection to deliver the most accurate and secure facial recognition platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg"
            >
              <div className="flex justify-center text-indigo-600 mb-2">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about-us/image3.jpg"
                alt="FaceSearch AI Technology"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
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
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
