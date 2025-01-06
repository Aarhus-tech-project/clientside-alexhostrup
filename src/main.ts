import './style.css'
import { drawBackground } from './handlers/drawing';
import { Position } from './types';
import { initializeInput } from './utils/initializer';
import { move } from './handlers/input';
import { drawPlayer, playerInfo } from './utils/player';
import { addToDebugInfo, drawDebugInfo } from './utils/debug';

export let canvas: HTMLCanvasElement;
export let context: CanvasRenderingContext2D;
export let playerPos: Position = { x: 550, y: 150 }
export let delta: number
let oldTimeStamp: number
let fps: number

const init = () => {
  canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas')!
  context = canvas.getContext('2d')!;

  canvas.height = window.innerHeight / 1.33
  canvas.width = window.innerWidth / 1.33

  initializeInput()

  window.requestAnimationFrame(update)
}

const update = (timeStamp: number) => {
  delta = (timeStamp - oldTimeStamp!) / 1000
  oldTimeStamp = timeStamp

  fps = Math.round(1 / delta)

  draw(timeStamp)
  move()

  window.requestAnimationFrame(update)
}

const draw = (timeStamp: number) => {
  drawBackground()
  drawPlayer(timeStamp)
  debugInfo(timeStamp)
}

const debugInfo = (timeStamp: number) => {
  addToDebugInfo(`FPS: ${fps}`)
  addToDebugInfo(`Timestamp: ${timeStamp}`)
  addToDebugInfo(`Player Height ${playerInfo.height}`)
  addToDebugInfo(`Player Width ${playerInfo.width}`)
  addToDebugInfo(`Player X ${playerPos.x}`)
  addToDebugInfo(`Player Y ${playerPos.y}`)
  addToDebugInfo(`Canvas size: [height: ${canvas.height}, width: ${canvas.width}]`)

  drawDebugInfo()
}

window.onload = init;
