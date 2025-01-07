// Stolen and modified from https://emanueleferonato.com/2019/01/05/programmatically-draw-mountains-and-export-them-as-png-images-using-pure-javascript/

import { drawCircle, drawRect } from "../handlers/drawing"
import { canvas, context, delta } from "../main"
import { Position } from "../types"
import { addToDebugInfo } from "../utils/debug"
import { randomIntInRange } from "../utils/math"

let mountains: MountainData[] = []

let distanceSinceLastMountain = 0

const mountainDefaults = {
    width: 500,
    height: 400,
    widthVariation: 50,
    heightVariation: 100,
    centerVariation: 100,
    speed: 100,
    spawnRate: 500 / 4
}

export const initMountains = () => {
    for (let xPos = -mountainDefaults.width; xPos <= canvas.width; xPos += mountainDefaults.spawnRate + (Math.random() - 0.5) * 50) {
        mountains.push(generateMountain(xPos))
    }
}

export const drawMountains = () => {
    for (const mountain of mountains) {
        drawMountain(mountain)
    }
}

export const updateMountains = (delta: number) => {
    if (!delta) return
    const deltaSpeed = mountainDefaults.speed * delta
    for (const mountain of mountains) {
        mountain.origin.x -= deltaSpeed
        mountain.leftMountainBaseX -= deltaSpeed
        mountain.rightMountainBaseX -= deltaSpeed
        mountain.mountainTopPos.x -= deltaSpeed
        mountain.leftSnow.x -= deltaSpeed
        mountain.rightSnow.x -= deltaSpeed
        mountain.midSnow.x -= deltaSpeed
        updateSnowPoints(mountain.leftSnowPoints, deltaSpeed)
        updateSnowPoints(mountain.rightSnowPoints, deltaSpeed)
    }

    mountains = mountains.filter((mountain) => mountain.rightMountainBaseX >= 0)

    distanceSinceLastMountain += deltaSpeed

    if (distanceSinceLastMountain >= mountainDefaults.spawnRate + (Math.random() - 0.5) * 50) {
        mountains.push(generateMountain())
        distanceSinceLastMountain = 0
    }
}

const updateSnowPoints = (snowpoints: Position[], deltaSpeed: number) => {
    for (const point of snowpoints) {
        point.x -= deltaSpeed
    }
}

const generateMountain = (startXPos?: number): MountainData => {
    const origin = { x: startXPos ?? canvas.width, y: canvas.height }
    const leftMountainBaseX = origin.x + randomIntInRange(0, mountainDefaults.widthVariation)
    const rightMountainBaseX = origin.x + mountainDefaults.width - randomIntInRange(0, mountainDefaults.widthVariation)
    const mountainTopY = randomIntInRange(canvas.height - mountainDefaults.height, (canvas.height - mountainDefaults.height) - mountainDefaults.heightVariation)
    const mountainTopX = origin.x + (mountainDefaults.width - mountainDefaults.centerVariation) / 2 + randomIntInRange(0, mountainDefaults.centerVariation)
    const leftSnow = randomPointOnSegment(leftMountainBaseX, canvas.height, mountainTopX, mountainTopY, 60, 80)
    const rightSnow = randomPointOnSegment(rightMountainBaseX, canvas.height, mountainTopX, mountainTopY, 60, 80)
    const midSnow: Position = {
        x: mountainTopX,
        y: (leftSnow.y + rightSnow.y) / 2
    }
    const leftSnowPoints = []
    const rightSnowPoints = []
    origin.x = leftMountainBaseX
    const width = rightMountainBaseX - origin.x
    const height = origin.y - mountainTopY

    for (let i = 1; i <= 2; i++) {
        leftSnowPoints.push(randomPointOnSegment(leftSnow.x, leftSnow.y, midSnow.x, midSnow.y, 100 / 3 * i, 100 / 3 * i))
        leftSnowPoints[i - 1].y += randomIntInRange(10, 20) * (1 - 2 * (i % 2))
        rightSnowPoints.push(randomPointOnSegment(midSnow.x, midSnow.y, rightSnow.x, rightSnow.y, 100 / 3 * i, 100 / 3 * i));
        rightSnowPoints[i - 1].y += randomIntInRange(10, 20) * (-1 + 2 * (i % 2))
    }

    return {
        origin,
        width,
        height,
        leftMountainBaseX,
        rightMountainBaseX,
        mountainTopPos: { x: mountainTopX, y: mountainTopY },
        leftSnow,
        rightSnow,
        midSnow,
        leftSnowPoints,
        rightSnowPoints,
    }
}

