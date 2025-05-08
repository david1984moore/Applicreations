import LogoSvg from '../assets/logo';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  // Add a specific class for larger size in the navbar
  return (
    <div className="w-72 h-auto">
      <LogoSvg className={cn(className)} />
    </div>
  );
}