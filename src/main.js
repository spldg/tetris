import * as PIXI from 'pixi.js'
import { GameScene } from './GameScene.js'

const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0xd3d3d3,
})

document
    .getElementById("pixi-container")
    .appendChild(app.view)

const gameScene = new GameScene()
app.stage.addChild(gameScene)

function resize() {
    const width = window.innerWidth
    const height = window.innerHeight

    gameScene.resize(width, height)
}
resize()

window.addEventListener('resize', resize)
window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        gameScene.moveLeft()
    }

    if (e.code === 'ArrowRight') {
        gameScene.moveRight()
    }

    if (e.code === 'ArrowUp') {
        gameScene.rotate()
    }
})

app.ticker.add((delta) => {
    gameScene.update(delta)
})