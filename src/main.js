import * as PIXI from 'pixi.js'
import { GameScene } from './GameScene.js'
import { Game } from './Game.js'
import { SHAPES } from './constants.js'

const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0xd3d3d3
})


document
    .getElementById("pixi-container")
    .appendChild(app.view)

const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
const shape = {
    currentShape: randomShape,
    x: 3,
    y: 0
}

const gameScene = new GameScene()
const game = new Game()

gameScene.renderShape()
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            if (game.canMoveRight())
                shape.x += 1
            break
        case 'ArrowLeft':
            if (game.canMoveLeft())
                shape.x -= 1
            break
    }
})
app.ticker.add((delta) => {
    gameScene.drawGrid()
    game.update(delta)
    gameScene.renderShape()

})