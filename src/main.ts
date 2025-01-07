import './style.css'
import { draw } from './handlers/drawing';
import { initializeInput } from './utils/initializer';
import { move } from './handlers/input';
import { initPlayer } from './utils/player';
import { initMountains } from './graphics/mountain';
import { updateEntities } from './utils/updater';
import { initObstacles } from './handlers/obstacleHandler';
import { isRunning, setIsRunning } from './handlers/gameOver';

export let canvas: HTMLCanvasElement;
export let context: CanvasRenderingContext2D;
export let delta: number
export let fps: number
let oldTimeStamp: number

const init = () => {
  canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas')!
  context = canvas.getContext('2d')!;

  canvas.height = window.innerHeight / 1.33
  canvas.width = window.innerWidth / 1.33

  initializeInput()
  initPlayer()
  initMountains()
  initObstacles()
  setIsRunning(true)

  window.requestAnimationFrame(update)
}

const update = (timeStamp: number) => {
  if (!isRunning) return
  delta = (timeStamp - oldTimeStamp) / 1000
  oldTimeStamp = timeStamp

  fps = Math.round(1 / delta)

  draw(timeStamp)
  updateEntities(delta)
  move()

  window.requestAnimationFrame(update)
}

window.onload = init;
