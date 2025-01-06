import { drawCircle, drawText } from "../handlers/drawing"
import { context, playerPos } from "../main"
import { playerInfo } from "./player"

const yStart = 20
const gap = 20

let debugInfo: string[] = []

export const drawDebugInfo = () => {
    for (let i = 0; i < debugInfo.length; i++) {
        drawText(debugInfo[i], { y: yStart + gap * i })
    }
    debugInfo = []
    drawPlayerBorder()
    drawCircle(playerPos, 5)
}

export const addToDebugInfo = (debugLine: string) => {
    debugInfo.push(debugLine)
}

const drawPlayerBorder = () => {
    context.strokeStyle = 'red'
    context.strokeRect(playerPos.x, playerPos.y, playerInfo.width, playerInfo.height)
}