// const curry =  (fuc,...args)  => fuc.length > args.length ? (...nextArgs)=>curry(fuc,...args,...nextArgs) : fuc(...args);
/**
 * 给定一个字符串 s，请将 s 分割成一些子串，使每个子串都是回文串。
返回符合要求的 最少分割次数 。
 */
/**
 * @param {string} s
 * @return {number}
 */
/**
 * 
 * 思路： 从字符串末尾开始，计算回文，一旦是回文，截取 然后死在 aaabaa 上了 我就知道哈哈哈
 */

// console.log(minCut('aab'))
// 从头开始吧 首先，找一个 最长的回文
var longestPalindrome = function(s) {
    if(!s||s==='') return '';
    let start = 0,end = 0;
    let len1,len2,len;
    for(let i = 0;i<s.length;i++){
        len1 = findLongString(s,i,i);
        len2 = findLongString(s,i,i+1);
        len = Math.max(len1,len2);
        if(len > end - start) {
            start = i - Math.floor((len-1)/ 2)
            end = i + Math.floor(len / 2); 
        }
    }
    return s.substring(start,end+1);
}

let findLongString = (s,left,right) => {
    while(left>=0 && right <s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}
// 23333 算法非常复杂，并且 复杂度高 随便写写不求记忆啦 而且leetcode 还超时
var minCut = (s) => {
    // 首先要打上标记 确定 从 i ～ j 的 字符串是不是回文
    const len = s.length;
    let cenL = 0;
    let cenR = 0;
    let left, right;
    let isPalindrome = {};
    while (cenR < len) {
        left = cenL;
        right = cenR;
        while (left >= 0 && right < len && s[left] === s[right]) {
            isPalindrome[left] = isPalindrome[left] ? {...isPalindrome[left],[right]:true} : {[right]:true}
            left--;
            right++;
        }
        cenR > cenL ? cenL++ : cenR++;
    }
    let dp = [];
    for (let i = 0; i < len; ++i) {
        // s[0] ~ s[i] 本身就是回文串，则无需切割
        if (isPalindrome[0][i]) {
            dp[i] = 0;
        }
        else {
            // dp[i] 初始化为 s[0] ~ s[i] 的最大切割次数
            dp[i] = i;
            for (let j = 1; j <= i; ++j) {
                if (isPalindrome[j][i]) {
                    dp[i] = Math.min(dp[i], dp[j - 1] + 1);
                }
            }
        }
    }
    return dp.pop();
};
console.log(minCut('aab'));