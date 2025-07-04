
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Sparkles, TrendingUp, Calendar } from 'lucide-react';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiMessage, setAiMessage] = useState('');

  const aiMessages = [
    "Hey Rawrrer, your vibe is evolving! ✨",
    "Your digital aura is glowing brighter today 🌟",
    "I sense creative energy in your patterns 🎨",
    "Your focus levels are reaching new heights 🚀",
    "The universe is aligning with your chaos ⚡"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setAiMessage(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
    return () => clearInterval(timer);
  }, []);

  const moodData = {
    current: "✨ chaotic good ✨",
    score: 87,
    trend: "+12% from yesterday"
  };

  return (
    <div className="min-h-screen bg-rawrr-dark pb-20">
      <div className="max-w-sm mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <p className="text-white/60 text-sm">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
            <h1 className="text-2xl font-bold font-space text-white">
              Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}
            </h1>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light rounded-full flex items-center justify-center animate-glow-pulse">
            <span className="text-xl font-bold text-white">R</span>
          </div>
        </div>

        {/* AI Message of the Day */}
        <div className="glass-effect p-6 rounded-3xl mb-6 animate-slide-up">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-rawrr-purple rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">AI Message</p>
              <p className="text-white font-medium">{aiMessage}</p>
            </div>
          </div>
        </div>

        {/* Today's Mood Overview */}
        <div className="glass-effect p-6 rounded-3xl mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-center mb-4">
            <p className="text-white/60 text-sm mb-2">You're radiating</p>
            <h2 className="text-2xl font-bold text-gradient mb-2">{moodData.current}</h2>
            <div className="flex items-center justify-center space-x-2 text-sm text-rawrr-green">
              <TrendingUp size={16} />
              <span>{moodData.trend}</span>
            </div>
          </div>
          
          {/* Mood Score Ring */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${moodData.score * 2.51}, 251`}
                className="animate-scale-in"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="100%" stopColor="#FF8B65" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{moodData.score}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button className="glass-effect p-4 rounded-2xl text-left hover:bg-white/10 transition-all duration-300">
            <div className="w-8 h-8 bg-rawrr-blue rounded-full flex items-center justify-center mb-3">
              <Calendar size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Update Vibe</h3>
            <p className="text-xs text-white/60">Log your current mood</p>
          </button>
          
          <button className="glass-effect p-4 rounded-2xl text-left hover:bg-white/10 transition-all duration-300">
            <div className="w-8 h-8 bg-rawrr-green rounded-full flex items-center justify-center mb-3">
              <Sparkles size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">View Cards</h3>
            <p className="text-xs text-white/60">Check your identity NFTs</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Vibes</h3>
          <div className="space-y-3">
            {[
              { time: '2h ago', mood: '🎵 Music Flow', description: 'Discovered 12 new tracks' },
              { time: '5h ago', mood: '📚 Deep Focus', description: '3 hours of concentrated work' },
              { time: '1d ago', mood: '🌙 Night Owl', description: 'Late night creative session' }
            ].map((activity, i) => (
              <div key={i} className="glass-effect p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{activity.mood}</p>
                    <p className="text-sm text-white/60">{activity.description}</p>
                  </div>
                  <span className="text-xs text-white/40">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Home;