const drawMountain = (mountain: MountainData) => {
    context.fillStyle = 'rgb(236, 239, 244)'
    context.beginPath()
    context.moveTo(mountain.leftSnow.x, mountain.leftSnow.y)
    mountain.leftSnowPoints.forEach((point) => {
        context.lineTo(point.x, point.y)
    })
    context.lineTo(mountain.midSnow.x, mountain.midSnow.y)
    context.lineTo(mountain.mountainTopPos.x, mountain.mountainTopPos.y)
    context.fill()

    context.fillStyle = 'rgb(130, 176, 209)'
    context.beginPath()
    context.moveTo(mountain.midSnow.x, mountain.midSnow.y)
    mountain.rightSnowPoints.forEach((point) => {
        context.lineTo(point.x, point.y)
    })
    context.lineTo(mountain.rightSnow.x, mountain.rightSnow.y)
    context.lineTo(mountain.mountainTopPos.x, mountain.mountainTopPos.y)
    context.fill()

    context.fillStyle = 'rgb(73, 121, 141)'
    context.beginPath()
    context.moveTo(mountain.leftMountainBaseX, canvas.height)
    context.lineTo(mountain.leftSnow.x, mountain.leftSnow.y)
    mountain.leftSnowPoints.forEach((point) => {
        context.lineTo(point.x, point.y)
    })
    context.lineTo(mountain.midSnow.x, mountain.midSnow.y)
    context.lineTo(mountain.midSnow.x, canvas.height)
    context.fill()

    context.fillStyle = 'rgb(62, 105, 121)'
    context.beginPath()
    context.moveTo(mountain.midSnow.x, mountain.midSnow.y)
    mountain.rightSnowPoints.forEach((point) => {
        context.lineTo(point.x, point.y)
    })
    context.lineTo(mountain.rightSnow.x, mountain.rightSnow.y)
    context.lineTo(mountain.rightMountainBaseX, canvas.height)
    context.lineTo(mountain.mountainTopPos.x, canvas.height)
    context.fill()
}

type MountainData = {
    origin: Position
    height: number,
    width: number,
    leftMountainBaseX: number
    rightMountainBaseX: number
    mountainTopPos: Position
    leftSnow: Position
    rightSnow: Position
    midSnow: Position
    leftSnowPoints: Position[]
    rightSnowPoints: Position[]
}

const randomPointOnSegment = (x1: number, y1: number, x2: number, y2: number, min: number, max: number): Position => {
    const n = randomIntInRange(min, max) / 100
    const a = (y2 - y1) / (x2 - x1)
    const x = x1 + (x2 - x1) * n
    const y = a * (x - x1) + y1
    return {
        x: x,
        y: y,
    }
}

// Debug functions that aren't used anymore
// @ts-ignore
const addMountainDebugInfo = (mountain: MountainData) => {
    addToDebugInfo(`leftMountainBaseX (black): ${mountain.origin.x + mountain.leftMountainBaseX}`)
    addToDebugInfo(`rightMountainBaseX (maroon): ${mountain.origin.x + mountain.rightMountainBaseX}`)
    addToDebugInfo(`mountainTopPos (green): [x: ${mountain.origin.x + mountain.mountainTopPos.x}, y: ${mountain.mountainTopPos.y}]`)
    addToDebugInfo(`leftSnow (purple): [x: ${mountain.origin.x + mountain.leftSnow.x}, y: ${mountain.leftSnow.y}]`)
    addToDebugInfo(`rightSnow (yellow): [x: ${mountain.origin.x + mountain.rightSnow.x}, y: ${mountain.rightSnow.y}]`)
    addToDebugInfo(`midSnow (orange): [x: ${mountain.origin.x + mountain.midSnow.x}, y: ${mountain.midSnow.y}]`)
    addToDebugInfo(`leftSnowPoints (blue): ${genPointDebugString(mountain.leftSnowPoints)}`)
    addToDebugInfo(`rightSnowPoints (pink): ${genPointDebugString(mountain.rightSnowPoints)}`)
    addToDebugInfo(`mountain origin (aquamarine): [x: ${mountain.origin.x}, y: ${mountain.origin.y}]`)
    addToDebugInfo(`mountain size: [h: ${mountain.height}, w: ${mountain.width}]`)
    addToDebugInfo(`speed * delta: ${mountainDefaults.speed * delta}`)
}
// @ts-ignore
const drawDebugDots = (mountain: MountainData) => {
    drawRect(mountain.origin, { w: mountain.width, h: -mountain.height }, 'aquamarine')
    mountain.leftSnowPoints.forEach((point) => {
        drawCircle(point, 5, 'blue')
    })

    mountain.rightSnowPoints.forEach((point) => {
        drawCircle(point, 5, 'pink')
    })
    drawCircle(mountain.mountainTopPos, 5, 'green')
    drawCircle(mountain.leftSnow, 5, 'purple')
    drawCircle(mountain.rightSnow, 5, 'yellow')
    drawCircle(mountain.midSnow, 5, 'orange')
    drawCircle({ x: mountain.leftMountainBaseX, y: canvas.height }, 5, 'black')
    drawCircle({ x: mountain.rightMountainBaseX, y: canvas.height }, 5, 'maroon')
    drawCircle(mountain.origin, 5, 'aquamarine')
}

const genPointDebugString = (snowPoints: Position[]): string => {
    let result = ''
    for (let i = 0; i < snowPoints.length; i++) {
        result += `${i}: [x: ${snowPoints[i].x}, y: ${snowPoints[i].y}]`
        if (i < snowPoints.length - 1) result += ', '
    }
    return result
}