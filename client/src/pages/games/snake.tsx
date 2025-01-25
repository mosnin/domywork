import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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

    const GRID_SIZE = 20;
    const INITIAL_SPEED = 150;
    let gameSpeed = INITIAL_SPEED;
    let lastRenderTime = 0;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = { x: 0, y: 0 };
    let newDirection = { x: 0, y: 0 };
    let currentScore = 0;

    function gameLoop(currentTime: number) {
      if (gameOver) return;

      const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
      if (secondsSinceLastRender < gameSpeed / 1000) {
        requestAnimationFrame(gameLoop);
        return;
      }

      lastRenderTime = currentTime;
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    function update() {
      direction = newDirection;
      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };

      // Check collision with walls
      if (newHead.x < 0 || newHead.x >= canvas.width / GRID_SIZE ||
          newHead.y < 0 || newHead.y >= canvas.height / GRID_SIZE) {
        handleGameOver();
        return;
      }

      // Check collision with self
      if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        handleGameOver();
        return;
      }

      snake.unshift(newHead);

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        currentScore++;
        setScore(currentScore);
        gameSpeed = Math.max(50, INITIAL_SPEED - currentScore * 5);
        placeFood();
      } else {
        snake.pop();
      }
    }

    function draw() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      ctx.fillStyle = '#2196F3';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      });

      // Draw food
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    }

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)),
        y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))
      };
      // Ensure food doesn't spawn on snake
      while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
          x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)),
          y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))
        };
      }
    }

    function handleGameOver() {
      setGameOver(true);
      setHighScore(prev => Math.max(prev, currentScore));
    }

    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) newDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (direction.y === 0) newDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (direction.x === 0) newDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (direction.x === 0) newDirection = { x: 1, y: 0 };
          break;
      }
    });

    requestAnimationFrame(gameLoop);
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
          <p className="text-muted-foreground">
            Use arrow keys to move. Collect food to grow and increase speed!
          </p>
          <div className="mt-4 flex justify-center gap-8">
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full bg-white"
          />
          
          {gameOver && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
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
