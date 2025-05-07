import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Logo } from './Logo';

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  
  return (
    <footer className="bg-gradient-to-r from-[#6b48ff] to-[#00ddeb] py-10 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <div className="text-center">
            <p className="text-white/90 mb-2 font-medium">Based in Wilmington, Delaware</p>
            <p className="text-white/90">
              Email: <a 
                href="mailto:solutions@applicreations.com" 
                className="text-white hover:text-white/80 transition-colors duration-300 underline decoration-1 underline-offset-2"
              >
                solutions@applicreations.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          <div className="flex items-center justify-center">
            <span className="text-sm text-white/80 mr-2">&copy; {currentYear}</span>
            <div className="h-5 w-auto mx-1">
              <Logo className="text-white" />
            </div>
            <span className="text-sm text-white/80 ml-2">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
