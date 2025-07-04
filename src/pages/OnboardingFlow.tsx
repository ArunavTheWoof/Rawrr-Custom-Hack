import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton, 
  UserButton,
  useUser 
} from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingState from '@/components/LoadingState';

const OnboardingFlow = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [vibeGoal, setVibeGoal] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  const vibeOptions = [
    { id: 'calm', label: '🧘 Calm', description: 'Peaceful and centered' },
    { id: 'chaotic', label: '⚡ Chaotic', description: 'Wild and unpredictable' },
    { id: 'focused', label: '🎯 Focused', description: 'Laser-sharp precision' },
    { id: 'creative', label: '🎨 Creative', description: 'Innovative and artistic' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center animate-slide-up">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light rounded-full flex items-center justify-center animate-glow-pulse">
                <span className="text-3xl font-bold text-white">R</span>
              </div>
              <h1 className="text-4xl font-bold font-space text-gradient mb-4">
                Welcome to Rawrr.io
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                AI-powered social identity network that analyzes your digital behavior to create mood-based identity reports
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-center animate-slide-up">
            <h2 className="text-2xl font-bold font-space mb-6">
              Let's connect your digital world
            </h2>
            <div className="space-y-4">
              {[
                { icon: '📱', title: 'Screen Time', desc: 'Understand your digital habits' },
                { icon: '🎵', title: 'Spotify', desc: 'Analyze your music taste' },
                { icon: '📊', title: 'App Usage', desc: 'Track behavioral patterns' }
              ].map((item, i) => (
                <div key={i} className="glass-effect p-4 rounded-2xl text-left">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center animate-slide-up">
            <h2 className="text-2xl font-bold font-space mb-6">
              Choose your username
            </h2>
            <div className="space-y-6">
              <Input
                placeholder="Enter your rawrr username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-white/40 text-center text-lg h-14 rounded-2xl"
              />
              <p className="text-white/60 text-sm">
                This is how other Rawrrers will find you
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center animate-slide-up">
            <h2 className="text-2xl font-bold font-space mb-6">
              What's your vibe goal?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {vibeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setVibeGoal(option.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    vibeGoal === option.id
                      ? 'border-rawrr-orange bg-rawrr-orange/10 orange-glow'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-lg font-semibold mb-1">{option.label}</div>
                    <div className="text-sm text-white/60">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingState type="glow" message="Analyzing your digital aura..." />;
  }

  return (
    <div className="min-h-screen bg-rawrr-dark flex flex-col justify-between p-6 max-w-sm mx-auto">
      <div className="flex-1 flex flex-col justify-center">
        {renderStep()}
      </div>
      
      <div className="space-y-4">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-rawrr-orange' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={step === 2 && !username || step === 3 && !vibeGoal}
          className="w-full h-14 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light text-white font-semibold rounded-2xl hover:opacity-90 transition-all duration-300 orange-glow"
        >
          {step === 3 ? 'Start My Journey' : 'Continue'}
        </Button>
      </div>

      <div className="mt-8">
        <SignedIn>
          <div className="text-center">
            <p className="text-white/70 text-sm mb-2">
              You are signed in as{' '}
              <span className="font-semibold">{user?.email}</span>
            </p>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex justify-center space-x-4">
            <SignInButton>
              <Button className="flex-1 h-12 bg-white/5 border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all duration-300">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="flex-1 h-12 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light text-white rounded-2xl hover:opacity-90 transition-all duration-300">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default OnboardingFlow;
