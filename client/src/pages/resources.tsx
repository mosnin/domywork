import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";

export default function Resources() {
  const resources = [
    {
      category: "Mental Health",
      items: [
        {
          name: "National Crisis Line",
          description: "24/7 support for mental health crisis",
          contact: "988",
          website: "https://988lifeline.org"
        },
        {
          name: "SAMHSA's National Helpline",
          description: "Treatment referral and information service",
          contact: "1-800-662-4357",
          website: "https://www.samhsa.gov/find-help/national-helpline"
        }
      ]
    },
    {
      category: "Legal Aid",
      items: [
        {
          name: "Legal Services Corporation",
          description: "Free legal assistance to eligible low-income individuals",
          website: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help"
        },
        {
          name: "American Bar Association",
          description: "Free legal resources and referrals",
          website: "https://www.americanbar.org/groups/legal_services/flh-home/"
        }
      ]
    },
    {
      category: "Financial Assistance",
      items: [
        {
          name: "Benefits.gov",
          description: "Find government benefits you may be eligible for",
          website: "https://www.benefits.gov"
        },
        {
          name: "Consumer Financial Protection Bureau",
          description: "Financial education and assistance",
          website: "https://www.consumerfinance.gov"
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Help Resources | Decision Buddy</title>
        <meta name="description" content="Find help and support resources for mental health, legal aid, and financial assistance." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Help Resources
              </h1>
              <p className="text-xl text-yellow-200/80 mb-8">
                Find support and assistance for various life challenges
              </p>
            </div>

            <div className="grid gap-8">
              {resources.map((section, index) => (
                <section key={index} className="bg-gray-800/50 border border-yellow-500/20 rounded-xl p-8 backdrop-blur-sm">
                  <h2 className="text-3xl font-bold text-yellow-300 mb-6">{section.category}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {section.items.map((item, itemIndex) => (
                      <Card key={itemIndex} className="p-6 bg-gray-700/50 border-yellow-500/20">
                        <h3 className="text-xl font-semibold text-yellow-200 mb-2">{item.name}</h3>
                        <p className="text-yellow-200/70 mb-4">{item.description}</p>
                        {item.contact && (
                          <p className="text-yellow-200/70 mb-2">
                            Contact: <span className="text-yellow-400">{item.contact}</span>
                          </p>
                        )}
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button
                            variant="outline"
                            className="border-yellow-500/20 hover:bg-yellow-500/10 text-yellow-400"
                          >
                            Visit Website
                          </Button>
                        </a>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/chat">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 rounded-xl">
                  Get AI Assistance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
