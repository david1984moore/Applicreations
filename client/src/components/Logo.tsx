import LogoSvg from '../assets/logo';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  // Using responsive width to prevent logo from being cut off on mobile
  return (
    <div className="w-full h-auto max-w-[240px] mx-auto overflow-visible">
      <LogoSvg className={cn("w-full h-auto", className)} />
    </div>
  );
}