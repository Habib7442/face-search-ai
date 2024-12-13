import { Cpu, Search, ShieldCheck, PhoneCall } from "lucide-react";




// Export the features array
export const features = [
  {
    id: 1,
    title: "Advanced Face Recognition",
    description: "State-of-the-art AI algorithms that can identify faces from images or videos with exceptional accuracy.",
    icon: <Cpu className="text-purple-600 w-12 h-12 mb-4" />,
    bgColor: "bg-secondary",
  },
  {
    id: 2,
    title: "Web-Wide Search",
    description: "Comprehensive search across the entire web to find matching faces and their associated information.",
    icon: <Search className="text-purple-600 w-12 h-12 mb-4" />,
    bgColor: "bg-secondary",
  },
  {
    id: 3,
    title: "Secure & Reliable",
    description: "Enterprise-grade security measures to protect user data and ensure reliable search results.",
    icon: <ShieldCheck className="text-purple-600 w-12 h-12 mb-4" />,
    bgColor: "bg-secondary",
  },
  {
    id: 4,
    title: "Contact Discovery",
    description: "Advanced contact information retrieval system to find email addresses and phone numbers.",
    icon: <PhoneCall className="text-purple-600 w-12 h-12 mb-4" />,
    bgColor: "bg-secondary",
  },
];
