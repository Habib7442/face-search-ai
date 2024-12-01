import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "AI-Powered Face Recognition",
    description:
      "Experience lightning-fast facial recognition with industry-leading accuracy. Identify and match faces effortlessly through advanced machine learning algorithms.",
  },
  {
    title: "High Accuracy and Reliability",
    description:
      "Utilize cutting-edge AI technology to achieve reliable and consistent face matching, ensuring minimal errors and high confidence results.",
  },
  {
    title: "User-Friendly Interface",
    description:
      "Navigate through an intuitive, modern interface designed for simplicity, allowing you to start searches in just a few clicks.",
  },
  {
    title: "Data Privacy and Security",
    description:
      "Your privacy is our top priority. FaceSearch AI follows stringent data security protocols to protect your information during every interaction.",
  },
  {
    title: "Free Credits for New Users",
    description:
      "Get started easily with complimentary credits, allowing you to explore the app's powerful features without initial commitments.",
  },
  {
    title: "Integrated Payment System",
    description:
      "Conveniently manage payments with an integrated, secure Stripe payment system for seamless transactions.",
  },
];
