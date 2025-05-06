import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo className="h-12" />
          </div>
          
          <div className="text-center md:text-right">
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
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-neutral-dark/60">
            &copy; {new Date().getFullYear()} Applicreations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
