import * as PIXI from 'pixi.js'
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './constants'
import { malanga } from './sound'
import gsap from 'gsap'

type Matrix = number[][]

export class Grid extends PIXI.Container {
    private graphics = new PIXI.Graphics()
    private grid = Array.from({ length: GRID_HEIGHT }, () =>
        Array<number>(GRID_WIDTH).fill(0))

    private flashingLines = new Set<number>()
    private flashState = false

    constructor() {

        super()

        this.draw()
        this.addChild(this.graphics)
    }

    public collide(shape: Matrix, x: number, y: number): boolean {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = x + j
                    const gridY = y + i
                    if (gridX < 0
                        || gridX >= GRID_WIDTH
                        || gridY >= GRID_HEIGHT
                    ) {
                        return true
                    }
                    if (gridY < 0) continue
                    if (this.grid[gridY][gridX] !== 0) {
                        return true
                    }
                }
            }
        }
        return false
    }

    public clearGrid(): void {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = 0
            }
        }
        this.draw()
    }

    public async saveShapeToGrid(shape: Matrix, x: number, y: number): Promise<number> {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    const gridX = x + j
                    const gridY = y + i

                    this.grid[gridY][gridX] = 1
                }
            }
        }
        const lines = this.getFullLines()
        if (lines.length === 0) {
            this.draw()
            return 0
        }

        const cleared = await this.clearLines(lines)
        this.draw()
        if (cleared > 0) {
            const arr = [0.8, 1, 1.3]
            const index = Math.floor(Math.random() * arr.length)
            malanga.rate(arr[index])
            malanga.play()
        }
        return cleared
    }

    private draw() {
        this.graphics.clear()

        for (let i = 0; i < GRID_HEIGHT; i++) {
            for (let j = 0; j < GRID_WIDTH; j++) {
                const cell = this.grid[i][j]

                const filledCell = cell === 1
                const isFlashingCell = filledCell && this.flashingLines.has(i)

                const x = CELL_SIZE * j
                const y = CELL_SIZE * i

                let fillColor = 0xFFFFFF
                let strokeColor = 0x000000
                if (filledCell) {
                    fillColor = 0x000000
                    strokeColor = 0xFFFFFF
                }

                if (isFlashingCell) {
                    if (this.flashState) {
                        fillColor = 0xFFFFFF
                        strokeColor = 0x000000
                    }
                    else {
                        fillColor = 0x000000
                        strokeColor = 0xFFFFFF
                    }
                }
                this.graphics
                    .beginFill(fillColor)
                    .lineStyle({ width: 1, color: strokeColor, native: true })
                    .drawRect(x, y, CELL_SIZE, CELL_SIZE)
                    .endFill()
            }
        }
    }

    private getFullLines(): number[] {
        const lines: number[] = []

        for (let i = this.grid.length - 1; i >= 0; i--) {
            if (this.grid[i].every(e => e === 1)) {
                lines.push(i)
            }
        }
        return lines
    }

    private async clearLines(lines: number[]): Promise<number> {
        await this.animateClearLines(lines)
        let cleared = 0

        for (let i = this.grid.length - 1; i >= 0; i--) {
            if (this.grid[i].every((e) => e === 1)) {
                this.grid.splice(i, 1)
                this.grid.unshift(Array(GRID_WIDTH).fill(0))
                i++
                cleared++
            }
        }
        return cleared
    }

    private animateClearLines(lines: number[]): Promise<void> {
        this.flashingLines = new Set(lines)
        this.flashState = false
        this.draw()

        return new Promise((resolve) => {
            const timeline = gsap.timeline({
                onComplete: () => {
                    this.flashingLines.clear()
                    this.flashState = false
                    this.draw()
                    resolve()
                }
            })
            for (let i = 0; i < 6; i++) {
                timeline.to({}, {
                    duration: 0.06,
                    onComplete: () => {
                        this.flashState = !this.flashState
                        this.draw()
                    }
                })
            }
        })
    }
}