import { useEffect, useState } from 'react';
import './App.css';
import { nextGrid, toggleCell } from './Conway';
import Grid, { getGridDimensions } from './Grid';

const MIN_SPEED = 1;
const MAX_SPEED = 100;

function createGlider(grid, i, j) {
  // Create glider in top left
  if (i + 2 < grid.length && j + 2 < grid[0].length) {
    grid[i][j + 1] = true
    grid[i + 1][j + 2] = true
    grid[i + 2][j] = true
    grid[i + 2][j + 1] = true
    grid[i + 2][j + 2] = true
  }
}

function startingGrid(windowWidth, windowHeight) {
  const [gridWidth, gridHeight] = getGridDimensions(windowWidth, windowHeight);

  // Initialize empty grid
  let grid = Array(gridHeight);
  for (let i = 0; i < gridHeight; i++) {
    grid[i] = Array(gridWidth).fill(false)
  }

  createGlider(grid, 0, 0)

  return grid;
}


function App() {
  const [playing, setPlaying] = useState(true)
  const [grid, setGrid] = useState(() => startingGrid(window.innerWidth, window.innerHeight))
  const [speed, setSpeed] = useState((MIN_SPEED + MAX_SPEED) / 2);

  // Grid update interval
  useEffect(() => {
    const timer = setTimeout(() => playing && setGrid(nextGrid(grid)), 1000 / speed)
    return () => clearTimeout(timer)
  }, [grid, playing, speed])

  return (
    <div className="App">
      <Grid
        grid={grid}
        width={window.innerWidth}
        height={window.innerHeight}
        toggleCell={(i, j) => setGrid(toggleCell(grid, i, j))}
      />
      <div className="Buttons-container">
        <button onClick={() => setPlaying(!playing)}>{playing ? 'Stop' : 'Start'}</button>
        <button onClick={() => setGrid(startingGrid(window.innerWidth, window.innerHeight))}>Reset</button>
        <input type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={speed}
          id="myRange"
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
