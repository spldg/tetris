import * as PIXI from 'pixi.js'
import { CELL_SIZE, FALL_INTERVAL, SHAPES, SPAWN_X, SPAWN_Y } from './constants.js'
import { Grid } from './Grid.js'

export class GameField extends PIXI.Container {
    grid = new Grid()
    #fallTimer = 0
    #fallInterval = FALL_INTERVAL

    shapeGraphics = new PIXI.Graphics()

    currentShape = null
    shapeX = SPAWN_X
    shapeY = SPAWN_Y

    gridData = this.grid.grid

    constructor() {
        super()

        this.addChild(this.grid, this.shapeGraphics)
    }

    update(delta) {
        this.#fallTimer += delta

        if (this.#fallTimer < this.#fallInterval) {
            return
        }

        this.#fallTimer -= this.#fallInterval

        this.fallUpdate()
        this.drawCurrentShape()
    }

    fallUpdate() {
        if (!this.currentShape) {
            this.switchShape()
        }

        if (!this.isColliding()) {
            this.shapeY += 1
        } else {
            this.saveShapeToGrid()
            this.switchShape()
        }
    }

  

    drawCurrentShape() {
        this.shapeGraphics.clear()

        const shape = this.currentShape

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {

                    const x = (this.shapeX + j) * CELL_SIZE
                    const y = (this.shapeY + i) * CELL_SIZE

                    this.shapeGraphics
                        .beginFill(0x000000)
                        .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                        .drawRect(x, y, CELL_SIZE, CELL_SIZE)
                        .endFill()
                }
            }
        }
    }

    saveShapeToGrid() {
        const shape = this.currentShape
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = this.shapeX + j
                    const gridY = this.shapeY + i

                    this.gridData[gridY][gridX] = 1
                    console.log('saved')
                }
            }
        }
        this.grid.draw()
    }

    switchShape() {
        const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)]

        this.currentShape = randomShape
        this.shapeX = SPAWN_X
        this.shapeY = SPAWN_Y
    }

    isColliding() {
        const shape = this.currentShape

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = this.shapeX + j
                    const nextY = this.shapeY + i + 1

                    if (nextY >= this.gridData.length) {
                        return true
                    }

                    if (this.gridData[nextY][gridX] !== 0) {
                        return true
                    }
                }
            }
        }
        return false
    }
}