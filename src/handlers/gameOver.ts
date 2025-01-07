import { drawGameOverScreen } from "../graphics/ui"
import { init } from "../main"

export let isRunning: boolean

export const setIsRunning = (state: boolean) => isRunning = state

export const gameOver = () => {
    drawGameOverScreen()
}

export const restartGame = () => {
    isRunning = true
    init()
}