export function countNeighbors(grid, i, j) {
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

/**
 * Next grid following Conway's game of life rules.
 * @param {*} grid 
 * @returns Next grid.
 */
export function nextGrid(grid) {
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

export function toggleCell(grid, i, j) {
    const newGrid = [...grid]
    newGrid[i][j] = !newGrid[i][j]
    return newGrid
}