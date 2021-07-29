/**
 * 
 * @param {*} grid 
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向下或者向右移动一步。
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
    输出：7
    解释：因为路径 1→3→1→1→1 的总和最小。

 */
// v1 没有考虑到0的情况
var minPathSum = function(grid) {
  // m 是第一层 n 是第二层
  for(let m in grid) {
    for(let n in grid[m]) {
      if(grid[m-1] === undefined && grid[m][n-1] !== undefined) {
        // 如果不能从上面来 能从左边来
        grid[m][n] += grid[m][n-1]
      } else if(grid[m-1] !== undefined && grid[m][n-1] === undefined){
        // 如果不能从左面来 能从上面边来
        grid[m][n] += grid[m-1][n]
      } else if ( grid[m-1] === undefined && grid[m][n-1] === undefined) {
        // 上面左面都不行
        grid[m][n] = grid[m][n];
      } else {
        // 能从上面来也能从左面来取个最小的
        grid[m][n] += Math.min(grid[m-1][n],grid[m][n-1]);
      }
    } 
  }
  return grid[grid.length-1].pop();
};
// v2
// const minPathSum = grid => {
//   // 获取数组长度 一共多少行
//   const row = grid.length,
//   // 一共多少列
//   col = grid[0].length;
//   // 特殊处理最左边的列
//   for (let i = 1; i < row; i++) {
//     grid[i][0] += grid[i - 1][0];
//   }
//   // 特殊处理最上边的行
//   for (let j = 1; j < col; j++) {
//     grid[0][j] += grid[0][j - 1];
//   }
//   // 从第二行第二列开始挑小的处理
//   for (let i = 1; i < row; i++) {
//     for (let j = 1; j < col; j++) {
//       grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
//     }
//   }
//   // 返回最后一个
//   return grid[row - 1][col - 1];
// };


const minPath = (grid) => {
  const row = grid.length;
  const clo = grid[0].length;
  for(let i = 1; i< clo; i++) {
    grid[0][i] += grid[0][i-1];
  }
  for(let i = 1; i< row; i++) {
    grid[i][0] += grid[i-1][0];
  }
  for(let i = 1; i< row; i++) {
    for(let j=1; j< clo; j++) {
      grid[i][j] += Math.min(grid[i-1][j],grid[i][j-1]) ;
    }
  }
  return grid[row-1][clo-1];
}
console.log(minPath([[0,0],[0,0]]))