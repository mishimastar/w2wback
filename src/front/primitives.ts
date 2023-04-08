import { HEXALPHA } from '../constants/angles';
import type { Dot } from './types';

export class PrimitiveDrawer {
    constructor(public canvas: CanvasRenderingContext2D) {}

    rect = (dot: Dot, w: number, h: number, color: string) => {
        this.canvas.beginPath();
        this.canvas.rect(dot.x, dot.y, w, h);
        this.canvas.fillStyle = color;
        this.canvas.fill();
    };

    hexagon = (dor: Dot, r: number, color: string) => {
        this.canvas.beginPath();
        for (let i = 0; i < 6; i++)
            this.canvas.lineTo(dor.x + r * Math.cos(HEXALPHA * i), dor.y + r * Math.sin(HEXALPHA * i));

        this.canvas.fillStyle = color;
        this.canvas.fill();
        this.canvas.closePath();
        this.canvas.stroke();
    };

    letter = (letter: string, dot: Dot) => {
        this.canvas.textAlign = 'center';
        this.canvas.textBaseline = 'middle';
        this.canvas.fillStyle = '#fcfefa';
        this.canvas.fillText(letter, dot.x, dot.y);
    };

    clearRect = (dot: Dot, w: number, h: number) => {
        this.canvas.clearRect(dot.x, dot.y, w, h);
    };

    setFont(font: string) {
        this.canvas.font = font;
    }
}

// function drawGrid(width: number, height: number, r: number, c: CanvasRenderingContext2D) {
//     for (let y = r; y + r * Math.sin(ALPHA) < height; y += r * Math.sin(ALPHA))
//         for (
//             let x = r, j = 0;
//             x + r * (1 + Math.cos(ALPHA)) < width;
//             x += r * (1 + Math.cos(ALPHA)), y += (-1) ** j++ * r * Math.sin(ALPHA)
//         )
//             drawHexagon(x, y, r, '', c);
// }
