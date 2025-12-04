import React from 'react';
import { BUSINESS_INFO } from '../constants';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from './Icons';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Visit Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-8">Book Your Appointment</h2>
            <p className="text-gray-600 mb-10 text-lg">
              We operate by appointment only to ensure a calm environment for every dog. 
              Give us a call or send an email to schedule your visit.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-neutral rounded-2xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-soft-sm">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg mb-1">Location</h4>
                  <p className="text-gray-600 leading-relaxed">{BUSINESS_INFO.address}</p>
                  {BUSINESS_INFO.postalAddress && (
                     <p className="text-gray-500 text-sm mt-1">{BUSINESS_INFO.postalAddress}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-neutral rounded-2xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-soft-sm">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg mb-1">Phone</h4>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-gray-600 hover:text-primary transition-colors text-lg font-medium">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  {BUSINESS_INFO.fax && (
                     <p className="text-gray-400 text-sm mt-1">Fax: {BUSINESS_INFO.fax}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-neutral rounded-2xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-soft-sm">
                  <MailIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg mb-1">Email</h4>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-gray-600 hover:text-primary transition-colors">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-neutral rounded-2xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-soft-sm">
                  <ClockIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg mb-1">Opening Hours</h4>
                  <ul className="text-gray-600 space-y-1">
                    {BUSINESS_INFO.hours.map((hour, idx) => (
                      <li key={idx}>{hour}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Image Placeholder */}
          <div className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-soft-lg relative group border border-gray-100">
             {/* Simulating a Map embed styling */}
             <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=Lot%20102%20Main%20Road%2C%20Willunga%2C%20SA%205172&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    title="The Pampered Pooch Location"
                    className="grayscale group-hover:grayscale-0 transition-all duration-500"
                    aria-label="Map showing location of The Pampered Pooch"
                 ></iframe>
             </div>
             <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-soft-xl border border-white/50">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-success bg-green-500 animate-pulse"></div>
                   <p className="text-sm font-bold text-dark">Old Willunga Veterinary Building</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 pl-5">Easy drop-off and pick-up right at the door.</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;