import React from 'react';
import { QuoteIcon } from './Icons';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-neutral overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-4xl overflow-hidden shadow-soft-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" 
                alt="Groomer working with a dog" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Background Accent */}
            <div className="absolute top-10 -left-10 w-full h-full bg-primary-light rounded-4xl -z-0 transform -rotate-2 border border-primary/10"></div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-soft-xl z-20 animate-bounce-gentle border border-gray-100">
              <span className="block text-4xl font-bold text-primary font-serif">Est.</span>
              <span className="block text-4xl font-bold text-primary font-serif">1994</span>
              <span className="text-gray-500 font-medium text-xs uppercase tracking-wider mt-1 block">30+ Years of Care</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-8">A Tradition of Excellence</h2>
            
            <div className="prose prose-lg text-gray-600 mb-8">
              <p className="mb-4">
                Established in 1994 by Christine Collins, The Pampered Pooch has evolved from a small owner-operated business into a premier grooming establishment. We are proud to serve over 3,000 clients from across the region, including Kangaroo Island, Victor Harbor, Seaford, Reynella, and Adelaide.
              </p>
              <p className="mb-4">
                Since 1999, we have been located in the historic Old Willunga Veterinary building at Lot 102 Main Road. Our spacious facility is fully air-conditioned and gas-heated, offering excellent ventilation and natural lighting to ensure a hygienic, comfortable, and stress-free environment for every pet.
              </p>
              <p>
                We believe in complete transparency. Our salon is designed with designated rooms for each stage of the grooming process, and we welcome clients to observe our work, ensuring you feel confident in the individualized care your pet receives.
              </p>
            </div>

            <div className="flex items-start gap-4 p-8 bg-white rounded-2xl shadow-soft-md border border-gray-100">
              <QuoteIcon className="w-8 h-8 text-primary/40 flex-shrink-0" />
              <div>
                <p className="italic text-gray-700 font-medium mb-4 text-lg leading-relaxed">
                  "My philosophy has always been simple: treat every animal with the same patience and kindness I would want for my own. Seeing a happy pet and a satisfied owner is our greatest reward."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-8 bg-primary"></div>
                  <span className="font-bold text-dark font-serif">– Christine Collins, Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;