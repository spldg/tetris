import * as PIXI from 'pixi.js'
import { BUTTON_SIZE_H, BUTTON_SIZE_W, START_CONTAINER_H, START_CONTAINER_W, START_MENU_BEST_SCORE_Y, START_MENU_BUTTON_Y, START_MENU_SOUND_TITLE_Y, START_MENU_TITLE_Y } from './constants'
import { SoundControls } from './SoundControls'
export class StartMenu extends PIXI.Container {
    private graphics = new PIXI.Graphics()
    private headerText = new PIXI.Text('TETRIS', {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0x000000
    })
    private bestScoreText = new PIXI.Text('text', {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0x000000
    })
    private startText = new PIXI.Text('Start', {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0x000000
    })
    private startButton = new PIXI.Graphics()
    private soundControls = new SoundControls()

    constructor() {
        super()
        this.headerText.anchor.set(0.5)
        this.headerText.y = START_MENU_TITLE_Y

        this.bestScoreText.anchor.set(0.5)
        this.bestScoreText.y = START_MENU_BEST_SCORE_Y
        this.startButton.interactive = true
        this.startButton.on('pointertap', () => {
            this.emit('start')
        })

        this.startButton
            .beginFill(0xbdbdbd)
            .drawRect(-BUTTON_SIZE_W / 2, -BUTTON_SIZE_H / 2, BUTTON_SIZE_W, BUTTON_SIZE_H)
            .endFill()

        this.startText.anchor.set(0.5)
        this.startText.y = START_MENU_BUTTON_Y
        this.startButton.y = START_MENU_BUTTON_Y

        this.soundControls.y = START_MENU_SOUND_TITLE_Y

        this.graphics
            .beginFill(0xffffff)
            .lineStyle({ width: 3, color: 0x000000, native: true })
            .drawRect(-START_CONTAINER_W / 2, -START_CONTAINER_H / 2, START_CONTAINER_W, START_CONTAINER_H)
            .endFill()

        this.addChild(
            this.graphics,
            this.headerText,
            this.startButton,
            this.startText,
            this.bestScoreText,
            this.soundControls
        )
    }
    public setBestScore(score: number): void {
        this.bestScoreText.text = `Best score: ${score}`
    }
}