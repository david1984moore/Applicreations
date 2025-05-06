// This file exports the Applicreations logo as a React component
export default function LogoImage({ className = "" }: { className?: string }) {
  return (
    <img 
      src="/logo.png" 
      alt="Applicreations logo" 
      className={className} 
    />
  );
}