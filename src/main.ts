import './style.css'
import { draw } from './handlers/drawing';
import { initializeInput } from './utils/initializer';
import { move } from './handlers/input';
import { initPlayer } from './utils/player';
import { initMountains } from './graphics/mountain';
import { updateEntities } from './utils/updater';
import { initObstacles } from './handlers/obstacleHandler';
import { gameOver, isRunning, setIsRunning } from './handlers/gameOver';
import { initGameOverWrapper, initScore } from './graphics/ui';
import { addToDebugInfo } from './utils/debug';

export let canvas: HTMLCanvasElement;
export let context: CanvasRenderingContext2D;
export let delta: number
export let fps: number
let currentTimeStampStart: number | null
let oldTimeStamp: number | null

let firstRun = true

export const init = () => {
  canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas')!
  context = canvas.getContext('2d')!;

  canvas.height = window.innerHeight / 1.33
  canvas.width = window.innerWidth / 1.33

  if (firstRun) {
    initGameOverWrapper()
    initializeInput()
    firstRun = false
  }
  initScore()
  initPlayer()
  initMountains()
  initObstacles()
  setIsRunning(true)

  window.requestAnimationFrame(update)
}

const update = (timeStamp: number) => {
  if (!isRunning) {
    currentTimeStampStart = null
    oldTimeStamp = null
    gameOver()
    return
  }

  if (!currentTimeStampStart) currentTimeStampStart = timeStamp

  addToDebugInfo(`TimeStamp (old): ${timeStamp}`)
  const currentTimeStamp = timeStamp - currentTimeStampStart
  if (oldTimeStamp) {
    delta = (currentTimeStamp - oldTimeStamp) / 1000
  }
  oldTimeStamp = currentTimeStamp

  fps = Math.round(1 / delta)

  draw(currentTimeStamp)
  updateEntities(delta)
  move()

  window.requestAnimationFrame(update)
}

window.onload = init;
