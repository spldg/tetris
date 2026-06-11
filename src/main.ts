import * as PIXI from 'pixi.js'
import { GameScene } from './GameScene'
import { loadSounds } from './sound'

async function loadFonts(): Promise<void> {
    await Promise.all([
        document.fonts.load('38px "Press Start 2P"'),
        document.fonts.load('20px "Silkscreen"'),
    ])

    await document.fonts.ready
}

async function bootstrap(): Promise<void> {
    await Promise.all([
        loadFonts(),
        loadSounds(),
    ])

    const app = new PIXI.Application({
        resizeTo: window,
        backgroundColor: 0xd3d3d3,
        antialias: true,
    })

    const container = document.getElementById('pixi-container')
    if (!container) {
        throw new Error('container not found')
    }

    container.appendChild(app.view)

    const gameScene = new GameScene()
    app.stage.addChild(gameScene)

    function resize(): void {
        const width = window.innerWidth
        const height = window.innerHeight

        gameScene.resize(width, height)
    }

    resize()
    window.addEventListener('resize', resize)

    app.ticker.add((delta: number) => {
        gameScene.update(delta)
    })
}

bootstrap()