'use strict'

// コマの色
const COLORS = {
    RED: 'red',
    YELLOW: 'yellow',
    BLUE: 'blue',
    GREEN: 'green'
}
//Object.freeze(COLORS);

// コマ
const redPiece = {
    x: 3, y: 5, color: COLORS.RED
};
const yellowPiece = {
    x: 7, y: 10, color: COLORS.YELLOW
};
const bluePiece = {
    x: 12, y: 1, color: COLORS.BLUE
};
const greenPiece = {
    x: 14, y: 15, color: COLORS.GREEN
};

// コマの一覧
const pieces = [
    redPiece, yellowPiece, bluePiece, greenPiece
];

// 選択されているコマ
let selectedPiece = {
    // x: '', y: '', color: ''
};

// ゴールマス
const goal = {
    x : 4, y : 1, color : COLORS.GREEN
};

// マップ内部の壁
const innerWalls = [
    // x, y, vertical/horizontal
    [2, 0, 'v'], [11, 0, 'v'], [4, 1, 'v'], [4, 1, 'h'], [12, 1, 'v'], [12, 1, 'h'], [1, 2, 'h'], [2, 2, 'v'], [14, 2, 'v'], [14, 3, 'h'], [7, 3, 'v'], [6, 4, 'h'], [8, 3, 'v'], [8, 4, 'h'], [15, 5, 'h'], [0, 6, 'h'], [3, 6, 'v'], [3, 7, 'h'], [9, 6, 'h'], [10, 5, 'v'], [11, 6, 'h'], [12, 6, 'v'], [1, 10, 'h'], [2, 10, 'v'], [4, 9, 'v'], [4, 10, 'h'], [8, 11, 'h'], [9, 10, 'v'], [13, 11, 'v'], [13, 11, 'h'], [15, 10, 'h'], [2, 15, 'h'], [3, 14, 'v'], [4, 15, 'v'], [6, 13, 'h'], [6, 13, 'v'], [9, 13, 'v'], [9, 14, 'h'], [12, 15, 'v'], [14, 14, 'h'], [15, 14, 'v'], [7, 7, 'v'], [7, 8, 'v'], [7, 9, 'h'], [8, 9, 'h'], [7, 7, 'h'], [8, 7, 'h'], [9, 7, 'v'], [9, 8, 'v']
];

// 手数
let moveCountElem = document.getElementById('moveCount');
let moveCount = 0;

// 選択されている色
let selectedColorElem = document.getElementById('selectedColor');

// 直進する
const goStraight = (direction) => {
    // 出発マス
    // CAUTION: ディープコピー
    const src = {
        x: selectedPiece.x, y: selectedPiece.y
    }
    // 目的マス
    const dest = {
        x: selectedPiece.x, y: selectedPiece.y
    }

    // コマが移動できるところまで、destを進める
    movePiece(dest, direction);

    // コマが動いた場合
    if(src.x != dest.x || src.y != dest.y) {
        // コマの座標を動かす
        // シャローコピーなので元のピースのプロパティも変わる
        selectedPiece.x = dest.x;
        selectedPiece.y = dest.y;
        // 手数を1増やす
        moveCount++;
        moveCountElem.innerHTML = `手数：${moveCount}回`;
    }

    // 出発マスを返す
    return src;
}

// コマを動かせるところまで動かす
const movePiece = (dest, direction) => {
    switch (direction) {
        // 左に進む場合
        case DIRECTION.LEFT:
        // 外壁に面していたら動かない
        while (dest.x != 0) {
            if (innerWalls.find(wall => wall[0] == dest.x && wall[1] == dest.y && wall[2] == 'v')) {
                // コマの左に縦の壁があれば動かない
                break;
            } else if (pieces.find(piece => piece.x + 1 == dest.x && piece.y == dest.y && piece.color != selectedPiece.color)) {
                // コマの左に別の色のコマがあれば動かない
                break;
            } else {
                // 1マス座標を動かす
                dest.x--;
            }
        }
        break;

        // 右に進む場合
        case DIRECTION.RIGHT:
        while (dest.x != COLS - 1) {
            if (innerWalls.find(wall => wall[0] - 1 == dest.x && wall[1] == dest.y && wall[2] == 'v')) {
                break;
            } else if (pieces.find(piece => piece.x - 1 == dest.x && piece.y == dest.y && piece.color != selectedPiece.color)) {
                break;
            } else {
                dest.x++;
            }
        }
        break;

        // 上に進む場合
        case DIRECTION.UP:
        while (dest.y != 0) {
            if (innerWalls.find(wall => wall[0] == dest.x && wall[1] == dest.y && wall[2] == 'h')) {
                break;
            } else if (pieces.find(piece => piece.x == dest.x && piece.y + 1 == dest.y && piece.color != selectedPiece.color)) {
                break;
            } else {
                dest.y--;
            }
        }
        break;

        // 下に進む場合
        case DIRECTION.DOWN:
        while (dest.y != ROWS - 1) {
            if (innerWalls.find(wall => wall[0] == dest.x && wall[1] - 1 == dest.y && wall[2] == 'h')) {
                break;
            } else if (pieces.find(piece => piece.x == dest.x && piece.y - 1 == dest.y && piece.color != selectedPiece.color)) {
                break;
            } else {
                dest.y++;
            }
        }
        break;
    }
}

// ゴールしたか判定し、OKを押したらリロード
const judgeGoal = (piece) => {
    if(piece.x == goal.x && piece.y == goal.y && piece.color == goal.color) {
        alert('GOAL!');
        // renderより先にalertが出てしまうので、手動でリロードさせる
        // location.reload();
    }
}

// キー入力にしたがって処理する
const keyPress = (key) => {
    if (Object.values(COLORS).includes(key)) {
        // 色が選択された場合、その色のコマを選択する
        // CAUTION:シャローコピー
        selectedPiece = pieces.filter(piece => piece.color == key)[0];
        selectedColorElem.innerHTML = selectedPiece.color;
    } else if (Object.values(DIRECTION).includes(key) && selectedPiece.color !== undefined) {
        // 方向が選択された場合、その方向に直進する
        // コマが選択されていないときは動かさない
        const src = goStraight(key);
        // ゴールする前に現状を描画する
        // CAUTION:描画をawaitできない
        render(src, selectedPiece);
        // ゴールの判定をする
        //CAUTION:マップ描画より先にwindow.alertが表示される
        judgeGoal(selectedPiece);
    }
}

// ゲームを開始する
const startGame = () => {
    // 手数をリセットする
    moveCountElem.innerHTML = `手数：${moveCount}回`;
    drawInitalMap();
}

window.onload = startGame();
