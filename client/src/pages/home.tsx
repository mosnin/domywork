import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Cyberpunk-inspired header */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative">
        <Navbar />

        <main className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              Your AI Decision Assistant
            </h1>
            <p className="text-xl text-yellow-200/80 mb-12">
              Navigate life's choices with confidence. Get guidance, understanding, and support for making better decisions.
            </p>
            <Link href="/chat">
              <Button size="lg" className="text-lg px-8 py-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 rounded-xl transform transition hover:scale-105">
                Get Smart Advice
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-20">
            <div className="space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-yellow-300">How It Works</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-center p-4 rounded-xl bg-gray-800/50 border border-yellow-500/20 backdrop-blur-sm">
                  <div className="text-yellow-400 text-xl font-bold">01</div>
                  <p className="text-yellow-100">Share your situation or dilemma</p>
                </div>
                <div className="flex gap-4 items-center p-4 rounded-xl bg-gray-800/50 border border-yellow-500/20 backdrop-blur-sm">
                  <div className="text-yellow-400 text-xl font-bold">02</div>
                  <p className="text-yellow-100">Get instant AI-powered guidance</p>
                </div>
                <div className="flex gap-4 items-center p-4 rounded-xl bg-gray-800/50 border border-yellow-500/20 backdrop-blur-sm">
                  <div className="text-yellow-400 text-xl font-bold">03</div>
                  <p className="text-yellow-100">Make informed decisions</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/10 border border-yellow-500/20 bg-gray-900/50 backdrop-blur-sm p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">We Help With</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-200">Life Choices</h4>
                    <p className="text-yellow-200/60 text-sm">Navigate important decisions</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-200">Consequences</h4>
                    <p className="text-yellow-200/60 text-sm">Understand implications</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-200">Legal Advice</h4>
                    <p className="text-yellow-200/60 text-sm">Know your rights</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-200">Mental Health</h4>
                    <p className="text-yellow-200/60 text-sm">Get support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-yellow-300 mb-4">Key Features</h2>
              <p className="text-yellow-200/80">Your companion for better decision making</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border border-yellow-500/20 bg-gray-800/50 backdrop-blur-sm hover:border-yellow-400/40 transition-colors cursor-pointer group">
                <h3 className="font-semibold text-yellow-300 group-hover:text-yellow-200 mb-2">24/7 Guidance</h3>
                <p className="text-sm text-yellow-200/60">Always here when you need advice</p>
              </div>
              <div className="p-6 rounded-xl border border-yellow-500/20 bg-gray-800/50 backdrop-blur-sm hover:border-yellow-400/40 transition-colors cursor-pointer group">
                <h3 className="font-semibold text-yellow-300 group-hover:text-yellow-200 mb-2">Safe Space</h3>
                <p className="text-sm text-yellow-200/60">Judgment-free conversation</p>
              </div>
              <div className="p-6 rounded-xl border border-yellow-500/20 bg-gray-800/50 backdrop-blur-sm hover:border-yellow-400/40 transition-colors cursor-pointer group">
                <h3 className="font-semibold text-yellow-300 group-hover:text-yellow-200 mb-2">Support Resources</h3>
                <p className="text-sm text-yellow-200/60">Access to helpful resources</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-20 border-t border-yellow-500/20 pt-16 pb-8">
          <div className="text-center text-yellow-200/50 text-sm">
            <p>&copy; 2025 Decision Buddy - Your AI Decision Assistant. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}