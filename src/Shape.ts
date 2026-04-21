import { IPointData } from 'pixi.js'

export class Shape {
    public matrix: number[][] = []

    public x: number = 0
    public y: number = 0

    public init(matrix: number[][], x: number, y: number) {
        this.matrix = matrix.map((row) => [...row])

        this.x = x
        this.y = y
    }

    public move(x: number, y: number): void {
        this.x += x
        this.y += y
    }

    public rotate(): void {
        const n = this.matrix.length

        const result = Array.from({ length: n }, () => new Array(n).fill(0))

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                result[j][n - 1 - i] = this.matrix[i][j]
            }
        }
        this.matrix = result
    }

    public getCells() {
        const cells: IPointData[] = []

        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === 1) {
                    cells.push({
                        x: this.x + j,
                        y: this.y + i
                    })
                }
            }
        }
        return cells
    }
}