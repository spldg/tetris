import * as PIXI from 'pixi.js'
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './constants.js'

export class Grid extends PIXI.Container {
    #graphics  = new PIXI.Graphics()
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
                        .lineStyle({width: 1, color: 0x000000, native: true})
                        .drawRect(x, y, this.cellSize, this.cellSize)
                        .endFill()
                } else {
                    this.#graphics
                        .beginFill(0x000000)
                        .lineStyle({width: 1, color: 0xFFFFFF, native: true})
                        .drawRect(x, y, this.cellSize, this.cellSize)
                        .endFill()
                }
            }
        }
    }
    
}