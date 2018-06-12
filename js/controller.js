'use strict'

// コマを動かす方向
const DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    DOWN: 'down',
    UP: 'up'
}
Object.freeze(DIRECTION);

// キーにコマ/コマを動かす方向の名前をセットする
const KEYS = {
    37: DIRECTION.LEFT,
    39: DIRECTION.RIGHT,
    40: DIRECTION.DOWN,
    38: DIRECTION.UP,
    65: COLORS.RED,
    83: COLORS.YELLOW,
    68: COLORS.BLUE,
    70: COLORS.GREEN
};
Object.freeze(KEYS);

// キーが押されたら動かす
document.body.onkeydown = (e) => {
    if(typeof KEYS[e.keyCode] !== undefined) {
        // コマを動かす
        keyPress(KEYS[e.keyCode]);
    }
};
