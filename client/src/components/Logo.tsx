interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="Applicreations logo" 
      className={className} 
    />
  );
}