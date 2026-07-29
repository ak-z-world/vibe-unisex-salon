"use client";

import { motion } from "framer-motion";

/* ─── Design Tokens ─── */
const gold = "#C9A84C";
const charcoal = "#1A1410";
const taupe = "#6B5F55";
const cream = "#FAF8F5";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
              At Vibe Unisex Salon, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
            </p>

            <p>
              This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website, book appointments across our Chennai branches, or interact with our services.
            </p>

            <hr className="my-10 border-t border-[rgba(201,168,76,0.2)]" />

            <h2>1. Information We Collect</h2>
            <p>
              To provide you with our premium salon experiences, we may collect the following types of information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and physical address (if applicable).</li>
              <li><strong>Booking & Service History:</strong> Appointment dates, preferred branches (Anna Nagar, T. Nagar, Ekkatuthangal, Porur, Velachery), chosen services, and preferred stylists.</li>
              <li><strong>Health & Grooming Preferences:</strong> Information relevant to your services, such as allergies, skin sensitivity, or specific hair conditions, shared voluntarily during consultations.</li>
              <li><strong>Digital Interaction Data:</strong> IP address, browser type, and interaction metrics when you visit our website.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We utilize your data solely to enhance your experience with Vibe Unisex Salon. Specifically, we use your information to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process, confirm, and manage your salon appointments.</li>
              <li>Send appointment reminders and updates via SMS, WhatsApp, or email.</li>
              <li>Provide personalized service recommendations based on your styling history.</li>
              <li>Improve our website, customer service, and overall salon operations.</li>
              <li>Send marketing communications, promotional offers, and newsletters (you may opt-out at any time).</li>
            </ul>

            <h2>3. Data Sharing and Disclosure</h2>
            <p>
              We respect your privacy and <strong>do not sell, trade, or rent</strong> your personal information to third parties. We may share your data only in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Service Providers:</strong> We may share necessary details with trusted third-party platforms that assist us in operating our booking systems, WhatsApp communications, and marketing infrastructure, strictly under confidentiality agreements.</li>
              <li><strong>Legal Compliance:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses "cookies" to enhance user experience, analyze site traffic, and personalize content. You can choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the site may not function properly.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on applicable data protection laws, you retain the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request corrections to any inaccurate or incomplete data.</li>
              <li>The right to request the deletion of your personal data, subject to legal and operational retention requirements.</li>
              <li>The right to opt-out of marketing communications at any time by clicking the "unsubscribe" link in our emails or replying "STOP" to promotional messages.</li>
            </ul>

            <h2>7. Changes to This Privacy Policy</h2>
            <p>
              Vibe Unisex Salon reserves the right to update this Privacy Policy at our discretion. When we do, we will revise the "Last Updated" date at the top of this page. We encourage clients to frequently check this page for any changes to stay informed about how we are protecting the personal information we collect.
            </p>

            <hr className="my-10 border-t border-[rgba(201,168,76,0.2)]" />

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with Vibe Unisex Salon, please contact our administrative team at any of our branches:
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