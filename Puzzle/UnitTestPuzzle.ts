import assert = require('assert');
import { Puzzle } from './Puzzle';

/**
 * パズル生成メソッドのテスト
 */
export function TestPuzzleCreate_001() {

    let 行数: number = 5;
    let 列数: number = 6;
    let 最小値: number = 1;
    let 最大値: number = 6;
    let コンボ判定値: number = 3;
    let p = new Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);
    let puzzle: number[][] = p.createNewPuzzle();

    assert.ok(puzzle.length == 行数, "row size NG[" + puzzle + "]");

    for (let i = 0; i < puzzle.length; i++) {
        assert.ok(puzzle[i].length == 列数, "column size NG[" + puzzle+"]");
        for (let j = 0; j < puzzle[i].length; j++) {
            if (puzzle[i][j] < 最小値) {
                assert.ok(false, "min value NG[" + puzzle[i][j] + "]");
            }
            if (puzzle[i][j] > 最大値) {
                assert.ok(false, "max value NG[" + puzzle[i][j] + "]");
            }
        }
    }
    assert.ok(true, "OK");
};
/**
 * コンボ判定のテスト
 */
export function TestComboJudge_001() {

    let 行数: number = 5;
    let 列数: number = 6;
    let 最小値: number = 1;
    let 最大値: number = 6;
    let コンボ判定値: number = 3;
    let p = new Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);


    // コンボなし
    let puzzle: number[][] = [
        [1, 2, 3, 4, 5, 6]
        ,[1, 2, 3, 4, 5, 6]
        ,[2, 3, 4, 5, 6,1]
        ,[1, 2, 3, 4, 5, 6]
        ,[1, 2, 3, 4, 5, 6]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 0, "combo 0 NG[" + p.judgeCombo(puzzle).length  + "]");

    // 全てコンボ
    puzzle=[
        [1, 1, 1, 1, 1, 1]
        , [1, 1, 1, 1, 1, 1]
        , [1, 1, 1, 1, 1, 1]
        , [1, 1, 1, 1, 1, 1]
        , [1, 1, 1, 1, 1, 1]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 11, "ALL combo NG[" + p.judgeCombo(puzzle).length  + "]");


    // 横コンボ
    puzzle = [
          [1, 2, 3, 4, 5, 6]
        , [1, 2, 2, 4, 5, 6]
        , [2, 3, 3, 3, 6, 1]
        , [1, 2, 4, 4, 5, 6]
        , [1, 2, 4, 4, 5, 1]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 1, "side combo NG[" + p.judgeCombo(puzzle).length + "]");
    // 縦コンボ
    puzzle = [
          [1, 2, 1, 4, 5, 6]
        , [1, 2, 3, 4, 5, 6]
        , [2, 1, 1, 4, 4, 3]
        , [1, 2, 3, 1, 5, 6]
        , [1, 2, 3, 4, 1, 1]
    ];
    assert.ok(p.judgeCombo(puzzle).length == 1, "Vertical combo NG[" + p.judgeCombo(puzzle).length + "]");
};
/**
 * コンボ判定のテスト
 */
export function TestPuzzleCreateNotCombo_001() {

    let 行数: number = 5;
    let 列数: number = 6;
    let 最小値: number = 1;
    let 最大値: number = 6;
    let コンボ判定値: number = 3;
    let p = new Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);


    // コンボなし
    let puzzle: number[][] = [
        [1, 2, 3, 4, 5, 6]
        , [1, 2, 3, 4, 5, 6]
        , [2, 3, 4, 5, 6, 1]
        , [1, 2, 3, 4, 5, 6]
        , [1, 2, 3, 4, 5, 6]
    ];
    assert.ok(p.judgeCombo(p.createNewPuzzleNotCombo()).length == 0, "combo 0 NG[" + p.judgeCombo(p.createNewPuzzleNotCombo()).length + "]");
};

/**
 * 入替コンボ判定のテスト
 */
export function TestExchengeCombo_001() {

    let 行数: number = 5;
    let 列数: number = 6;
    let 最小値: number = 1;
    let 最大値: number = 6;
    let コンボ判定値: number = 3;
    let p = new Puzzle(行数, 列数, 最小値, 最大値, コンボ判定値);

    // コンボなし
    let puzzle: number[][] = [
          [1, 2, 3, 4, 5, 6]
        , [2, 3, 4, 5, 6, 1]
        , [3, 4, 5, 6, 1, 2]
        , [1, 2, 3, 4, 5, 6]
        , [2, 3, 4, 5, 6, 1]
    ];
    assert.ok(p.入替(puzzle).length == 0, "combo 0 NG[" + p.入替(puzzle).length+ "]");

    // コンボあり
    puzzle = [
          [1, 2, 3, 4, 5, 6]
        , [2, 3, 4, 5, 2, 1]
        , [3, 4, 5, 6, 1, 2]
        , [1, 2, 3, 4, 6, 5]
        , [2, 3, 4, 5, 6, 1]
    ];
    assert.ok(p.入替(puzzle).length == 1, "combo 1 NG[" + p.入替(puzzle).length + "]");

};
