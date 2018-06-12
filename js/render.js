'use strict'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 列数、行数
const COLS = 16;
const ROWS = 16;

// 盤面とマスの大きさ
const WIDTH = 640;
const HEIGHT = 640;
const BLOCK_W = WIDTH / COLS;
const BLOCK_H = HEIGHT / ROWS;

// コマの半径
const radius = 15;

// 1つのマスを描画する
const drawBlock = (x, y) => {
    ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W, BLOCK_H);
    ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W, BLOCK_H);
};

// 16*16の盤面全体を描画する
const drawMap = () => {
    // 点線幅を指定し、色を黒にする
    ctx.setLineDash([10, 5]);
    ctx.strokeStyle = 'black';
    // マスは白く描画する
    ctx.fillStyle = 'white';

    // マス目を描画する
    for (let x = 0; x < COLS; ++x ) {
        for (let y = 0; y < ROWS; ++y ) {
            drawBlock(x, y);
        }
    }
}

// 壁を描画する
const drawWall = () => {
    ctx.setLineDash([]);
    ctx.lineWidth = 5;

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    // 中央の4マスを黒埋めする
    ctx.fillRect(BLOCK_W * 7, BLOCK_H * 7, BLOCK_W * 2, BLOCK_H * 2);

    // 外壁を描画する
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);

    // // マップ内部の壁を描画する
    for (const wall of innerWalls) {
        drawInnerWall(wall);
    }
}

// マップ内部の壁を描画する
const drawInnerWall = (wall) => {
    const x = wall[0];
    const y = wall[1];
    const direction = wall[2];

    ctx.beginPath();
    ctx.moveTo(BLOCK_W * x, BLOCK_H * y);
    if (direction == 'h') {
        ctx.lineTo(BLOCK_W * (x + 1), BLOCK_H * y);
    } else if (direction == 'v') {
        ctx.lineTo(BLOCK_W * x, BLOCK_H * (y + 1));
    }
    ctx.stroke();
}

// コマを描画する
const drawPiece = (piece) => {
    // 色の設定を変える
    ctx.beginPath();
    ctx.fillStyle = piece.color;
    // マスの中央に配置する
    ctx.arc((piece.x + 1/2) * BLOCK_W , (piece.y + 1/2) * BLOCK_H, radius, 0, Math.PI*2, false);
    ctx.fill();
};

// ゴールを描画する
const drawGoal = (goal) => {
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "bold 40px 'ＭＳ Ｐゴシック'";
    ctx.fillStyle = goal.color;
    ctx.fillText('G', (goal.x + 1/2) * BLOCK_W, (goal.y + 1/2) * BLOCK_H);
}

// 初期の盤面を描画する
const drawInitalMap = () => {
    drawMap();
    drawWall();
    for(const piece of pieces) {
        drawPiece(piece);
    }
    drawGoal(goal);
    ctx.closePath();
}

// 現状を描画する
const render = (src, piece) => {
    ctx.beginPath();
    // 出発マスのコマをクリアする
    ctx.clearRect((src.x + 1/2) * BLOCK_W - radius, (src.y + 1/2) * BLOCK_H - radius, radius * 2, radius * 2);
    // 目的マスのコマを描画する
    drawPiece(piece);
    ctx.closePath();
}
