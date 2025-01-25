import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Literature() {
  return (
    <>
      <Helmet>
        <title>AI Literature Analysis | Literary Analysis & Reading Comprehension Help</title>
        <meta name="description" content="Get AI assistance with literature homework, book analysis, and reading comprehension. Our AI helps analyze themes, characters, and literary devices in any text." />
        <meta name="keywords" content="homework for ai, ai homework, ai that does homework, ai for school, literature analysis ai, book analysis ai" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Literature Analysis with AI
            </h1>

            <div className="space-y-12">
              {/* Hero Section */}
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-blue-200/80">
                  Enhance your understanding of literature with AI-powered analysis. Get help with analyzing texts, understanding themes, and interpreting literary devices for deeper comprehension.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Text Analysis",
                    description: "Get detailed analysis of themes, symbols, and motifs in any literary work. Our AI helps you understand the deeper meaning behind the text."
                  },
                  {
                    title: "Character Studies",
                    description: "Analyze character development, relationships, and motivations with AI-guided insights and explanations."
                  },
                  {
                    title: "Literary Devices",
                    description: "Identify and understand metaphors, similes, imagery, and other literary devices used in texts."
                  },
                  {
                    title: "Essay Planning",
                    description: "Get help organizing your thoughts and creating outlines for literary analysis essays."
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
                <h2 className="text-3xl font-bold text-blue-300 mb-6">How Our AI Helps with Literature</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">01</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Share the Text</h3>
                      <p className="text-blue-200/70">Input the passage or work you need help analyzing.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">02</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Get In-Depth Analysis</h3>
                      <p className="text-blue-200/70">Receive comprehensive analysis of themes, characters, and literary devices.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-blue-400 text-xl font-bold">03</div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200">Develop Critical Reading Skills</h3>
                      <p className="text-blue-200/70">Learn to identify and analyze literary elements independently.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center py-8">
                <Link href="/chat">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl px-8 py-6 text-lg">
                    Start Analyzing Literature
                  </Button>
                </Link>
              </div>

              {/* Literary Elements */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Theme Analysis",
                  "Character Development",
                  "Plot Structure",
                  "Symbolism",
                  "Narrative Voice",
                  "Setting Analysis",
                  "Genre Studies",
                  "Historical Context",
                  "Literary Theory"
                ].map((element) => (
                  <div 
                    key={element}
                    className="p-4 rounded-lg bg-gray-800/30 border border-blue-500/10 text-blue-200/80 text-center"
                  >
                    {element}
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
