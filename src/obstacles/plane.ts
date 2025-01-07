import { canvas, context } from "../main";
import { BoxInfo, Position } from "../types";
import planeImageSource from '../assets/plane-clear-bkg.png'
import { drawCircle, drawRect } from "../handlers/drawing";
import { calculateHBox, detectCollision, randomIntInRange } from "../utils/math";
import { addToDebugInfo } from "../utils/debug";
import { killBird, playerInfo } from "../utils/player";

const planeImage = new Image()
planeImage.src = planeImageSource
const clipPos: Position = { x: 100, y: 220 }
const clipSize = { w: planeImage.width - clipPos.x * 2, h: planeImage.height - clipPos.y * 2 }
const scale = 0.2
let planes: PlaneData[] = []
const baseSpeed = 200
let timeSinceLastPlane = 0

export const drawPlanes = () => {
    for (const plane of planes) {
        context.drawImage(planeImage, clipPos.x, clipPos.y, clipSize.w, clipSize.h, plane.position.x, plane.position.y, plane.width, plane.height)
        if (import.meta.env.DEV) {
            drawCircle(plane.position, 5, 'yellow')
            drawRect(plane.position, { w: plane.width, h: plane.height }, 'yellow')
            drawRect(plane.hBox?.position!, { w: plane.hBox?.width!, h: plane.hBox?.height! }, 'pink')
        }
    }
}

export const initPlanes = () => {
    createPlane({ x: canvas.width / 2, y: canvas.height / 2 })
}

export const updatePlanes = (delta: number) => {
    if (!delta) return
    for (const plane of planes) {
        plane.position.x -= plane.speed * delta
        plane.position.y += plane.verticalSpeed * delta
        plane.hBox = calculateHBox(plane.position, plane.height, plane.width)

        if (detectCollision(plane.hBox, playerInfo.hBox!)) killBird()
        if (import.meta.env.DEV) {
            // addToDebugInfo(`plane speed: ${plane.speed}`)
        }
    }

    addToDebugInfo(`Amount of planes: ${planes.length}`)

    planes = planes.filter((plane) => plane.position.x + plane.width >= 0 && plane.position.y + plane.height >= 0 && plane.position.y <= canvas.height)

    timeSinceLastPlane += delta

    if (timeSinceLastPlane > Math.random() * 500 && planes.length < 2) {
        createPlane({ x: canvas.width, y: canvas.height * Math.random() })
        timeSinceLastPlane = 0
    }
}

const createPlane = (position: Position) => {
    const width = planeImage.width * scale
    const height = planeImage.height * scale
    const hBox = calculateHBox(position, height, width)
    const speed = baseSpeed * (randomIntInRange(75, 125) / 100)
    const verticalSpeed = randomIntInRange(-50, 50)

    const newPlane = {
        position,
        width,
        height,
        hBox,
        speed,
        verticalSpeed,
    }

    planes.push(newPlane)
}

type PlaneData = {
    position: Position
    width: number
    height: number
    hBox?: BoxInfo
    speed: number
    verticalSpeed: number
}