import Image from "next/image";

const ImageBlock = ({ src, gradientFrom, gradientTo }) => (
  <div className="relative h-32 rounded-lg overflow-hidden">
    <Image
      src={src}
      alt="Feature illustration"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 33vw"
    />
    <div
      className={`absolute inset-0 bg-gradient-to-br mix-blend-overlay ${gradientFrom} ${gradientTo}`}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
  </div>
);

const ImageGridSection = () => {
  const images = [
    {
      src: "/hero1.jpg", 
      gradientFrom: "from-blue-500/40",
      gradientTo: "to-purple-500/40",
    },
    {
      src: "/hero2.jpg", 
      gradientFrom: "from-purple-500/40",
      gradientTo: "to-pink-500/40",
    },
    {
      src: "/hero3.jpg", 
      gradientFrom: "from-pink-500/40",
      gradientTo: "to-blue-500/40",
    },
    {
      src: "/dummy.jpg", 
      gradientFrom: "from-blue-500/40",
      gradientTo: "to-purple-500/40",
    },
  ];

  return (
    <div className="relative h-96 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl" />
      <div className="absolute inset-1 bg-slate-900/90 rounded-2xl p-6 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="space-y-4">
            <ImageBlock {...images[0]} />
            <ImageBlock {...images[1]} />
          </div>
          <div className="space-y-4 pt-8">
            <ImageBlock {...images[2]} />
            <ImageBlock {...images[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGridSection;
