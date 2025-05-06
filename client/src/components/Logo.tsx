interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <img 
      src="https://i.imgur.com/nnPgTbj.png" 
      alt="Applicreations Logo" 
      className={className} 
      style={{ height: "auto", width: "auto" }}
    />
  );
}
