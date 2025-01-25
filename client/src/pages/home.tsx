import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <nav className="py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Do my work</h1>
          <Link href="/chat">
            <Button>Start Chat</Button>
          </Link>
        </nav>

        <main className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Your Personal AI Homework Helper
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Get help with homework, essays, math problems and more. Powered by advanced AI to help you learn and succeed.
            </p>
            <Link href="/chat">
              <Button size="lg" className="text-lg px-8">
                Start Getting Help
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-20">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
                alt="Students studying"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">How it works</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-primary">1.</div>
                  <p>Enter your homework question or topic</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary">2.</div>
                  <p>Get detailed explanations and step-by-step guidance</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary">3.</div>
                  <p>Learn and understand the concepts better</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What we help with</h2>
              <p className="text-muted-foreground">Get assistance across various subjects and topics</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Math", description: "Algebra, Calculus, Statistics" },
                { title: "Science", description: "Physics, Chemistry, Biology" },
                { title: "Essays", description: "Research, Analysis, Writing" },
                { title: "History", description: "World History, Social Studies" },
                { title: "Literature", description: "Analysis, Comprehension" },
                { title: "Programming", description: "Python, Java, Web Dev" }
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
