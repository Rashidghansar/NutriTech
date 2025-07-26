import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  QueueListIcon, 
  UserIcon 
} from '@heroicons/react/24/solid';

const NavigationBar: React.FC = () => {
  const location = useLocation();

  // Determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  // Navigation items with their paths and icons
  const navItems = [
    { 
      path: '/', 
      icon: HomeIcon, 
      label: 'Home' 
    },
    { 
      path: '/scan', 
      icon: MagnifyingGlassIcon, 
      label: 'Scan Product' 
    },
    { 
      path: '/categories', 
      icon: QueueListIcon, 
      label: 'Browse Categories' 
    },
    { 
      path: '/profile', 
      icon: UserIcon, 
      label: 'User Profile' 
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50">
      <div className="container mx-auto max-w-4xl px-4 py-3 flex justify-between items-center">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link 
            key={path}
            to={path} 
            className={`
              flex flex-col items-center justify-center 
              text-gray-600 
              hover:text-brand-primary 
              transition-colors 
              duration-300 
              p-2 
              rounded-full 
              hover:bg-brand-primary/10
              ${isActive(path) ? 'text-brand-primary bg-brand-primary/10' : ''}
            `}
            aria-label={label}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs mt-1 opacity-75">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar; 