"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Puzzle_1 = require("./Puzzle");
var p = new Puzzle_1.Puzzle(5, 6, 1, 6, 3);
var puzzle = p.createNewPuzzle();
console.log("1. 配列にランダムに数値を配置し、縦もしくは横に3つ以上同じ値が並ぶ組み合わせをすべて列挙せよ。 ");
console.log(p.displayPuzzle(puzzle));
console.log("■コンボ表示");
console.log(p.displayResult(p.judgeCombo(puzzle)));
console.log("=========================================================================================================");
console.log("2. 縦にも横にも3つ以上同じ値が配置されないランダムな配列を生成せよ。 ");
puzzle = p.createNewPuzzleNotCombo();
console.log(p.displayPuzzle(puzzle));
console.log("■コンボ表示");
console.log(p.displayResult(p.judgeCombo(puzzle)));
console.log("=========================================================================================================");
console.log("3. 「2」の状態の配列から、縦もしくは横に隣接する値を一組だけ入れ替えた場合に、縦もしくは横に3つ以上同じ値が並ぶ入れ替えの組み合わせをすべて列挙せよ。");
console.log("■コンボ表示");
console.log(p.displayResult(p.縦横入替(puzzle)));
console.log("=========================================================================================================");
console.log("4. 「3」に加えて隣接する斜めの入れ替えも含めて列挙せよ。");
console.log("■コンボ表示");
console.log(p.displayResult(p.入替(puzzle)));
console.log("=========================================================================================================");
//# sourceMappingURL=Run.js.map