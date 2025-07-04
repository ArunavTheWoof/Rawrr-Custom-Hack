import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OnboardingFlow: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      // Check if user has completed onboarding
      const onboardingKey = `onboarding_completed_${user.id}`;
      const completed = localStorage.getItem(onboardingKey) === 'true';
      setHasCompletedOnboarding(completed);
    }
  }, [isSignedIn, user]);

  const completeOnboarding = () => {
    if (user) {
      const onboardingKey = `onboarding_completed_${user.id}`;
      localStorage.setItem(onboardingKey, 'true');
      setHasCompletedOnboarding(true);
      navigate('/');
    }
  };

  if (isSignedIn && hasCompletedOnboarding) {
    navigate('/');
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to Rawrr.io
            </CardTitle>
            <CardDescription>
              Sign in with Google to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInButton mode="modal">
              <Button className="w-full" size="lg">
                Sign in with Google
              </Button>
            </SignInButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSignedIn && !hasCompletedOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome, {user?.firstName || 'there'}!
            </CardTitle>
            <CardDescription>
              Let's get you set up on Rawrr.io
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                You're all set! Click below to complete your onboarding and start exploring.
              </p>
            </div>
            <Button 
              onClick={completeOnboarding}
              className="w-full"
              size="lg"
            >
              Complete Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default OnboardingFlow;
