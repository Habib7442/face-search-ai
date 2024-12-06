import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
      }}
      className={cn(
        "relative h-[200px] lg:h-full overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg",
        "flex flex-col justify-between p-6 space-y-4 group",
        "transition-all duration-300 ease-in-out transform hover:border-purple-600/50",
        className
      )}
    >
      {/* Header / Image section */}
      {header && (
        <div className="absolute inset-0 z-0">
          {header}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>
      )}

      {/* Content section */}
      <div className="relative z-10 flex flex-col justify-end h-full">
        <div className="space-y-2">
          {icon && (
            <div className="mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
              {icon}
            </div>
          )}
          
          {title && (
            <div className="text-lg hidden lg:block md:block font-semibold text-white/90 group-hover:text-white transition-colors">
              {title}
            </div>
          )}
          
          {description && (
            <div className="text-sm hidden lg:block md:block text-slate-300 group-hover:text-white/80 transition-colors">
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};