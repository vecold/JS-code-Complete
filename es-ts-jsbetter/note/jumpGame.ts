// curry again
// const getSum = (a,b,c) => {
//   return a+b+c;
// }

// const curry = (fuc) => {
//   return function insideCurry(...args) {
//     if(fuc.length>args.length) {
//       return function () {
//         return insideCurry(...args,...Array.from(arguments));
//       }
//     } else {
//       return fuc(...args);
//     }
//   }
// }

// const t = curry(getSum);
// console.log(t(1));
// console.log(t(13)(1)(1));
// error 1 抛弃了往后跳两步可能是更优解的可能性，往前跳了  很有可能出现种情况  97 97 97 97 97 98 97 96 95
var help1 = function(arr,d,i,number=1,originI) {
  // 前三村后三里比我小最大的值，没有我就不跳了 , 比我高的我也跳不了
  let start = i-d < 0 ? 0 : i-d;
  let end = i + d  > arr.length - 1 ? arr.length - 1 : i + d 
  // 我能不能一帆风顺的到最大的那个点，不能我就不跳了
  let befExtendIndex=[];// 继承我的任务吧
  let aftExtendIndex=[];// 继承我的任务吧
  let afStep = 0;// 往后跳，步数内，最多可以跳几步
  let beStep = 0;// 往前跳，步数内，最多可以跳几步 
  let beValue = -999;
  let afValue = -999;
  // 往前
  for(let ti = i >0 ? i-1 : 0 ;ti>=start;ti--) {
    if(arr[ti] >= arr[i]) {
      // 一头撞墙
      break;
    } else {
      if( arr[ti] > beValue ) {
        beValue = arr[ti];
        befExtendIndex = [ti];
      } else if(arr[ti] === beValue) {
        befExtendIndex.push(ti);
      }// 存在多个相同的值
      beStep += 1;
    }
  }
  // 往后
  for(let ti = i < arr.length - 1 ? i+1 : i ;ti<= end;ti++) {
    if(arr[ti] >= arr[i]){
      // 一头撞墙
      break;
    } else {
      if( arr[ti] > afValue ) {
        afValue = arr[ti];
        aftExtendIndex = [ti];
      } else if(arr[ti] === afValue ) {
        aftExtendIndex.push(ti);
      }
      afStep += 1;
    }
  }
  if(afStep===0 && beStep===0) return number;
  // 继续跳吧, 用谁的下标呢, 谁步子可以迈的最多,数字最大用谁的
  number += 1;
  number = Math.max(Math.max(...befExtendIndex.map(item=>help1(arr,d,item,number,originI))),Math.max(...aftExtendIndex.map(item=>help1(arr,d,item,number,originI))));
  return number;
}
/**
* @param {number[]} arr
* @param {number} d
* @return {number}
*/
var maxJumps1 = function(arr, d) {
  // 计算每个点出发的最大路径
  let newArr = [];
  for(let i in arr) {
      newArr.push(help1(arr,d,+i,1,+i))
  }
  return Math.max(...newArr);
};

// 时间 2021 03.22 这么写性能很差，有很多个变量缓存
var help = function (arr, d, i) {
  // 前三村后三里比我小最大的值，没有我就不跳了 , 比我高的我也跳不了
  let start = i - d < 0 ? 0 : i - d;
  let end = i + d > arr.length - 1 ? arr.length - 1 : i + d
  // 我能不能一帆风顺的到最大的那个点，不能我就不跳了
  // 往前
  let max = 0;
  for (let ti = i - 1; ti >= start && arr[ti] < arr[i]; ti--) {
    max = Math.max(help(arr, d,ti),max);
  }
  // 往后
  for (let ti = i + 1; ti <= end && arr[ti] < arr[i]; ti++) {
    max = Math.max(help(arr, d,ti),max);
  }
  // 继续跳吧 就算遍历都失败了但是你既然进了这个位置，你就访问了这个下标
  let number = 1 + max;

  return number;
}
/**
* @param {number[]} arr
* @param {number} d
* @return {number}
*/
var maxJumps = function (arr, d) {
  // 计算每个点出发的最大路径
  let newArr = [];
  for (let i in arr) {
    newArr.push(help(arr, d, +i))
  }
  return Math.max(...newArr);
};
// 遍历最大值
// 解决了变量缓存问题
const maxJumpsV2 = (arr, d) => {
  // 初始化缓存
  const cache = new Uint16Array(arr.length);
  // 获取所有点出发的最大值
  return Math.max(...arr.map((v, i) => helper(i)));// i是步数

  function helper(cur) {
    // 如果还没开始走 cur是下标
    if (cache[cur] === 0) {
      let max = 0;// 这个点的最大步数
      // 初始化的当前下标 往后走一步 cur + 1， 最大可以走d步，不能超出数组，往后走 比当前低
      for (let i = cur + 1; i <= cur + d && i < arr.length && arr[i] < arr[cur]; ++i) {
        max = Math.max(helper(i), max);// 拿最大的
      }
      // 前走 最大步数 不能超出数组 比 当前低
      for (let i = cur - 1; i >= cur - d && i >= 0 && arr[i] < arr[cur]; --i) {
        max = Math.max(helper(i), max);// 拿最大的
      }
      cache[cur] = 1 + max;// 当然。你要走一步，算在当前的点上
    }
    return cache[cur];
  }
};

