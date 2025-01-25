import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Cyberpunk-inspired header */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative">
        <nav className="py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Do my work
          </h1>
          <Link href="/chat">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl">
              Start Chat
            </Button>
          </Link>
        </nav>

        <main className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
              Your AI Study Companion
            </h1>
            <p className="text-xl text-blue-200/80 mb-12">
              Level up your learning with AI-powered homework assistance. Get instant help, explanations, and guidance.
            </p>
            <Link href="/chat">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl transform transition hover:scale-105">
                Power Up Your Studies
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-20">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-blue-500/20 bg-gray-900/50 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8"
                alt="Modern learning environment"
                className="w-full h-64 object-cover object-center"
              />
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-blue-300">How it works</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-center p-4 rounded-xl bg-gray-800/50 border border-blue-500/20 backdrop-blur-sm">
                  <div className="text-blue-400 text-xl font-bold">01</div>
                  <p className="text-blue-100">Drop your question or homework challenge</p>
                </div>
                <div className="flex gap-4 items-center p-4 rounded-xl bg-gray-800/50 border border-blue-500/20 backdrop-blur-sm">
                  <div className="text-blue-400 text-xl font-bold">02</div>
                  <p className="text-blue-100">Get instant AI-powered explanations</p>
                </div>
                <div className="flex gap-4 items-center p-4 rounded-xl bg-gray-800/50 border border-blue-500/20 backdrop-blur-sm">
                  <div className="text-blue-400 text-xl font-bold">03</div>
                  <p className="text-blue-100">Level up your understanding</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-300 mb-4">Skill Tree</h2>
              <p className="text-blue-200/80">Unlock knowledge across multiple subjects</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Mathematics", description: "From Algebra to Calculus" },
                { title: "Sciences", description: "Physics, Chemistry, Biology" },
                { title: "Essays", description: "Research & Writing" },
                { title: "History", description: "World Events & Analysis" },
                { title: "Literature", description: "Comprehension & Analysis" },
                { title: "Programming", description: "Code & Development" }
              ].map((item) => (
                <div 
                  key={item.title} 
                  className="p-6 rounded-xl border border-blue-500/20 bg-gray-800/50 backdrop-blur-sm hover:border-blue-400/40 transition-colors cursor-pointer group"
                >
                  <h3 className="font-semibold text-blue-300 group-hover:text-blue-200 mb-2">{item.title}</h3>
                  <p className="text-sm text-blue-200/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-blue-500/20 pt-16 pb-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Features</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Security</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Updates</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-3">
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Help Center</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Community</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Contact</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">About</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Blog</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Partners</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Privacy</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">Terms</span></li>
                <li><span className="text-blue-200/70 hover:text-blue-200 cursor-pointer transition-colors">License</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-blue-200/50 text-sm">
            <p>&copy; 2025 Your AI Study Companion. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}