import { Position } from "../types";

export const normalizeVector = (vector: Position, speed: number) => {
    if (vector.x !== 0 && vector.y !== 0) {
        const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
        vector.x = (vector.x / magnitude) * speed
        vector.y = (vector.y / magnitude) * speed
    }
}