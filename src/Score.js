import * as PIXI from 'pixi.js'

export class Score extends PIXI.Container {
    style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000
    })

    #scoreText = new PIXI.Text('Score: 0', this.style)

    constructor() {
        super()

        this.#scoreText.anchor.set(0, 1)

        this.addChild(this.#scoreText)
    }

    setScore(score) {
        this.#scoreText.text = `Score: ${score}`
    }
}