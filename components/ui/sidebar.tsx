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
    <div className="relative hidden md:block">
      <motion.div
        className={cn(
          "h-full px-4 py-6 flex flex-col bg-white/80 backdrop-blur-sm shadow-lg",
          "border-r border-slate-200/50",
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
          className="absolute -right-4 top-8 p-1.5 rounded-full bg-white shadow-md border border-slate-200/50"
        >
          {open ? (
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-600" />
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
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg"
      >
        <Menu className="h-5 w-5 text-slate-600" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={cn(
                "fixed inset-y-0 left-0 w-[280px] z-50",
                "bg-white/90 backdrop-blur-md shadow-xl",
                "p-6 flex flex-col",
                className
              )}
              {...props}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5 text-slate-600" />
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
      <div className="p-2 rounded-lg bg-slate-100/50">{link.icon}</div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm font-medium whitespace-pre"
      >
        {link.label}
      </motion.span>
    </>
  );

  const sharedClasses = cn(
    "flex items-center gap-3 py-2 rounded-xl transition-all duration-200",
    "hover:bg-slate-100",
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
