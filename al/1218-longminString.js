/**最长定差子序列
 * 给你一个整数数组 arr 和一个整数 difference，请你找出并返回 arr 中最长等差子序列的长度，该子序列中相邻元素之间的差等于 difference 。
子序列 是指在不改变其余元素顺序的情况下，通过删除一些元素或不删除任何元素而从 arr 派生出来的序列
输入：arr = [1,5,7,8,5,3,4,2,1], difference = -2
输出：4
解释：最长的等差子序列是 [7,5,3,1]。
 */
// 解题思路还是非常有说法的
// 设 dp[i] 为 以 数组中元素 i 为结束点的 最长定差子序列的长度 i = arr[j],j为任意下标
// 从左向右遍历来看 dp[arr[0]] = 1, 
// 如果 arr[1] -  arr[0] = difference, arr[1] - difference = arr[0]
// 那么 dp[arr[1]] = 2 
// 转化下表达式 dp[arr[1]] = dp[arr[0]] + 1
// 再转化下 dp[arr[1]] = dp[arr[1]-difference] + 1
//因为 dp[arr[0]] 存着之前的最长定差子序列长度
// 转化成方程式 dp[i] = dp[i-difference] + 1;
var longestSubsequence = function(arr, difference) {
    let res = 0;
    let tempMap = new Map();
    for(let i of arr) {
        tempMap.set(i,(tempMap.get(i-difference) || 0) + 1)
        res = Math.max(tempMap.get(i),res);
    }
    return res;
};