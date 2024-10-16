import React, { useEffect, useRef } from 'react';

const CELL_SIZE = 100;
const LINE_WIDTH = 1;

export function getGridDimensions(width, height) {
    const gridWidth = Math.floor(width / CELL_SIZE)
    const gridHeight = Math.floor(height / CELL_SIZE)
    return [gridWidth, gridHeight]
}

/**
 * Draws a grid (array of array of booleans) on the canvas.
 */
function drawGrid(ctx, grid) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // draw grid lines
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = LINE_WIDTH
    const gridHeight = grid.length
    const gridWidth = grid[0].length
    const gridHeightPx = gridHeight * CELL_SIZE
    const gridWidthPx = gridWidth * CELL_SIZE
    // horizontal
    for (let j = 0; j <= grid.length; j++) {
        ctx.beginPath()
        ctx.moveTo(0, j * CELL_SIZE)
        ctx.lineTo(gridWidth * CELL_SIZE, j * CELL_SIZE)
        ctx.stroke()
    }
    // vertical
    for (let i = 0; i <= grid[0].length; i++) {
        ctx.beginPath()
        ctx.moveTo(i * CELL_SIZE, 0)
        ctx.lineTo(i * CELL_SIZE, gridHeight * CELL_SIZE)
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

const Grid = props => {

    const { grid, ...rest } = props
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        drawGrid(context, grid)
    }, [grid])

    return <canvas ref={canvasRef} {...rest} />
}

export default Grid