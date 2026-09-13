import React from 'react';
import {
  TrendingUp,
  Globe,
  Palette,
  Share2,
  Cpu,
  Smartphone,
  Code,
  Layers,
  Shield,
  Zap,
  BarChart3,
  Target,
  Megaphone,
  Briefcase,
  Search,
  LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Globe,
  Palette,
  Share2,
  Cpu,
  Smartphone,
  Code,
  Layers,
  Shield,
  Zap,
  BarChart3,
  Target,
  Megaphone,
  Briefcase,
  Search,
};

export const AVAILABLE_ICON_NAMES = Object.keys(ICONS);

export const ServiceIcon: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = ICONS[name] || Globe;
  return <IconComponent className={className} />;
};
