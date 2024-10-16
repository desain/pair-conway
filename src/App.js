import { useEffect, useState } from 'react';
import './App.css';
import Grid, { getGridDimensions } from './Grid';

const MIN_SPEED_MS = 1;
const MAX_SPEED_MS = 10;

function countNeighbors(grid, i, j) {
  let count = 0
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) {
        continue // don't count self as a neighbor
      }
      const row = i + x
      const col = j + y
      if (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length) {
        if (grid[row][col]) {
          count++
        }
      }
    }
  }
  return count
}

function startingGrid(windowWidth, windowHeight) {
  const [gridWidth, gridHeight] = getGridDimensions(windowWidth, windowHeight);

  let grid = Array(gridHeight);
  for (let i = 0; i < gridHeight; i++) {
    grid[i] = Array(gridWidth).fill(false)
  }
  // Create glider in top left
  if (gridWidth >= 3 && gridHeight >= 3) {
    grid[0][1] = true
    grid[1][2] = true
    grid[2][0] = true
    grid[2][1] = true
    grid[2][2] = true
  }

  return grid;
}

/**
 * Next grid following Conway's game of life rules.
 * @param {*} grid 
 * @returns Next grid.
 */
function nextGrid(grid) {
  const newGrid = []
  for (let i = 0; i < grid.length; i++) {
    newGrid[i] = []
    for (let j = 0; j < grid[i].length; j++) {
      const neighbors = countNeighbors(grid, i, j)
      if (grid[i][j]) {
        newGrid[i][j] = (neighbors == 2 || neighbors == 3);
      } else {
        newGrid[i][j] = neighbors === 3;
      }
    }
  }
  return newGrid
}

function toggleCell(grid, i, j) {
  const newGrid = [...grid]
  newGrid[i][j] = !newGrid[i][j]
  return newGrid
}


function App() {
  const [playing, setPlaying] = useState(true)
  const [grid, setGrid] = useState(() => startingGrid(window.innerWidth, window.innerHeight))
  const [speed, setSpeed] = useState((MIN_SPEED_MS + MAX_SPEED_MS) / 2);

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
          min={MIN_SPEED_MS}
          max={MAX_SPEED_MS}
          value={speed}
          id="myRange"
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
