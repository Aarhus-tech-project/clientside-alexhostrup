import { canvas, context } from "../main"
import { playerInfo } from "../utils/player"

let score = 0
const gapX = 30

export const drawUI = () => {
    const textStartY = (canvas.width / 2) - 70
    const textStartX = 30
    context.fillStyle = 'red'
    context.font = 'bold 24px Arial'
    context.fillText(`Score: ${Math.round(score)}`, textStartY, textStartX)
    context.fillText(`Lives left: ${playerInfo.birdsLeft}`, textStartY, textStartX + gapX)
}

export const updateScore = (delta: number) => {

    score += delta * 10
}

export const drawGameOverScreen = () => {

}