// 目前知道的最优秀解决方案 今天就把这个看明白吧
const maxJumps3= (arr, d) => {
  // 末尾给了一个最大值
  arr.push(10 ** 5 + 1);
  const LEN = arr.length;// LEN长度
  const dp = new Uint16Array(LEN).fill(1);// 一个新的缓存数组
  for (let i = 1, top = 0, stack = new Uint16Array(LEN); i < LEN; ++i) {
    while (top >= 0 && arr[stack[top]] < arr[i]) {
      let prevNoneSame = top;
      const height = arr[stack[top]];
      while (arr[stack[prevNoneSame]] === height) --prevNoneSame;
      while (arr[stack[top]] === height) {
        const idx = stack[top--];
        i - idx <= d && dp[idx] + 1 > dp[i] && (dp[i] = dp[idx] + 1);
        prevNoneSame >= 0 && idx - stack[prevNoneSame] <= d && dp[idx] + 1 > dp[stack[prevNoneSame]] && (dp[stack[prevNoneSame]] = dp[idx] + 1);
      }
    }
    stack[++top] = i;
  }
  dp[LEN - 1] = 0;
  return Math.max(...dp);
};

// console.log(maxJumps([3,3,3,3,3],3));
// console.log(maxJumps([7,6,5,4,3,2,1],1));
// console.log(maxJumps([7,1,7,1,7,1],2));
// console.log(maxJumps([66],1));
// console.log(maxJumps([6,4,14,6,8,13,9,7,10,6,12],2));
// console.log(maxJumps([22,29,52,97,29,75,78,2,92,70,90,12,43,17,97,18,58,100,41,32],17));
console.log(maxJumps([83, 11, 83, 70, 75, 45, 96, 11, 80, 75, 67, 83, 6, 51, 71, 64, 64, 42, 70, 23, 11, 24, 95, 65, 1, 54, 31, 50, 18, 16, 11, 86, 2, 48, 37, 34, 65, 67, 4, 17, 33, 70, 16, 73, 57, 96, 30, 26, 56, 1, 16, 74, 82, 77, 82, 62, 32, 90, 94, 33, 58, 23, 23, 65, 70, 12, 85, 27, 38, 100, 93, 49, 96, 96, 77, 37, 69, 71, 62, 34, 4, 14, 25, 37, 70, 3, 67, 88, 20, 30], 29));
console.log(maxJumpsV2([83, 11, 83, 70, 75, 45, 96, 11, 80, 75, 67, 83, 6, 51, 71, 64, 64, 42, 70, 23, 11, 24, 95, 65, 1, 54, 31, 50, 18, 16, 11, 86, 2, 48, 37, 34, 65, 67, 4, 17, 33, 70, 16, 73, 57, 96, 30, 26, 56, 1, 16, 74, 82, 77, 82, 62, 32, 90, 94, 33, 58, 23, 23, 65, 70, 12, 85, 27, 38, 100, 93, 49, 96, 96, 77, 37, 69, 71, 62, 34, 4, 14, 25, 37, 70, 3, 67, 88, 20, 30], 29));
