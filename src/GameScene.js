import * as PIXI from 'pixi.js'
import { CELL_SIZE, FIELD_X, FIELD_Y } from './constants.js'

export class GameScene extends PIXI.Container {
    constructor(app, grid, shape) {
        super()
        
        this.app = app
        this.grid = grid
        this.shape = shape

        this.startX = FIELD_X
        this.startY = FIELD_Y

        this.size = CELL_SIZE
        this.gridRect = new PIXI.Graphics()
        this.shapeRect = new PIXI.Graphics()

        this.app.stage.addChild(this.gridRect)
        this.app.stage.addChild(this.shapeRect)
    }
    drawGrid() {
        this.gridRect.clear()
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {

                const x = this.startX + this.size * j
                const y = this.startY + this.size * i
                if (this.grid[i][j] === 0) {
                    this.gridRect
                    .beginFill(0xFFFFFF)
                    .lineStyle(2, 0x000000)
                    .drawRect(x, y, this.size, this.size)
                    .endFill()
                } else {
                    this.gridRect
                    .beginFill(0x000000)
                    .lineStyle(1, 0xFFFFFF)
                    .drawRect(x, y, this.size, this.size)
                    .endFill()
                }
            }
        }
    }
    renderShape() {
        this.shapeRect.clear()

        for (let i = 0; i < this.shape.currentShape.length; i++) {
            for (let j = 0; j < this.shape.currentShape[i].length; j++) {
                if (this.shape.currentShape[i][j] === 1) {
                    const gridX = this.shape.x + j
                    const gridY = this.shape.y + i

                    const x = this.startX + gridX * this.size
                    const y = this.startY + gridY * this.size

                    this.shapeRect
                    .beginFill(0x000000)
                    .lineStyle(1, 0xFFFFFF)
                    .drawRect(x, y, this.size, this.size)
                    .endFill()
                }
            }
        }
    }
}