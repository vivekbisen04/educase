import React from 'react';
import { Star } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };
  
  return (
    <div className={`bg-purple-600 ${sizeClasses[size]} rounded flex items-center justify-center text-white`}>
      <Star size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} />
    </div>
  );
};

export default Logo;