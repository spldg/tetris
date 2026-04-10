import * as PIXI from 'pixi.js'
import { GameField } from './GameField.js'

export class GameScene extends PIXI.Container {
    gameField = new GameField()

    constructor() {
        super()
        this.addChild(this.gameField)
    }

    resize(width, height) {
        this.screenWidth = width
        this.screenHeight = height

    }
}