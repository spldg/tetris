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

app.ticker.add((delta) => {

})