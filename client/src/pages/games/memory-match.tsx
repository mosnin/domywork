import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ["🎮", "🎲", "🎯", "🎨", "🎭", "🎪", "🎟️", "🎠"];

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    if (!isGameOver && cards.length > 0) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isGameOver, cards]);

  // Check for game over
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      const finalScore = Math.max(1000 - (moves * 10) - (timeElapsed * 2), 0);
      setScore(finalScore);
      setHighScore((prev) => Math.max(prev, finalScore));
      setIsGameOver(true);
    }
  }, [cards, moves, timeElapsed]);

  function initializeGame() {
    // Create pairs of cards
    const cardPairs = [...EMOJIS, ...EMOJIS].map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setSelectedCards([]);
    setMoves(0);
    setTimeElapsed(0);
    setIsGameOver(false);
  }

  function handleCardClick(cardId: number) {
    if (
      isGameOver ||
      selectedCards.length >= 2 ||
      selectedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    // Flip card
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    setSelectedCards((prev) => [...prev, cardId]);

    // Check for match when two cards are selected
    if (selectedCards.length === 1) {
      setMoves((prev) => prev + 1);

      const [firstCard] = selectedCards;
      const secondCard = cardId;

      if (cards[firstCard].value === cards[secondCard].value) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard || card.id === secondCard
                ? { ...card, isMatched: true }
                : card
            )
          );
          setSelectedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard || card.id === secondCard
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Memory Match</h1>
          <p className="text-muted-foreground mb-4">
            Find matching pairs of cards. Complete the game with fewer moves and less time for a higher score!
          </p>
          <div className="mt-4 flex justify-center gap-8">
            <div>Moves: {moves}</div>
            <div>Time: {timeElapsed}s</div>
            <div>High Score: {highScore}</div>
          </div>
        </div>

        <div className="relative bg-card rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg text-4xl flex items-center justify-center transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? "bg-primary text-primary-foreground rotate-0"
                    : "bg-muted text-transparent rotate-y-180"
                }`}
                disabled={isGameOver}
              >
                {card.value}
              </button>
            ))}
          </div>

          {isGameOver && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Game Complete!</h2>
                <p className="mb-2">Score: {score}</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Completed in {moves} moves and {timeElapsed} seconds
                </p>
                <Button onClick={initializeGame}>Play Again</Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/games">
            <Button variant="outline">Back to Games</Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline">Back to AI</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
