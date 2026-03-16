import { Calendar } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function Logo({ size = 'md', showIcon = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 36,
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-hero rounded-lg blur-sm opacity-60" />
          <div className="relative bg-gradient-hero rounded-lg p-1.5">
            <Calendar size={iconSizes[size]} className="text-primary-foreground" />
          </div>
        </div>
      )}
      <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
        <span className="text-gradient">Event</span>
        <span className="text-foreground">Sync</span>
      </span>
    </div>
  );
}
