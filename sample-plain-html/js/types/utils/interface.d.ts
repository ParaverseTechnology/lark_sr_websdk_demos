export interface Point {
    x: number;
    y: number;
}
export interface Vector {
    x: number;
    y: number;
    startPoint: Point;
    endPoint: Point;
}
export interface Stage {
    width: number;
    height: number;
    Position: Point;
}
export interface CSSPosition {
    top: number;
    left: number;
}
export interface ViewPort {
    width: number;
    height: number;
}
export interface Toggle {
    show: boolean;
}
export interface OffsetView {
    offsetX: number;
    offsetY: number;
}
