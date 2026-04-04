import * as PIXI from 'pixi.js'
import { GameScene } from './GameScene.js'

const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0xd3d3d3
})


document
    .getElementById("pixi-container")
    .appendChild(app.view)

const shapes = [
    [
        [1, 1],
        [1, 1],
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]
]

const grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
const shape = {
    currentShape: randomShape,
    x: 4,
    y: 0
}

const gameScene = new GameScene(app, grid, shape)
gameScene.drawGrid()
gameScene.renderShape()