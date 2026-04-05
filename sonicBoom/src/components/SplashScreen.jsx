import React, { useState, useEffect } from "react";

export default function SplashScreen({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 40;
      });
    }, 400);

    // Complete loading after 2.5 seconds
    const loadingTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete();
      }, 300);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-gray-300 to-slate-300 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition animated-pulse"></div>
          <img
            src="/sonicBoom.svg"
            alt="SonicBoost"
            className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-lg animate-fade-in-scale"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-500 via-slate-800 to-gray-300 bg-clip-text text-transparent animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            SonicBoost
          </h1>
          <p
            className="text-gray-600 text-sm md:text-base animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Your Music, Your Vibe
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Animated bars */}
          <div className="flex items-end gap-1 h-12">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-gray-700 to-gray-900 rounded-full"
                style={{
                  height: `${20 + i * 15}px`,
                  animation: `pulse-bar 0.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-48 md:w-64 h-1 bg-gray-200 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-gradient-to-r from-gray-700 via-gray-900 to-gray-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Loading text */}
          <p
            className="text-gray-600 text-xs md:text-sm mt-4 animate-fade-in"
            style={{ animationDelay: "0.9s" }}
          >
            Loading your music... {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Style animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
