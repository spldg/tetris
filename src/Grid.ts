import PIXI from 'pixi.js'
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './constants'

type Matrix = number[][]

export class Grid extends PIXI.Container {
    private graphics = new PIXI.Graphics()
    private grid: number[][] = Array.from({ length: GRID_HEIGHT }, () =>
            Array(GRID_WIDTH).fill(0))

    constructor() {
        super()

        this.addChild(this.graphics)
        this.draw()
    }

    saveShapeToGrid(shape: number[][], x: number, y: number): number  {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = x + j
                    const gridY = y + i

                    this.grid[gridY][gridX] = 1
                }
            }
        }
        const cleared = this.clearLines()
        this.draw()

        return cleared
    }

    private draw() {
        this.graphics.clear()

        for (let i = 0; i < GRID_HEIGHT; i++) {
            for (let j = 0; j < GRID_WIDTH; j++) {
                const cell = this.grid[i][j]
                const x = CELL_SIZE * j
                const y = CELL_SIZE * i

                if (cell === 0) {
                    this.graphics
                        .beginFill(0xFFFFFF)
                        .lineStyle({ width: 1, color: 0x000000, native: true })
                        .drawRect(x, y, CELL_SIZE, CELL_SIZE)
                        .endFill()
                } else {
                    this.graphics
                        .beginFill(0x000000)
                        .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                        .drawRect(x, y, CELL_SIZE, CELL_SIZE)
                        .endFill()
                }
            }
        }
    }

    private clearLines() {
        let cleared = 0

        for (let i = this.grid.length - 1; i >= 0; i--) {
            if (this.grid[i].every((e) => e === 1)) {
                this.grid.splice(i, 1)
                this.grid.unshift(Array(GRID_WIDTH).fill(0))
                i++
                cleared++
            }
        }

        return cleared
    }

    collide(shape: Matrix, x: number, y: number): boolean {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = x + j
                    const gridY = y + i

                    if (gridX < 0
                        || gridX >= GRID_WIDTH
                        || gridY >= GRID_HEIGHT
                    ) {
                        return true
                    }

                    if (gridY < 0) continue

                    if (this.grid[gridY][gridX] !== 0) {
                        return true
                    }
                }
            }
        }
        return false
    }

    clearGrid(): void {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = 0  
            }
        }
        this.draw()
    }
}