"use client";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import imageData from "@/lib/images";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Target, Globe, ImageIcon, Search, Upload, Shield } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-full">
      {/* Header Section */}
      <motion.div
        className="text-center py-12 lg:h-[300px] md:h-[220px] text-black bg-blue-300/30 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold">About Us</h1>
        <Balancer>
          <p className="mt-4 text-lg">
            At FaceSearchAI, we are transforming how the world interacts with
            facial recognition.
          </p>
        </Balancer>
        {/* Cards Section */}
        <div className="container mx-auto px-6 md:px-12 py-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {imageData.aboutUsImages.map((item) => (
              <Card
                key={item.id}
                className="shadow-lg hover:shadow-xl bg-transparent border-none p-1"
              >
                <CardHeader>
                  <Image
                    src={item.image}
                    width={1000}
                    height={1000}
                    alt={`About us image ${item.id}`}
                    className="rounded-lg w-full lg:h-[250px] h-[200px] md:[220px] object-cover"
                  />
                </CardHeader>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <div className="mx-auto pt-14 px-2 lg:mt-24 md:mt-24">
        <motion.div
          className="pt-8 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
            <Balancer>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                FaceSearchAI combines innovation, security, and affordability to
                deliver a seamless experience for all users.
              </p>
            </Balancer>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <motion.div
                className="p-6 bg-slate-100 rounded-lg shadow-lg flex flex-col"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Tailored AI-Driven Searches
                </h3>
                <p className="text-gray-600 flex-grow">
                  Our cutting-edge AI models are optimized for various
                  categories, including faces, objects, and similar visuals,
                  ensuring every search delivers highly relevant results.
                  Whether you&apos;re looking to trace an image source or find
                  connections across the web, our platform adapts to your needs
                  effortlessly.
                </p>
              </motion.div>
              <motion.div
                className="p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Facial Recognition Precision
                </h3>
                <p className="text-gray-600 flex-grow">
                  Discover where your face or others appear online with
                  unmatched accuracy. Our facial recognition technology
                  identifies subtle details and matches them precisely,
                  providing actionable results. Note: Facial recognition is
                  subject to regional availability for compliance and privacy.
                </p>
              </motion.div>
              <motion.div
                className="p-6 bg-slate-100 rounded-lg shadow-lg flex flex-col"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Image Ownership and Credibility
                </h3>
                <p className="text-gray-600 flex-grow">
                  Empower yourself with tools to locate original image sources,
                  protect copyrights, and trace duplicates. Our platform helps
                  you verify ownership and ensure proper attribution, offering
                  peace of mind in an increasingly digital world.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How it works */}
      <div className="container mx-auto py-16 px-2 md:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <Balancer>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the seamless process of our advanced facial recognition
              technology, designed to make image searching effortless and
              precise.
            </p>
          </Balancer>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row gap-8 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {/* Left Column - User Perspective */}
          <div className="w-full lg:w-1/2">
            {/* <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              User Journey
            </h3> */}
            <VerticalTimeline layout="1-column-left">
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(249, 250, 251)",
                  color: "#4B5563",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(249, 250, 251)",
                }}
                date="Step 1"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<Upload />}
              >
                <h3 className="vertical-timeline-element-title font-bold text-gray-700">
                  Upload Your Image
                </h3>
                <p>
                  Begin your search by uploading the image you want to
                  investigate. Our platform supports various image formats and
                  ensures a smooth, user-friendly upload process.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(249, 250, 251)",
                  color: "#4B5563",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(249, 250, 251)",
                }}
                date="Step 2"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={<Search />}
              >
                <h3 className="vertical-timeline-element-title font-bold text-gray-700">
                  Internet-Wide Search
                </h3>
                <p>
                  Our advanced AI scans billions of images across the internet,
                  using sophisticated algorithms to find potential matches and
                  related visual content with unprecedented speed and accuracy.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(249, 250, 251)",
                  color: "#4B5563",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(249, 250, 251)",
                }}
                date="Step 3"
                iconStyle={{ background: "rgb(76, 175, 80)", color: "#fff" }}
                icon={<ImageIcon />}
              >
                <h3 className="vertical-timeline-element-title font-bold text-gray-700">
                  Comprehensive Results
                </h3>
                <p>
                  Receive a detailed report of similar images, their sources,
                  and potential connections. Filter and analyze results with our
                  intuitive interface designed for maximum insights.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>

          {/* Right Column - Technical Perspective */}
          <div className="w-full lg:w-1/2">
            {/* <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Technical Process
            </h3> */}
            <VerticalTimeline layout="1-column-left">
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(249, 250, 251)",
                  color: "#4B5563",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(249, 250, 251)",
                }}
                date="Advanced AI"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<Target />}
              >
                <h3 className="vertical-timeline-element-title font-bold text-gray-700">
                  Image Feature Extraction
                </h3>
                <p>
                  Our AI breaks down the uploaded image into unique digital
                  fingerprints, analyzing color patterns, facial landmarks, and
                  complex visual characteristics with machine learning
                  algorithms.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(249, 250, 251)",
                  color: "#4B5563",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(249, 250, 251)",
                }}
                date="Global Network"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={<Globe />}
              >
                <h3 className="vertical-timeline-element-title font-bold text-gray-700">
                  Distributed Search Architecture
                </h3>
                <p>
                  Leveraging a global network of servers, we simultaneously
                  search multiple databases and image repositories, ensuring
                  comprehensive and rapid result generation.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(249, 250, 251)",
                  color: "#4B5563",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(249, 250, 251)",
                }}
                date="Security First"
                iconStyle={{ background: "rgb(76, 175, 80)", color: "#fff" }}
                icon={<Shield />}
              >
                <h3 className="vertical-timeline-element-title font-bold text-gray-700">
                  Privacy and Verification
                </h3>
                <p>
                  We implement advanced encryption and privacy protocols,
                  ensuring data anonymization and providing transparent
                  verification of image sources and ownership.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
