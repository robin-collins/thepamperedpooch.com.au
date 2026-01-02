import React, { useEffect } from 'react';
import { useConfig } from '../ConfigContext';

export const PrivacyPolicyContent: React.FC = () => {
    const { businessInfo } = useConfig();

    return (
        <div className="prose prose-lg max-w-none text-dark/80 space-y-6 font-sans">
            <p className="text-xl font-medium text-primary">
                Your privacy is important to us. It is The Pampered Pooch's policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://thepamperedpooch.com.au" className="text-secondary hover:text-secondary-hover underline">https://thepamperedpooch.com.au</a>, and other sites we own and operate.
            </p>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">1. Information we collect</h2>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-dark/90">Log data</h3>
                    <p>
                        When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
                    </p>
                    <h3 className="text-xl font-bold text-dark/90">Device data</h3>
                    <p>
                        We may also collect data about the device you’re using to access our website. This data may include the device type, operating system, unique device identifiers, device settings, and geo-location data. What we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.
                    </p>
                    <h3 className="text-xl font-bold text-dark/90">Personal information</h3>
                    <p>
                        We may ask for personal information, such as your:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Name</li>
                        <li>Email</li>
                        <li>Phone/mobile number</li>
                        <li>Home/mailing address</li>
                        <li>Pet details (name, breed, age, medical history)</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">2. Legal bases for processing</h2>
                <p>
                    We will process your personal information lawfully, fairly and in a transparent manner. We only collect and process information about you where we have legal bases for doing so.
                </p>
                <p>
                    These legal bases depend on the services you use and how you use them, meaning we only collect and use your information where:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>it’s necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract (for example, when we provide a service you request from us);</li>
                    <li>it satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote our services, and to protect our legal rights and interests;</li>
                    <li>you give us consent to do so for a specific purpose (for example, you might consent to us sending you our newsletter); or</li>
                    <li>we need to process your data to comply with a legal obligation.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">3. Collection and use of information</h2>
                <p>
                    We may collect, hold, use and disclose information for the following purposes and personal information will not be further processed in a manner that is incompatible with these purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>to provide you with our core services;</li>
                    <li>to enable you to access and use our website, associated applications and associated social media platforms;</li>
                    <li>to contact and communicate with you;</li>
                    <li>for internal record keeping and administrative purposes;</li>
                    <li>for analytics, market research and business development, including to operate and improve our website, associated applications and associated social media platforms;</li>
                    <li>to run competitions and/or offer additional benefits to you;</li>
                    <li>for advertising and marketing, including to send you promotional information about our products and services and information about third parties that we consider may be of interest to you;</li>
                    <li>to comply with our legal obligations and resolve any disputes that we may have; and</li>
                    <li>to consider your employment application.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">4. Disclosure of personal information to third parties</h2>
                <p>
                    We may disclose personal information to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>third party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, web-hosting and server providers, debt collectors, maintenance or problem-solving providers, marketing or advertising providers, professional advisors and payment systems operators;</li>
                    <li>our employees, contractors and/or related entities;</li>
                    <li>sponsors or promoters of any competition we run;</li>
                    <li>courts, tribunals, regulatory authorities and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights;</li>
                    <li>third parties, including agents or sub-contractors, who assist us in providing information, products, services or direct marketing to you; and</li>
                    <li>third parties to collect and process data.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">5. International transfers of personal information</h2>
                <p>
                    The personal information we collect is stored and processed in Australia, or where we or our partners, affiliates and third-party providers maintain facilities. By providing us with your personal information, you consent to the disclosure to these overseas third parties.
                </p>
                <p>
                    We will ensure that any transfer of personal information from countries in the European Economic Area (EEA) to countries outside the EEA will be protected by appropriate safeguards, for example by using standard data protection clauses approved by the European Commission, or the use of binding corporate rules or other legally accepted means.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">6. Your rights and controlling your personal information</h2>
                <p>
                    <strong>Choice and consent:</strong> By providing personal information to us, you consent to us collecting, holding, using and disclosing your personal information in accordance with this privacy policy. If you are under 16 years of age, you must have, and warrant to the extent permitted by law to us, that you have your parent or legal guardian’s permission to access and use the website and they (your parents or guardian) have consented to you providing us with your personal information. You do not have to provide personal information to us, however, if you do not, it may affect your use of this website or the products and/or services offered on or through it.
                </p>
                <p>
                    <strong>Information from third parties:</strong> If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.
                </p>
                <p>
                    <strong>Restrict:</strong> You may choose to restrict the collection or use of your personal information. If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us using the details below.
                </p>
                <p>
                    <strong>Access and data portability:</strong> You may request details of the personal information that we hold about you. You may request a copy of the personal information we hold about you. Where possible, we will provide this information in CSV format or other easily readable machine format. You may request that we erase the personal information we hold about you at any time. You may also request that we transfer this personal information to another third party.
                </p>
                <p>
                    <strong>Correction:</strong> If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us using the details below. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading or out of date.
                </p>
                <p>
                    <strong>Notification of data breaches:</strong> We will comply with laws applicable to us in respect of any data breach.
                </p>
                <p>
                    <strong>Complaints:</strong> If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.
                </p>
                <p>
                    <strong>Unsubscribe:</strong> To unsubscribe from our e-mail database or opt-out of communications (including marketing communications), please contact us using the details below or opt-out using the opt-out facilities provided in the communication.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">7. Cookies and Tracking</h2>
                <p>
                    We do not currently use "cookies" or other tracking technologies on our website. We do not track your activity across other websites or services. If we decide to use cookies in the future, we will update this policy and provide you with improved options to manage your preferences.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">8. Business transfers</h2>
                <p>
                    If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include data among the assets transferred to any parties who acquire us. You acknowledge that such transfers may occur, and that any parties who acquire us may continue to use your personal information according to this policy.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">9. Limits of our policy</h2>
                <p>
                    Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-dark border-b border-primary/20 pb-2">10. Changes to this policy</h2>
                <p>
                    At our discretion, we may change our privacy policy to reflect current acceptable practices. We will take reasonable steps to let users know about changes via our website. Your continued use of this site after any changes to this policy will be regarded as acceptance of our practices around privacy and personal information.
                </p>
                <p>
                    If we make a significant change to this privacy policy, for example changing a lawful basis on which we process your personal information, we will ask you to re-consent to the amended privacy policy.
                </p>
            </section>

            <section className="space-y-4 bg-primary-light p-6 rounded-2xl border border-primary/10">
                <h2 className="text-2xl font-serif font-bold text-dark mb-4">Contacting Us</h2>
                <p>For any questions or concerns regarding your privacy, you may contact us using the following details:</p>
                <div className="mt-4 space-y-2">
                    <p><strong>The Pampered Pooch</strong></p>
                    <p>{businessInfo.address}</p>
                    <p>Phone: {businessInfo.phoneDisplay}</p>
                    <p>Email: admin@thepamperedpooch.com.au</p>
                </div>
                <p className="mt-6 text-sm text-dark/60 italic">
                    This policy is effective as of 1 January 2026.
                </p>
            </section>
        </div>
    );
}

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 pb-16 min-h-screen bg-neutral">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-soft-lg">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-8">Privacy Policy</h1>
                    <PrivacyPolicyContent />
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
