'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/shared/Footer';

export default function PrivacyPolicyPage() {
    return (
        <>
            <div className="mt-0 bg-blue-100 h-100 py-16 items-center justify-center  text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">
                    Privacy <span className="text-blue-700">Policies</span>
                </h2>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full text-left text-gray-800 space-y-8"
                >
                    <ul className="space-y-10">
                        <li>

                            <div className="space-y-2">
                                <p>
                                    The security of your data is important to us, but remember that no method of transmission over the Internet or method of
                                    electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we
                                    cannot guarantee its absolute security.
                                </p>
                            </div>
                        </li>

                        <li>
                            <h2 className="text-xl sm:text-2xl font-semibold">1. Your Data Protection Rights Under GDPR</h2>
                            <div className="space-y-2">
                                <p>
                                    If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights,
                                    covered by GDPR. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal
                                    Data.
                                </p>
                                <p>
                                    If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please
                                    email us at <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline">shabib@loyaleservices.com</a>.
                                </p>
                                <ul className="list-disc list-inside ml-4 sm:ml-6 space-y-1">
                                    <li>The right to access, update or delete the information we have on you</li>
                                    <li>The right of rectification (correct inaccurate or incomplete data)</li>
                                    <li>The right to object to our processing of your data</li>
                                    <li>The right to request restriction of processing</li>
                                    <li>The right to data portability</li>
                                    <li>The right to withdraw consent at any time</li>
                                </ul>
                                <p>
                                    Please note that we may ask you to verify your identity before responding. Also, we may not be able to provide services without
                                    necessary data. You also have the right to complain to your local Data Protection Authority.
                                </p>
                            </div>
                        </li>

                        <li>
                            <h2 className="text-xl sm:text-2xl font-semibold">2. Your Rights under the California Online Privacy Protection Act (CalOPPA)</h2>
                            <div className="space-y-2">
                                <p>
                                    CalOPPA requires commercial websites to post a privacy policy. It extends beyond California to cover any website collecting
                                    identifiable info from California consumers.
                                </p>
                                <ul className="list-disc list-inside ml-4 sm:ml-6 space-y-1">
                                    <li>Users can visit our site anonymously</li>
                                    <li>Our Privacy Policy link includes the word “Privacy” and is visible on the home page</li>
                                    <li>Users will be notified of changes on the Privacy Policy page</li>
                                    <li>Users can change personal info by emailing us at <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline">shabib@loyaleservices.com</a></li>
                                </ul>
                                <p>
                                    <strong>Do Not Track:</strong> We honor Do Not Track signals and do not plant cookies or use advertising when a Do Not Track browser
                                    setting is enabled.
                                </p>
                            </div>
                        </li>

                        <li>
                            <h2 className="text-xl sm:text-2xl font-semibold">3. Your Rights under the California Consumer Privacy Act (CCPA)</h2>
                            <div className="space-y-2">
                                <p>If you are a California resident, you may request:</p>
                                <ul className="list-disc list-inside ml-4 sm:ml-6 space-y-1">
                                    <li>The categories and specific pieces of personal info we collected</li>
                                    <li>Sources of the data</li>
                                    <li>Purpose of data collection</li>
                                    <li>Third parties we share the data with</li>
                                    <li>A list of categories sold or disclosed</li>
                                </ul>
                                <p>
                                    You can request deletion of your personal data. In some cases, data may be de-identified instead of fully deleted.
                                </p>
                                <p>
                                    We do not sell personal information for monetary gain. Transfers within our family of companies may be considered "sales" under
                                    California law, but we do not discriminate against users exercising their rights.
                                </p>
                                <p>
                                    Email requests to <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline">shabib@loyaleservices.com</a>. The CCPA took effect on 01/01/2020.
                                </p>
                            </div>
                        </li>

                        {[
                            { title: "4. Service Providers", content: "We may use third-party companies to provide or analyze services. They have access to personal data only to perform these tasks and must not use it for other purposes." },
                            { title: "5. Analytics", content: "We may use third-party analytics tools to analyze how users interact with our services." },
                            { title: "6. CI/CD Tools", content: "We may use third-party tools to automate the development and deployment process." },
                            { title: "7. Behavioral Remarketing", content: "We may use remarketing services (with cookies) to advertise to you after you visit our site." },
                            { title: "8. Payments", content: "We may offer paid services and use third-party processors (e.g., Stripe, PayPal). We do not store payment data directly. Processors are PCI-DSS compliant." },
                            { title: "9. Links to Other Sites", content: "Our site may contain links to external websites. We are not responsible for their privacy practices and strongly recommend reviewing their policies." },
                            { title: "10. Children’s Privacy", content: "Our services are not directed at children under 18. We do not knowingly collect data from them. If we do, we will delete it immediately upon notice." },
                            { title: "11. Changes to This Privacy Policy", content: "We may update this policy. We will notify users via email or a notice on the site. The 'effective date' will also be updated." },
                            {
                                title: "12. Contact Us",
                                content: (
                                    <>
                                        If you have any questions about this Privacy Policy, contact us via email at:
                                        <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline ml-1">shabib@loyaleservices.com</a>
                                    </>
                                )
                            },
                        ].map((section, idx) => (
                            <li key={idx}>
                                <h2 className="text-xl sm:text-2xl font-semibold">{section.title}</h2>
                                <div className="space-y-2">
                                    <p>{section.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
