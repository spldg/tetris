import * as PIXI from 'pixi.js'

export class GameScene {
    constructor(app, grid, shape) {

        this.app = app
        this.grid = grid
        this.shape = shape

        this.startX = 100
        this.startY = 100

        this.size = 20
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
                    this.gridRect.beginFill(0xFFFFFF)
                    this.gridRect.lineStyle(2, 0x000000)
                    this.gridRect.drawRect(x, y, this.size, this.size)
                    this.gridRect.endFill()
                } else {
                    this.gridRect.beginFill(0x000000)
                    this.gridRect.lineStyle(1, 0xFFFFFF)
                    this.gridRect.drawRect(x, y, this.size, this.size)
                    this.gridRect.endFill()
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

                    this.shapeRect.beginFill(0x000000)
                    this.shapeRect.lineStyle(1, 0xFFFFFF)
                    this.shapeRect.drawRect(x, y, this.size, this.size)
                    this.shapeRect.endFill()
                }
            }
        }
    }
}