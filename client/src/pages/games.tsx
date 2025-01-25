import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Games() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gameSpeed = 5;
    let obstacleInterval = 1500;
    let lastObstacleTime = 0;
    
    const player = {
      x: 50,
      y: canvas.height - 50,
      width: 30,
      height: 30,
      jumping: false,
      velocity: 0,
      jumpStrength: -15
    };

    const obstacles: { x: number; width: number; height: number }[] = [];
    let currentScore = 0;

    const jump = () => {
      if (!player.jumping) {
        player.jumping = true;
        player.velocity = player.jumpStrength;
      }
    };

    const gameLoop = (timestamp: number) => {
      if (gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update player
      if (player.jumping) {
        player.velocity += 0.8; // Gravity
        player.y += player.velocity;

        if (player.y > canvas.height - player.height) {
          player.y = canvas.height - player.height;
          player.jumping = false;
          player.velocity = 0;
        }
      }

      // Create obstacles
      if (timestamp - lastObstacleTime > obstacleInterval) {
        obstacles.push({
          x: canvas.width,
          width: 20 + Math.random() * 30,
          height: 40 + Math.random() * 60
        });
        lastObstacleTime = timestamp;
        
        // Increase difficulty
        gameSpeed = Math.min(12, 5 + Math.floor(currentScore / 10) * 0.5);
        obstacleInterval = Math.max(800, 1500 - Math.floor(currentScore / 5) * 50);
      }

      // Update and draw obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= gameSpeed;

        // Collision detection
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < canvas.height &&
          player.y + player.height > canvas.height - obstacle.height
        ) {
          setGameOver(true);
          setHighScore(prev => Math.max(prev, currentScore));
          return;
        }

        // Remove off-screen obstacles and increment score
        if (obstacle.x + obstacle.width < 0) {
          obstacles.splice(i, 1);
          currentScore++;
          setScore(currentScore);
        }

        // Draw obstacle
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(
          obstacle.x,
          canvas.height - obstacle.height,
          obstacle.width,
          obstacle.height
        );
      }

      // Draw player
      ctx.fillStyle = "#2196F3";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Draw ground
      ctx.fillStyle = "#795548";
      ctx.fillRect(0, canvas.height - 2, canvas.width, 2);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("touchstart", handleTouch);

    // Start game loop
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("touchstart", handleTouch);
      cancelAnimationFrame(animationFrameId);
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
          <h1 className="text-3xl font-bold mb-2">Infinite Runner</h1>
          <p className="text-muted-foreground">
            Press SPACE or tap screen to jump. Avoid obstacles and survive as long as you can!
          </p>
          <div className="mt-4 flex justify-center gap-8">
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <canvas
            ref={canvasRef}
            width={800}
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

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Tip: The game gets progressively harder as your score increases!</p>
        </div>
      </div>
    </div>
  );
}
