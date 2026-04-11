import * as PIXI from 'pixi.js'
import { GameField } from './GameField.js'
import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE} from './constants.js'

export class GameScene extends PIXI.Container {
    gameField = new GameField()

    constructor() {
        super()
        
        this.addChild(this.gameField)
    }

    resize(width, height) {
        const fieldWidth = CELL_SIZE * GRID_WIDTH
        const fieldHeight = CELL_SIZE * GRID_HEIGHT

        const scale = Math.min(1, width / fieldWidth, height / fieldHeight)

        this.gameField.scale.set(scale)

        this.gameField.x = (width - fieldWidth * scale) / 2
        this.gameField.y = (height - fieldHeight * scale) / 2
    }
}