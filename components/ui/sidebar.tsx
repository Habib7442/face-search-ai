"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void;
}

interface SidebarLinkProps {
  link: Links;
  className?: string;
  onClick?: () => void;
  props?: LinkProps;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <div className="hidden lg:block fixed inset-y-0 left-0 z-20">
      <motion.div
        className={cn(
          "h-full px-4 py-6 flex flex-col",
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md",
          "shadow-lg dark:shadow-slate-900/20",
          "border-r border-slate-200/50 dark:border-slate-800/50",
          className
        )}
        animate={{
          width: animate ? (open ? "280px" : "80px") : "280px",
        }}
        {...props}
      >
        {children as React.ReactNode}
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "absolute -right-4 top-8",
            "p-2 rounded-full",
            "bg-white dark:bg-slate-800",
            "shadow-lg dark:shadow-slate-900/50",
            "border border-slate-200/50 dark:border-slate-700/50",
            "hover:bg-slate-50 dark:hover:bg-slate-700",
            "transition-colors duration-200"
          )}
        >
          {open ? (
            <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          )}
        </button>
      </motion.div>
    </div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="block lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed top-4 left-4 z-50",
          "p-2.5 rounded-xl",
          "bg-white/80 dark:bg-slate-800/80",
          "backdrop-blur-md",
          "shadow-lg dark:shadow-slate-900/20",
          "border border-slate-200/50 dark:border-slate-700/50",
          "hover:bg-slate-50 dark:hover:bg-slate-700",
          "transition-colors duration-200"
        )}
      >
        <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-900/20 dark:bg-slate-900/40 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={cn(
                "fixed inset-y-0 left-0 w-[280px] z-50",
                "bg-white/90 dark:bg-slate-900/90",
                "backdrop-blur-md",
                "shadow-xl dark:shadow-slate-900/50",
                "border-r border-slate-200/50 dark:border-slate-800/50",
                "p-6 flex flex-col",
                className
              )}
              {...props}
            >
              <button
                onClick={() => setOpen(false)}
                className={cn(
                  "absolute top-4 right-4",
                  "p-2 rounded-xl",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "transition-colors duration-200"
                )}
              >
                <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </button>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: SidebarLinkProps) => {
  const { open, animate } = useSidebar();

  const content = (
    <>
      <div className={cn(
        "p-2 rounded-xl",
        "bg-gradient-to-br from-slate-100 to-slate-50",
        "dark:from-slate-800 dark:to-slate-700/50",
        "border border-slate-200/50 dark:border-slate-700/50",
        "group-hover:border-blue-200/50 dark:group-hover:border-blue-800/50",
        "transition-colors duration-200"
      )}>
        {React.cloneElement(link.icon as React.ReactElement, {
          className: cn(
            "h-5 w-5",
            "text-slate-600 dark:text-slate-300",
            "group-hover:text-blue-600 dark:group-hover:text-blue-400",
            "transition-colors duration-200"
          )
        })}
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm font-medium whitespace-pre text-slate-700 dark:text-slate-200"
      >
        {link.label}
      </motion.span>
    </>
  );

  const sharedClasses = cn(
    "group flex items-center gap-3 p-2 rounded-xl",
    "hover:bg-slate-100/50 dark:hover:bg-slate-800/50",
    "transition-all duration-200",
    className
  );

  if (link.onClick || onClick) {
    return (
      <button
        onClick={link.onClick || onClick}
        className={cn(sharedClasses, "w-full text-left")}
      >
        {content}
      </button>
    );
  }
  return (
    <Link href={link.href} className={sharedClasses} {...props}>
      {content}
    </Link>
  );
};

