import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../constants';
import { StarIcon } from './Icons';

const AUTO_PLAY_INTERVAL = 5000;

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const patternRef = useRef<SVGPatternElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Parallax effect for background pattern
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (patternRef.current) {
            // Adjust the speed factor (0.1) to control parallax intensity.
            // Moving 'y' positively as we scroll down makes the pattern move down relative to the container,
            // effectively moving up slower than the content relative to the viewport.
            const scrollY = window.scrollY;
            patternRef.current.setAttribute('y', (scrollY * 0.1).toString());
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-secondary text-white overflow-hidden relative">
      {/* Background Pattern with Parallax */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern 
            ref={patternRef}
            id="paw-pattern" 
            x="0" 
            y="0" 
            width="100" 
            height="100" 
            patternUnits="userSpaceOnUse"
          >
            <path d="M20 20 Q 25 10 30 20 T 40 20" stroke="white" fill="none" />
            <circle cx="25" cy="25" r="2" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#paw-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary-light font-bold tracking-widest uppercase text-sm mb-2 block opacity-80">Happy Tails</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">What Our Clients Say</h2>
        </div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[400px] md:h-[300px]">
            {TESTIMONIALS.map((testimonial, index) => {
              const isActive = index === activeIndex;
              // Determine position for transitions
              let position = 'opacity-0 translate-x-full';
              if (isActive) position = 'opacity-100 translate-x-0';
              if (index === (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length) position = 'opacity-0 -translate-x-full';

              return (
                <div 
                  key={testimonial.id}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${position}`}
                >
                  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft-xl text-dark relative">
                    {/* Decorative Quote Mark */}
                    <div className="absolute -top-6 left-12 bg-primary text-white p-3 rounded-full shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H17.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H8.0166V21H5.0166Z" />
                      </svg>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover border-4 border-neutral-100"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start gap-1 text-primary mb-4">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5" />
                          ))}
                        </div>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 italic text-gray-700">
                          "{testimonial.review}"
                        </p>
                        <div>
                          <h4 className="font-bold text-lg font-serif">{testimonial.name}</h4>
                          <span className="text-gray-500 text-sm uppercase tracking-wide">Owner of {testimonial.petName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50 w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;