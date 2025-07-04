import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Settings, LogOut, Music, Palette } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { UserButton, useUser } from '@clerk/clerk-react';

const Profile = () => {
  const [spotifyConnected, setSpotifyConnected] = useState(true);
  const { user } = useUser();

  const moodHistory = [
    { day: 'Mon', mood: 65 },
    { day: 'Tue', mood: 78 },
    { day: 'Wed', mood: 72 },
    { day: 'Thu', mood: 85 },
    { day: 'Fri', mood: 91 },
    { day: 'Sat', mood: 76 },
    { day: 'Sun', mood: 82 },
  ];

  const stats = [
    { label: 'Total Updates', value: '47', change: '+12%' },
    { label: 'Vibe Cards', value: '3', change: 'New' },
    { label: 'Streak', value: '12d', change: '🔥' },
  ];

  return (
    <div className="min-h-screen bg-rawrr-dark pb-20">
      <div className="max-w-sm mx-auto p-6">
        {/* Profile Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light rounded-full mx-auto flex items-center justify-center animate-glow-pulse">
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'R'}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-rawrr-green rounded-full border-4 border-rawrr-dark flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user?.username || user?.emailAddresses[0]?.emailAddress || 'Rawrr User'
            }
          </h1>
          <p className="text-rawrr-orange font-medium mb-2">🌗 Mostly Creative</p>
          <p className="text-white/60 text-sm">
            Digital identity explorer since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
          
          {/* User Button for account management */}
          <div className="mt-4 flex justify-center">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopover: "bg-rawrr-dark border border-white/10"
                }
              }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
          {stats.map((stat, index) => (
            <div key={stat.label} className="glass-effect p-4 rounded-2xl text-center">
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/60 mb-1">{stat.label}</div>
              <div className="text-xs text-rawrr-green">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Mood History Graph */}
        <div className="glass-effect p-6 rounded-3xl mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold text-white mb-4">7-Day Mood Trend</h2>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodHistory}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#FF6B35" 
                  strokeWidth={3}
                  dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#FF8B65' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-white/60 mt-2">
            Average: 78 (+5% this week)
          </p>
        </div>

        {/* Connection Status */}
        <div className="glass-effect p-6 rounded-3xl mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-semibold text-white mb-4">Connected Services</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-rawrr-green rounded-full flex items-center justify-center">
                  <Music size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Spotify</p>
                  <p className="text-sm text-white/60">Music analysis active</p>
                </div>
              </div>
              <button
                onClick={() => setSpotifyConnected(!spotifyConnected)}
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  spotifyConnected ? 'bg-rawrr-green' : 'bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  spotifyConnected ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between opacity-60">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Palette size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Screen Time</p>
                  <p className="text-sm text-white/60">Coming soon</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full">
                <div className="w-5 h-5 bg-white/30 rounded-full translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Settings & Actions */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button className="w-full glass-effect p-4 rounded-2xl flex items-center space-x-4 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 bg-rawrr-blue rounded-full flex items-center justify-center">
              <Settings size={20} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-medium">Settings</p>
              <p className="text-sm text-white/60">Customize your experience</p>
            </div>
          </button>

          <button className="w-full glass-effect p-4 rounded-2xl flex items-center space-x-4 hover:bg-red-500/10 transition-colors group">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30">
              <LogOut size={20} className="text-red-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-red-400 font-medium">Sign Out</p>
              <p className="text-sm text-white/60">We'll miss your vibe</p>
            </div>
          </button>
        </div>

        {/* Version Info */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-white/40 text-xs">
            Rawrr.io v1.0.0 • Made with ❤️ for digital souls
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Profile;
