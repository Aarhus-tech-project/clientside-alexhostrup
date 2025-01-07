import { drawPlanes, initPlanes, updatePlanes } from "../obstacles/plane"

export const initObstacles = () => {
    initPlanes()
}

export const drawObstacles = () => {
    drawPlanes()
}

export const updateObstacles = (delta: number) => {
    updatePlanes(delta)
}