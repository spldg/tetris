import * as PIXI from 'pixi.js'
import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE } from './constants'
import { GameField } from './GameField'
import { NextContainer } from './NextContainer'
import { StartMenu } from './StartMenu'
import { RestartButton } from './RestartButton'
import { Score } from './Score'
import { music } from './sound'

export class GameScene extends PIXI.Container {
    private gameField = new GameField()
    private startMenu = new StartMenu()
    private restartButton = new RestartButton()
    private scoreText = new Score()
    private nextContainer = new NextContainer()

    constructor() {
        super()
        this.scoreText.x = -150
        this.scoreText.y = -300

        this.nextContainer.x = 200
        this.nextContainer.y = -200

        this.gameField.on('gameover', this.onGameOver)
        this.gameField.on('bestscorechange', this.onBestScoreChange)
        this.gameField.on('scorechange', this.onScoreChange)
        this.gameField.on('levelchange', this.onLevelChange)
        this.startMenu.once('start', this.onStart)
        this.restartButton.on('pointertap', this.onRestart)
        this.gameField.on('nextchange', (shape: number[][]) => {
            this.nextContainer.draw(shape)
        })
        this.gameField.visible = false
        this.scoreText.visible = false

        this.gameField.clear()

        this.addChild(
            this.gameField,
            this.startMenu,
            this.restartButton,
            this.scoreText,
            this.nextContainer
        )
    }
    public update(delta: number): void {
        if (this.gameField.visible) {
            this.gameField.update(delta)
        }
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

    private onStart = (): void => {
        music.play()
        this.startMenu.visible = false
        this.scoreText.visible = true
        this.gameField.visible = true
        this.nextContainer.visible = true
        this.gameField.clear()
    }

    private onScoreChange = (score: number): void => {
        this.scoreText.setScore(score)
    }

    private onBestScoreChange = (bestScore: number) : void => {
        this.scoreText.setBestScore(bestScore)
        this.startMenu.setBestScore(bestScore)
    }

    private onLevelChange = (level: number): void => {
        this.scoreText.setLevel(level)
    }
}