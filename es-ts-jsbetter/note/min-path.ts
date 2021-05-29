import { cloneDeep } from 'lodash';
// 最小路径和
let grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
// 思路： 选择最小路径的一步，走到终点
function minPathSum(arr:number[][]): number {
    let grid = cloneDeep(arr);
    let m = grid.length; // 行
    let n = grid[0].length; // 列
    let f = cloneDeep(arr);
    for (let i = 0; i < m; i++) {// i是行
        for (let j = 0; j < n; j++) {// j是列
            if (i == 0 && j == 0) {
                f[i][j] = grid[i][j];
            } else {
                let top  = i - 1 >= 0 ? f[i - 1][j] + grid[i][j] : 99999999;// 从左面来 ：只能从左面来
                let left = j - 1 >= 0 ? f[i][j - 1] + grid[i][j] : 99999999;// 从上面来 ：只能从上面来
                f[i][j] = Math.min(top, left);
            }
        }
      console.log(f[0]);
      console.log(f[1]);
      console.log(f[2]);
      console.log('=====');
    }
    return f[m - 1][n - 1];
}
minPathSum(grid)

//每日curry
const getSum = (a,b,c) => {
  return a+b+c;
}

const curry = (fuc) => {
  return function insideCurry(...args) {
    if(fuc.length > args.length) {
      return function () {
        return insideCurry(...args,...Array.from(arguments));
      }
    } else {
      return fuc(...args)
    }
  }
}

const t = curry(getSum)(1)(2);
console.log(t);
console.log(t(3));
