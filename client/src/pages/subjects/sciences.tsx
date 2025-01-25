import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Sciences() {
  return (
    <>
      <Helmet>
        <title>AI Science Homework Help | Physics, Chemistry, Biology Assistance</title>
        <meta name="description" content="Get instant help with science homework using AI. Our advanced AI assists with physics problems, chemistry equations, biology concepts, and more. Perfect for students seeking homework help." />
        <meta name="keywords" content="homework for ai, ai homework, ai that does homework, ai for school, science homework help, physics ai, chemistry ai, biology ai" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Science Homework Help with AI
            </h1>

            <div className="space-y-12">
              {/* Hero Section */}
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-blue-200/80">
                  Master physics, chemistry, and biology with our AI-powered science homework assistant. Get instant help with complex problems, step-by-step explanations, and deep understanding of scientific concepts.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Physics Problem Solving",
                    description: "Get step-by-step solutions for mechanics, electricity, magnetism, and more. Our AI breaks down complex physics problems into understandable steps."
                  },
                  {
                    title: "Chemistry Support",
                    description: "Balance chemical equations, understand molecular structures, and master stoichiometry with AI-guided assistance."
                  },
                  {
                    title: "Biology Concepts",
                    description: "Learn about cellular processes, genetics, ecosystems, and human anatomy with detailed explanations and visual aids."
                  },
                  {
                    title: "Lab Report Help",
                    description: "Get guidance on writing lab reports, analyzing data, and drawing conclusions from experiments."
                  }
                ].map((feature) => (
                  <div 
                    key={feature.title}
                    className="p-6 rounded-xl border border-blue-500/20 bg-gray-800/50 backdrop-blur-sm hover:border-blue-400/40 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-300 mb-3">{feature.title}</h3>
                    <p className="text-blue-200/70">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* How It Works */}
              <div className="bg-gray-800/50 rounded-xl p-8 border border-blue-500/20">
                <h2 className="text-3xl font-bold text-blue-300 mb-6">How Our AI Helps with Science</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">01</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Input Your Science Question</h3>
                      <p className="text-blue-200/70">Simply type in your science question or upload an image of the problem.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">02</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Get Detailed Explanations</h3>
                      <p className="text-blue-200/70">Our AI provides step-by-step solutions with explanations of the underlying concepts.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">03</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Deepen Your Understanding</h3>
                      <p className="text-blue-200/70">Ask follow-up questions to better understand the concepts and principles.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center py-8">
                <Link href="/chat">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl px-8 py-6 text-lg">
                    Start Getting Science Help
                  </Button>
                </Link>
              </div>

              {/* Additional Topics */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Mechanics & Forces",
                  "Chemical Reactions",
                  "Cell Biology",
                  "Thermodynamics",
                  "Organic Chemistry",
                  "Evolution",
                  "Quantum Physics",
                  "Biochemistry",
                  "Genetics"
                ].map((topic) => (
                  <div 
                    key={topic}
                    className="p-4 rounded-lg bg-gray-800/30 border border-blue-500/10 text-blue-200/80 text-center"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
