"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Puzzle_1 = require("./Puzzle");
/**
 * パズル生成メソッドのテスト
 */
function TestPuzzleCreate_001() {
    var 行数 = 5;
    var 列数 = 6;
    var 最小値 = 1;
    var 最大値 = 6;
    var コンボ判定値 = 3;
    var p = new Puzzle_1.Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);
    var puzzle = p.createNewPuzzle();
    assert.ok(puzzle.length == 行数, "row size NG[" + puzzle + "]");
    for (var i = 0; i < puzzle.length; i++) {
        assert.ok(puzzle[i].length == 列数, "column size NG[" + puzzle + "]");
        for (var j = 0; j < puzzle[i].length; j++) {
            if (puzzle[i][j] < 最小値) {
                assert.ok(false, "min value NG[" + puzzle[i][j] + "]");
            }
            if (puzzle[i][j] > 最大値) {
                assert.ok(false, "max value NG[" + puzzle[i][j] + "]");
            }
        }
    }
    assert.ok(true, "OK");
}
exports.TestPuzzleCreate_001 = TestPuzzleCreate_001;
;
/**
 * コンボ判定のテスト
 */
function TestComboJudge_001() {
    var 行数 = 5;
    var 列数 = 6;
    var 最小値 = 1;
    var 最大値 = 6;
    var コンボ判定値 = 3;
    var p = new Puzzle_1.Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);
    // コンボなし
    var puzzle = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 1],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 0, "combo 0 NG[" + p.judgeCombo(puzzle).length + "]");
    // 全てコンボ
    puzzle = [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 11, "ALL combo NG[" + p.judgeCombo(puzzle).length + "]");
    // 横コンボ
    puzzle = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 2, 4, 5, 6],
        [2, 3, 3, 3, 6, 1],
        [1, 2, 4, 4, 5, 6],
        [1, 2, 4, 4, 5, 1]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 1, "side combo NG[" + p.judgeCombo(puzzle).length + "]");
    // 縦コンボ
    puzzle = [
        [1, 2, 1, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [2, 1, 1, 4, 4, 3],
        [1, 2, 3, 1, 5, 6],
        [1, 2, 3, 4, 1, 1]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 1, "Vertical combo NG[" + p.judgeCombo(puzzle).length + "]");
}
exports.TestComboJudge_001 = TestComboJudge_001;
;
/**
 * コンボ判定のテスト
 */
function TestPuzzleCreateNotCombo_001() {
    var 行数 = 5;
    var 列数 = 6;
    var 最小値 = 1;
    var 最大値 = 6;
    var コンボ判定値 = 3;
    var p = new Puzzle_1.Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);
    // コンボなし
    var puzzle = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 1],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6]
    ];
    assert.ok(p.judgeCombo(p.createNewPuzzleNotCombo()).length == 0, "combo 0 NG[" + p.judgeCombo(p.createNewPuzzleNotCombo()).length + "]");
}
exports.TestPuzzleCreateNotCombo_001 = TestPuzzleCreateNotCombo_001;
;
/**
 * 入替コンボ判定のテスト
 */
function TestExchengeCombo_001() {
    var 行数 = 5;
    var 列数 = 6;
    var 最小値 = 1;
    var 最大値 = 6;
    var コンボ判定値 = 3;
    var p = new Puzzle_1.Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);
    // コンボなし
    var puzzle = [
        [1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 1],
        [3, 4, 5, 6, 1, 2],
        [1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 1]
    ];
    assert.ok(p.入替(puzzle).length == 0, "combo 0 NG[" + p.入替(puzzle).length + "]");
    // コンボあり
    puzzle = [
        [1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 2, 1],
        [3, 4, 5, 6, 1, 2],
        [1, 2, 3, 4, 6, 5],
        [2, 3, 4, 5, 6, 1]
    ];
    assert.ok(p.入替(puzzle).length == 1, "combo 1 NG[" + p.入替(puzzle).length + "]");
}
exports.TestExchengeCombo_001 = TestExchengeCombo_001;
;
//# sourceMappingURL=UnitTestPuzzle.js.map