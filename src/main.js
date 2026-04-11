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

app.ticker.add((delta) => {
    gameScene.gameField.update(delta)
})