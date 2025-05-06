import LogoSvg from '../assets/logo';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return <LogoSvg className={className} />;
}