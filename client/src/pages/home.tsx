import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ArrowRight, Brain, Heart, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative">
        <Navbar />

        <main className="py-20">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              Make Better Choices
            </h1>
            <p className="text-xl text-yellow-200/80 mb-12 max-w-2xl mx-auto">
              Your AI companion for navigating life's decisions with confidence. Get personalized guidance and support when you need it most.
            </p>
            <Link href="/chat">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 rounded-xl transform transition hover:scale-105 group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 rounded-xl border border-yellow-500/20 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <Brain className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">AI-Powered Insight</h3>
              <p className="text-yellow-200/70">Get intelligent analysis and personalized recommendations for your decisions</p>
            </div>
            <div className="p-8 rounded-xl border border-yellow-500/20 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <Heart className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">Emotional Support</h3>
              <p className="text-yellow-200/70">Navigate difficult choices with empathetic guidance and understanding</p>
            </div>
            <div className="p-8 rounded-xl border border-yellow-500/20 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <Shield className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">Privacy First</h3>
              <p className="text-yellow-200/70">Your conversations and data are always protected and secure</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-20">
            <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-yellow-500/20 bg-gray-800/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-yellow-300 mb-4">Ready to Make Good Choices?</h2>
              <p className="text-yellow-200/80 mb-6">
                Join thousands of others who are making better decisions with AI guidance.
              </p>
              <Link href="/chat">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 rounded-xl">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}