import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="text-center">
            <p className="text-neutral-dark/80 mb-2">Based in Wilmington, Delaware</p>
            <p className="text-neutral-dark/80">
              Email: <a 
                href="mailto:solutions@applicreations.com" 
                className="text-purple hover:text-purple-dark transition-colors duration-300"
              >
                solutions@applicreations.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center">
            <span className="text-sm text-neutral-dark/60 mr-1">&copy; {currentYear}</span>
            <span className="text-purple font-medium mr-1">Applicreations</span>
            <span className="text-sm text-neutral-dark/60">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
