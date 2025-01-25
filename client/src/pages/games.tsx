import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdSenseBanner from "@/components/ads/adsense-banner";

export default function Games() {
  const games = [
    {
      id: "runner",
      title: "Infinite Runner",
      description: "Jump over obstacles and survive as long as you can. The game gets progressively faster and more challenging!",
      path: "/games/runner"
    },
    {
      id: "tetris",
      title: "Block Puzzle",
      description: "Arrange falling blocks to complete lines. Speed increases as you score more points!",
      path: "/games/tetris"
    },
    {
      id: "snake",
      title: "Snake Evolution",
      description: "Classic snake game with a twist - collect power-ups and face increasing challenges!",
      path: "/games/snake"
    }
  ];

  // Group games into rows of 3 for grid layout
  const rows = games.reduce((acc, game, i) => {
    const rowIndex = Math.floor(i / 3);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(game);
    return acc;
  }, [] as typeof games[]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Arcade Games</h1>
          <Link href="/chat">
            <Button variant="outline">Back to AI</Button>
          </Link>
        </div>

        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {row.map((game) => (
                  <Card key={game.id} className="p-6">
                    <h2 className="text-2xl font-semibold mb-2">{game.title}</h2>
                    <p className="text-muted-foreground mb-4">{game.description}</p>
                    <Link href={game.path}>
                      <Button>Play Now</Button>
                    </Link>
                  </Card>
                ))}
              </div>
              <AdSenseBanner index={rowIndex} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}