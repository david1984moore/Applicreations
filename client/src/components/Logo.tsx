import LogoSvg from '../assets/logo';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  // Ensure the text-white class is explicitly added when in the footer
  return <LogoSvg className={cn(className)} />;
}