
// 回溯 递归调用的一个重要特征-要返回。回溯法是暴力解法的一个主要实现手段。
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

// 给出数字到字母的映射（与电话按键相同）。注意 1 不对应任何字母。
const fp = require('lodash')
var letterCombinations = function(digits) {
    let combinations =[];
    if(!digits || !digits.length) return combinations;
    const len = digits.length;
    const letterMap = [
        " ",    //0
        "",     //1
        "abc",  //2
        "def",  //3
        "ghi",  //4
        "jkl",  //5
        "mno",  //6
        "pqrs", //7
        "tuv",  //8
        "wxyz"  //9
    ];
    const dfs = (curStr, i) => {   // curStr是当前字符串，i是扫描的指针
        if (i === len) { // 指针越界，递归的出口
            combinations.push(curStr);          // 将解推入res
            return;                    // 结束当前递归分支
        }
        const letters = letterMap[digits[i]]; // 当前数字对应的字母
        // 理解错了 这里会开分支的
        for (const letter of letters) { // 一个字母是一个选择，对应一个递归分支
            dfs(curStr + letter, i + 1);  // 选择翻译成letter，生成新字符串，i指针右移继续翻译（递归）
        }
    };
    dfs('', 0); // 递归的入口，初始字符串为''，从下标0开始翻译
    return combinations;
};

/**
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。
 */

// function numIslands(grid) {
//     if(!grid) return;
//     const rowLen = grid.length;
//     const colLen = grid[0].length;
//     let temp = null;
//     let index = 0;
//     for(let r=0;r<rowLen;r++) {
//         for(let c = 0;c<colLen;c++) {
//             temp = dfs(grid,r,c);
//             if(temp) index++;
//         }
//     }
//     return index;
// }
// function dfs(grid,r,c) {
//     // 判断 base case
//     if (!inArea(grid, r, c)) {
//         return 0;
//     }
//     // 如果这个格子不是岛屿，直接返回
//     if (grid[r][c] != 1) {
//         return 0;
//     }
//     grid[r][c] = 2; // 将格子标记为「已遍历过」
    
//     // 访问上、下、左、右四个相邻结点
//     dfs(grid, r - 1, c);
//     dfs(grid, r + 1, c);
//     dfs(grid, r, c - 1);
//     dfs(grid, r, c + 1);
//     return 1;
// }

// 判断坐标 (r, c) 是否在网格中

function largest(grid,r,c) {
    // 判断 base case
    if (!inArea(grid, r, c)) {
        return 0;
    }
    // 如果这个格子不是岛屿，直接返回
    if (grid[r][c] != 1) {
        return 0;
    }
    grid[r][c] = 2; // 将格子标记为「已遍历过」
    
    // 访问上、下、左、右四个相邻结点
    return 1 + largest(grid, r - 1, c) +
    largest(grid, r + 1, c) +
    largest(grid, r, c - 1) +
    largest(grid, r, c + 1);
}
// 解法思路一 动态规划+DFS 将 时间超长。。。哈哈哈哈
// var largestIsland = function(grid) {
//     let arr = [];
//     const rowLen = grid.length;
//     const colLen = grid[0].length;
//     let tempArr = null;
//     for(let r=0;r<rowLen;r++) {
//         for(let c = 0;c<colLen;c++) {
//             if(grid[r][c]===0) {
//                 tempArr = JSON.parse(JSON.stringify(grid));
//                 tempArr[r][c] = 1;
//                 arr.push(tempArr);
//             }
//         }
//     }
//     if(!arr.length) return rowLen * colLen;
//     let res , tempGrid = null;
//     for(let i =0; i<arr.length;i++ ) {
//         res = 0;
//         tempGrid = [...arr[i]];
//         for(let r=0;r<rowLen;r++) {
//             for(let c = 0;c<colLen;c++) {
//                 res = Math.max(res,largest(tempGrid,r,c));
//             }
//         }
//         arr[i] = res;
//     }
//     return Math.max(...arr);
// };
// 解法思路一 两遍遍历 岛屿标记
// var largestIsland = function(grid) {
//     const rowLen = grid.length;
//     const colLen = grid[0].length;
//     let index = 3;
//     let indexAreas = {};
//     let res = 0;
//     for(let r = 0 ;r< rowLen;r++) {
//         for(let c = 0 ;c< colLen;c++) {
//             if(grid[r][c]===1) {
//                 index++;
//                 res = getArea(grid,r,c,index);
//                 indexAreas[index] = res;
//             }
//         }
//     }
//     // 没有陆地
//     if(index<1) return 1;
//     let indexArr = new Set();
//     let linkArea = 1;
//     for(let r = 0 ;r< rowLen;r++) {
//         for(let c = 0 ;c< colLen;c++) {
//             if(grid[r][c]===0) {
//                 indexArr = getNeighbor(grid,r,c);
//                 if(indexArr.size<1) continue;
//                 linkArea = 1;
//                 for(let item of indexArr.values()) {
//                     linkArea += indexAreas[item];
//                 }
//                 res = Math.max(linkArea,res);
//             }
//         }
//     }
//     return res || 1;
// }
// function getNeighbor(grid,r,c) {
//     let areaSet = new Set();
//     if(inArea(grid,r-1,c)&& grid[r-1][c] !== 0) {
//         areaSet.add(grid[r-1][c]);
//     }
//     if(inArea(grid,r+1,c)&& grid[r+1][c] !== 0) {
//         areaSet.add(grid[r+1][c]);
//     }
//     if(inArea(grid,r,c-1)&& grid[r][c-1] !== 0) {
//         areaSet.add(grid[r][c-1]);
//     }
//     if(inArea(grid,r,c+1)&& grid[r][c+1] !== 0) {
//         areaSet.add(grid[r][c+1]);
//     }
//     return areaSet;
// }
// function getArea (grid,r,c,index) {
//     if(!inArea(grid,r,c)) {
//         return 0;
//     }
//     if(grid[r][c] !==1) {
//         return 0;
//     }
//     grid[r][c] = index;
//     return 1 + getArea(grid, r - 1, c, index) + getArea(grid, r + 1, c, index) + getArea(grid, r, c - 1, index) + getArea(grid, r, c + 1, index);
// }


// let grid = [[1, 1], [1, 0]]
// console.log(largestIsland(grid))
// 岛屿周长
var islandPerimeter = function(grid) {
    let res = 0;
    //  可能有多个岛屿
    const rowLen = grid.length;
    const colLen = grid[0].length;
    for(let r = 0 ;r< rowLen;r++) {
        for(let c = 0 ;c< colLen;c++) {
            if(grid[r][c]===1) {
                res += getLength(grid,r,c);
            }
        }
    }
    return res;

};
function getLength(grid,r,c) {
    if(!inArea(grid,r,c)) {
        return 1;
    }
    if(grid[r][c] === 0 ) {
        return 1;
    }
    if(grid[r][c] !==1 ) {
        return 0;
    }
    grid[r][c] = 2;
    return getLength(grid, r - 1, c)
    + getLength(grid, r + 1, c)
    + getLength(grid, r, c - 1)
    + getLength(grid, r, c + 1);
}
function inArea(grid, r,c) {
    return 0 <= r && r < grid.length && 0 <= c && c < grid[0].length;
}
console.log(islandPerimeter([[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]))