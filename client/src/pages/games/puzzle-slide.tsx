import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

type Tile = {
  id: number;
  currentPos: number;
  value: number;
};

export default function PuzzleSlide() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [highScore, setHighScore] = useState(Infinity);
  const [gridSize, setGridSize] = useState(3); // 3x3 grid by default

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  function initializeGame() {
    const totalTiles = gridSize * gridSize;
    const newTiles = Array.from({ length: totalTiles - 1 }, (_, i) => ({
      id: i + 1,
      currentPos: i,
      value: i + 1,
    }));

    // Add empty tile
    newTiles.push({
      id: totalTiles,
      currentPos: totalTiles - 1,
      value: 0, // 0 represents empty tile
    });

    // Shuffle tiles (ensure puzzle is solvable)
    let shuffledTiles = [...newTiles];
    do {
      shuffledTiles.sort(() => Math.random() - 0.5);
    } while (!isSolvable(shuffledTiles) || isComplete);

    setTiles(shuffledTiles);
    setMoves(0);
    setIsComplete(false);
  }

  // Check if the puzzle is solvable
  function isSolvable(tiles: Tile[]): boolean {
    let inversions = 0;
    const values = tiles.map(tile => tile.value);

    for (let i = 0; i < values.length - 1; i++) {
      for (let j = i + 1; j < values.length; j++) {
        if (values[i] !== 0 && values[j] !== 0 && values[i] > values[j]) {
          inversions++;
        }
      }
    }

    const emptyTileRow = Math.floor(tiles.findIndex(t => t.value === 0) / gridSize);
    if (gridSize % 2 === 1) {
      return inversions % 2 === 0;
    } else {
      return (inversions + emptyTileRow) % 2 === 1;
    }
  }

  function handleTileClick(clickedTile: Tile) {
    if (isComplete) return;

    const emptyTile = tiles.find(t => t.value === 0)!;
    const emptyPos = emptyTile.currentPos;
    const clickedPos = clickedTile.currentPos;

    // Check if move is valid (adjacent to empty tile)
    const isValidMove =
      (Math.abs(Math.floor(emptyPos / gridSize) - Math.floor(clickedPos / gridSize)) === 1 &&
        Math.floor(emptyPos / gridSize) === Math.floor(clickedPos / gridSize)) ||
      (Math.abs(emptyPos % gridSize - clickedPos % gridSize) === 1 &&
        Math.floor(emptyPos / gridSize) === Math.floor(clickedPos / gridSize)) ||
      (Math.abs(emptyPos - clickedPos) === gridSize);

    if (!isValidMove) return;

    // Swap tiles
    setTiles(prev =>
      prev.map(tile => {
        if (tile.value === 0) return { ...tile, currentPos: clickedPos };
        if (tile.id === clickedTile.id) return { ...tile, currentPos: emptyPos };
        return tile;
      })
    );

    setMoves(prev => prev + 1);

    // Check if puzzle is complete
    const isNowComplete = tiles.every((tile, index) => 
      tile.value === 0 || tile.currentPos === tile.value - 1
    );

    if (isNowComplete) {
      setIsComplete(true);
      setHighScore(prev => Math.min(prev, moves + 1));
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Puzzle Slide</h1>
          <p className="text-muted-foreground mb-4">
            Slide the tiles to arrange them in numerical order. Complete the puzzle in as few moves as possible!
          </p>
          <div className="mt-4 flex justify-center gap-8">
            <div>Moves: {moves}</div>
            <div>Best: {highScore === Infinity ? "-" : highScore}</div>
            <select
              className="bg-background border rounded px-2"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              disabled={moves > 0 && !isComplete}
            >
              <option value="3">3x3</option>
              <option value="4">4x4</option>
              <option value="5">5x5</option>
            </select>
          </div>
        </div>

        <div className="relative bg-card rounded-lg p-8 shadow-lg">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {tiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                className={`aspect-square rounded-lg text-xl font-bold flex items-center justify-center transition-all ${
                  tile.value === 0
                    ? "bg-background"
                    : "bg-primary text-primary-foreground hover:brightness-110"
                }`}
                disabled={isComplete}
              >
                {tile.value !== 0 && tile.value}
              </button>
            ))}
          </div>

          {isComplete && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Puzzle Complete!</h2>
                <p className="mb-2">Moves: {moves}</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {moves === highScore ? "New Best Score!" : `Best: ${highScore}`}
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
