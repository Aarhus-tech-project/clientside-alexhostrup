import { canvas, context } from "../main"

let score = 0

export const drawUI = () => {
    const scoreText: HTMLDivElement = document.createElement('div')
    scoreText.innerText = score.toString()

    context.fillStyle = 'red'
    context.fillText(scoreText.innerText, (canvas.width / 2) - (scoreText.offsetWidth / 2), 0)
}

export const updateScore = (delta: number) => {
    score += Math.round(delta * 100)
}