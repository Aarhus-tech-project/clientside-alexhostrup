import { BoxInfo, Position } from "../types";

export const normalizeVector = (vector: Position, speed: number) => {
    if (vector.x !== 0 && vector.y !== 0) {
        const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
        vector.x = (vector.x / magnitude) * speed
        vector.y = (vector.y / magnitude) * speed
    }
}

export const calculateHBox = (origin: Position, height: number, width: number): BoxInfo => {
    const hBoxRatio = 0.90

    return {
        position: {
            x: origin.x + (width - width * hBoxRatio) / 2,
            y: origin.y + (height - height * hBoxRatio) / 2
        },
        height: height * hBoxRatio,
        width: width * hBoxRatio,
    }
}

export const randomIntInRange = (from: number, to: number) => {
    return from + Math.floor(Math.random() * (to + 1 - from))
}

export const detectCollision = (hBox1: BoxInfo, hBox2: BoxInfo): boolean => {
    const hBox1Coords = {
        x1: hBox1.position.x,
        x2: hBox1.position.x + hBox1.width,
        y1: hBox1.position.y,
        y2: hBox1.position.y + hBox1.height
    }

    const hBox2Coords = {
        x1: hBox2.position.x,
        x2: hBox2.position.x + hBox2.width,
        y1: hBox2.position.y,
        y2: hBox2.position.y + hBox2.height,
    }

    const xCollides = (hBox1Coords.x1 > hBox2Coords.x1 && hBox1Coords.x1 < hBox2Coords.x2) || (hBox1Coords.x2 > hBox2Coords.x1 && hBox1Coords.x2 < hBox2Coords.x2)
    const yCollides = (hBox1Coords.y1 > hBox2Coords.y1 && hBox1Coords.y1 < hBox2Coords.y2) || (hBox1Coords.y2 > hBox2Coords.y1 && hBox1Coords.y2 < hBox2Coords.y2)

    return xCollides && yCollides
}