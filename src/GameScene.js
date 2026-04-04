import * as PIXI from 'pixi.js'

export class GameScene {
    constructor(app, grid, shape) {

        this.app = app
        this.grid = grid

        this.startX = 100
        this.startY = 100

        this.size = 20
        this.shape = shape
    }
    drawGrid() {
        const rect = new PIXI.Graphics();

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {

                const x = this.startX + this.size * j
                const y = this.startY + this.size * i

                rect.beginFill(0xFFFFFF)
                rect.lineStyle(2, 0x000000)
                rect.drawRect(x, y, this.size, this.size)
                rect.endFill()
            }
        }
        this.app.stage.addChild(rect)
    }
    renderShape() {
        const rect = new PIXI.Graphics()
        for (let i = 0; i < this.shape.currentShape.length; i++) {
            for (let j = 0; j < this.shape.currentShape[i].length; j++) {

                if (this.shape.currentShape[i][j] === 1) {
                    const gridX = this.shape.x + j
                    const gridY = this.shape.y + i

                    const x = this.startX + gridX * this.size
                    const y = this.startY + gridY * this.size

                    rect.beginFill(0x000000)
                    rect.lineStyle(1, 0xFFFFFF)
                    rect.drawRect(x, y, this.size, this.size)
                    rect.endFill()
                }
            }
        }
        this.app.stage.addChild(rect)
    }
}