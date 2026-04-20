import * as PIXI from 'pixi.js'

export class Score extends PIXI.Container {
    private style: PIXI.TextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000
    })

    private scoreText: PIXI.Text = new PIXI.Text('Score: 0', this.style)

    constructor() {
        super()

        this.scoreText.anchor.set(0, 1)

        this.addChild(this.scoreText)
    }

    setScore(score: number): void {
        this.scoreText.text = `Score: ${score}`
    }
}