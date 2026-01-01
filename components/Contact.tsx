import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { BUSINESS_INFO } from '../constants';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from './Icons';

type VerificationStep = 'form' | 'verify' | 'success';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Form State
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Verification State
  const [step, setStep] = useState<VerificationStep>('form');
  const [verificationCode, setVerificationCode] = useState<string[]>(new Array(6).fill(''));
  const [codeError, setCodeError] = useState('');

  // Timers
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [resendCooldown, setResendCooldown] = useState(240); // 4 minutes in seconds

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'verify' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCodeError("Code expired. Please resend.");
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'verify' && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCooldown]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) return "Valid email is required";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  const generateAndSendCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification email');
      }

      // Reset Verification State
      setVerificationCode(new Array(6).fill(''));
      setTimeLeft(900);
      setResendCooldown(240);
      setCodeError('');
      setStep('verify');
      setStatus('idle');

      // Focus first input after render
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send verification email');
      setStatus('idle');
    }
  };

  const initiateVerification = (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setStatus('submitting');

    // Simulate API delay for sending email
    setTimeout(() => {
      generateAndSendCode();
    }, 1500);
  };

  const handleVerificationInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newCode = [...verificationCode];
    newCode[index] = value.substring(value.length - 1);
    setVerificationCode(newCode);
    setCodeError('');

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.every(char => !isNaN(Number(char)))) {
      const newCode = [...verificationCode];
      pastedData.forEach((char, i) => {
        if (i < 6) newCode[i] = char;
      });
      setVerificationCode(newCode);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const verifyAndSend = async () => {
    const enteredCode = verificationCode.join('');
    if (enteredCode.length !== 6) return;

    if (timeLeft === 0) {
      setCodeError('Code expired. Please request a new one.');
      return;
    }

    setStatus('submitting');

    try {
      // Step 1: Verify the code
      const verifyResponse = await fetch('http://localhost:3001/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: enteredCode }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Verification failed');
      }

      // Step 2: Send the actual message
      const messageResponse = await fetch('http://localhost:3001/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const messageData = await messageResponse.json();

      if (!messageResponse.ok) {
        throw new Error(messageData.error || 'Failed to send message');
      }

      // Success - save locally as backup
      const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      const newMessage = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        verified: true
      };
      localStorage.setItem('contact_messages', JSON.stringify([...existingMessages, newMessage]));

      setStep('success');
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset after animation
      setTimeout(() => {
        setStep('form');
        setStatus('idle');
      }, 4000);
    } catch (error) {
      setCodeError(error instanceof Error ? error.message : 'Verification failed');
      setVerificationCode(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
      setStatus('idle');
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setStatus('submitting');
    setTimeout(() => {
      generateAndSendCode();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">

          {/* Contact Info */}
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Visit Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-8">Get In Touch</h2>
            <p className="text-gray-600 mb-10 text-lg">
              We operate by appointment only to ensure a calm environment for every dog.
              Give us a call or send a message to schedule your visit.
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
                  <h4 className="font-bold text-dark text-lg mb-1">Get in Touch</h4>
                  <p className="text-gray-600">
                    Contact Christine via the "Send a Message" form.
                  </p>
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

          {/* Contact Form */}
          <div className="bg-neutral p-8 md:p-10 rounded-3xl shadow-soft-md border border-neutral-200">
            <h3 className="text-2xl font-serif font-bold text-dark mb-6">Send a Message</h3>
            <form onSubmit={initiateVerification} className="space-y-5">
              {/* Inputs */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="(08) ..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                  placeholder="Tell us about your pet and preferred appointment times..."
                ></textarea>
              </div>

              {errorMessage && (
                <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 flex items-center animate-fade-in-up">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full bg-primary text-white font-bold py-4 rounded-xl shadow-glow-primary hover:bg-primary-hover transition-all transform hover:-translate-y-1 flex justify-center items-center ${status === 'submitting' ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Code...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-soft-lg relative group border border-gray-100">
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
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-soft-xl border border-white/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-sm font-bold text-dark">Old Willunga Veterinary Building</p>
            </div>
            <p className="text-xs text-gray-500 mt-1 pl-5">Easy drop-off and pick-up right at the door.</p>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {(step === 'verify' || step === 'success') && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm animate-fade-in-up"></div>

          <div
            className={`bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl transition-all duration-700 ease-in-out ${step === 'success' ? 'transform scale-0 rotate-12 opacity-0' : 'transform scale-100 opacity-100'
              }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-dark mb-2">Verify Your Email</h3>
              <p className="text-gray-600 mb-6 text-sm">
                We've sent a 6-digit code to <span className="font-bold text-dark">{formData.email}</span>.
                Please enter it below to send your message.
              </p>

              {/* 6 Digit Input */}
              <div className="flex justify-center gap-2 md:gap-3 mb-6">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleVerificationInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-10 h-12 md:w-12 md:h-14 border-2 border-gray-200 rounded-lg text-center text-xl font-bold text-dark focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  />
                ))}
              </div>

              {codeError && (
                <div className="text-red-500 text-sm font-medium mb-4 animate-bounce">
                  {codeError}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={verifyAndSend}
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-glow-primary hover:bg-primary-hover transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : 'Verify & Send Message'}
                </button>

                <div className="flex justify-between items-center text-xs text-gray-500 mt-2 px-2">
                  <span>Code expires in: <span className="font-mono font-medium">{formatTime(timeLeft)}</span></span>
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className={`font-medium transition-colors ${resendCooldown > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-primary hover:underline'
                      }`}
                  >
                    {resendCooldown > 0 ? `Resend in ${formatTime(resendCooldown)}` : 'Resend Code'}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep('form');
                  setStatus('idle');
                  setCodeError('');
                }}
                className="mt-6 text-gray-400 hover:text-dark text-sm"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Success "Sent" Animation Overlay */}
          {step === 'success' && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="bg-white p-8 rounded-full shadow-soft-2xl animate-bounce-gentle transform scale-150">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute mt-32 font-serif font-bold text-2xl text-white drop-shadow-md animate-fade-in-up">
                Message Sent!
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Contact;