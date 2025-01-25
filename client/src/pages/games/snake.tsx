import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

type Point = {
  x: number;
  y: number;
}

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    const GRID_SIZE = 20;
    const GRID_WIDTH = Math.floor(canvas.width / GRID_SIZE);
    const GRID_HEIGHT = Math.floor(canvas.height / GRID_SIZE);
    const INITIAL_SPEED = 200; // Slower initial speed

    let gameSpeed = INITIAL_SPEED;
    let lastRenderTime = 0;
    let snake: Point[] = [
      { x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) }
    ];
    let food: Point = getRandomFoodPosition();
    let direction: Point = { x: 0, y: 0 };
    let newDirection: Point = { x: 0, y: 0 };
    let currentScore = 0;
    let gameStarted = false;

    function getRandomFoodPosition(): Point {
      let position: Point;
      do {
        position = {
          x: Math.floor(Math.random() * GRID_WIDTH),
          y: Math.floor(Math.random() * GRID_HEIGHT)
        };
      } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
      return position;
    }

    function gameLoop(currentTime: number) {
      if (gameOver) return;

      const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
      if (secondsSinceLastRender < gameSpeed / 1000) {
        requestAnimationFrame(gameLoop);
        return;
      }

      lastRenderTime = currentTime;

      if (!gameStarted) {
        draw();
        requestAnimationFrame(gameLoop);
        return;
      }

      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    function update() {
      // Copy current direction if movement has started
      if (direction.x !== 0 || direction.y !== 0) {
        direction = { ...newDirection };
      }

      if (direction.x === 0 && direction.y === 0) {
        return; // Don't update if not moving
      }

      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };

      // Check collision with walls
      if (newHead.x < 0 || newHead.x >= GRID_WIDTH ||
          newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
        handleGameOver();
        return;
      }

      // Check collision with self (skip head)
      if (snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        handleGameOver();
        return;
      }

      snake.unshift(newHead);

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        currentScore++;
        setScore(currentScore);
        gameSpeed = Math.max(50, INITIAL_SPEED - currentScore * 5);
        food = getRandomFoodPosition();
      } else {
        snake.pop();
      }
    }

    function draw() {
      // Clear canvas with dark background
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid (optional)
      ctx.strokeStyle = '#2a2a2a';
      for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
          ctx.strokeRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
      }

      // Draw snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#4CAF50' : '#388E3C'; // Different color for head
        ctx.fillRect(
          segment.x * GRID_SIZE + 1,
          segment.y * GRID_SIZE + 1,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        );
      });

      // Draw food
      ctx.fillStyle = '#f44336';
      ctx.fillRect(
        food.x * GRID_SIZE + 1,
        food.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    }

    function handleGameOver() {
      setGameOver(true);
      setHighScore(prev => Math.max(prev, currentScore));
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
          e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        gameStarted = true;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) newDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (direction.y !== -1) newDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) newDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (direction.x !== -1) newDirection = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver]);

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Snake Evolution</h1>
          <p className="text-muted-foreground mb-4">
            Use arrow keys to move. Collect food to grow and increase speed!
          </p>
          <p className="text-sm text-accent-foreground">
            Press any arrow key to start
          </p>
          <div className="mt-4 flex justify-center gap-8">
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
          </div>
        </div>

        <div className="relative mx-auto" style={{ width: "400px", height: "400px" }}>
          <canvas
            ref={canvasRef}
            className="bg-black rounded-lg shadow-lg"
          />

          {gameOver && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                <p className="mb-4">Final Score: {score}</p>
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