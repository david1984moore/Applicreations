interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <svg width="150" height="50" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g>
        <path d="M20 40 C 20 20, 40 20, 50 30 Q 60 40, 45 50 T 30 60 Q 20 65, 20 55 T 30 45 Z" fill="#8A4FFF" />
        <circle cx="20" cy="45" r="10" fill="#65B2FF" />
        <path d="M70 30 L 70 60 M 80 30 L 80 60 M 70 45 L 80 45" stroke="#000" strokeWidth="5" />
        <path d="M90 30 L 90 60 M 90 30 Q 100 28, 105 35 Q 110 45, 105 55 Q 100 62, 90 60" stroke="#000" strokeWidth="5" fill="none" />
        <path d="M115 30 L 115 60 M 115 30 Q 125 28, 130 35 Q 135 45, 130 55 Q 125 62, 115 60" stroke="#000" strokeWidth="5" fill="none" />
        <path d="M140 30 L 140 60 M 150 30 L 150 60 M 140 30 L 150 30" stroke="#000" strokeWidth="5" />
        <path d="M160 30 L 160 60 M 160 45 Q 170 43, 175 45 Q 180 48, 160 45" stroke="#000" strokeWidth="5" fill="none" />
        <path d="M185 30 Q 195 28, 200 35 Q 205 45, 200 55 Q 195 62, 185 60 Z" stroke="#000" strokeWidth="5" fill="none" />
        <path d="M210 30 L 210 60 M 220 30 L 220 60 M 210 45 L 220 45" stroke="#000" strokeWidth="5" />
        <path d="M230 30 L 230 60 M 230 30 Q 240 28, 245 35 Q 250 45, 245 55 Q 240 62, 230 60" stroke="#000" strokeWidth="5" fill="none" />
        <path d="M255 30 L 255 60 M 255 30 L 275 30 M 255 45 L 270 45 M 255 60 L 275 60" stroke="#000" strokeWidth="5" />
        <path d="M280 30 L 280 60 M 280 30 L 300 30 M 280 45 L 295 45 M 280 60 L 300 60" stroke="#000" strokeWidth="5" />
      </g>
    </svg>
  );
}
