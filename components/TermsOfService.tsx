import React, { useEffect } from 'react';
import { useConfig } from '../ConfigContext';

export const TermsOfServiceContent: React.FC = () => {
    const { businessInfo } = useConfig();

    return (
        <div className="prose prose-lg max-w-none text-dark/80 space-y-6 font-sans">
            <p className="text-xl font-medium text-primary">
                Welcome to The Pampered Pooch. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">1. Terms</h2>
                <p>
                    By accessing the website at <a href="https://thepamperedpooch.com.au" className="text-secondary hover:text-secondary-hover underline">https://thepamperedpooch.com.au</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">2. Use License</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on The Pampered Pooch's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on The Pampered Pooch's website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
                <p>
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by The Pampered Pooch at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">3. Service Terms</h2>
                <p>
                    The Pampered Pooch provide professional dog grooming services. By booking an appointment, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate information about your pet's health, temperament, and vaccination status;</li>
                    <li>Arrive on time for secondary appointments;</li>
                    <li>Give at least 24 hours notice for cancellations or rescheduling;</li>
                    <li>Pay the agreed fee for services rendered at the time of service.</li>
                </ul>
                <p>
                    We reserve the right to refuse service to pets that show signs of aggression, extreme illness, or present a risk to our staff and other pets.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">4. Disclaimer</h2>
                <p>
                    The materials on The Pampered Pooch's website are provided on an 'as is' basis. The Pampered Pooch makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p>
                    Further, The Pampered Pooch does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">5. Limitations</h2>
                <p>
                    In no event shall The Pampered Pooch or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Pampered Pooch's website, even if The Pampered Pooch or a The Pampered Pooch authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">6. Accuracy of materials</h2>
                <p>
                    The materials appearing on The Pampered Pooch's website could include technical, typographical, or photographic errors. The Pampered Pooch does not warrant that any of the materials on its website are accurate, complete or current. The Pampered Pooch may make changes to the materials contained on its website at any time without notice. However The Pampered Pooch does not make any commitment to update the materials.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">7. Links</h2>
                <p>
                    The Pampered Pooch has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by The Pampered Pooch of the site. Use of any such linked website is at the user's own risk.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">8. Modifications</h2>
                <p>
                    The Pampered Pooch may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">9. Governing Law</h2>
                <p>
                    These terms and conditions are governed by and construed in accordance with the laws of South Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
            </section>

            <section className="space-y-4 bg-primary-light p-6 rounded-2xl border border-primary/10">
                <h2 className="text-2xl font-serif font-bold text-dark mb-4">Contact Details</h2>
                <p>If you have any questions about these Terms, please contact us:</p>
                <div className="mt-4 space-y-2">
                    <p><strong>The Pampered Pooch</strong></p>
                    <p>{businessInfo.address}</p>
                    <p>Phone: {businessInfo.phoneDisplay}</p>
                    <p>Email: admin@thepamperedpooch.com.au</p>
                </div>
            </section>
        </div>
    );
}

const TermsOfService: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 pb-16 min-h-screen bg-neutral">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-soft-lg">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-8">Terms of Service</h1>
                    <TermsOfServiceContent />
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
