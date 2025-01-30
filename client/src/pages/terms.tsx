import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Decision Buddy</title>
        <meta name="description" content="Terms and conditions for using Decision Buddy" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 relative">
          <Navbar />

          <main className="py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Terms and Conditions
              </h1>

              <div className="prose prose-invert prose-yellow max-w-none">
                <p className="text-yellow-200/80">Last updated: January 30, 2025</p>

                <h2 className="text-yellow-300">1. Acceptance of Terms</h2>
                <p>By accessing and using Decision Buddy, you agree to be bound by these Terms and Conditions.</p>

                <h2 className="text-yellow-300">2. Use of Service</h2>
                <p>You agree to use the service only for lawful purposes and in accordance with these Terms.</p>

                <h2 className="text-yellow-300">3. User Accounts</h2>
                <p>You are responsible for maintaining the confidentiality of your account information.</p>

                <h2 className="text-yellow-300">4. Content</h2>
                <p>Users are responsible for the content they submit to the platform.</p>

                <h2 className="text-yellow-300">5. Intellectual Property</h2>
                <p>All content and materials available on Decision Buddy are protected by intellectual property rights.</p>

                <h2 className="text-yellow-300">6. Limitation of Liability</h2>
                <p>Decision Buddy is provided "as is" without any warranties, expressed or implied.</p>

                <h2 className="text-yellow-300">7. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes.</p>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}