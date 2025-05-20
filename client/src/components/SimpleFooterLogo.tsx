import { cn } from '@/lib/utils';

export function SimpleFooterLogo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="mr-1">
        <path 
          d="M50 10 C 20 10, 10 30, 10 50 C 10 70, 20 90, 50 90 C 80 90, 90 70, 90 50 C 90 30, 80 10, 50 10 Z" 
          fill="#b255fe" 
        />
      </svg>
      <span className="font-semibold text-sm text-purple">Applicreations</span>
    </div>
  );
}