import * as PIXI from 'pixi.js'
import { CELL_SIZE } from './constants'

export class NextContainer extends PIXI.Container {
    private text = new PIXI.Text('Next shape', {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0x000000
    })

    private graphics = new PIXI.Graphics()

    constructor() {
        super()
        this.visible = false
        this.addChild(this.text, this.graphics)
    }

    public draw(matrix: number[][]): void {
        this.graphics.clear()
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1) {
                    this.graphics
                        .beginFill(0x000000)
                        .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                        .drawRect(j * CELL_SIZE, i * CELL_SIZE + 40, CELL_SIZE, CELL_SIZE)
                        .endFill()
                }
            }
        }
    }
}