import React, { useState } from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Sparkles, Users, Brain, Zap } from 'lucide-react';

interface OnboardingStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
}

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      icon: <Sparkles className="w-12 h-12 text-white" />,
      title: "Welcome to Rawrr.io",
      subtitle: "Your Digital Soul Awakens",
      description: "Discover the evolution of your digital identity through AI-powered insights and authentic self-expression.",
      gradient: "from-purple-600 via-purple-700 to-indigo-800"
    },
    {
      id: 2,
      icon: <Brain className="w-12 h-12 text-white" />,
      title: "AI-Powered Insights",
      subtitle: "Know Yourself Better",
      description: "Our advanced AI analyzes your digital patterns to reveal hidden aspects of your personality and growth potential.",
      gradient: "from-pink-600 via-rose-700 to-purple-800"
    },
    {
      id: 3,
      icon: <Users className="w-12 h-12 text-white" />,
      title: "Connect with Vibes",
      subtitle: "Find Your Digital Tribe",
      description: "Connect with like-minded souls who share your energy. Build authentic relationships in the digital realm.",
      gradient: "from-blue-600 via-cyan-700 to-teal-800"
    },
    {
      id: 4,
      icon: <Zap className="w-12 h-12 text-white" />,
      title: "Express Your Rawrr",
      subtitle: "Unleash Your Authentic Self",
      description: "Share your thoughts, moods, and creative expressions. Let your digital soul roar with authenticity.",
      gradient: "from-orange-600 via-red-700 to-pink-800"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-rawrr-dark overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rawrr-orange/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6">
        {/* Progress Indicators */}
        <div className="flex space-x-3 mb-8 animate-fade-in">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentStep
                  ? 'bg-rawrr-orange scale-125 shadow-lg shadow-rawrr-orange/50'
                  : index < currentStep
                  ? 'bg-rawrr-orange/60'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Main Card */}
        <Card className="w-full max-w-md glass-effect border-white/10 animate-scale-in">
          <CardContent className="p-0">
            {/* Hero Section with Gradient */}
            <div className={`bg-gradient-to-br ${currentStepData.gradient} p-8 text-center relative overflow-hidden`}>
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-bounce-subtle"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full animate-bounce-subtle" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Icon with Glow Effect */}
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                  {currentStepData.icon}
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white mb-2 animate-fade-in">
                {currentStepData.title}
              </h1>
              <p className="text-white/90 font-medium text-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Content Section */}
            <div className="p-8 text-center">
              <p className="text-white/80 text-lg leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {currentStepData.description}
              </p>

              {/* Action Buttons */}
              {!isLastStep ? (
                <div className="space-y-4">
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light hover:from-rawrr-orange-light hover:to-rawrr-orange text-white font-semibold py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    size="lg"
                  >
                    Continue the Journey
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  {currentStep > 0 && (
                    <Button
                      onClick={handlePrev}
                      variant="outline"
                      className="w-full border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      Back
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-rawrr-orange font-semibold text-lg mb-2 animate-bounce-subtle">
                      Ready to unleash your digital soul?
                    </p>
                    <p className="text-white/60 text-sm">
                      Join thousands of GenZ digital explorers
                    </p>
                  </div>

                  <SignInButton
                    mode="modal"
                    fallbackRedirectUrl="/home"
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-rawrr-orange via-pink-500 to-purple-600 hover:from-rawrr-orange-light hover:via-pink-400 hover:to-purple-500 text-white font-bold py-4 text-lg transition-all duration-500 hover:scale-105 shadow-xl animate-glow-pulse"
                      size="lg"
                    >
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Start Your Rawrr Journey
                    </Button>
                  </SignInButton>

                  <Button
                    onClick={handlePrev}
                    variant="outline"
                    className="w-full border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Back
                  </Button>

                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <div className="w-2 h-2 bg-rawrr-orange rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-white/40 text-sm">
            Step {currentStep + 1} of {steps.length}
          </p>
          <p className="text-white/30 text-xs mt-2">
            Designed for the digital generation 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
