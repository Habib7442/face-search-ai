import React from "react";
import {
  GlobeIcon,
  SearchIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import ImageGridSection from "./ImageGridSection";
// import Image from "next/image";

const AboutUs = () => {
  const features = [
    {
      icon: <SearchIcon className="w-6 h-6" />,
      title: "Advanced Face Recognition",
      description:
        "State-of-the-art AI algorithms that can identify faces from images or videos with exceptional accuracy.",
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: "Web-Wide Search",
      description:
        "Comprehensive search across the entire web to find matching faces and their associated information.",
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security measures to protect user data and ensure reliable search results.",
    },
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: "Contact Discovery",
      description:
        "Advanced contact information retrieval system to find email addresses and phone numbers.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl" />
        </div> */}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl text-zinc-200 font-bold text-transparent bg-clip-text ">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto">
              FaceSearchAI is pioneering the future of facial recognition and
              contact discovery through advanced artificial intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Our Mission
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              At FaceSearchAI, we&apos;re dedicated to making face recognition
              technology accessible and practical. Our AI-powered platform goes
              beyond simple facial recognition, offering a comprehensive
              solution that includes web search, contact discovery, and even
              creative content generation.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              We understand the importance of connecting people in today&apos;s
              digital world. Whether you&apos;re looking to find someone&apos;s
              online presence or verify an identity, our technology makes it
              possible with just a single image or video.
            </p>
          </div>
          <ImageGridSection />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
            What Sets Us Apart
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
            Our Values
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Built on principles of innovation, security, and user empowerment
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description:
                "Constantly pushing the boundaries of what's possible with AI technology.",
            },
            {
              title: "Privacy",
              description:
                "Maintaining the highest standards of data protection and user privacy.",
            },
            {
              title: "Accessibility",
              description:
                "Making advanced technology accessible to everyone who needs it.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {value.title}
              </h3>
              <p className="text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
