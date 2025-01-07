export type Position = {
    x: number,
    y: number,
}

export type NullablePosition = {
    x?: number,
    y?: number,
}

export type SpriteSheetOptions = {
    image: HTMLImageElement
    rows: number
    columns: number
    drawRow?: number
    drawColumn?: number
    rowOffset?: number,
    columnOffset?: number,
    scale?: NullablePosition
    paused?: boolean
}

export type BoxInfo = {
    position: Position,
    height: number
    width: number
}

export enum Direction {
    Up,
    Right,
    Down,
    Left,
}