import { cn } from '@/lib/utils';

export function SimpleFooterLogo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <div className="flex flex-row items-center">
        {/* Butterfly symbol */}
        <div className="relative mr-1">
          <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M50 10 C 20 10, 10 30, 10 50 C 10 70, 20 90, 50 90 C 80 90, 90 70, 90 50 C 90 30, 80 10, 50 10 Z" 
              fill="#b255fe" 
            />
            <circle cx="50" cy="50" r="12" fill="#12fcf4" />
          </svg>
        </div>
        {/* Text */}
        <div className="text-left">
          <span className="font-bold text-xl sm:text-2xl text-white tracking-tight">Applicreations</span>
        </div>
      </div>
    </div>
  );
}