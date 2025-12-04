import React, { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '../constants';
import { PawIcon } from './Icons';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-neutral-100">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2000"
          alt="Happy dog getting groomed"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Updated overlay for warmer/premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:via-white/60"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 text-primary/20 animate-float hidden md:block">
        <PawIcon className="w-24 h-24" />
      </div>
      <div className="absolute bottom-1/4 left-10 text-secondary/10 animate-float hidden md:block" style={{ animationDelay: '1s' }}>
        <PawIcon className="w-16 h-16" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-xl">
          <div className={`transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-block px-4 py-1 bg-primary-light text-primary-dark font-bold rounded-full text-sm mb-6 tracking-wide uppercase border border-primary/20">
              Willunga's Premier Grooming Salon
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-dark leading-tight mb-6">
              Pamper Your <br/>
              <span className="text-primary inline-block relative">
                Best Friend
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-md">
              Professional, gentle, and stress-free care for all canine and feline breeds. Established in 1994, we make every pet look and feel their absolute best.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`mailto:${BUSINESS_INFO.email}?subject=Appointment Request`}
                className="bg-primary hover:bg-primary-hover text-white text-center px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-glow-primary"
              >
                Book Appointment
              </a>
              <a 
                href="#services"
                className="bg-white hover:bg-neutral-100 text-dark border-2 border-neutral-200 text-center px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-soft-sm hover:shadow-soft-md"
              >
                View Services
              </a>
            </div>

            <div className="mt-12 flex items-center gap-2 text-gray-500 text-sm font-medium">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                     <img src={`https://images.unsplash.com/photo-${i === 1 ? '1544005313-94ddf0286df2' : i === 2 ? '1500648767791-00dcc994a43e' : '1438761681033-6461ffad8d80'}?w=100`} className="w-full h-full object-cover" alt="Customer" />
                   </div>
                 ))}
               </div>
               <span className="ml-2">Trusted by 3,000+ happy clients</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <a href="#services" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle text-dark/30 hover:text-primary transition-colors cursor-pointer">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
};

export default Hero;