import logoImage from '../assets/logo.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <img 
      src={logoImage} 
      alt="Applicreations logo" 
      className={className} 
    />
  );
}