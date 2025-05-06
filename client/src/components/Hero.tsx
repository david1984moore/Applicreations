import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add animation on load
    if (heroRef.current) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, []);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-28 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmZmZmYwNSIgZD0iTTM2IDM0aDR2MWgtNHYtMXptMC01aDR2MWgtNHYtMXptMTAgOGg0djFoLTR2LTF6bTAgNWg0djFoLTR2LTF6bTAgOGg0djFoLTR2LTF6Ii8+PHBhdGggZmlsbD0iI2ZmZmZmZjA1IiBkPSJNMCA0aDE0djFIMHYtMXptMCA3aDE0djFIMHYtMXptMCA3aDE0djFIMHYtMXptMCA3aDE0djFIMHYtMXptMCA3aDE0djFIMHYtMXptMCA3aDE0djFIMHYtMXptMCA3aDE0djFIMHYtMXoiLz48cGF0aCBmaWxsPSIjZmZmZmZmMDUiIGQ9Ik0wIDBoNjB2MUgwVjB6Ii8+PC9nPjwvc3ZnPg==')] opacity-10 z-0"></div>

      <div className="container relative mx-auto px-6 py-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div 
            className={`max-w-xl transition-all duration-1000 ease-out transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <p className="text-white/90 text-sm font-medium">Crafting digital excellence since 2010</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Digital solutions to <br className="hidden md:block"/> real world problems
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Simple, beautiful websites and apps for businesses and consumers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => handleClick('contact')}
                className="inline-flex items-center justify-center gap-2 py-3 px-8 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <button 
                onClick={() => handleClick('services')}
                className="inline-flex items-center justify-center gap-2 py-3 px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                Our Services
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="transition-all duration-1000 delay-100 ease-out transform opacity-0 translate-y-10"
                   style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(10px)' }}>
                <p className="text-3xl font-bold text-white">100+</p>
                <p className="text-white/60 text-sm">Projects Completed</p>
              </div>
              <div className="transition-all duration-1000 delay-200 ease-out transform opacity-0 translate-y-10"
                   style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(10px)' }}>
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-white/60 text-sm">Happy Clients</p>
              </div>
              <div className="transition-all duration-1000 delay-300 ease-out transform opacity-0 translate-y-10"
                   style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(10px)' }}>
                <p className="text-3xl font-bold text-white">10+</p>
                <p className="text-white/60 text-sm">Years Experience</p>
              </div>
            </div>
          </div>
          
          {/* Visual element */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ease-out transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } hidden lg:block`}
          >
            <div className="relative flex items-center justify-center">
              {/* Glass card effect */}
              <div className="rounded-3xl w-full aspect-square bg-transparent backdrop-blur-sm p-10 border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/30 rounded-full blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/30 rounded-full blur-xl"></div>
                
                {/* Center content */}
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Applicreations</h2>
                    <p className="text-white/80">Modern web solutions</p>
                  </div>
                </div>
                
                {/* Floating features */}
                <div className="absolute top-10 left-0 -translate-x-1/2 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg transform rotate-6 transition-all hover:rotate-0 duration-300">
                  <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <p className="text-white text-sm font-medium">UI/UX Design</p>
                </div>
                
                <div className="absolute bottom-14 right-0 translate-x-1/3 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg transform -rotate-6 transition-all hover:rotate-0 duration-300">
                  <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <p className="text-white text-sm font-medium">Development</p>
                </div>
                
                <div className="absolute bottom-5 left-16 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg transform rotate-3 transition-all hover:rotate-0 duration-300">
                  <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white text-sm font-medium">Web Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to the global scope or in a separate file if needed
if (typeof window !== "undefined") {
  window.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(function(reveal) {
      const revealTop = reveal.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add('active');
      }
    });
  });
}
