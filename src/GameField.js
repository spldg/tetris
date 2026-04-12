import * as PIXI from 'pixi.js'
import { CELL_SIZE, FALL_INTERVAL, SHAPES, SPAWN_X, SPAWN_Y } from './constants.js'
import { Grid } from './Grid.js'
import { Shape } from './Shape.js'

export class GameField extends PIXI.Container {
    #fallTimer = 0
    #fallInterval = FALL_INTERVAL

    grid = new Grid()
    shapeGraphics = new PIXI.Graphics()

    currentShape = null

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
            this.spawnShape()
            return
        }
        if (!this.grid.canPlace(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)) {
            this.currentShape.move(0, 1)
        } else {
            this.grid.saveShapeToGrid(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)
            this.spawnShape()
        }
    }

    rotate() {
        if (!this.currentShape) {
            return
        }

        this.currentShape.rotate()
    }

    moveLeft() {
        this.currentShape.move(-1, 0)
        if (this.grid.canPlace(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)) {
            this.currentShape.move(1, 0)
        }

    }

    moveRight() {
        this.currentShape.move(1, 0)
        if (this.grid.canPlace(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)) {
            this.currentShape.move(-1, 0)
        }
    }

    drawCurrentShape() {
        this.shapeGraphics.clear()

        const shape = this.currentShape.getCells()

        for (const cell of shape) {
            const x = cell.x * CELL_SIZE
            const y = cell.y * CELL_SIZE

            this.shapeGraphics
                .beginFill(0x000000)
                .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                .drawRect(x, y, CELL_SIZE, CELL_SIZE)
                .endFill()
        }
    }

    spawnShape() {
        const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
        this.currentShape = new Shape()

        this.currentShape.init(randomShape, SPAWN_X, SPAWN_Y)
    }
}