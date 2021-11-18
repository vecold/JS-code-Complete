/**
 * 给定一个正整数 n ，输出外观数列的第 n 项。
「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。
你可以将其视作是由递归公式定义的数字字符串序列：
countAndSay(1) = "1"
countAndSay(n) 是对 countAndSay(n-1) 的描述，然后转换成另一个数字字符串。
1.     1
2.     11
3.     21
4.     1211
5.     111221
第一项是数字 1 
描述前一项，这个数是 1 即 “ 一 个 1 ”，记作 "11"
描述前一项，这个数是 11 即 “ 二 个 1 ” ，记作 "21"
描述前一项，这个数是 21 即 “ 一 个 2 + 一 个 1 ” ，记作 "1211"
描述前一项，这个数是 1211 即 “ 一 个 1 + 一 个 2 + 二 个 1 ” ，记作 "111221"
要 描述 一个数字字符串，首先要将字符串分割为 最小 数量的组，
每个组都由连续的最多 相同字符 组成。然后对于每个组，先描述字符的数量，
然后描述字符，形成一个描述组。要将描述转换为数字字符串，先将每组中的字符数量用数字替换，再将所有描述组连接起来。
 */
/**
 * @param {number} n
 * @return {string}
 */
// 初始想法
var getDecByStr = function(str) {
    let len = str.length;
    let numArr = [[str[0]]];
    for(let i = 1; i<len;i++) {
        if(str[i] === numArr[numArr.length-1][0]) {
            numArr[numArr.length-1].push(str[i]);
        } else {
            numArr.push([str[i]])
        }
    }
    return numArr.map(item=> `${item.length}${item[0]}`).join('');
}
var countAndSay = function(n) {
    if(n===1) return '1';
    let res = '1';
    for(let j = 2;j<=n;j++) {
        res = getDecByStr(res);
    }
    return res;
};

// 

// 高级想法，使用双指针循环
var countAndSay = function(n) {
    let ans = "1";
    let cur,cnt,m,k,i,j;
    for ( i = 2; i <= n; i++) {
        cur = "";
        m = ans.length;
        // m 是当前循环的字符串长度
        for ( j = 0; j < m; ) {
            // k是从当前字符开始的下一个
            k = j + 1;
            while (k < m && ans[j] === ans[k]) k++;// 下一个字符如果和一开始的自负 j 相同，那么 指针往后挪一下
            cnt = k - j;// 计数
            cur += cnt + "" + ans[j];// 把计数和字符合起来
            j = k;// 从下一个字符开始又要重新开始了
        }
        ans = cur;
    }
    return ans;
}
console.log(countAndSay(5))