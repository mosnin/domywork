import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

// Word list for the game
const WORDS = [
  "REACT", "JAVASCRIPT", "TYPESCRIPT", "PROGRAMMING",
  "COMPUTER", "DEVELOPER", "SOFTWARE", "CODING",
  "ALGORITHM", "DATABASE", "FRONTEND", "BACKEND",
  "NETWORK", "SECURITY", "TESTING", "DEBUGGING"
];

export default function WordScramble() {
  const [word, setWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const scrambleWord = useCallback((word: string) => {
    const letters = word.split("");
    let scrambled;
    do {
      scrambled = letters
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .join("");
    } while (scrambled === word); // Ensure the scrambled word is different
    return scrambled;
  }, []);

  const getNewWord = useCallback(() => {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(newWord);
    setScrambledWord(scrambleWord(newWord));
    setGuess("");
    setShowHint(false);
  }, [scrambleWord]);

  // Initialize game
  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  // Timer
  useEffect(() => {
    if (!isGameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      setHighScore((prev) => Math.max(prev, score));
    }
  }, [timeLeft, isGameOver, score]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toUpperCase() === word) {
      setScore((prev) => prev + Math.max(10, 20 - showHint ? 5 : 0));
      getNewWord();
    }
  };

  const showWordHint = () => {
    setShowHint(true);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsGameOver(false);
    getNewWord();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Word Scramble</h1>
          <p className="text-muted-foreground mb-4">
            Unscramble the letters to find the hidden word. Score as many points as possible in 60 seconds!
          </p>
          <div className="mt-4 flex justify-center gap-8">
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
            <div>Time: {timeLeft}s</div>
          </div>
        </div>

        <div className="relative bg-card rounded-lg p-8 shadow-lg">
          <div className="text-center">
            <div className="text-4xl font-bold mb-8 tracking-wider">
              {scrambledWord}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
                placeholder="Enter your guess"
                className="text-center text-xl"
                maxLength={word.length}
                disabled={isGameOver}
              />
              
              <div className="flex justify-center gap-4">
                <Button type="submit" disabled={isGameOver}>
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={showWordHint}
                  disabled={showHint || isGameOver}
                >
                  Hint (-5 points)
                </Button>
              </div>
            </form>

            {showHint && (
              <div className="mt-4 text-sm text-muted-foreground">
                First letter: {word[0]}
                <br />
                Length: {word.length} letters
              </div>
            )}
          </div>

          {isGameOver && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
                <p className="mb-2">Final Score: {score}</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {score === highScore ? "New High Score!" : `High Score: ${highScore}`}
                </p>
                <Button onClick={resetGame}>Play Again</Button>
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
