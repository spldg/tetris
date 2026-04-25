import * as PIXI from 'pixi.js'
import { CELL_SIZE, FALL_INTERVAL, GRID_HEIGHT, GRID_WIDTH, SHAPES, SPAWN_X, SPAWN_Y } from './constants'
import { Grid } from './Grid'
import { Shape } from './Shape'

export class GameField extends PIXI.Container {
    private fallTimer = 0
    private fallInterval = FALL_INTERVAL

    private grid = new Grid()

    private shapeGraphics = new PIXI.Graphics()

    private score = 0
    private bestScore = this.getBestScore()
    private level = 1
    private totalLines = 0
    private currentShape: Shape | null = null
    private nextShape: number[][] | null = null
    private isGameOver = false

    constructor() {
        super()
        this.pivot.set(GRID_WIDTH * CELL_SIZE / 2, GRID_HEIGHT * CELL_SIZE / 2)

        window.addEventListener('keydown', this.onKey)

        this.addChild(this.grid, this.shapeGraphics)
    }

    public update(delta: number): void {
        if (this.isGameOver) return

        this.fallTimer += delta

        if (this.currentShape) this.drawCurrentShape()

        if (this.fallTimer < this.fallInterval) {
            return
        }

        this.fallTimer -= this.fallInterval

        this.fallUpdate()
    }

    public clear(): void {
        this.grid.clearGrid()
        this.currentShape = null
        this.isGameOver = false
        this.score = 0
        this.level = 1
        this.fallTimer = 0
        this.fallInterval = FALL_INTERVAL
        this.shapeGraphics.clear()
        this.emit('bestscorechange', this.bestScore)
        this.emit('levelchange', this.level)
        this.emit('scorechange', this.score)
    }

    private fallUpdate(): void {
        if (!this.currentShape) {
            this.spawnShape()
            return
        }
        if (!this.grid.collide(this.currentShape.matrix, this.currentShape.x, this.currentShape.y + 1)) {
            this.currentShape.move(0, 1)
        } else {
            const cleared = this.grid.saveShapeToGrid(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)
            this.addScore(cleared)
            this.totalLines += cleared
            this.levelCheck()
            this.spawnShape()
        }
    }

    private onKey = (e: KeyboardEvent): void => {
        switch (e.key) {
            case 'a':
                this.moveLeft()
                break
            case 'd':
                this.moveRight()
                break
            case 'w':
                this.rotate()
                break
            case 's':
                this.moveDown()
                break
            case ' ':
                this.hardDrop()
        }
    }

    private levelCheck(): void {
        const nextLevel = Math.floor(this.totalLines / 10) + 1

        if (nextLevel > this.level) {
            this.level = nextLevel
            this.fallInterval = Math.max(5, FALL_INTERVAL - (this.level - 1) * 2)
            this.emit('levelchange', this.level)
        }
    }
    private rotate(): void {
        if (!this.currentShape) return

        const prev = this.currentShape.matrix.map(row => [...row])

        this.currentShape.rotate()

        if (this.grid.collide(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)) {
            this.currentShape.matrix = prev
        }
    }

    private moveLeft(): void {
        if (!this.currentShape) return

        this.currentShape.move(-1, 0)
        if (this.grid.collide(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)) {
            this.currentShape.move(1, 0)
        }

    }

    private moveRight(): void {
        if (!this.currentShape) return

        this.currentShape.move(1, 0)
        if (this.grid.collide(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)) {
            this.currentShape.move(-1, 0)
        }
    }
    private moveDown(): void {
        if (!this.currentShape) return
        if (!this.grid.collide(this.currentShape.matrix, this.currentShape.x, this.currentShape.y + 1)) {
            this.currentShape.move(0, 1)
        }
    }

    private hardDrop(): void {
        if (!this.currentShape) return
        while (!this.grid.collide(this.currentShape.matrix, this.currentShape.x, this.currentShape.y + 1)) {
            this.currentShape.y++
        }
    }

    private drawCurrentShape(): void {
        if (!this.currentShape) return
        this.shapeGraphics.clear()
        const shape = this.currentShape.getCells()

        for (const cell of shape) {
            const x = cell.x * CELL_SIZE
            const y = cell.y * CELL_SIZE

            this.shapeGraphics
                .beginFill(0x000000)
                .lineStyle({ width: 1, color: 0xFFFFFF, native: true })
                .drawRect(x, y, CELL_SIZE, CELL_SIZE)
                .endFill()
        }
    }

    private addScore(lines: number): number {
        const scoreTab: Record<number, number> = {
            1: 100,
            2: 300,
            3: 500,
            4: 800,
        }

        const base = scoreTab[lines] || 0

        const points = base * (this.level + 1)

        this.score += points
        this.emit('scorechange', this.score)

        return points
    }

    private getRandomShape(): number[][] {
        return SHAPES[Math.floor(Math.random() * SHAPES.length)]
    }

    private spawnShape(): void {
        if (!this.nextShape) {
            this.nextShape = this.getRandomShape()
        }
        this.currentShape = new Shape()
        this.currentShape.init(this.nextShape, SPAWN_X, SPAWN_Y)

        this.nextShape = this.getRandomShape()
        this.emit('nextchange', this.nextShape)

        if (this.grid.collide(this.currentShape.matrix, this.currentShape.x, this.currentShape.y)) {
            this.bestScore = this.updateBestScore()
            this.emit('bestscorechange', this.bestScore)
            this.isGameOver = true
            this.emit('gameover')
        }
    }
    private setBestScore(score: number): void {
        localStorage.setItem('bestScore', String(score))
    }

    private getBestScore(): number {
        return Number(localStorage.getItem('bestScore')) || 0
    }

    private updateBestScore(): number {
        const best = this.getBestScore()
        if (this.score > best) {
            this.setBestScore(this.score)
            return this.score
        }
        return best
    }
}