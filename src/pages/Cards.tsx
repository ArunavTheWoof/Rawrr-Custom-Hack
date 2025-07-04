
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { RotateCcw, Share, Download } from 'lucide-react';

const Cards = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const vibeCards = [
    {
      id: 1,
      type: 'Current Vibe',
      title: 'Chaotic Good',
      subtitle: 'Digital Rebel',
      keywords: ['Creative', 'Spontaneous', 'Passionate'],
      emoji: '⚡',
      score: 87,
      gradient: 'from-rawrr-orange to-rawrr-orange-light',
      analysis: 'Your digital patterns reveal a beautiful chaos - you thrive on creativity and spontaneous bursts of productivity. Your music taste spans 12 genres, and you switch between tasks like a digital nomad of the mind.'
    },
    {
      id: 2,
      type: 'Weekly Trend',
      title: 'Night Owl Rising',
      subtitle: 'Midnight Warrior',
      keywords: ['Nocturnal', 'Focused', 'Deep'],
      emoji: '🌙',
      score: 73,
      gradient: 'from-rawrr-purple to-rawrr-blue',
      analysis: 'Your most productive hours are between 10PM-2AM. This week showed a 34% increase in late-night creative sessions, with peak focus during moonlit hours.'
    },
    {
      id: 3,
      type: 'Music Identity',
      title: 'Sonic Explorer',
      subtitle: 'Genre Bender',
      keywords: ['Eclectic', 'Adventurous', 'Rhythmic'],
      emoji: '🎵',
      score: 91,
      gradient: 'from-rawrr-green to-cyan-500',
      analysis: 'Your Spotify data reveals a musical soul that refuses boundaries. 47 new artists discovered this month, with a preference for tracks that blend electronic beats with organic instruments.'
    }
  ];

  const handleCardFlip = (cardId: number) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-rawrr-dark pb-20">
      <div className="max-w-sm mx-auto p-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold font-space text-gradient mb-2">
            Your Vibe Cards
          </h1>
          <p className="text-white/60">
            Digital identity NFTs powered by AI analysis
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
          <div className="glass-effect p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-rawrr-orange">3</div>
            <div className="text-xs text-white/60">Active Cards</div>
          </div>
          <div className="glass-effect p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-rawrr-green">84</div>
            <div className="text-xs text-white/60">Avg Score</div>
          </div>
          <div className="glass-effect p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-rawrr-purple">7d</div>
            <div className="text-xs text-white/60">Updated</div>
          </div>
        </div>

        {/* Vibe Cards */}
        <div className="space-y-6">
          {vibeCards.map((card, index) => (
            <div
              key={card.id}
              className="relative h-64 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-700 preserve-3d cursor-pointer ${
                  flippedCard === card.id ? 'rotate-y-180' : ''
                }`}
                onClick={() => handleCardFlip(card.id)}
              >
                {/* Front of Card */}
                <div className={`absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  
                  {/* Card Header */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-white/80 text-sm font-medium">{card.type}</p>
                        <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                        <p className="text-white/90 font-medium">{card.subtitle}</p>
                      </div>
                      <div className="text-4xl">{card.emoji}</div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="relative z-10 flex flex-wrap gap-2 mb-4">
                    {card.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Score */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="text-white">
                      <p className="text-sm opacity-90">Vibe Score</p>
                      <p className="text-3xl font-bold">{card.score}</p>
                    </div>
                    <RotateCcw size={20} className="text-white/60" />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />
                  <div className="absolute -left-2 -top-2 w-16 h-16 bg-white/5 rounded-full" />
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-rawrr-gray border border-white/10 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">AI Deep Analysis</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {card.analysis}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-rawrr-orange/20 border border-rawrr-orange/30 rounded-xl py-3 px-4 flex items-center justify-center space-x-2 hover:bg-rawrr-orange/30 transition-colors">
                      <Share size={16} className="text-rawrr-orange" />
                      <span className="text-rawrr-orange text-sm font-medium">Share</span>
                    </button>
                    <button className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 px-4 flex items-center justify-center space-x-2 hover:bg-white/20 transition-colors">
                      <Download size={16} className="text-white" />
                      <span className="text-white text-sm font-medium">Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Generate New Card */}
        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button className="w-full glass-effect p-6 rounded-3xl border-2 border-dashed border-white/20 hover:border-rawrr-orange/50 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-12 h-12 bg-rawrr-orange/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-rawrr-orange/30 transition-colors">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Generate New Card</h3>
              <p className="text-sm text-white/60">Let AI analyze your latest patterns</p>
            </div>
          </button>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Cards;
