import * as PIXI from 'pixi.js'
import { GameField } from './GameField.js'
import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE } from './constants.js'
import { RestartButton } from './RestartButton.js'
import { Score } from './Score.js'

export class GameScene extends PIXI.Container {
    #gameField = new GameField()
    #restartButton = new RestartButton()
    #scoreText = new Score()

    constructor() {
        super()

        this.#scoreText.x = -150
        this.#scoreText.y = -300

        this.#initKeys()
        this.#onClick()
        this.addChild(this.#gameField, this.#restartButton, this.#scoreText)
    }
    update(delta) {
        this.#gameField.update(delta)

        this.#scoreText.setScore(this.#gameField.score)

        if (this.#gameField.isGameOver) {
            this.#restartButton.show()
        }
    }

    resize(width, height) {
        const fieldWidth = CELL_SIZE * GRID_WIDTH
        const fieldHeight = CELL_SIZE * GRID_HEIGHT + 100

        const scale = Math.min(1, width / fieldWidth, height / fieldHeight)

        this.scale.set(scale)

        this.x = width / 2
        this.y = height / 2
    }

    #initKeys() {
        window.addEventListener('keydown', this.#onKey)
    }

    #onClick() {
        this.#restartButton.interactive = true

        this.#restartButton.on('pointertap', () => {
            this.#gameField.clear()
            this.#restartButton.hide()
            console.log('somethign')
        })
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
        }
    }

    #moveLeft() {
        this.#gameField.moveLeft()
    }

    #moveRight() {
        this.#gameField.moveRight()
    }

    #rotate() {
        this.#gameField.rotate()
    }
}