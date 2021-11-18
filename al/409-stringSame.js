// /**
//  *给你一个字符串 s，找到 s 中最长的回文子串。
// */
// /**
//  * 解法1，可以按照DP解决，但是空间会到n2 
//  * 对于一个 点 p(i,i)他自己本身就是回文
//  * p(i,i+1) s[i] === s[i+1]就是回文
//  * 点 p(i,j) =  p(i+1,j-1) & s[i] === s[j]就是回文
//  * 所以我可以 先 new 一个 二维数组  boolean [len][len]
//  * 然后将所有 boolean[i][i] 为true （单个字符串）
//  * 然后一个 双重复遍历，把所有长度都遍历过来，取最长的那个就好了
//  * 
//  */
// // L是此次遍历的长度
// for(let L = 2; L<'word'.length;L++) {
//     // 左边界
//     for(let i=0; i< 'word'.length;i++) {
//         let j = i+L -1;// 右边界
//         if('word'[i]!=='word'[j]) {
//             dp[i][j] = false
//         } else {
//             if(L===2) {
//                 dp[i][j] = true;
//             } else {
//                 dp[i][j] = dp[i+1][j-1]
//             }
//         }
//         // 然后关键点,如果此时这个为回文串并且长度比最大的长，就用这个了
//         if(dp[i][j] && L > maxLength) {
//             maxLen = L;
//             start = i;
//         }
//     }
// }
// return 'word'.substr(start,maxLen)

// /**
//  * 解法2，从解法1衍生一下，可以省一部分的空间
//  * 从每一个字符串，或者每两个字符串中间为起点开始去计算每个回文
//  */
// for(let i=0;i<'word'.length;i++) {
//     // 关键点 起点的位置都要覆盖到
//     var len1 = calcString('word',i,i);
//     var len2 = calcString('word',i,i+1);
//     let length = Math.max(len1,len2);
//     if(length>maxLen) {
//         start = i - (length-1)/2 // 如果 自己下标为 2 那么 长度 为奇数的时候 （5）起点下标为 0 为偶数 4 起点下标为 1
//         // 小知识，字符串切割会去掉小数点
//         maxLen = length;
//     }
// }
// return 'word'.substr(start,maxLen)
// var calcString = (s,left,right) => {
//     while(left>=0 && right<s.length && s[left] === s[right]){
//         left--;
//         right++;
//     }
//     return right - left + 1;
// }

// 相较于最长子回文，序列的dp性要更强一些，加上可以保存之前的最长长度就好了
var longestPalindromeSubseq = function(s) {
    let len = s.length;
    let dp = new Array(len).fill(0).map(()=>new Array(len).fill(0));
    for(let L = 1 ;L<=len;L++) {
        for(let left = 0;left+L-1<len;left++) {
            let right = left+L-1;
            if(L == 1) {
                dp[left][right] = 1;
            } else if(L == 2) {
                dp[left][right] = s[left] == s[right] ? 2 : 1;// 保存下来可能的最长长度
            } else {
                dp[left][right] = Math.max(dp[left+1][right],dp[left][right-1],dp[left+1][right-1] + (s[left] === s[right] ? 2 : 0));
                // 保存下来可能的最长长度 看看是不带 left长还是不带right长 // 当然还有一个都带的
            }
        }
    }
    return dp[0][len-1]
};
console.log(longestPalindromeSubseq("bbbab"))