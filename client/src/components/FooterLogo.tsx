import { cn } from '@/lib/utils';

export function FooterLogo({ className = "" }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 120 40"
        className="h-full w-full"
        aria-label="Applicreations logo"
      >
        <text x="0" y="22" fontFamily="Arial" fontSize="16" fill="#b255fe" fontWeight="600">
          Applicreations
        </text>
      </svg>
    </div>
  );
}