import * as PIXI from 'pixi.js'
import { BUTTON_SIZE_H, BUTTON_SIZE_W } from './constants'
import gsap from 'gsap'

export class RestartButton extends PIXI.Container {
    private graphics = new PIXI.Graphics()
    private text = new PIXI.Text('Restart', {
        fontFamily: 'Silkscreen',
        fontSize: 20,
        fill: 0xffffff
    })
    // private time = 0

    constructor() {
        super()
        this.visible = false
        this.interactive = true
        this.graphics
            .beginFill(0x000000)
            .lineStyle({ width: 3, color: 0xFFFFFF, native: true })
            .drawRoundedRect(-BUTTON_SIZE_W / 2, -BUTTON_SIZE_H / 2, BUTTON_SIZE_W, BUTTON_SIZE_H, 25)
            .endFill()

        this.text.anchor.set(0.5)
        this.addChild(this.graphics, this.text)
    }

    public show(): void {
        this.visible = true
        gsap.killTweensOf(this.scale)

        gsap.to(this.scale, {
            duration: 0.6,
            x: 1.05,
            y: 1.05,
            yoyo: true,
            repeat: -1,
            ease: 'power4.inOut'
        })
    }

    public hide(): void {
        this.visible = false

        gsap.killTweensOf(this.scale)
        this.scale.set(1)
    }
}