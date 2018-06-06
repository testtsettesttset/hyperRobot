'use strict'

const KEYS = {
    37: 'left',
    39: 'right',
    40: 'down',
    38: 'rotate',
    65: 'red',
    83: 'yellow',
    68: 'blue',
    70: 'green'
};

window.document.onkeydown = (e) => {
    if(typeof KEYS[e.keyCode] === 'undefined') {
        // コマを動かす
        keyPress(KEYS[e.keyCode]);
        // 描画する
        render();
    }
};