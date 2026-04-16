import * as PIXI from 'pixi.js'
import { CELL_SIZE, FALL_INTERVAL, GRID_HEIGHT, GRID_WIDTH, SHAPES, SPAWN_X, SPAWN_Y } from './constants.js'
import { Grid } from './Grid.js'
import { Shape } from './Shape.js'

export class GameField extends PIXI.Container {
    #fallTimer = 0
    #fallInterval = FALL_INTERVAL

    #grid = new Grid()
    #shapeGraphics = new PIXI.Graphics()

    score = 0

    #currentShape = null
    isGameOver = false

    constructor() {
        super()

        this.pivot.set(GRID_WIDTH * CELL_SIZE / 2, GRID_HEIGHT * CELL_SIZE / 2)

        window.addEventListener('keydown', this.#onKey)
        
        this.addChild(this.#grid, this.#shapeGraphics)
    }

    update(delta) {
        if (this.isGameOver) return

        this.#fallTimer += delta

        if (this.#currentShape) this.#drawCurrentShape()

        if (this.#fallTimer < this.#fallInterval) {
            return
        }

        this.#fallTimer -= this.#fallInterval

        this.#fallUpdate()
    }

    #fallUpdate() {
        if (!this.#currentShape) {
            this.#spawnShape()
            return
        }
        if (!this.#grid.collide(this.#currentShape.matrix, this.#currentShape.x, this.#currentShape.y + 1)) {
            this.#currentShape.move(0, 1)
        } else {
            const cleared = this.#grid.saveShapeToGrid(this.#currentShape.matrix, this.#currentShape.x, this.#currentShape.y)
            this.#addScore(cleared)
            this.#spawnShape()
        }
    }

    clear() {
        this.#grid.clearGrid()
        this.#currentShape = null
        this.isGameOver = false
        this.score = 0
        this.#shapeGraphics.clear()
        this.emit('scorechange', this.score)
    }
    #onKey = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                this.#moveLeft()
                break
            case 'ArrowRight':
                this.#moveRight()
                break
            case 'ArrowUp':
                this.#rotate()
                break
            case 'ArrowDown':
                this.#moveDown()
                break
        }
    }


    #rotate() {
        if (!this.#currentShape) return

        const prev = this.#currentShape.matrix

        this.#currentShape.rotate()


        if (this.#grid.collide(this.#currentShape.matrix, this.#currentShape.x, this.#currentShape.y)) {
            this.#currentShape.matrix = prev
        }
    }

    #moveLeft() {
        if (!this.#currentShape) return

        this.#currentShape.move(-1, 0)
        if (this.#grid.collide(this.#currentShape.matrix, this.#currentShape.x, this.#currentShape.y)) {
            this.#currentShape.move(1, 0)
        }

    }

    #moveRight() {
        if (!this.#currentShape) return


        this.#currentShape.move(1, 0)
        if (this.#grid.collide(this.#currentShape.matrix, this.#currentShape.x, this.#currentShape.y)) {
            this.#currentShape.move(-1, 0)
        }
    }
    #moveDown() {
        if (!this.#grid.collide(this.#currentShape.matrix, this.#currentShape.x, this.#currentShape.y + 1)) {
            this.#currentShape.move(0, 1)
        }
    }

    #drawCurrentShape() {
        this.#shapeGraphics.clear()

        const shape = this.#currentShape.getCells()

        for (const cell of shape) {
            const x = cell.x * CELL_SIZE
            const y = cell.y * CELL_SIZE

            this.#shapeGraphics
                .beginFill(0x000000)
                .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                .drawRect(x, y, CELL_SIZE, CELL_SIZE)
                .endFill()
        }
    }
    #addScore(lines) {
        const scoreTab = {
            1: 100,
            2: 300,
            3: 500,
            4: 800,
        }

        const base = scoreTab[lines] || 0

        const points = base

        this.score += points
        this.emit('scorechange', this.score)

        return points
    }

    #spawnShape() {
        const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
        this.#currentShape = new Shape()

        this.#currentShape.init(randomShape, SPAWN_X, SPAWN_Y)

        if (this.#grid.collide(this.#currentShape.matrix, this.#currentShape.x, this.#currentShape.y)) {
            this.isGameOver = true
            this.emit('gameover')
        }
    }
}