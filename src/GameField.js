import * as PIXI from 'pixi.js'
import { FALL_INTERVAL, SHAPES, SPAWN_X, SPAWN_Y } from './constants.js'
import { Grid } from './Grid.js'

export class GameField extends PIXI.Container {
    grid = new Grid()

    constructor() {
        super()
        
        this.fallTimer = 0
        this.fallInterval = FALL_INTERVAL

        this.addChild(this.grid)
    }

    update(delta) {
        this.fallTimer += delta

        if (this.fallTimer < this.fallInterval) {
            return
        }
        
        this.fallTimer -= this.fallInterval
    }
}