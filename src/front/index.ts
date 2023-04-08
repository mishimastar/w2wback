import { Game } from './game';

async function startup() {
    const el = document.getElementById('canvas') as HTMLCanvasElement;
    if (!el) throw new Error('no canvas found!');

    const game = new Game(el);

    game.configure(window.innerWidth, window.innerHeight);
    game.drawMenu();
}

document.addEventListener('DOMContentLoaded', startup);
