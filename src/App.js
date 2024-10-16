import { useEffect, useState } from 'react';
import './App.css';
import Grid from './Grid';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

function countNeighbors(grid, i, j) {
  let count = 0
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) {
        continue
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

function startingGrid() {
  let grid = Array(GRID_HEIGHT);
  for (let i = 0; i < GRID_HEIGHT; i++) {
    grid[i] = Array(GRID_WIDTH).fill(false)
  }
  // Create glider in top left
  grid[0][1] = true
  grid[1][2] = true
  grid[2][0] = true
  grid[2][1] = true
  grid[2][2] = true
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


function App() {
  const [playing, setPlaying] = useState(true)
  const [grid, setGrid] = useState(() => startingGrid())

  useEffect(() => {
    const timer = setTimeout(() => playing && setGrid(nextGrid(grid)), 1e3)
    return () => clearTimeout(timer)
  }, [grid, playing])

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Grid grid={grid} width={window.screen.width - 500} height={window.screen.height - 500} />
        <button onClick={() => setPlaying(!playing)}>{playing ? 'Stop' : 'Start'}</button>
        <button onClick={() => setGrid(startingGrid())}>Reset</button>
      </header>
    </div>
  );
}

export default App;
