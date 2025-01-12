import { drawMountains } from "../graphics/mountain"
import { drawUI } from "../graphics/ui"
import { context } from "../main"
import { NullablePosition, Position, SpriteSheetOptions } from "../types"
import { debugMode, prepareDebugInfo } from "../utils/debug"
import { drawPlayer } from "../utils/player"
import { calculateSizeOfCell } from "../utils/spritesheet"
import { drawObstacles } from "./obstacleHandler"

export const draw = (timeStamp: number) => {
    drawBackground()
    drawMountains()
    if (debugMode) {
        prepareDebugInfo(timeStamp)
    }
    drawObstacles()
    drawPlayer(timeStamp)
    drawUI()
}

export const drawBackground = () => {
    let bkgGradient = context.createLinearGradient(0, 0, 0, context.canvas.height)
    bkgGradient.addColorStop(0.4, '#cbc9f0')
    bkgGradient.addColorStop(0, '#3992e7')

    context.fillStyle = bkgGradient
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

export const drawText = (text: string, position: NullablePosition) => {
    context.fillStyle = 'black'
    context.font = '12px Consolas'

    const defaultPosition: Position = { x: 0, y: 0 }

    context.fillText(text, position.x ?? defaultPosition.x, position.y ?? defaultPosition.y)
}

export const drawSpriteSheet = (options: SpriteSheetOptions, position: Position, timeStamp: number) => {
    const frameSize = calculateSizeOfCell(options)

    const maxFrame = options.columns * options.rows
    const currentFrame = options.paused ? 0 : Math.floor(timeStamp / 100) % maxFrame

    const offset: Position = {
        x: options.columnOffset ?? 0,
        y: options.rowOffset ?? 0
    }

    const column = (options.drawColumn ?? (currentFrame + offset.x) % options.columns)
    const row = (options.drawRow ?? Math.floor((currentFrame + offset.y) % options.rows))

    let scale: Position = { x: 1, y: 1 }

    if (options.scale) {
        scale.x = options.scale.x ?? 1
        scale.y = options.scale.y ?? 1
    }

    context.drawImage(
        options.image,
        column * frameSize.w,
        row * frameSize.h,
        frameSize.w,
        frameSize.h,
        position.x,
        position.y,
        frameSize.w * scale.x,
        frameSize.h * scale.y
    )
}

export const drawCircle = (position: Position, size: number, color?: string) => {
    context.beginPath()

    context.arc(position.x, position.y, size, 0, Math.PI ** 2)

    context.fillStyle = color ?? "red"

    context.fill()
}

export const drawRect = (position: Position, size: { w: number, h: number }, color?: string) => {
    context.strokeStyle = color ?? 'red'
    context.strokeRect(position.x, position.y, size.w, size.h)
}