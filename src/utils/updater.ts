import { updateMountains } from "../graphics/mountain"
import { updateScore } from "../graphics/ui"
import { updateObstacles } from "../handlers/obstacleHandler"
import { updatePlayer } from "./player"

export const updateEntities = (delta: number) => {
    if (delta) {
        updatePlayer(delta)
        updateMountains(delta)
        updateObstacles(delta)
        updateScore(delta)
    }
}