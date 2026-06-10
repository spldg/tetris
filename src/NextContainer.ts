import * as PIXI from 'pixi.js'
import { CELL_SIZE } from './constants'

export class NextContainer extends PIXI.Container {
    public text = new PIXI.Text('Next shape', {
        fontFamily: 'Silkscreen',
        fontSize: 24,
        fill: 0x000000
    })

    private graphics = new PIXI.Graphics()
    private isMobileLayout = false

    constructor() {
        super()
        this.visible = false
        this.addChild(this.text, this.graphics)
    }

    public draw(matrix: number[][]): void {
        this.graphics.clear()

        const shapeX = this.isMobileLayout ? 135 : 0
        const shapeY = this.isMobileLayout ? 0 : 55

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1) {
                    this.graphics
                        .beginFill(0x000000)
                        .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                        .drawRect(j * CELL_SIZE + shapeX, i * CELL_SIZE + 10 + shapeY, CELL_SIZE, CELL_SIZE)
                        .endFill()
                }
            }
        }
    }

    public setMobileLayout(isMobile: boolean): void {
        this.isMobileLayout = isMobile
        this.text.text = isMobile ?
            `Next 
shape`
            : 'Next shape'
        this.text.style.fontSize = isMobile ? 32 : 16
    }
}