interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  // Embedding the Applicreations logo as an SVG
  return (
    <div className={className}>
      <svg width="100%" height="100%" viewBox="0 0 350 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Purple shape */}
        <path d="M50 10 C65 15 80 40 65 70 C55 65 35 60 25 30 C35 20 40 15 50 10Z" fill="#9C4DF4" />
        
        {/* Light purple overlay */}
        <path d="M30 15 C40 10 60 15 50 30 C40 25 35 20 30 15Z" fill="#D3B5FB" />
        
        {/* Cyan eye */}
        <circle cx="35" cy="35" r="8" fill="#00C2FF" />
        
        {/* White pupil */}
        <circle cx="35" cy="35" r="3" fill="white" />
        
        {/* Text: "pplicreations" */}
        <path d="M90 50 L90 20 L95 20 L95 50 C95 55 100 60 110 60 C120 60 125 55 125 50 L125 20 L130 20 L130 50 C130 60 120 65 110 65 C100 65 90 60 90 50Z" fill="black" />
        <path d="M135 20 L140 20 L140 50 C140 55 145 60 150 60 C155 60 160 55 160 50 L160 20 L165 20 L165 50 C165 60 155 65 150 65 C145 65 135 60 135 50 Z" fill="black" />
        <path d="M170 20 L175 20 L175 63 L170 63 Z" fill="black" />
        <path d="M180 20 L185 20 L185 63 L180 63 Z" fill="black" />
        <path d="M190 20 L210 20 L210 25 L195 25 L195 38 L205 38 L205 43 L195 43 L195 58 L210 58 L210 63 L190 63 Z" fill="black" />
        <path d="M215 20 L230 20 C240 20 245 25 245 35 C245 45 240 50 230 50 L220 50 L220 63 L215 63 Z M220 25 L220 45 L230 45 C235 45 240 42 240 35 C240 28 235 25 230 25 Z" fill="black" />
        <path d="M250 20 L255 20 L255 40 L270 20 L277 20 L262 40 L280 63 L273 63 L255 40 L255 63 L250 63 Z" fill="black" />
        <path d="M285 20 L305 20 L305 25 L290 25 L290 38 L300 38 L300 43 L290 43 L290 58 L305 58 L305 63 L285 63 Z" fill="black" />
        <path d="M310 20 L330 20 L330 25 L315 25 L315 38 L325 38 L325 43 L315 43 L315 63 L310 63 Z" fill="black" />
        <path d="M335 20 L340 20 L340 63 L335 63 Z" fill="black" />
        <path d="M345 20 L350 20 L350 38 L360 38 L360 43 L350 43 L350 63 L345 63 Z" fill="black" />
      </svg>
    </div>
  );
}