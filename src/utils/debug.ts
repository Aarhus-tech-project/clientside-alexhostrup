import { drawCircle, drawRect, drawText } from "../handlers/drawing"
import { canvas, delta, fps } from "../main"
import { playerInfo } from "./player"

export let debugMode: boolean = false

const yStart = 20
const gap = 20

let debugInfo: string[] = []

export const prepareDebugInfo = (timeStamp: number) => {
    addToDebugInfo(`FPS: ${fps}`)
    addToDebugInfo(`Timestamp (new): ${timeStamp}`)
    addToDebugInfo(`Player Height ${playerInfo.height}`)
    addToDebugInfo(`Player Width ${playerInfo.width}`)
    addToDebugInfo(`Player X ${playerInfo.position.x}`)
    addToDebugInfo(`Player Y ${playerInfo.position.y}`)
    addToDebugInfo(`Canvas size: [height: ${canvas.height}, width: ${canvas.width}]`)
    addToDebugInfo(`Delta: ${delta}`)

    drawDebugInfo()
}

export const drawDebugInfo = () => {
    for (let i = 0; i < debugInfo.length; i++) {
        drawText(debugInfo[i], { y: yStart + gap * i })
    }
    debugInfo = []
    // Draw the player border
    drawRect(playerInfo.position, { w: playerInfo.width, h: playerInfo.height })
    // Draw the hitbox border
    drawRect(playerInfo.hBox?.position!, { w: playerInfo.hBox?.width!, h: playerInfo.hBox?.height! }, 'blue')
    drawCircle(playerInfo.position, 5)
}

export const addToDebugInfo = (debugLine: string) => {
    debugInfo.push(debugLine)
}

export const setDebugMode = (state: boolean) => debugMode = state