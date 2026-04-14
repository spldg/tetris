import * as PIXI from 'pixi.js'
import { BUTTON_SIZE_H, BUTTON_SIZE_W } from './constants.js'

export class RestartButton extends PIXI.Container {
    #graphics = new PIXI.Graphics()
    #text

    constructor() {
        super()

        this.visible = false
        this.addChild(this.#graphics)
    }

    draw() {
        this.#graphics
        .beginFill(0x000000)
        .lineStyle({ width: 3, color: 0xFFFFFF , native: true})
        .drawRoundedRect(-BUTTON_SIZE_W / 2, -BUTTON_SIZE_H / 2, BUTTON_SIZE_W, BUTTON_SIZE_H, 25)
        .endFill()
        
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff
        })
        this.#text = new PIXI.Text('Restart', style)
        this.#text.anchor.set(0.5)

        this.addChild(this.#text)
    }

    show() {
        this.visible = true
    }

    hide() {
        this.visible = false
    }
}