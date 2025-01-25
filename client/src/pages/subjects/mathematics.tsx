import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Mathematics() {
  return (
    <>
      <Helmet>
        <title>AI Math Homework Help | Math AI Assistant | Do My Work</title>
        <meta name="description" content="Get instant math homework help with our AI math solver. From algebra to calculus, our math AI provides step-by-step solutions and explanations. The best AI for math homework assistance." />
        <meta name="keywords" content="math ai, ai for math, maths ai, mathematics homework help, ai math solver, math homework ai, ai math tutor" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
                Math AI Assistant
              </h1>
              <p className="text-xl text-blue-200/80 mb-8">
                Unlock the power of AI for instant math homework help and step-by-step solutions
              </p>
              <Link href="/chat">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl">
                  Start Solving Math Problems
                </Button>
              </Link>
            </div>

            <div className="grid gap-8 mt-16">
              <section className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">How Our Math AI Helps You</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Step-by-Step Solutions</h3>
                    <p className="text-blue-200/70">Get detailed explanations for every step of your math problems, from basic arithmetic to advanced calculus.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Multiple Approaches</h3>
                    <p className="text-blue-200/70">Learn different methods to solve the same problem, helping you understand concepts better.</p>
                  </div>
                </div>
              </section>

              <section className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">Subjects We Cover</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">Algebra</h3>
                    <ul className="text-blue-200/70 space-y-2">
                      <li>• Linear equations</li>
                      <li>• Quadratic functions</li>
                      <li>• Systems of equations</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">Calculus</h3>
                    <ul className="text-blue-200/70 space-y-2">
                      <li>• Derivatives</li>
                      <li>• Integrals</li>
                      <li>• Differential equations</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">Statistics</h3>
                    <ul className="text-blue-200/70 space-y-2">
                      <li>• Probability</li>
                      <li>• Data analysis</li>
                      <li>• Statistical inference</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">Why Choose Our Math AI</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Instant Help</h3>
                    <p className="text-blue-200/70">Get immediate assistance with any math problem, 24/7. No waiting for tutors or office hours.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Learn, Don't Just Copy</h3>
                    <p className="text-blue-200/70">Our AI explains concepts thoroughly, helping you understand the underlying principles.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-blue-200/80 mb-8">
                Ready to excel in mathematics?
              </p>
              <Link href="/chat">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl">
                  Start Using Math AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
