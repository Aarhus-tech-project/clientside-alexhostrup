import { keys } from "../utils/initializer";
import { canvas, delta, playerPos } from "../main";
import { Direction, Position } from "../types";
import { normalizeVector } from "../utils/math";
import { playerInfo } from "../utils/player";

const moveSpeed = 300
export let velocity: Position = {
    x: 0,
    y: 0,
}

export const getDirection = (e: KeyboardEvent): Direction | null => {
    switch (e.code) {
        case "ArrowUp":
            // console.log("Pressed up")
            return Direction.Up
        case "ArrowLeft":
            // console.log("Pressed left")
            return Direction.Left
        case "ArrowRight":
            // console.log("Pressed right")
            return Direction.Right
        case "ArrowDown":
            // console.log("Pressed down")
            return Direction.Down
        default:
            return null
    }
}

export const move = () => {
    if (keys[Direction.Up]) {
        velocity.y = -moveSpeed * delta
    }

    if (keys[Direction.Down]) {
        velocity.y = moveSpeed * delta
    }

    if (keys[Direction.Left]) {
        velocity.x = -moveSpeed * delta
    }

    if (keys[Direction.Right]) {
        velocity.x = moveSpeed * delta
    }

    normalizeVector(velocity, moveSpeed * delta)

    playerPos.x += velocity.x
    playerPos.y += velocity.y

    if (playerPos.x >= canvas.width - playerInfo.width) {
        playerPos.x = canvas.width - playerInfo.width
    } else if (playerPos.x <= 0) {
        playerPos.x = 0
    }

    if (playerPos.y >= canvas.height - playerInfo.height) {
        playerPos.y = canvas.height - playerInfo.height
    } else if (playerPos.y <= 0) {
        playerPos.y = 0
    }

    velocity.x = 0
    velocity.y = 0
}