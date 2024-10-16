import { useEffect, useState } from 'react';
import './App.css';
import Grid from './Grid';

const CELL_SIZE = 100;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;
const LINE_WIDTH = 1;

/**
 * Draws a grid (array of array of booleans) on the canvas.
 */
function drawGrid(ctx, grid) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  // draw grid lines
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = LINE_WIDTH
  // vertical
  for (let i = 0; i <= GRID_WIDTH; i++) {
    ctx.beginPath()
    ctx.moveTo(i * CELL_SIZE, 0)
    ctx.lineTo(i * CELL_SIZE, GRID_HEIGHT * CELL_SIZE)
    ctx.stroke()
  }
  // horizontal
  for (let j = 0; j <= GRID_HEIGHT; j++) {
    ctx.beginPath()
    ctx.moveTo(0, j * CELL_SIZE)
    ctx.lineTo(GRID_WIDTH * CELL_SIZE, j * CELL_SIZE)
    ctx.stroke()
  }

  // draw cells
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      }
    }
  }
}

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

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawGrid(ctx, [
      [true, false, true],
      [false, true, false],
      [true, false, true]
    ])
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Grid draw={(ctx) => drawGrid(ctx, grid)} width={window.screen.width - 500} height={window.screen.height - 500} />
        <button onClick={() => setPlaying(!playing)}>{playing ? 'Stop' : 'Start'}</button>
        <button onClick={() => setGrid(startingGrid())}>Reset</button>
      </header>
    </div>
  );
}

export default App;
