import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  type?: 'auth' | 'page' | 'component';
  message?: string;
  showLogo?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'component', 
  message = 'Loading...',
  showLogo = true
}) => {
  if (type === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rawrr-dark">
        <div className="text-center animate-fade-in">
          {showLogo && (
            <div className="w-20 h-20 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light rounded-full mx-auto flex items-center justify-center mb-6 animate-glow-pulse">
              <span className="text-3xl font-bold text-white">R</span>
            </div>
          )}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-rawrr-orange" />
            <span className="text-white/80 text-lg">{message}</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-rawrr-orange rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-rawrr-orange rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-rawrr-orange rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'page') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rawrr-dark">
        <div className="glass-effect p-8 rounded-3xl text-center animate-scale-in">
          <Loader2 className="w-8 h-8 animate-spin text-rawrr-orange mx-auto mb-4" />
          <p className="text-white/80">{message}</p>
        </div>
      </div>
    );
  }

  // Component level loading
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <Loader2 className="w-6 h-6 animate-spin text-rawrr-orange mx-auto mb-2" />
        <p className="text-white/60 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
