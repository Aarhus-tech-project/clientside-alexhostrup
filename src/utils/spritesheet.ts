import { Size, SpriteSheetOptions } from "../types";

export const calculateSizeOfCell = (options: SpriteSheetOptions): Size => {
    return {
        w: options.image.width / options.columns,
        h: options.image.height / options.rows,
    }
}