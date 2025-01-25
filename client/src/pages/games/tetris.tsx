import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Tetris piece shapes and their rotations
const TETROMINOS = {
  I: [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
  ],
  J: [
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    [[1, 0, 0], [1, 0, 0], [1, 1, 0]],
    [[1, 1, 1], [0, 0, 1], [0, 0, 0]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]]
  ],
  L: [
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[1, 1, 0], [1, 0, 0], [1, 0, 0]],
    [[1, 1, 1], [0, 0, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
  ],
  O: [[[1, 1], [1, 1]]],
  S: [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
  ],
  T: [
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
  ],
  Z: [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
  ]
};

const COLORS = {
  I: "#00f0f0",
  O: "#f0f000",
  T: "#a000f0",
  S: "#00f000",
  Z: "#f00000",
  J: "#0000f0",
  L: "#f0a000"
};

export default function Tetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const BLOCK_SIZE = 30;
    const BOARD_WIDTH = 10;
    const BOARD_HEIGHT = 20;
    
    canvas.width = BLOCK_SIZE * BOARD_WIDTH;
    canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

    let board = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    let currentPiece = { shape: [], x: 0, y: 0, color: "" };
    let dropCounter = 0;
    let lastTime = 0;
    let dropInterval = 1000;
    let currentScore = 0;

    function createPiece() {
      const pieces = "IJLOSTZ";
      const piece = pieces[Math.floor(Math.random() * pieces.length)];
      return {
        shape: TETROMINOS[piece][0],
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOS[piece][0][0].length / 2),
        y: 0,
        color: COLORS[piece],
        rotation: 0,
        type: piece
      };
    }

    function collide(board, piece) {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0 &&
              (board[y + piece.y] &&
              board[y + piece.y][x + piece.x]) !== 0) {
            return true;
          }
        }
      }
      return false;
    }

    function merge(board, piece) {
      piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            board[y + piece.y][x + piece.x] = piece.color;
          }
        });
      });
    }

    function rotate(matrix) {
      const N = matrix.length;
      const rotated = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - 1 - j][i])
      );
      return rotated;
    }

    function playerRotate() {
      const pos = currentPiece.x;
      let offset = 1;
      const nextPattern = rotate(currentPiece.shape);
      currentPiece.shape = nextPattern;

      while (collide(board, currentPiece)) {
        currentPiece.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > currentPiece.shape[0].length) {
          currentPiece.shape = rotate(currentPiece.shape);
          currentPiece.x = pos;
          break;
        }
      }
    }

    function playerMove(dir) {
      currentPiece.x += dir;
      if (collide(board, currentPiece)) {
        currentPiece.x -= dir;
      }
    }

    function playerDrop() {
      currentPiece.y++;
      if (collide(board, currentPiece)) {
        currentPiece.y--;
        merge(board, currentPiece);
        currentPiece = createPiece();
        if (collide(board, currentPiece)) {
          setGameOver(true);
          setHighScore(prev => Math.max(prev, currentScore));
          return false;
        }
        sweep();
        return true;
      }
      return true;
    }

    function sweep() {
      let rowCount = 0;
      outer: for (let y = board.length - 1; y > 0; y--) {
        for (let x = 0; x < board[y].length; x++) {
          if (board[y][x] === 0) {
            continue outer;
          }
        }
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        y++;
        rowCount++;
      }
      if (rowCount > 0) {
        currentScore += [40, 100, 300, 1200][rowCount - 1];
        setScore(currentScore);
        // Increase speed based on score
        dropInterval = Math.max(200, 1000 - Math.floor(currentScore / 100) * 50);
      }
    }

    function draw() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      board.forEach((row, y) => {
        row.forEach((color, x) => {
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
          }
        });
      });

      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            ctx.fillStyle = currentPiece.color;
            ctx.fillRect(
              (x + currentPiece.x) * BLOCK_SIZE,
              (y + currentPiece.y) * BLOCK_SIZE,
              BLOCK_SIZE - 1,
              BLOCK_SIZE - 1
            );
          }
        });
      });
    }

    function update(time = 0) {
      if (gameOver) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      dropCounter += deltaTime;

      if (dropCounter > dropInterval) {
        if (!playerDrop()) return;
        dropCounter = 0;
      }

      draw();
      requestAnimationFrame(update);
    }

    function handleKeyPress(event) {
      if (gameOver) return;

      switch (event.key) {
        case "ArrowLeft":
          playerMove(-1);
          break;
        case "ArrowRight":
          playerMove(1);
          break;
        case "ArrowDown":
          playerDrop();
          break;
        case "ArrowUp":
          playerRotate();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    currentPiece = createPiece();
    update();

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
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
          <h1 className="text-3xl font-bold mb-2">Block Puzzle</h1>
          <p className="text-muted-foreground">
            Use arrow keys to move and rotate pieces. Complete lines to score points!
          </p>
          <div className="mt-4 flex justify-center gap-8">
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-lg mx-auto" style={{ maxWidth: "300px" }}>
          <canvas
            ref={canvasRef}
            className="bg-black"
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
