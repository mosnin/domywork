import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Essays() {
  return (
    <>
      <Helmet>
        <title>AI Essay Generator & Writing Help | Do My Work</title>
        <meta name="description" content="Transform your essay writing with our advanced AI essay generator. Get help with research, writing, and editing. The best AI that writes essays with proper structure and citations." />
        <meta name="keywords" content="ai essay generator, ai that writes essays, essay writing ai, ai essay writer, homework ai essays" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
                AI Essay Assistant
              </h1>
              <p className="text-xl text-blue-200/80 mb-8">
                Your personal AI writing companion for better essays and academic papers
              </p>
              <Link href="/chat">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl">
                  Start Writing Essays
                </Button>
              </Link>
            </div>

            <div className="grid gap-8 mt-16">
              <section className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">How Our AI Helps With Essays</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Research & Outlining</h3>
                    <p className="text-blue-200/70">Get help finding relevant sources and creating structured outlines for your essays.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Writing & Editing</h3>
                    <p className="text-blue-200/70">Receive suggestions for improving your writing style, grammar, and overall structure.</p>
                  </div>
                </div>
              </section>

              <section className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">Essay Types We Support</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">Academic Essays</h3>
                    <ul className="text-blue-200/70 space-y-2">
                      <li>• Research papers</li>
                      <li>• Argumentative essays</li>
                      <li>• Analysis papers</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">Creative Writing</h3>
                    <ul className="text-blue-200/70 space-y-2">
                      <li>• Narrative essays</li>
                      <li>• Descriptive writing</li>
                      <li>• Personal statements</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">Professional Writing</h3>
                    <ul className="text-blue-200/70 space-y-2">
                      <li>• Reports</li>
                      <li>• Case studies</li>
                      <li>• Literature reviews</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">Features That Set Us Apart</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Plagiarism-Free Content</h3>
                    <p className="text-blue-200/70">Our AI ensures original content with proper citations and references.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Multiple Citation Styles</h3>
                    <p className="text-blue-200/70">Support for APA, MLA, Chicago, and other academic citation formats.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-blue-200/80 mb-8">
                Ready to improve your essay writing?
              </p>
              <Link href="/chat">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl">
                  Start Writing Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
