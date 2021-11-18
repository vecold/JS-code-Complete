/**
 * @param {number[]} nums
 * @return {number}
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
 * 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 * 贪心并不是最优解 😂 【2，3，2】拍死
 */
// var rob = function(nums) {
//     let stole = [];
//     let curMax = null;
//     let index = null;
//     while(nums.findIndex((res)=>res!==-1) > -1) {
//         curMax = Math.max(...nums);// 找到最大的
//         index = nums.findIndex(res=> {return res === curMax});
//         stole = stole.concat(nums[index]);// 去偷
//         nums[index] = -1;
//         if(nums[index+1] !== undefined) nums[index+1] = -1;
//         if(nums[index-1] !== undefined) nums[index-1] = -1;
//     }
//     console.log(stole)
//     let total = stole.reduce((a,b)=> a+b);
//     return total;
// };

// 宝宝要求的标记
// var rob = function(nums) { 
//     if(!nums) return 0;
//     let len = nums .length;
//     if(len === 1) return nums[0];
//     let dp = new Uint32Array(len);
//     let dpHouse = [];// 建立一个存偷过钱的家的下标的数组
//     dp[0] = nums[0];
//     dpHouse[0]= [0];
//     dp[1] = Math.max(nums[0], nums[1]);
//     dpHouse[1] = nums[0] > nums[1]? [0] : [1];
//     // 难理解
//     for (let i = 2; i < len; i++) {
//         // 其实就是再比这次 偷的这家 是 偷 （这次的钱加上前面累加的钱） 还是 不偷 （前面累加的钱）哪个大
//         dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
//         dpHouse[i] = (dp[i - 2] + nums[i]) > dp[i - 1] ? [].concat(dpHouse[i-2],[i]) : dpHouse[i-1];// 原理同上，选择钱多的偷钱方案
//     }
//     // 这里就把标记打出来了
//     console.log(dpHouse[len-1])
//     return dp[len - 1];
// }
// let a= [2,3,2];
// console.log(rob(a))

// 动态规划类问题详解
// import { cloneDeep } from 'lodash';
// // 最小路径和
// let grid = [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// // 思路： 选择最小路径的一步，走到终点
// function minPathSum(arr) {
//     let grid = cloneDeep(arr);
//     let m = grid.length; // 行
//     let n = grid[0].length; // 列
//     let f = cloneDeep(arr);
//     for (let i = 0; i < m; i++) {// i是行
//         for (let j = 0; j < n; j++) {// j是列
//             if (i == 0 && j == 0) {
//                 f[i][j] = grid[i][j];
//             } else {
//                 let top  = i - 1 >= 0 ? f[i - 1][j] + grid[i][j] : 99999999;// 从左面来 ：只能从左面来
//                 let left = j - 1 >= 0 ? f[i][j - 1] + grid[i][j] : 99999999;// 从上面来 ：只能从上面来
//                 f[i][j] = Math.min(top, left);
//             }
//         }
//     }
//     return f[m - 1][n - 1];
// }
// minPathSum(grid)
// 小宝宝的奇思妙想
// var rob = function(nums) { 
//    let nostole = 0
//    let stole = nums[0]
//    for(let i = 1; i < nums.length; i++) {
//        const temp_nostole = nostole
//        nostole = Math.max(temp_nostole, stole)
//        stole = temp_nostole + nums[i]
//    }
//    return Math.max(nostole,stole)
// }
// let a= [1,9,7,1,2,3,2];
// console.log(rob(a))

// 动态规划 正经做法
// var rob = function(nums) { 
//     if(!nums) return 0;
//     let len = nums.length;
//     if(len === 1) return nums[0];
//     let dp = new Uint32Array(len);
//     dp[0] = nums[0];
//     dp[1] = Math.max(nums[0], nums[1]);
//     // 难理解
//     for (let i = 2; i < len; i++) {
//         // 其实就是再比这次 偷的这家 是 偷 （这次的钱加上前面累加的钱） 还是 不偷 （前面累加的钱）哪个大
//         dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
//     }
//     return dp[len - 1];
// }
 // 方程双指针 优化
// 这个方程是由子问题慢慢推导出来的，如果直接写谁都是懵逼
// 
var robs = (nums) => {
    if(!nums) return 0;
    const len = nums.length;
    if(len === 1) return nums[0];
    let pre = 0;
    let cur = nums[0];
    let temp;
    for(let i = 1; i< len;i++) {
        temp = cur;
        cur = Math.max( pre + nums[i], cur);
        pre = temp;
    }
    return Math.max(cur,pre);
}



var _ = "_";
function getSum(a,b,c) {
    return a+b+c;
}
// const curry = (fuc,...args) => args.length === fuc.length ? fuc(...args) : (...nextArgs) => curry(fuc,...args,...nextArgs);

function curry(fuc,...args) {
    let nextPor = 0;
    let nextArg;
    if(args.filter(arg => arg !== _).length === fuc.length) {
        return fuc(...args)
    } else {
        return function(...nextArgs) {
            while(nextArgs.length > 0 ) {
                nextArg = nextArgs.shift();
                while(args[nextPor] !== _ && nextPor < args.length) {
                    nextPor++;
                }
                args[nextPor] = nextArg;
                nextPor++;// 这里是个优化 有没有都没关系
            }
            return curry(fuc,...args);
        }
    }
}


// let t = curry(getSum)(1,'_');
// console.log(t(3)(4))
/**
 * 
 * 
 * 对于一个完全平方数而言，可以写成如下形式：num = n^2 = 1 + 3 + 5 + ... + (2 * n - 1)
因此对 num 进行不断的奇数试减，如果最终能够减到 0，说明 num 可展开成如 1+3+5+...+(2*n-1)的形式，num 为完全平方数。
 * @returns 
 */
var isPerfectSquare = function(num) {
    let x = 1;
    while (num > 0) {
        num -= x;
        x += 2;
    }
    return num == 0;
}

var isPerfectSquare = function(num) {
    let left = 0, right = num;
    while(left<=right) {
        let mid = Math.floor((right-left)/2 + left);
        let calc = mid*mid;
        if(calc > num) {
            right = mid - 1;
        } else if(calc < num){
            left = mid + 1;
        } else {
            return  true
        }
    }
    return false;
};