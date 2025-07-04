
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Edit, CreditCard, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/update', icon: Edit, label: 'Update' },
    { path: '/cards', icon: CreditCard, label: 'Cards' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  if (location.pathname === '/') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-rawrr-dark/80 backdrop-blur-xl border-t border-white/10">
      <div className="flex justify-around items-center py-3 px-4 max-w-sm mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-rawrr-orange' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <Icon 
                size={20} 
                className={`transition-all duration-300 ${
                  isActive ? 'drop-shadow-[0_0_8px_rgba(255,107,53,0.6)]' : ''
                }`} 
              />
              <span className="text-xs font-medium">{label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-rawrr-orange rounded-full animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
