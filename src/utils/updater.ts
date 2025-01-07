import { updateMountains } from "../graphics/mountain"
import { updateObstacles } from "../handlers/obstacleHandler"
import { updatePlayer } from "./player"

export const updateEntities = (delta: number) => {
    updatePlayer(delta)
    updateMountains(delta)
    updateObstacles(delta)
}