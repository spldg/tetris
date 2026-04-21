import * as PIXI from 'pixi.js'
import { BUTTON_SIZE_H, BUTTON_SIZE_W } from './constants'

export class StartButton extends PIXI.Container {
    private graphics = new PIXI.Graphics()
    private text = new PIXI.Text('Start', {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xffffff
    })

    constructor() {
        super()
        this.visible = true
        this.interactive = true
        this.graphics
            .beginFill(0x86cf11)
            .lineStyle({ width: 3, color: 0xFFFFFF, native: true })
            .drawRoundedRect(-BUTTON_SIZE_W / 2, -BUTTON_SIZE_H / 2, BUTTON_SIZE_W, BUTTON_SIZE_H, 25)
            .endFill()

        this.text.anchor.set(0.5)
        this.addChild(this.graphics, this.text)
    }
}