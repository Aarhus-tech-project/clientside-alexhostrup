import { getDirection } from "../handlers/input"

export const keys: boolean[] = []

export const initializeGameCanvas = (gameCanvas: HTMLCanvasElement) => {
    gameCanvas.height = window.innerHeight / 1.33
    gameCanvas.width = window.innerWidth / 1.33
}

export const initializeInput = () => {
    window.addEventListener('keydown', (e) => {
        const direction = getDirection(e)
        if (direction !== null) {
            keys[direction] = true
        }
    })

    window.addEventListener('keyup', (e) => {
        const direction = getDirection(e)
        if (direction !== null) {
            keys[direction] = false
        }
    })
}