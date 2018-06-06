'use strict'

// 行数、列数
const COLS = 16;
const ROWS = 16;

// コマの色
const COLORS = {
    RED : 'red',
    YELLOW : 'yellow',
    BLUE : 'blue',
    GREEN : 'green'
}

// コマ
const piece = {
    x: '',
    y: '',
    color: ''
};


// マップ


// ゴール
let goal = {
    x: '',
    y: '',
    goalNumber: ''
}
goal = Math.floor(Math.random() * 16)

// 手数
let moveCount = 0;



// 直進する


// 止まる

// ゴールを判定する

//
