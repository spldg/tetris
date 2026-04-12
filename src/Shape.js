export class Shape {
    matrix = []

    x = 0
    y = 0
    constructor() {

    }

    init(matrix, x, y) {
        this.matrix = matrix.map((row) => [...row])

        this.x = x
        this.y = y
    }
    
    move(x,y) {
        this.x += x
        this.y += y
    }

    rotate() {
        const n = this.matrix.length

        let result = []

        for (let i = 0; i < n; i++) {
            result.push(new Array(n).fill(0))
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                result[j][n - 1 - i] = this.matrix[i][j]
            }
        }
        this.matrix = result
    }

    getCells() {
        const cells = []

        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === 1) {
                    cells.push({
                        x:this.x + j,
                        y:this.y + i
                    })
                }
            }
        }
        return cells
    }
}