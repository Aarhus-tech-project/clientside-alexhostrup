import { restartGame } from "../handlers/gameOver"
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

export const initScore = () => {
    score = 0
}

export const updateScore = (delta: number) => {
    score += delta * 10
}

export const drawGameOverScreen = () => {
    const gameOverDivWrapper = document.getElementById('gameOverWrapper') as HTMLDivElement
    const gameOverDiv = document.createElement('div')
    const gameOverHeight = canvas.height / 5
    const gameOverWidth = canvas.width / 5

    gameOverDiv.id = 'gameOverContent'

    gameOverDivWrapper.appendChild(gameOverDiv)

    gameOverDiv.style.display = 'block'
    gameOverDiv.style.position = 'absolute'
    gameOverDiv.style.top = `${(window.innerHeight / 2) - (gameOverHeight / 2)}px`
    gameOverDiv.style.left = `${(window.innerWidth / 2) - (gameOverWidth / 2)}px`
    gameOverDiv.style.height = `fit-content`
    gameOverDiv.style.width = `fit-content`
    gameOverDiv.style.backgroundColor = 'lightcoral'
    gameOverDiv.style.borderRadius = '5%'
    gameOverDiv.style.opacity = '95%'
    gameOverDiv.style.padding = '1em'

    const gameOverText = document.createElement('h2')
    gameOverText.textContent = 'Game over. You lost!'

    const finalScoreText = document.createElement('h3')
    finalScoreText.textContent = `Your final score was ${Math.round(score)}`

    const highScore = saveHighScore()

    const highScoreText = document.createElement('h3')
    highScoreText.textContent = highScore === 0 ? `You set a new highscore!` : `You weren't able to beat the old highscore of ${highScore}`

    const tryAgainButton = document.createElement('button')
    tryAgainButton.textContent = 'Try again?'
    tryAgainButton.addEventListener('click', () => {
        gameOverDiv.remove()
        restartGame()}
    )
    tryAgainButton.style.backgroundColor = 'green'

    gameOverDiv.appendChild(gameOverText)
    gameOverDiv.appendChild(finalScoreText)
    gameOverDiv.appendChild(highScoreText)
    gameOverDiv.appendChild(tryAgainButton)
}

const saveHighScore = (): number => {
    const highScore = localStorage.getItem('highScore')
    if (highScore === null) {
        localStorage.setItem('highScore', score.toString())
        return 0
    }

    const highScoreAsNumber = parseInt(highScore)

    if (score > highScoreAsNumber) {
        localStorage.setItem('highScore', score.toString())
        return 0
    }
    return highScoreAsNumber

}