class Cell {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Combo {
    comboCell: Cell[] = new Array();

    public setCombo(start: number[], end: number[]) {
        let size: number = 0;
        for (let i = start[0]; i <= end[0]; i++) {
            let x: number = 0;
            for (let j = start[1]; j <= end[1]; j++) {
                let row: number[] = [i, j];
                this.comboCell[size++] = new Cell(i, j);
            }
        }
    }
}


export class Puzzle {

    値: string[] = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];

    縦: string[] = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

    横: string[] = ["Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ"];

    rows: number;
    cols: number;
    min: number;
    max: number;
    comboCount: number;
    constructor(rows: number, cols: number, min: number, max: number, comboCount: number) {
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
    public createNewPuzzle(): number[][] {
        let board: number[][] = new Array();
        for (var i = 0; i < this.rows; i++) {
            board[i] = new Array();
            for (var j = 0; j < this.cols; j++) {
                board[i][j] = this.min + Math.floor(Math.random() * (this.max - this.min + 1));
            }
        }
        return board;
    }

    /**
        * 大きさを指定してコンボ成立していないランダムなパズルを生成する。
        * @param cols 縦の大きさ
        * @param rows 横の大きさ
        * @param min マス目に設定する最小値
        * @param max マス目に設定する最大値
        */
    public createNewPuzzleNotCombo(): number[][] {
        let pzl: number[][] = this.createNewPuzzle();
        while (true) {

            let result: Combo[] = this.judgeCombo(pzl);
            if (result.length <= 0) {
                break;
            }
            pzl = this.createNewPuzzle();
        }
        return pzl;
    }

    public judgeCombo(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        Array.prototype.push.apply(result, this.横コンボ判定(puzzle));
        Array.prototype.push.apply(result, this.縦コンボ判定(puzzle));
        return result;
    }
    public displayResult(param: Combo[]): string {
        let result: string = "";
        for (let i = 0; i < param.length; i++) {
            let line: string = "コンボ"+(i+1)+"；";
            for (let j = 0; j < param[i].comboCell.length; j++) {
                if (j > 0) {
                    line += ","
                }
                line += this.縦[param[i].comboCell[j].x]
                    + this.横[param[i].comboCell[j].y]
            }
            result += line + "\r\n";
        }
        return result;
    }

    public displayPuzzle(puzzle: number[][]): string {
        let result: string = "";
        for (let i = -1; i < puzzle.length; i++) {
            if (i == -1) {
                result += "　｜"
                for (let j = 0; j < puzzle[0].length; j++) {
                    result += this.横[j] + "｜"
                }
                result += "\r\n";
                for (let ii = -1; ii < puzzle[0].length; ii++) {
                    result += "――";
                }
                result += "\r\n";
                continue;
            }
            for (let j = -1; j < puzzle[i].length; j++) {
                if (j == -1) {
                    result += this.縦[i];
                } else {
                    result += this.値[puzzle[i][j] - 1];
                }
                result += "｜";
            }
            result += "\r\n";
            for (let ii = -1; ii < puzzle[0].length; ii++) {
                result += "――";
            }
            result += "\r\n";

        }
        return result;

    }


    入替(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        Array.prototype.push.apply(result, this.縦方向(puzzle));
        Array.prototype.push.apply(result, this.横方向(puzzle));
        Array.prototype.push.apply(result, this.斜め上方向(puzzle));
        Array.prototype.push.apply(result, this.斜め下方向(puzzle));
        return result;
    }
    縦横入替(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        Array.prototype.push.apply(result, this.縦方向(puzzle));
        Array.prototype.push.apply(result, this.横方向(puzzle));
        return result;
    }

    縦方向(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        for (let i = 0; i < puzzle.length - 1; i++) {
            for (let j = 0; j < puzzle[i].length - 1; j++) {
                let work: number[][] = puzzle.slice();
                let x: number = work[i][j];
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

    }
    横方向(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        for (let i = 0; i < puzzle.length - 1; i++) {
            for (let j = 0; j < puzzle[i].length - 1; j++) {
                let work: number[][] = puzzle.slice();
                let x: number = work[i][j];
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
    }

    斜め上方向(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        for (let i = 1; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle[i].length - 1; j++) {
                let work: number[][] = puzzle.slice();
                let x: number = work[i][j];
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

    }

    斜め下方向(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        for (let i = 0; i < puzzle.length - 1; i++) {
            for (let j = 0; j < puzzle[i].length - 1; j++) {
                let work: number[][] = puzzle.slice();
                let x: number = work[i][j];
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
    }



    /**
        * 縦方向のコンボ判定
        * @param puzzle
        * @param comboCount
        */
    縦コンボ判定(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        let hitCnt: number = 0;
        for (let j = 0; j < puzzle[0].length; j++) {
            let beforeNumber: number = -99;
            let cnt: number = 1;
            let begin: number = 0;

            for (let i = 0; i < puzzle.length; i++) {
                if (beforeNumber == puzzle[i][j]) {
                    cnt++;
                } else {
                    if (cnt >= this.comboCount && beforeNumber != -99) {
                        let cmb: Combo = new Combo();
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
                let cmb: Combo = new Combo();
                cmb.setCombo([begin, j], [puzzle.length - 1, j]);
                result[hitCnt] = cmb;
                hitCnt++;
            }
        }
        return result;

    }

    /**
        * 横方向のコンボ判定
        * @param puzzle 判定対象のパズル（２次元配列）
        * @param comboCount コンボ成立数
        */
    横コンボ判定(puzzle: number[][]): Combo[] {
        let result: Combo[] = new Array();
        let hitCnt: number = 0;
        for (let i = 0; i < puzzle.length; i++) {
            let beforeNumber: number = -99;
            let cnt: number = 1;
            let begin: number = 0;

            for (let j = 0; j < puzzle[i].length; j++) {
                if (beforeNumber == puzzle[i][j]) {
                    cnt++;
                } else {
                    if (cnt >= this.comboCount && beforeNumber != -99) {
                        let cmb: Combo = new Combo();
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
                let cmb: Combo = new Combo();
                cmb.setCombo([i, begin], [i, puzzle[i].length - 1]);
                result[hitCnt] = cmb;
                hitCnt++;
            }
        }
        return result;
    }
    かぶり除外(param: Combo[]): Combo[] {
        for (let i = 0; i < param.length; i++) {
            for (let j = 0; j < param.length; j++) {
                if (i == j) {
                    continue;
                }
                if (param[i].comboCell.length <= param[j].comboCell.length) {
                    let flg: boolean = false;
                    for (let ic = 0; ic < param[i].comboCell.length; ic++) {
                        flg = false;
                        for (let jc = 0; jc < param[j].comboCell.length; jc++) {
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
    }

}



