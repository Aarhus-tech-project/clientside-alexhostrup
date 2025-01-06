import { drawSpriteSheet } from "../handlers/drawing";
import { playerPos } from "../main";
import { Position, SpriteSheetOptions } from "../types";
import { addToDebugInfo } from "./debug";
import { birdSpriteSheetOptions } from "./sprites";

export type PlayerInfo = {
    height: number
    width: number
    eliminatedBirds: number[]
}

const amountOfBirds = 7

export const playerInfo: PlayerInfo = {
    height: 0,
    width: 0,
    eliminatedBirds: []
}

export const initPlayer = () => {
    playerInfo.height = ((birdSpriteSheetOptions.image.height / birdSpriteSheetOptions.rows) * birdSpriteSheetOptions.scale?.y!) * Math.ceil(amountOfBirds / 2)
    playerInfo.width = ((birdSpriteSheetOptions.image.width / birdSpriteSheetOptions.columns) * birdSpriteSheetOptions.scale?.x!) * Math.ceil(amountOfBirds / 4)
    playerInfo.eliminatedBirds = []
}

export const drawPlayer = (timeStamp: number) => {
    const xOffset = (birdSpriteSheetOptions.image.width / birdSpriteSheetOptions.columns) * birdSpriteSheetOptions.scale?.x!
    const yOffset = (birdSpriteSheetOptions.image.height / birdSpriteSheetOptions.rows) * birdSpriteSheetOptions.scale?.y!

    addToDebugInfo(`player height 2: ${playerInfo.height}`)
    addToDebugInfo(`player width 2: ${playerInfo.width}`)
    // let xStart = playerPos.x - xOffset
    // let yStart = playerPos.y - yOffset * 2

    for (let i = 0; i < amountOfBirds; i++) {
        if (playerInfo.eliminatedBirds.includes(i)) continue

        const spriteOptionsCopy: SpriteSheetOptions = {
            columnOffset: (birdSpriteSheetOptions.columns / 2) * (i % 2),
            ...birdSpriteSheetOptions
        }
        const offsetNumber = Math.floor(i / 4)
        const birdPosition: Position = {
            x: playerPos.x + xOffset * offsetNumber,
            y: playerPos.y + yOffset * ((i % 4) + 0.5 * offsetNumber)
        }
        drawSpriteSheet(spriteOptionsCopy, birdPosition, timeStamp)
    }
}