import { Brain, User, Heart, Percent, Users } from "lucide-react";

interface ResultsProps {
  imageUrl: string;
}

export function Results({ imageUrl }: ResultsProps) {
  const analysisData = [
    { icon: User, label: "Age Range", value: "25-30" },
    { icon: Users, label: "Gender", value: "Female" },
    { icon: Heart, label: "Emotion", value: "Neutral" },
    { icon: Percent, label: "Confidence", value: "98.5%" },
    { icon: Brain, label: "AI Score", value: "9.2/10" }
  ];

  return (
    <div className="space-y-8">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Analysis Result"
          className="w-full rounded-lg"
        />
        <div className="absolute inset-0 border-4 border-blue-500/50 rounded-lg" />
        
        {/* Face detection points */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-40 border-2 border-blue-400 rounded-lg" />
          <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {analysisData.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-500/20 p-1.5 rounded-lg">
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-gray-400 text-sm">
                {label}
              </div>
            </div>
            <div className="text-white font-semibold text-lg pl-9">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}