
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Music, Book, MapPin, Coffee, Zap } from 'lucide-react';

const Update = () => {
  const [mood, setMood] = useState([50]);
  const [focus, setFocus] = useState([50]);
  const [social, setSocial] = useState([50]);
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const activities = [
    { id: 'music', icon: Music, label: 'Listened to Music', color: 'bg-rawrr-purple' },
    { id: 'study', icon: Book, label: 'Studied', color: 'bg-rawrr-blue' },
    { id: 'walk', icon: MapPin, label: 'Took a Walk', color: 'bg-rawrr-green' },
    { id: 'coffee', icon: Coffee, label: 'Had Coffee', color: 'bg-yellow-500' },
    { id: 'workout', icon: Zap, label: 'Worked Out', color: 'bg-red-500' },
  ];

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSubmit = () => {
    // Simulate vibe update
    console.log({
      mood: mood[0],
      focus: focus[0],
      social: social[0],
      journal: journalEntry,
      activities: selectedActivities
    });
    
    // Reset form
    setJournalEntry('');
    setSelectedActivities([]);
  };

  const getMoodEmoji = (value: number) => {
    if (value < 25) return '😔';
    if (value < 50) return '😐';
    if (value < 75) return '😊';
    return '🤩';
  };

  return (
    <div className="min-h-screen bg-rawrr-dark pb-20">
      <div className="max-w-sm mx-auto p-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold font-space text-gradient mb-2">
            Update Your Vibe
          </h1>
          <p className="text-white/60">
            How are you feeling right now? Let's capture your energy.
          </p>
        </div>

        {/* Journal Section */}
        <div className="glass-effect p-6 rounded-3xl mb-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-white mb-4">Today's Thoughts</h2>
          <Textarea
            placeholder="What's on your mind? Share your current vibe..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder-white/40 min-h-[120px] resize-none rounded-2xl"
          />
        </div>

        {/* Mood Sliders */}
        <div className="glass-effect p-6 rounded-3xl mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold text-white mb-6">Vibe Check</h2>
          
          <div className="space-y-8">
            {/* Mood Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Mood</label>
                <span className="text-2xl">{getMoodEmoji(mood[0])}</span>
              </div>
              <Slider
                value={mood}
                onValueChange={setMood}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Focus Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Focus</label>
                <span className="text-rawrr-orange font-bold">{focus[0]}%</span>
              </div>
              <Slider
                value={focus}
                onValueChange={setFocus}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>Scattered</span>
                <span>Laser Sharp</span>
              </div>
            </div>

            {/* Social Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Social Energy</label>
                <span className="text-rawrr-orange font-bold">{social[0]}%</span>
              </div>
              <Slider
                value={social}
                onValueChange={setSocial}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>Introverted</span>
                <span>Extroverted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Tracking */}
        <div className="glass-effect p-6 rounded-3xl mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-semibold text-white mb-4">What did you do today?</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {activities.map((activity) => {
              const isSelected = selectedActivities.includes(activity.id);
              const Icon = activity.icon;
              
              return (
                <button
                  key={activity.id}
                  onClick={() => toggleActivity(activity.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-rawrr-orange bg-rawrr-orange/10 orange-glow'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <span className="text-sm text-white font-medium">
                      {activity.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-14 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light text-white font-semibold rounded-2xl hover:opacity-90 transition-all duration-300 orange-glow animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          Update My Vibe ✨
        </Button>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Update;
