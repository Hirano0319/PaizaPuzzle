"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell = /** @class */ (function () {
    function Cell(x, y) {
        this.x = x;
        this.y = y;
    }
    return Cell;
}());
var Combo = /** @class */ (function () {
    function Combo() {
        this.comboCell = new Array();
    }
    Combo.prototype.setCombo = function (start, end) {
        var size = 0;
        for (var i = start[0]; i <= end[0]; i++) {
            var x = 0;
            for (var j = start[1]; j <= end[1]; j++) {
                var row = [i, j];
                this.comboCell[size++] = new Cell(i, j);
            }
        }
    };
    return Combo;
}());
var Puzzle = /** @class */ (function () {
    function Puzzle(rows, cols, min, max, comboCount) {
        this.値 = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
        this.縦 = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
        this.横 = ["Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ"];
        this.rows = rows;
        this.cols = cols;
        this.min = min;
        this.max = max;
        this.comboCount = comboCount;
    }
    /**
        * 大きさを指定してランダムなパズルを生成する。
        * @param cols 縦の大きさ
        * @param rows 横の大きさ
        * @param min マス目に設定する最小値
        * @param max マス目に設定する最大値
        */
    Puzzle.prototype.createNewPuzzle = function () {
        var board = new Array();
        for (var i = 0; i < this.rows; i++) {
            board[i] = new Array();
            for (var j = 0; j < this.cols; j++) {
                board[i][j] = this.min + Math.floor(Math.random() * (this.max - this.min + 1));
            }
        }
        return board;
    };
    /**
        * 大きさを指定してコンボ成立していないランダムなパズルを生成する。
        * @param cols 縦の大きさ
        * @param rows 横の大きさ
        * @param min マス目に設定する最小値
        * @param max マス目に設定する最大値
        */
    Puzzle.prototype.createNewPuzzleNotCombo = function () {
        var pzl = this.createNewPuzzle();
        while (true) {
            var result = this.judgeCombo(pzl);
            if (result.length <= 0) {
                break;
            }
            pzl = this.createNewPuzzle();
        }
        return pzl;
    };
    Puzzle.prototype.judgeCombo = function (puzzle) {
        var result = new Array();
        Array.prototype.push.apply(result, this.横コンボ判定(puzzle));
        Array.prototype.push.apply(result, this.縦コンボ判定(puzzle));
        return result;
    };
    Puzzle.prototype.displayResult = function (param) {
        var result = "";
        for (var i = 0; i < param.length; i++) {
            var line = "コンボ" + (i + 1) + "；";
            for (var j = 0; j < param[i].comboCell.length; j++) {
                if (j > 0) {
                    line += ",";
                }
                line += this.縦[param[i].comboCell[j].x]
                    + this.横[param[i].comboCell[j].y];
            }
            result += line + "\r\n";
        }
        return result;
    };
    Puzzle.prototype.displayPuzzle = function (puzzle) {
        var result = "";
        for (var i = -1; i < puzzle.length; i++) {
            if (i == -1) {
                result += "　｜";
                for (var j = 0; j < puzzle[0].length; j++) {
                    result += this.横[j] + "｜";
                }
                result += "\r\n";
                for (var ii = -1; ii < puzzle[0].length; ii++) {
                    result += "――";
                }
                result += "\r\n";
                continue;
            }
            for (var j = -1; j < puzzle[i].length; j++) {
                if (j == -1) {
                    result += this.縦[i];
                }
                else {
                    result += this.値[puzzle[i][j] - 1];
                }
                result += "｜";
            }
            result += "\r\n";
            for (var ii = -1; ii < puzzle[0].length; ii++) {
                result += "――";
            }
            result += "\r\n";
        }
        return result;
    };
    Puzzle.prototype.入替 = function (puzzle) {
        var result = new Array();
        Array.prototype.push.apply(result, this.縦方向(puzzle));
        Array.prototype.push.apply(result, this.横方向(puzzle));
        Array.prototype.push.apply(result, this.斜め上方向(puzzle));
        Array.prototype.push.apply(result, this.斜め下方向(puzzle));
        return result;
    };
    Puzzle.prototype.縦横入替 = function (puzzle) {
        var result = new Array();
        Array.prototype.push.apply(result, this.縦方向(puzzle));
        Array.prototype.push.apply(result, this.横方向(puzzle));
        return result;
    };
    Puzzle.prototype.縦方向 = function (puzzle) {
        var result = new Array();
        for (var i = 0; i < puzzle.length - 1; i++) {
            for (var j = 0; j < puzzle[i].length - 1; j++) {
                var work = puzzle.slice();
                var x = work[i][j];
                // 縦方向
                work[i][j] = work[i + 1][j];
                work[i + 1][j] = x;
                Array.prototype.push.apply(result, this.judgeCombo(work));
                // 基に戻す
                work[i + 1][j] = work[i][j];
                work[i][j] = x;
            }
        }
        return result;
    };
    Puzzle.prototype.横方向 = function (puzzle) {
        var result = new Array();
        for (var i = 0; i < puzzle.length - 1; i++) {
            for (var j = 0; j < puzzle[i].length - 1; j++) {
                var work = puzzle.slice();
                var x = work[i][j];
                // 横方向
                work[i][j] = work[i][j + 1];
                work[i][j + 1] = x;
                Array.prototype.push.apply(result, this.judgeCombo(work));
                // 基に戻す
                work[i][j + 1] = work[i][j];
                work[i][j] = x;
            }
        }
        return result;
    };
    Puzzle.prototype.斜め上方向 = function (puzzle) {
        var result = new Array();
        for (var i = 1; i < puzzle.length; i++) {
            for (var j = 0; j < puzzle[i].length - 1; j++) {
                var work = puzzle.slice();
                var x = work[i][j];
                // 縦方向
                work[i][j] = work[i - 1][j + 1];
                work[i - 1][j + 1] = x;
                Array.prototype.push.apply(result, this.judgeCombo(work));
                // 基に戻す
                work[i - 1][j + 1] = work[i][j];
                work[i][j] = x;
            }
        }
        return result;
    };
    Puzzle.prototype.斜め下方向 = function (puzzle) {
        var result = new Array();
        for (var i = 0; i < puzzle.length - 1; i++) {
            for (var j = 0; j < puzzle[i].length - 1; j++) {
                var work = puzzle.slice();
                var x = work[i][j];
                // 縦方向
                work[i][j] = work[i + 1][j + 1];
                work[i + 1][j + 1] = x;
                Array.prototype.push.apply(result, this.judgeCombo(work));
                // 基に戻す
                work[i + 1][j + 1] = work[i][j];
                work[i][j] = x;
            }
        }
        return result;
    };
    /**
        * 縦方向のコンボ判定
        * @param puzzle
        * @param comboCount
        */
    Puzzle.prototype.縦コンボ判定 = function (puzzle) {
        var result = new Array();
        var hitCnt = 0;
        for (var j = 0; j < puzzle[0].length; j++) {
            var beforeNumber = -99;
            var cnt = 1;
            var begin = 0;
            for (var i = 0; i < puzzle.length; i++) {
                if (beforeNumber == puzzle[i][j]) {
                    cnt++;
                }
                else {
                    if (cnt >= this.comboCount && beforeNumber != -99) {
                        var cmb = new Combo();
                        cmb.setCombo([begin, j], [i - 1, j]);
                        result[hitCnt] = cmb;
                        hitCnt++;
                    }
                    beforeNumber = puzzle[i][j];
                    cnt = 1;
                    begin = i;
                }
            }
            if (cnt >= this.comboCount) {
                var cmb = new Combo();
                cmb.setCombo([begin, j], [puzzle.length - 1, j]);
                result[hitCnt] = cmb;
                hitCnt++;
            }
        }
        return result;
    };
    /**
        * 横方向のコンボ判定
        * @param puzzle 判定対象のパズル（２次元配列）
        * @param comboCount コンボ成立数
        */
    Puzzle.prototype.横コンボ判定 = function (puzzle) {
        var result = new Array();
        var hitCnt = 0;
        for (var i = 0; i < puzzle.length; i++) {
            var beforeNumber = -99;
            var cnt = 1;
            var begin = 0;
            for (var j = 0; j < puzzle[i].length; j++) {
                if (beforeNumber == puzzle[i][j]) {
                    cnt++;
                }
                else {
                    if (cnt >= this.comboCount && beforeNumber != -99) {
                        var cmb = new Combo();
                        cmb.setCombo([i, begin], [i, j - 1]);
                        result[hitCnt] = cmb;
                        hitCnt++;
                    }
                    beforeNumber = puzzle[i][j];
                    cnt = 1;
                    begin = j;
                }
            }
            if (cnt >= this.comboCount) {
                var cmb = new Combo();
                cmb.setCombo([i, begin], [i, puzzle[i].length - 1]);
                result[hitCnt] = cmb;
                hitCnt++;
            }
        }
        return result;
    };
    Puzzle.prototype.かぶり除外 = function (param) {
        for (var i = 0; i < param.length; i++) {
            for (var j = 0; j < param.length; j++) {
                if (i == j) {
                    continue;
                }
                if (param[i].comboCell.length <= param[j].comboCell.length) {
                    var flg = false;
                    for (var ic = 0; ic < param[i].comboCell.length; ic++) {
                        flg = false;
                        for (var jc = 0; jc < param[j].comboCell.length; jc++) {
                            if (param[i].comboCell[ic].x == param[j].comboCell[jc].x
                                && param[i].comboCell[ic].y == param[j].comboCell[jc].y) {
                                // 一致していたら次の値比較
                                flg = true;
                                break;
                            }
                        }
                        if (flg == false) {
                            break;
                        }
                    }
                    if (flg) {
                        param.splice(i, 1);
                        if (i >= param.length) {
                            break;
                        }
                    }
                }
            }
        }
        return param;
    };
    return Puzzle;
}());
exports.Puzzle = Puzzle;
//# sourceMappingURL=Puzzle.js.map