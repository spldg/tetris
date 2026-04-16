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

        this.#gameField.on('gameover', this.#onGameOver)
        this.#gameField.on('scorechange', this.#onScoreChange)
        this.#restartButton.interactive = true
        this.#restartButton.on('pointertap', this.#onRestart)

        this.addChild(this.#gameField, this.#restartButton, this.#scoreText)
    }
    update(delta) {
        this.#gameField.update(delta)
        this.#restartButton.update(delta)
    }

    resize(width, height) {
        const fieldWidth = CELL_SIZE * GRID_WIDTH + 50
        const fieldHeight = CELL_SIZE * GRID_HEIGHT + 100

        const scale = Math.min(1, width / fieldWidth, height / fieldHeight)

        this.scale.set(scale)

        this.x = width / 2
        this.y = height / 2
    }

    #onGameOver = () => {
        this.#restartButton.show()
    }

    #onRestart = () => {
        this.#gameField.clear()
        this.#restartButton.hide()
    }

    #onScoreChange = (score) => {
        this.#scoreText.setScore(score)
    }
}