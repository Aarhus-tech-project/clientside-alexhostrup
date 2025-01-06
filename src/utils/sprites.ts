import { SpriteSheetOptions } from '../types'
import birdSpriteBig from '../assets/BirdSpriteBigFlipped.png'

const birdSpriteSheetImage = new Image()
birdSpriteSheetImage.src = birdSpriteBig
export const birdSpriteSheetOptions: SpriteSheetOptions = {
    image: birdSpriteSheetImage,
    rows: 3,
    columns: 8,
    drawRow: 1,
    scale: { x: 0.25, y: 0.25 }
}