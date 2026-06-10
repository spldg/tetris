import * as PIXI from 'pixi.js'
import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE } from './constants'
import { GameField } from './GameField'
import { NextContainer } from './NextContainer'
import { StartMenu } from './StartMenu'
import { RestartButton } from './RestartButton'
import { Score } from './Score'
import { music } from './sound'
import { MobileControls } from './MobileControls'

export class GameScene extends PIXI.Container {
    private gameField = new GameField()
    private startMenu = new StartMenu()
    private restartButton = new RestartButton()
    private scoreText = new Score()
    private nextContainer = new NextContainer()
    private mobileControls = new MobileControls()

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
        this.mobileControls.on('left', () => this.gameField.moveLeft())
        this.mobileControls.on('right', () => this.gameField.moveRight())
        this.mobileControls.on('rotate', () => this.gameField.rotate())
        this.mobileControls.on('down', () => this.gameField.moveDown())
        this.mobileControls.on('drop', () => this.gameField.hardDrop())
        this.gameField.visible = false
        this.scoreText.visible = false

        this.gameField.clear()

        this.addChild(
            this.gameField,
            this.startMenu,
            this.restartButton,
            this.scoreText,
            this.nextContainer,
            this.mobileControls
        )
    }
    public update(delta: number): void {
        if (this.gameField.visible) {
            this.gameField.update(delta)
        }
    }

    public resize(width: number, height: number): void {
        const isMobile = width < 520
        const mobileFieldOffsetY = -30

        if (isMobile) {
            this.scoreText.scale.set(0.6)
            this.startMenu.scale.set(0.8)
            this.gameField.scale.set(0.8)
            this.gameField.position.set(0, mobileFieldOffsetY)
            this.startMenu.position.set(0, mobileFieldOffsetY)
            this.restartButton.position.set(0, mobileFieldOffsetY)

            this.scoreText.setMobileLayout(true)
            this.scoreText.position.set(-120, -305)

            this.nextContainer.setMobileLayout(true)
            this.nextContainer.position.set(0, -305)
            this.nextContainer.scale.set(0.45)

            this.mobileControls.visible = true
            this.mobileControls.position.set(0, 300)
            this.mobileControls.scale.set(0.85)
        } else {

            this.gameField.position.set(0, 0)
            this.startMenu.position.set(0, 0)
            this.restartButton.position.set(0, 0)

            this.scoreText.setMobileLayout(false)
            this.scoreText.position.set(-150, -300)

            this.nextContainer.setMobileLayout(false)
            this.nextContainer.position.set(200, -200)
            this.nextContainer.scale.set(1)

            this.mobileControls.visible = false
        }

        const fieldWidth = isMobile
            ? CELL_SIZE * GRID_WIDTH + 20
            : CELL_SIZE * GRID_WIDTH + 220

        const fieldHeight = isMobile
            ? CELL_SIZE * GRID_HEIGHT + 125
            : CELL_SIZE * GRID_HEIGHT + 100

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

    private onBestScoreChange = (bestScore: number): void => {
        this.scoreText.setBestScore(bestScore)
        this.startMenu.setBestScore(bestScore)
    }

    private onLevelChange = (level: number): void => {
        this.scoreText.setLevel(level)
    }
}