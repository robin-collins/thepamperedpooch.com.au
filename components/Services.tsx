import React, { useState } from 'react';
import { SERVICES, BUSINESS_INFO } from '../constants';
import { Service } from '../types';
import { ScissorsIcon, WaterIcon, PawIcon, RibbonIcon, PhoneIcon } from './Icons';

const getIcon = (type: string, className: string) => {
  switch (type) {
    case 'scissors': return <ScissorsIcon className={className} />;
    case 'water': return <WaterIcon className={className} />;
    case 'paw': return <PawIcon className={className} />;
    case 'ribbon': return <RibbonIcon className={className} />;
    default: return <PawIcon className={className} />;
  }
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openModal = (service: Service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">Comprehensive Pet Care</h2>
          <p className="text-gray-600 text-lg">
            We cater to all canine and feline breeds with a focus on transparency and quality. 
            From standard clips to show-quality cuts and specialized skin treatments, your pet is in expert hands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => openModal(service)}
              className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 shadow-soft-sm hover:shadow-soft-xl border border-neutral-200 flex flex-col cursor-pointer"
            >
              <div className="w-14 h-14 bg-secondary-light rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                {getIcon(service.iconType, "w-8 h-8 group-hover:animate-snip")}
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 font-serif">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <span className="font-bold text-primary text-lg">{service.price}</span>
                <span className="text-sm font-medium text-gray-500 group-hover:text-secondary group-hover:translate-x-1 transition-all">Details &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-neutral rounded-3xl border border-neutral-200">
            <h4 className="font-bold text-dark text-lg mb-2">Special Requirements?</h4>
            <p className="text-gray-600 mb-4">We offer designated rooms for each grooming stage and specific treatments for skin conditions.</p>
            <a href="#contact" className="text-primary font-bold hover:text-primary-hover transition-colors underline decoration-2 underline-offset-4">Contact us to discuss your pet's needs</a>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity" 
            onClick={closeModal}
            aria-hidden="true"
          ></div>
          <div 
            className="bg-white rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-glow-secondary animate-fade-in-up flex flex-col max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-dark w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-16 h-16 bg-secondary-light rounded-2xl flex items-center justify-center text-secondary mb-6 flex-shrink-0">
              {getIcon(selectedService.iconType, "w-8 h-8")}
            </div>

            <h3 id="modal-title" className="text-3xl font-serif font-bold text-dark mb-4">{selectedService.title}</h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedService.fullDescription || selectedService.description}
            </p>
            
            {selectedService.features && (
              <div className="mb-8">
                <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <span className="text-secondary mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedService.pricingDetails && (
              <div className="bg-neutral p-5 rounded-2xl mb-8 border border-neutral-200">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-primary"></div>
                   <h4 className="font-bold text-dark text-sm uppercase tracking-wide">Pricing Details</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedService.pricingDetails}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <a 
                href={`tel:${BUSINESS_INFO.phone}`} 
                className="flex-1 bg-primary text-white text-center py-3.5 rounded-xl font-bold hover:bg-primary-hover transition-all hover:shadow-glow-primary flex items-center justify-center gap-2 transform active:scale-95"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>Book Appointment</span>
              </a>
              <button 
                onClick={closeModal} 
                className="flex-1 border-2 border-neutral-200 text-dark py-3.5 rounded-xl font-bold hover:bg-neutral hover:border-neutral-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;