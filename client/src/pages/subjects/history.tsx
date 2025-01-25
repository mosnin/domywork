import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function History() {
  return (
    <>
      <Helmet>
        <title>AI History Homework Help | Historical Analysis & Research Assistant</title>
        <meta name="description" content="Get expert AI assistance with history homework, research papers, and historical analysis. Our AI helps with understanding historical events, writing papers, and analyzing primary sources." />
        <meta name="keywords" content="homework for ai, ai homework, ai that does homework, ai for school, history homework help, historical analysis ai" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              History Homework Help with AI
            </h1>

            <div className="space-y-12">
              {/* Hero Section */}
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-blue-200/80">
                  Unlock the power of AI to master historical analysis, research, and writing. Get instant help understanding historical events, analyzing primary sources, and crafting compelling historical arguments.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Historical Analysis",
                    description: "Get help analyzing historical events, understanding cause and effect relationships, and identifying key historical patterns."
                  },
                  {
                    title: "Research Assistance",
                    description: "Find relevant sources, analyze primary documents, and organize historical research effectively."
                  },
                  {
                    title: "Timeline Creation",
                    description: "Create comprehensive timelines of historical events and understand their interconnections."
                  },
                  {
                    title: "Historical Writing",
                    description: "Get guidance on writing historical essays, research papers, and argumentative pieces."
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
                <h2 className="text-3xl font-bold text-blue-300 mb-6">How Our AI Helps with History</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">01</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Submit Your History Question</h3>
                      <p className="text-blue-200/70">Ask about any historical event, period, or concept you need help understanding.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">02</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Get Comprehensive Analysis</h3>
                      <p className="text-blue-200/70">Receive detailed explanations, context, and analysis of historical events.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">03</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Develop Critical Thinking</h3>
                      <p className="text-blue-200/70">Learn to analyze historical sources and develop argumentative skills.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center py-8">
                <Link href="/chat">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl px-8 py-6 text-lg">
                    Start Exploring History
                  </Button>
                </Link>
              </div>

              {/* Historical Periods */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Ancient Civilizations",
                  "Medieval Period",
                  "Renaissance",
                  "Industrial Revolution",
                  "World Wars",
                  "Cold War",
                  "Modern History",
                  "Social Movements",
                  "Cultural History"
                ].map((period) => (
                  <div 
                    key={period}
                    className="p-4 rounded-lg bg-gray-800/30 border border-blue-500/10 text-blue-200/80 text-center"
                  >
                    {period}
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
