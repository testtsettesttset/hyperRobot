'use strict'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// マスの大きさ定義
const WIDTH = 640;
const HEIGHT = 640;
const BLOCK_W = WIDTH / COLS;
const BLOCK_H = HEIGHT / ROWS;

// 1つのマスを描画する
const drawBlock = () => {
    ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W, BLOCK_H);
    ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W, BLOCK_H);
};

// 罫線を描画する



// 外壁を描画する



// 壁を描画する



// コマを描画する
const drawPiece = (x, y, COLOR) => {
    const radius = 15;
    ctx.fillStyle = COLOR;
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    ctx.fill();
};

// 現状を描画する
