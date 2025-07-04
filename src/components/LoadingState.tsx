
import React from 'react';

interface LoadingStateProps {
  type?: 'pulse' | 'float' | 'glow';
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'pulse', 
  message = 'Loading your vibe...' 
}) => {
  const renderAnimation = () => {
    switch (type) {
      case 'float':
        return (
          <div className="animate-float">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light animate-pulse" />
          </div>
        );
      case 'glow':
        return (
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-rawrr-orange animate-glow-pulse" />
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-rawrr-orange opacity-30 animate-ping" />
          </div>
        );
      default:
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-rawrr-orange rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rawrr-dark">
      {renderAnimation()}
      <p className="text-white/70 mt-6 font-space text-sm">{message}</p>
    </div>
  );
};

export default LoadingState;
