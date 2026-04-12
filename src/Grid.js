import * as PIXI from 'pixi.js'
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './constants.js'

export class Grid extends PIXI.Container {
    #graphics = new PIXI.Graphics()
    grid = this.#createEmptyGrid()
    cellSize = CELL_SIZE
    constructor() {
        super()

        this.addChild(this.#graphics)
        this.draw()
    }

    #createEmptyGrid() {
        return Array.from({ length: GRID_HEIGHT }, () =>
            Array(GRID_WIDTH).fill(0))
    }

    saveShapeToGrid(shape,x,y) {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = x + j
                    const gridY = y + i

                    this.grid[gridY][gridX] = 1
                }
            }
        }
        this.clearLines()
        this.draw()
    }

    draw() {
        this.#graphics.clear()

        for (let i = 0; i < GRID_HEIGHT; i++) {
            for (let j = 0; j < GRID_WIDTH; j++) {
                const cell = this.grid[i][j]
                const x = this.cellSize * j
                const y = this.cellSize * i

                if (cell === 0) {
                    this.#graphics
                        .beginFill(0xFFFFFF)
                        .lineStyle({ width: 1, color: 0x000000, native: true })
                        .drawRect(x, y, this.cellSize, this.cellSize)
                        .endFill()
                } else {
                    this.#graphics
                        .beginFill(0x000000)
                        .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                        .drawRect(x, y, this.cellSize, this.cellSize)
                        .endFill()
                }
            }
        }
    }

    clearLines() {
        for (let i = this.grid.length - 1;i >= 0; i--) {
            if (this.grid[i].every((e) => e === 1)) {
                this.grid.splice(i, 1)
                this.grid.unshift(Array(GRID_WIDTH).fill(0))
                i++
            }
        }
    }

    canPlace(shape,x,y) {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = x + j
                    const nextY = y + i + 1

                    if (nextY >= this.grid.length) {
                        return true
                    }

                    if (this.grid[nextY][gridX] !== 0) {
                        return true
                    }
                }
            }
        }
        return false
    }
}