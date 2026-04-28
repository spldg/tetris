import * as PIXI from 'pixi.js'

export class Score extends PIXI.Container {
    private style = new PIXI.TextStyle({
        fontFamily: 'Silkscreen',
        fontSize: 24,
        fill: 0x000000
    })

    private scoreText = new PIXI.Text('Score: 0', this.style)
    private bestScoreText = new PIXI.Text('Best score: 0', this.style)
    private levelText = new PIXI.Text('Level: 1', this.style)

    constructor() {
        super()
        this.scoreText.anchor.set(0, 1)
        this.bestScoreText.anchor.set(0, 1)
        this.levelText.anchor.set(0, 1)
        this.levelText.position.set(215, 0)
        this.bestScoreText.position.set(0, -36)

        this.addChild(this.scoreText, this.levelText, this.bestScoreText)
    }

    public setScore(score: number): void {
        this.scoreText.text = `Score: ${score}`
    }

    public setLevel(level: number): void {
        this.levelText.text = `Level: ${level}`
    }

    public setBestScore(bestScore: number): void {
        this.bestScoreText.text = `Best score: ${bestScore}`
    }
}