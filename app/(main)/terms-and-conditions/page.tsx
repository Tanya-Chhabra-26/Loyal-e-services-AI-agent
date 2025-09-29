'use client';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <>
            <div className="mt-0 bg-blue-100 h-100 py-16 items-center justify-center  text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Terms <span className="text-blue-700">and Conditions </span>
                </h2>
            </div>
            <div className="container mx-auto px-4 py-10">
                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-5xl text-left text-gray-800 space-y-6 list-none"
                >
                    <li>

                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">1. Introduction</h2>
                        <div className="ml-6 space-y-2">
                            <p>
                                Welcome to Loyal e-Services! These Terms of Service govern your use of our website located at https://loyaleservices.com/.
                            </p>
                            <p>
                                By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please contact us at <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline">shabib@loyaleservices.com</a>.
                            </p>
                        </div>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">2. Communications</h2>
                        <div className="ml-6">
                            <p>
                                You agree to receive newsletters and promotional materials. You may unsubscribe anytime via link or by contacting <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline">shabib@loyaleservices.com</a>.
                            </p>
                        </div>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">3. Purchases</h2>
                        <div className="ml-6 space-y-2">
                            <p>
                                You may be asked to provide payment and personal information to complete a purchase. You represent that all information is accurate.
                            </p>
                            <p>
                                We reserve the right to refuse or cancel your order for reasons including fraud or pricing errors.
                            </p>
                        </div>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">4. Promotions</h2>
                        <p className="ml-6">Promotions may have separate rules. Review those rules and our Privacy Policy before participating.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">5. Refunds</h2>
                        <p className="ml-6">No refunds are provided. However, we offer revisions for packages you are not satisfied with.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">6. Content</h2>
                        <p className="ml-6">All content on our Service is property of Loyal e-Services or used with permission. Do not reuse without consent.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">7. Prohibited Uses</h2>
                        <div className="ml-6">
                            <p>You agree not to use the Service for:</p>
                            <ul className="list-disc list-inside ml-6 space-y-1">
                                <li>Illegal activities</li>
                                <li>Harming minors</li>
                                <li>Sending spam or impersonating others</li>
                                <li>Infringing on rights or conducting harmful behavior</li>
                                <li>Introducing viruses or attacking our servers</li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">8. Analytics</h2>
                        <p className="ml-6">We may use third-party tools to analyze service usage.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">9. No Use by Minors</h2>
                        <p className="ml-6">Users must be 18+ to access and use the Service.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">10. Intellectual Property</h2>
                        <p className="ml-6">All original content and features remain the property of Loyal e-Services.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">11. Copyright Policy</h2>
                        <p className="ml-6">
                            If you believe your copyright is infringed, email us at <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline">shabib@loyaleservices.com</a> with a detailed claim.
                        </p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">12. DMCA Procedure</h2>
                        <div className="ml-6">
                            <p>Please provide:</p>
                            <ul className="list-disc list-inside ml-6 space-y-1">
                                <li>Signature</li>
                                <li>Description of the work and location of infringing content</li>
                                <li>Contact info</li>
                                <li>A good-faith belief statement</li>
                                <li>Statement under penalty of perjury</li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">13. Feedback</h2>
                        <p className="ml-6">
                            Feedback you provide may be used by the company without obligation. You waive all claims to ownership or confidentiality.
                        </p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">14. External Links</h2>
                        <p className="ml-6">We are not responsible for content on external websites linked through our Service.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">15. Disclaimer of Warranty</h2>
                        <p className="ml-6">Our service is provided "as is". We disclaim all warranties regarding its accuracy, safety, or availability.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">16. Limitation of Liability</h2>
                        <p className="ml-6">
                            You agree to hold us harmless from indirect damages. Liability is limited to the amount paid for the service.
                        </p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">17. Termination</h2>
                        <p className="ml-6">
                            We may suspend your access without notice for violation of Terms. Some provisions (ownership, disclaimers, etc.) survive termination.
                        </p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">18. Governing Law</h2>
                        <p className="ml-6">These terms are governed by the laws of Oman.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">19. Changes to Service</h2>
                        <p className="ml-6">We reserve the right to modify or withdraw the Service at any time.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">20. Amendments to Terms</h2>
                        <p className="ml-6">
                            We may update these terms. Continued use of the Service means you accept the changes.
                        </p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">21. Waiver and Severability</h2>
                        <p className="ml-6">
                            If a term is unenforceable, the rest remain valid. Failure to enforce a right is not a waiver.
                        </p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">22. Acknowledgment</h2>
                        <p className="ml-6">By using the Service, you agree to these terms.</p>
                    </li>

                    <li>
                        <h2 className="text-xl font-semibold">23. Contact Us</h2>
                        <p className="ml-6">
                            Email: <a href="mailto:shabib@loyaleservices.com" className="text-blue-600 underline">shabib@loyaleservices.com</a><br />
                            Phone: 96-892-993-313
                        </p>
                    </li>
                </motion.ul>

            </div>
            <Footer />
        </>
    );
}
