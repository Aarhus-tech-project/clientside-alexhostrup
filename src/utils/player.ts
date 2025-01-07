import { drawSpriteSheet } from "../handlers/drawing";
import { canvas } from "../main";
import { BoxInfo, Position, SpriteSheetOptions } from "../types";
import { birdSpriteSheetOptions } from "../graphics/sprites";
import { calculateHBox } from "./math";
import { addToDebugInfo } from "./debug";

export type PlayerInfo = {
    position: Position
    height: number
    width: number
    eliminatedBirds: number[]
    killCountdown: number
    hBox?: BoxInfo
}

const amountOfBirds = 7

export const playerInfo: PlayerInfo = {
    position: { x: 0, y: 0 },
    height: 0,
    width: 0,
    killCountdown: 0,
    eliminatedBirds: []
}

export const initPlayer = () => {
    playerInfo.height = ((birdSpriteSheetOptions.image.height / birdSpriteSheetOptions.rows) * birdSpriteSheetOptions.scale?.y!) * Math.min(amountOfBirds, amountOfBirds > 7 ? 4.5 : 4)
    playerInfo.width = ((birdSpriteSheetOptions.image.width / birdSpriteSheetOptions.columns) * birdSpriteSheetOptions.scale?.x!) * Math.ceil(amountOfBirds / 4)
    playerInfo.position = { x: canvas.width / 10, y: (canvas.height / 2) - (playerInfo.height / 2) }
    playerInfo.eliminatedBirds = []
    playerInfo.killCountdown = 0
    playerInfo.hBox = calculateHBox(playerInfo.position, playerInfo.height, playerInfo.width)
}

export const drawPlayer = (timeStamp: number) => {
    const xOffset = (birdSpriteSheetOptions.image.width / birdSpriteSheetOptions.columns) * birdSpriteSheetOptions.scale?.x!
    const yOffset = (birdSpriteSheetOptions.image.height / birdSpriteSheetOptions.rows) * birdSpriteSheetOptions.scale?.y!

    for (let i = 0; i < amountOfBirds; i++) {
        if (playerInfo.eliminatedBirds.includes(i)) continue

        const spriteOptionsCopy: SpriteSheetOptions = {
            columnOffset: (birdSpriteSheetOptions.columns / 2) * (i % 2),
            ...birdSpriteSheetOptions
        }
        const offsetNumber = Math.floor(i / 4)
        const birdPosition: Position = {
            x: playerInfo.position.x + xOffset * offsetNumber,
            y: playerInfo.position.y + yOffset * ((i % 4) + 0.5 * (offsetNumber % 2))
        }
        drawSpriteSheet(spriteOptionsCopy, birdPosition, timeStamp)
    }

    addToDebugInfo(genDeadBirdsDebugLine())
    addToDebugInfo(`Kill countdown: ${playerInfo.killCountdown}`)
}

export const updatePlayer = (delta: number) => {
    playerInfo.killCountdown = Math.max(0, playerInfo.killCountdown - delta)
}

export const updatePlayerPos = (deltaPos: Position) => {
    playerInfo.position.x += deltaPos.x
    playerInfo.position.y += deltaPos.y

    if (playerInfo.position.x >= canvas.width - playerInfo.width) {
        playerInfo.position.x = canvas.width - playerInfo.width
    } else if (playerInfo.position.x <= 0) {
        playerInfo.position.x = 0
    }

    if (playerInfo.position.y >= canvas.height - playerInfo.height) {
        playerInfo.position.y = canvas.height - playerInfo.height
    } else if (playerInfo.position.y <= 0) {
        playerInfo.position.y = 0
    }

    playerInfo.hBox!.position = calculateHBox(playerInfo.position, playerInfo.height, playerInfo.width).position
}

export const killBird = () => {
    if (playerInfo.killCountdown > 0 || playerInfo.eliminatedBirds.length >= amountOfBirds) return
    let deadBirdNumber
    do {
        deadBirdNumber = Math.floor(Math.random() * amountOfBirds)
    } while (playerInfo.eliminatedBirds.includes(deadBirdNumber) && playerInfo.eliminatedBirds.length < amountOfBirds)
    playerInfo.eliminatedBirds.push(deadBirdNumber)
    playerInfo.killCountdown = 5
}

const genDeadBirdsDebugLine = () => {
    let result = 'Dead birds: ['
    for (let i = 0; i < playerInfo.eliminatedBirds.length; i++) {
        result += `${playerInfo.eliminatedBirds[i]}`
        if (i < playerInfo.eliminatedBirds.length - 1) result += ', '
    }
    result += ']'
    return result
}