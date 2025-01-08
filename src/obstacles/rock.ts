import resourceSpriteSheetSource from '../assets/resources_basic.png'
import { drawSpriteSheet } from '../handlers/drawing'
import { canvas } from '../main'
import { NullablePosition, Position, Size, SpriteSheetOptions } from '../types'
import { calculateSizeOfCell } from '../utils/spritesheet'

const resourceSpriteSheet = new Image()
resourceSpriteSheet.src = resourceSpriteSheetSource
const rockSpriteOptions: SpriteSheetOptions = {
    image: resourceSpriteSheet,
    rows: 11,
    columns: 11,
    drawRow: 0,
    drawColumn: 4,
    paused: true,
    rotating: true,
    scale: {},
}

const cellSize = calculateSizeOfCell(rockSpriteOptions)

let rocks: RockData[] = []

export const drawRocks = () => {
    for (const rock of rocks) {
        drawSpriteSheet(rockSpriteOptions, rock.position, 0)
    }
}

export const initRocks = () => {

}

export const updateRocks = (delta: number) => {


}

const createRock = (): RockData => {
    return {
        position: { x: canvas.width * Math.random(), y: -cellSize.h },
        rotation: 0,
    }
}

type RockData = {
    position: Position
    rotation: number
    scale?: NullablePosition
}