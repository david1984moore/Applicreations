interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <img 
      src="/images/applicreations-logo.png" 
      alt="Applicreations Logo" 
      className={className} 
      style={{ height: "auto", maxWidth: "200px" }}
    />
  );
}
