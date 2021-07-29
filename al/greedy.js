/**
 * 贪心算法是一种思想
 */
// 给定一个数字数组，返回最大
//  const nums = [32, 94, 128, 1286, 6, 71,99];

//  function getBigNum(nums) {
//    nums.sort((a, b) => {
//         console.log(a,b)
//         const ab = `${a}${b}`;
//         const ba = `${b}${a}`;
//         if(ab > ba) {
//             return -1;   // ab大，a放前面
//         } else if (ab < ba) {
//             return 1;  
//         }
//         return 0;
//    });
//    return nums;
//  }
 
//  const res = getBigNum(nums);
//  console.log(res);


/**
 * 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。
如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。
 */
// 先进行一波排序，这个比较简单因为每个小孩子就一块饼干
// 一人一块
// var findContentChildren = function(g, s) {
//     g.sort((a,b)=>{return b-a});
//     s.sort((a,b)=>{return b-a});
//     let start = 0;
//     let num = 0;
//     const sizeLen = s.length;
//     const gLen = g.length;
//     // 用最大的饼干去喂胃口最大的小孩
//     for(let i = 0;i<sizeLen;i++) {
//         // 找一遍小孩的胃口
//         for(let k=start;k<gLen;k++) {
//             if(s[i]>=g[k]) {
//                 start = k + 1;
//                 num++;
//                 break;
//             }
//         }
//         if((i===0&&num===0)|| start===gLen) break;//最大的饼干一个小孩都没满足就没有能满足的了
//     }
//     return num;
// };
//一人多块
// var findContentChildren = function(g, s) {
//     g.sort((a,b)=>{return a-b});
//     s.sort((a,b)=>{return a-b});
//     let start = 0;
//     let num = 0;
//     const sizeLen = s.length;
//     const gLen = g.length;
//     let temp = null;
//     // 从最小胃口的小孩开始去要饼干
//     for(let i = 0;i<gLen;i++) {
//         temp = 0;
//         // 如果满足了就不要继续了
//         for(let k=start;k<sizeLen;k++) {
//             temp += s[k];
//             if(temp>=g[i]) {
//                 start = k + 1;
//                 num++;
//                 break;
//             }
//         }
//         if(num===0 || start=== sizeLen ) break;//全部饼干都给你了或者都满足不了你就算了。。。
//     }
//     return num;
// };
// let arr1 = [1,2,3];
// let arr2 = [1,2];
// console.log(findContentChildren(arr1,arr2))

/**
 * 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
注意:
可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

 * @param {*} intervals 
 */
// 贪心算法，先排序 ，最小移除也就是容纳最多，所以挑结束小的搞
// var eraseOverlapIntervals = function(intervals) {
//     intervals = intervals.sort((a,b)=>{
//         return  a[1] - b[1] ;
//     });
//     let count = 1;	//最多能组成的不重叠区间个数
//     let end = intervals[0][1];
//     for (let i = 1; i < intervals.length; i++) {
//         if (intervals[i][0] < end) {
//             continue;
//         }
//         end = intervals[i][1];
//         count++;
//     }
//     return intervals.length - count;
// };
// let a = [ [1,100],[11,22],[1,11],[2,12] ];
// console.log(eraseOverlapIntervals(a))

/**
 * 给定一个偶数长度的数组，其中不同的数字代表着不同种类的糖果，每一个数字代表一个糖果。你需要把这些糖果平均分给一个弟弟和一个妹妹。返回妹妹可以获得的最大糖果的种类数。
 */
// 把所有总类不同的糖给妹妹，多出来的给弟弟完事

var distributeCandies = function(candyType) {
    // 先简单排序下，这样就不用include了
    candyType.sort((a,b)=>{
        return a - b;
    });
    const len = candyType.length;
    let sisNum = 1;
    for(let i = 1; i<len && sisNum < len/2; i++) {
        if(candyType[i] !== candyType[i-1]) {
            sisNum++;
        }
    }
    return sisNum;
};

// 牛皮闪闪的set
var distributeCandies = function(candyType) { 
    let num = new Set(candyType);
    return Math.min(num.size,candyType.length/2)
}
let candies = [1,1,2,3];
console.log(distributeCandies(candies))