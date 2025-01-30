import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Decision Buddy</title>
        <meta name="description" content="Privacy policy for Decision Buddy users" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 relative">
          <Navbar />

          <main className="py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Privacy Policy
              </h1>

              <div className="prose prose-invert prose-yellow max-w-none">
                <p className="text-yellow-200/80">Last updated: January 30, 2025</p>

                <h2 className="text-yellow-300">Information We Collect</h2>
                <p>We collect information you provide directly to us when using Decision Buddy:</p>
                <ul>
                  <li>Chat conversations and queries</li>
                  <li>Account information (if you create an account)</li>
                  <li>Usage data and interactions with our service</li>
                </ul>

                <h2 className="text-yellow-300">How We Use Your Information</h2>
                <p>We use the collected information to:</p>
                <ul>
                  <li>Provide and improve our services</li>
                  <li>Personalize your experience</li>
                  <li>Analyze and enhance our AI systems</li>
                  <li>Communicate with you about our services</li>
                </ul>

                <h2 className="text-yellow-300">Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information.</p>

                <h2 className="text-yellow-300">Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of certain data collection</li>
                </ul>

                <h2 className="text-yellow-300">Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us.</p>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}