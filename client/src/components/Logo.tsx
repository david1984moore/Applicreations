import LogoSvg from '../assets/logo';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const useWhiteText = className?.includes('text-white');
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoSvg className="h-full w-auto" />
      <span className={`text-xl font-bold ${useWhiteText ? 'text-white' : 'text-black'}`}>
        Applicreations
      </span>
    </div>
  );
}