export class Game {
    constructor(grid, shape, shapes) {
        this.grid = grid
        this.shape = shape
        this.shapes = shapes

        this.fallTimer = 0
        this.fallInterval = 10
    }

    update(delta) {
        this.fallTimer += delta

        if (this.fallTimer < this.fallInterval) {
            return
        }
        this.fallTimer -= this.fallInterval

        if (this.canMoveDown()) {
            this.shape.y += 1

            console.log(this.grid)
        } else {
            this.saveShapeToGrid()
            this.spawnNewShape()
        }
    }

    canMoveRight() {
        for (let i = 0; i < this.shape.currentShape.length; i++) {
            for (let j = 0; j < this.shape.currentShape[i].length; j++) {
                if (this.shape.currentShape[i][j] === 1) {
                    const gridY = this.shape.y + i

                    const nextX = this.shape.x + j + 1

                    if (this.grid[gridY][nextX] != 0) {
                        return false
                    }

                    if (nextX >= this.grid[0].length) {
                        return false
                    }
                }
            }
        }
        return true
    }

    canMoveLeft() {
        for (let i = 0; i < this.shape.currentShape.length; i++) {
            for (let j = 0; j < this.shape.currentShape[i].length; j++) {
                if (this.shape.currentShape[i][j] === 1) {
                    const gridY = this.shape.y + i
                    const nextX = this.shape.x + j - 1

                    if (this.grid[gridY][nextX] != 0) {
                        return false
                    }
                    if (nextX < 0) {
                        return false
                    }
                }
            }
        }
        return true
    }

    canMoveDown() {
        for (let i = 0; i < this.shape.currentShape.length; i++) {
            for (let j = 0; j < this.shape.currentShape[i].length; j++) {
                if (this.shape.currentShape[i][j] === 1) {
                    const gridX = this.shape.x + j

                    const nextY = this.shape.y + i + 1
                    if (nextY >= this.grid.length) {
                        return false
                    }

                    if (this.grid[nextY][gridX] != 0) {
                        return false
                    }
                }
            }
        }
        return true
    }

    saveShapeToGrid() {
        for (let i = 0; i < this.shape.currentShape.length; i++) {
            for (let j = 0; j < this.shape.currentShape[i].length; j++) {
                if (this.shape.currentShape[i][j] === 1) {
                    const gridX = this.shape.x + j
                    const gridY = this.shape.y + i

                    this.grid[gridY][gridX] = 1
                }
            }
        }
    }

    spawnNewShape() {
        const randomShape = this.shapes[Math.floor(Math.random() * this.shapes.length)]

        this.shape.currentShape = randomShape
        this.shape.x = 3
        this.shape.y = 0
    }

}