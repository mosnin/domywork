import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/navbar";

export default function AIDisclaimer() {
  return (
    <>
      <Helmet>
        <title>AI Disclaimer | Decision Buddy</title>
        <meta name="description" content="Important information about AI capabilities and limitations" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 relative">
          <Navbar />

          <main className="py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                AI Disclaimer
              </h1>

              <div className="prose prose-invert prose-yellow max-w-none">
                <p className="text-yellow-200/80">Last updated: January 30, 2025</p>

                <h2 className="text-yellow-300">Understanding AI Limitations</h2>
                <p>
                  Decision Buddy uses artificial intelligence to provide assistance and suggestions. 
                  While we strive for accuracy, it's important to understand that AI systems have limitations:
                </p>

                <h3 className="text-yellow-300">Potential Inaccuracies</h3>
                <ul>
                  <li>AI may sometimes provide incorrect or outdated information</li>
                  <li>Responses are based on training data and may not reflect current circumstances</li>
                  <li>AI cannot guarantee 100% accuracy in analysis or predictions</li>
                </ul>

                <h3 className="text-yellow-300">Not a Substitute for Professional Advice</h3>
                <p>
                  The AI's suggestions should not be considered as:
                </p>
                <ul>
                  <li>Professional legal advice</li>
                  <li>Medical diagnosis or treatment recommendations</li>
                  <li>Financial or investment advice</li>
                  <li>Mental health counseling</li>
                </ul>

                <h3 className="text-yellow-300">Best Practices</h3>
                <p>When using Decision Buddy:</p>
                <ul>
                  <li>Verify important information from reliable sources</li>
                  <li>Use critical thinking when evaluating AI suggestions</li>
                  <li>Consult qualified professionals for important decisions</li>
                  <li>Report any concerning or incorrect information</li>
                </ul>

                <h3 className="text-yellow-300">Continuous Improvement</h3>
                <p>
                  We continuously work to improve our AI systems, but they will always have inherent limitations. 
                  Your feedback helps us enhance the accuracy and reliability of our service.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
