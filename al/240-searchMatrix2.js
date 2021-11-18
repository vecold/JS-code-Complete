/**
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 */
/** 
 * 初期第一个想到的就是二分法，然而没有 上一行的最后一个值比下一行第一个值小的条件
 * 所以有一个另外的搜索法
 * 从 矩阵的右上角开始，
 * 如果[x,y] > target,由于每一列的元素都是升序排列的，那么在当前的搜索矩阵中，所有位于第 y列的元素都是严格大于target 的 所以 y--
 * 如果[x,y] < target 由于每一行的元素都是升序排列的，那么在当前的搜索矩阵中，所有位于第 x 行的元素都是严格小于 target 所以 x++
 * 数学题呀
 */
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let x = 0,y=n-1;
    while(x<m && y>=0) {
        if(matrix[x][y] === target) return true;
        if(matrix[x][y]>target) {
            y--;
        } else {
            x++;
        }
    }
    return false;
};
[[-5]]