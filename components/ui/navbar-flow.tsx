"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import {
  Menu as List,
  X as Close,
  Sparkles,
} from "lucide-react";

interface NavbarFlowProps {
  emblem?: React.ReactNode;
  extraIcons?: React.ReactNode[];
  styleName?: string;
  rightComponent?: React.ReactNode;
  onMenuClick?: () => void;
  overlayContent?: React.ReactNode;
}

const NavbarFlow: React.FC<NavbarFlowProps> = ({
  emblem,
  extraIcons = [],
  styleName = "",
  rightComponent,
  onMenuClick,
  overlayContent,
}) => {
  const [sequenceDone, setSequenceDone] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const navMotion = useAnimation();
  const emblemMotion = useAnimation();
  const switchMotion = useAnimation();
  const svgMotion = useAnimation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
      return;
    }
    if (overlayContent) {
      setIsOverlayOpen(true);
    }
  };

  useEffect(() => {
    const detectMobile = () => {
      setMobileView(window.innerWidth < 768);
    };

    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const runSequence = async () => {
      if (mobileView) {
        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          navMotion.start({
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      } else {
        await navMotion.start({
          width: "auto",
          padding: "10px 30px",
          transition: { duration: 0.8, ease: "easeOut" },
        });

        await svgMotion.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });

        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      }

      setSequenceDone(true);
    };

    runSequence();
  }, [navMotion, emblemMotion, switchMotion, svgMotion, mobileView, isMounted]);

  return (
    <div className={`sticky top-0 z-50 w-full ${styleName}`}>
      <div className="hidden md:block">
        <div className="relative w-full max-w-7xl mx-auto h-24 flex items-center justify-between px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={emblemMotion}
            className="bg-gray-200/80 dark:bg-black/95 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-4 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-lg lg:text-xl z-10 flex-shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.35)] border-2 border-green-400"
          >
            {emblem}
          </motion.div>

          <motion.nav
            initial={{
              width: "120px",
              padding: "8px 20px",
            }}
            animate={navMotion}
            className="bg-gray-200/80 dark:bg-black/95 backdrop-blur-sm rounded-full flex items-center justify-center gap-6 lg:gap-12 z-10 flex-shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.35)] border-2 border-green-400"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: sequenceDone ? 1 : 0 }}
              onClick={handleMenuClick}
              className="text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:text-gray-900 dark:hover:text-white transition-colors py-1 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              MENU
            </motion.button>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={switchMotion}
            className="bg-gray-200/80 dark:bg-black/95 backdrop-blur-sm rounded-full p-2 lg:p-3 z-10 flex-shrink-0 flex items-center gap-2 lg:gap-3 shadow-[0_0_12px_rgba(34,197,94,0.35)] border-2 border-green-400"
          >
            {extraIcons.map((icon, idx) => (
              <div key={idx} className="flex items-center justify-center">
                {icon}
              </div>
            ))}

            {rightComponent && (
              <div className="flex items-center justify-center">
                {rightComponent}
              </div>
            )}
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={svgMotion}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            viewBox="0 0 1400 96"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="connectionBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
              <linearGradient
                id="blueGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="cyanGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="purpleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="orangeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="redGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="greenGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
              stroke="url(#blueGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
            />
            <motion.path
              d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
              stroke="url(#blueGradient)"
              strokeWidth="3"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
            />
            <motion.path
              d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
              stroke="url(#cyanGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 1.7 }}
            />
            <motion.path
              d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
              stroke="url(#cyanGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 1.7 }}
            />
            <motion.path
              d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
              stroke="url(#purpleGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 1.9 }}
            />
            <motion.path
              d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
              stroke="url(#purpleGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 1.9 }}
            />
            <motion.path
              d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
              stroke="url(#orangeGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 2.1 }}
            />
            <motion.path
              d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
              stroke="url(#orangeGradient)"
              strokeWidth="3"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 2.1 }}
            />
            <motion.path
              d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
              stroke="url(#redGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 2.3 }}
            />
            <motion.path
              d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
              stroke="url(#redGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 2.3 }}
            />
            <motion.path
              d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
              stroke="url(#greenGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 2.5 }}
            />
            <motion.path
              d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
              stroke="url(#greenGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 2.5 }}
            />

            <g filter="url(#connectionBlur)" opacity="0.3">
              <path
                d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                stroke="#3b82f6"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                stroke="#06b6d4"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                stroke="#8b5cf6"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                stroke="#ef4444"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
              />
            </g>
          </motion.svg>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="top-0 z-50 w-full border-b border-gray-200/40 dark:border-gray-800/40 bg-gray-50/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 dark:supports-[backdrop-filter]:bg-black/60 relative">
          <div className="container flex h-16 max-w-screen-2xl items-center px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={emblemMotion}
              className="mr-4 flex-shrink-0"
            >
              <div className="bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-semibold text-base">
                {emblem}
              </div>
            </motion.div>

            <div className="flex flex-1 items-center justify-end space-x-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={switchMotion}
                className="flex items-center space-x-2"
              >
                {extraIcons.map((icon, idx) => (
                  <div key={idx} className="flex items-center justify-center">
                    {icon}
                  </div>
                ))}

                {rightComponent && (
                  <div className="flex items-center justify-center">
                    {rightComponent}
                  </div>
                )}
              </motion.div>

              <button
                onClick={handleMenuClick}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOverlayOpen && overlayContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-8">
          <div className="relative w-full h-full bg-card rounded-3xl shadow-2xl overflow-hidden border ring-1 ring-black/5">
            <div className="absolute top-4 right-4 z-50">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => setIsOverlayOpen(false)}
              >
                <Close className="size-5" />
              </Button>
            </div>
            <div className="h-full overflow-y-auto">{overlayContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarFlow;
