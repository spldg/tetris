import PIXI from 'pixi.js'
import { GameField } from './GameField'
import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE } from './constants'
import { RestartButton } from './RestartButton'
import { Score } from './Score'

export class GameScene extends PIXI.Container {
    private gameField = new GameField()
    private restartButton = new RestartButton()
    private scoreText = new Score()

    constructor() {
        super()
        this.scoreText.x = -150
        this.scoreText.y = -300

        this.gameField.on('gameover', this.onGameOver)
        this.gameField.on('scorechange', this.onScoreChange)
        this.restartButton.interactive = true
        this.restartButton.on('pointertap', this.onRestart)

        this.addChild(this.gameField, this.restartButton, this.scoreText)
    }
    public update(delta: number): void {
        this.gameField.update(delta)
        this.restartButton.update(delta)
    }

    public resize(width: number, height: number): void {
        const fieldWidth = CELL_SIZE * GRID_WIDTH + 50
        const fieldHeight = CELL_SIZE * GRID_HEIGHT + 100

        const scale = Math.min(1, width / fieldWidth, height / fieldHeight)

        this.scale.set(scale)

        this.x = width / 2
        this.y = height / 2
    }

    private onGameOver = (): void => {
        this.restartButton.show()
    }

    private onRestart = (): void => {
        this.gameField.clear()
        this.restartButton.hide()
    }

    private onScoreChange = (score: number): void => {
        this.scoreText.setScore(score)
    }
}