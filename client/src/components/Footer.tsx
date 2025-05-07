import { Logo } from './Logo';
import { cn } from '@/lib/utils';

export function Footer() {
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
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-2">
            <div className="h-5 w-36">
              <Logo className="h-full" />
            </div>
          </div>
          <p className="text-sm text-neutral-dark/60">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
