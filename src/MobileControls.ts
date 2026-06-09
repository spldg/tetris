import * as PIXI from 'pixi.js'

export class MobileControls extends PIXI.Container {
    constructor() {
        super()

        this.visible = false

        this.addButton('↺', 0, -70, 'rotate')
        this.addButton('←', -70, 0, 'left')
        this.addButton('↓', 0, 0, 'down')
        this.addButton('→', 70, 0, 'right')
        this.addButton('DROP', 0, 70, 'drop')
    }

    private addButton(label: string, x: number, y: number, eventName: string): void {
        const button = new PIXI.Container()
        const graphics = new PIXI.Graphics()
        const text = new PIXI.Text(label, {
            fontFamily: 'Silkscreen',
            fontSize: label === 'DROP' ? 18 : 28,
            fill: 0xffffff
        })

        graphics
            .beginFill(0x000000, 0.65)
            .lineStyle({ width: 2, color: 0xffffff, native: true })
            .drawRoundedRect(-28, -28, 56, 56, 8)
            .endFill()

        text.anchor.set(0.5)

        button.x = x
        button.y = y
        button.interactive = true
        button.buttonMode = true
        button.hitArea = new PIXI.Rectangle(-32, -32, 64, 64)

        button.on('pointerdown', () => {
            this.emit(eventName)
        })

        button.addChild(graphics, text)
        this.addChild(button)
    }
}