import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Docs() {
  const documentation = [
    {
      title: "Getting Started",
      description: "Learn how to use Decision Buddy effectively",
      sections: [
        { name: "Introduction", content: "Decision Buddy is your AI-powered companion for making better decisions." },
        { name: "Key Features", content: "Explore our AI chat, resource library, and interactive tools." }
      ]
    },
    {
      title: "Using the Chat",
      description: "Make the most of our AI chat system",
      sections: [
        { name: "Starting a Conversation", content: "Begin by clicking the 'Start Chat' button and describing your situation." },
        { name: "Best Practices", content: "Be specific about your situation and what kind of advice you're seeking." }
      ]
    },
    {
      title: "Resources Guide",
      description: "Understanding our resource collection",
      sections: [
        { name: "Categories", content: "Browse through mental health, legal aid, and financial assistance resources." },
        { name: "External Links", content: "Access trusted external resources and support services." }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Documentation | Decision Buddy</title>
        <meta name="description" content="Learn how to use Decision Buddy effectively with our comprehensive documentation." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 relative">
          <Navbar />

          <div className="py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Documentation
                </h1>
                <p className="text-xl text-yellow-200/80 mb-8">
                  Everything you need to know about using Decision Buddy
                </p>
              </div>

              <div className="grid gap-8">
                {documentation.map((section, index) => (
                  <Card key={index} className="bg-gray-800/50 border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-2xl text-yellow-300">{section.title}</CardTitle>
                      <CardDescription className="text-yellow-200/70">{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {section.sections.map((subsection, subIndex) => (
                          <div key={subIndex} className="p-4 rounded-lg bg-gray-700/50 border border-yellow-500/20">
                            <h3 className="text-lg font-semibold text-yellow-200 mb-2">{subsection.name}</h3>
                            <p className="text-yellow-200/70">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 rounded-xl">
                    Try It Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-20 border-t border-yellow-500/20 pt-16 pb-8">
            <div className="text-center text-yellow-200/50 text-sm">
              <p>&copy; 2025 Decision Buddy - Your AI Decision Assistant. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
