"use client";

import { motion } from "framer-motion";

/* ─── Design Tokens ─── */
const gold = "#C9A84C";
const charcoal = "#1A1410";
const taupe = "#6B5F55";
const cream = "#FAF8F5";

export default function TermsOfServicePage() {
    const lastUpdated = "July 29, 2026";

    return (
        <main
            className="min-h-screen font-sans selection:bg-[#C9A84C] selection:text-white"
            style={{ background: cream, color: charcoal }}
        >
            {/* ──────────── HEADER ──────────── */}
            <header
                className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden flex flex-col items-center justify-center text-center"
                style={{ backgroundColor: charcoal }}
            >
                {/* Subtle Background Glow */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% 100%, ${gold} 0%, transparent 50%)`,
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <p
                        className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold mb-4"
                        style={{ color: gold }}
                    >
                        Vibe Unisex Salon
                    </p>
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 text-[#FAF8F5]"
                        style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                    >
                        Terms of Service
                    </h1>
                    <p className="text-sm md:text-base text-white/70 font-light">
                        Last Updated: {lastUpdated}
                    </p>
                </motion.div>
            </header>

            {/* ──────────── CONTENT ──────────── */}
            <section className="py-16 md:py-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border"
                    style={{ borderColor: "rgba(201,168,76,0.15)" }}
                >
                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#1A1410] prose-p:text-[#6B5F55] prose-li:text-[#6B5F55] prose-a:text-[#C9A84C] hover:prose-a:text-[#1A1410] prose-a:transition-colors">

                        <p className="lead text-lg md:text-xl font-medium" style={{ color: charcoal }}>
                            Welcome to Vibe Unisex Salon. By accessing our website, booking an appointment, or utilizing our services across any of our Chennai branches, you agree to be bound by the following Terms of Service.
                        </p>

                        <p>
                            Please read these terms carefully before engaging with our services. If you do not agree with any part of these terms, you must not use our services.
                        </p>

                        <hr className="my-10 border-t border-[rgba(201,168,76,0.2)]" />

                        <h2>1. Appointments and Cancellations</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Bookings:</strong> Appointments can be made online, via phone, or in-person at our Anna Nagar, T. Nagar, Ekkatuthangal, Porur, or Velachery branches. We recommend booking in advance to secure your preferred time and stylist.</li>
                            <li><strong>Late Arrivals:</strong> If you arrive more than 15 minutes late for your appointment, we may need to shorten your service time to accommodate the next client, or we may ask you to reschedule. The full service fee may still apply.</li>
                            <li><strong>Cancellations:</strong> We value the time of our stylists and clients. We require a minimum of 24 hours' notice for any cancellations or rescheduling. Repeated failure to show up for appointments may result in a requirement to pre-pay for future bookings.</li>
                        </ul>

                        <h2>2. Health, Safety, and Allergies</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Medical Conditions:</strong> It is your responsibility to inform your stylist or therapist of any medical conditions, allergies, or skin sensitivities prior to the commencement of any service.</li>
                            <li><strong>Patch Testing:</strong> For certain chemical services (such as specific hair colors or smoothing treatments), a patch test may be required 24 to 48 hours prior to the appointment. We reserve the right to refuse service if a patch test is declined or yields an adverse reaction.</li>
                            <li><strong>Refusal of Service:</strong> Vibe Unisex Salon reserves the right to refuse service to anyone demonstrating inappropriate behavior, intoxication, or an infectious condition that poses a risk to our staff or other clients.</li>
                        </ul>

                        <h2>3. Pricing and Payments</h2>
                        <p>
                            All prices listed on our website or in-salon menus are starting prices and are subject to change without prior notice. Final pricing may vary depending on hair length, thickness, and the specific requirements of the service.
                        </p>
                        <p>
                            We accept payments via cash, major credit/debit cards, and standard UPI methods. Full payment is due immediately upon the completion of your service. All prices are exclusive of applicable government taxes unless stated otherwise.
                        </p>

                        <h2>4. Service Guarantee and Refunds</h2>
                        <p>
                            We pride ourselves on delivering premium results. If you are dissatisfied with your service, you must notify the salon management within <strong>48 hours</strong> of your appointment. We will offer a complimentary consultation to assess the issue and, if deemed appropriate by our management, a corrective service within 7 days.
                        </p>
                        <p>
                            <strong>We do not offer monetary refunds for services rendered.</strong> Retail products can only be exchanged within 7 days of purchase if they are unopened, unused, and in their original packaging, accompanied by the original receipt.
                        </p>

                        <h2>5. Personal Belongings</h2>
                        <p>
                            While we take every precaution to protect your clothing during services, we strongly advise wearing the protective gowns provided. Vibe Unisex Salon is <strong>not responsible or liable</strong> for any damage to clothing, nor are we liable for the loss, theft, or damage of personal belongings (including jewelry, phones, and bags) brought into the salon.
                        </p>

                        <h2>6. Intellectual Property</h2>
                        <p>
                            All content on the Vibe Unisex Salon website, including but not limited to logos, text, imagery, graphics, and video, is the exclusive property of Vibe Unisex Salon and is protected by copyright laws. You may not reproduce, distribute, or use our intellectual property for commercial purposes without express written consent.
                        </p>

                        <h2>7. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Vibe Unisex Salon, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of our services, website, or products, beyond the total cost of the service provided to you.
                        </p>

                        <h2>8. Governing Law and Jurisdiction</h2>
                        <p>
                            These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms or our services shall be subject to the exclusive jurisdiction of the courts located in <strong>Chennai, Tamil Nadu</strong>.
                        </p>

                        <hr className="my-10 border-t border-[rgba(201,168,76,0.2)]" />

                        <h2>9. Contact Information</h2>
                        <p>
                            If you have any questions or concerns regarding these Terms of Service, please reach out to our management team:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                            {[
                                { name: "Anna Nagar", phone: "+91 8072352853" },
                                { name: "T. Nagar", phone: "+91 9342795928" },
                                { name: "Ekkatuthangal", phone: "+91 6374679577" },
                                { name: "Porur", phone: "+91 7603957055" },
                                { name: "Velachery", phone: "+91 9363702047" },
                            ].map((branch) => (
                                <div
                                    key={branch.name}
                                    className="bg-[#FAF8F5] p-5 md:p-6 rounded-2xl border border-[rgba(201,168,76,0.2)] transition-colors duration-300 hover:border-[#C9A84C]"
                                >
                                    <p className="m-0 text-sm md:text-base font-medium" style={{ color: charcoal }}>
                                        <strong>Vibe - {branch.name}</strong><br />
                                        Chennai, Tamil Nadu, India<br />

                                        <span className="inline-block mt-1">
                                            <strong>Phone:</strong>{" "}
                                            <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="no-underline hover:underline transition-colors" style={{ color: taupe }}>
                                                {branch.phone}
                                            </a>
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </motion.div>
            </section>
        </main>
    );
}