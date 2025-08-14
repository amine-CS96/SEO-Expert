import React from 'react';
import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <Zap className={`text-primary ${className}`} style={{ width: size, height: size }} />
  );
};

export default Logo;