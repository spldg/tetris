import PIXI from 'pixi.js'
import { BUTTON_SIZE_H, BUTTON_SIZE_W } from './constants'

export class RestartButton extends PIXI.Container {
    private graphics = new PIXI.Graphics()
    private text = new PIXI.Text('Restart', {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xffffff
    })
    private time = 0

    constructor() {
        super()
        this.visible = false
        this.graphics
            .beginFill(0x000000)
            .lineStyle({ width: 3, color: 0xFFFFFF, native: true })
            .drawRoundedRect(-BUTTON_SIZE_W / 2, -BUTTON_SIZE_H / 2, BUTTON_SIZE_W, BUTTON_SIZE_H, 25)
            .endFill()

        this.text.anchor.set(0.5)
        this.addChild(this.graphics, this.text)
    }

    public update(delta: number): void {
        if (!this.visible) return

        this.time += delta

        const pulse = 1 + Math.sin(this.time * 0.2) * 0.02
        this.scale.set(pulse)
    }

    public show(): void {
        this.visible = true
    }

    public hide(): void {
        this.visible = false
    }
}