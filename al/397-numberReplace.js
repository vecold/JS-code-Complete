/**
 * 给定一个正整数 n ，你可以做如下操作：
如果 n 是偶数，则用 n / 2替换 n 。
如果 n 是奇数，则可以用 n + 1或n - 1替换 n 。
n 变为 1 所需的最小替换次数是多少？
链接：https://leetcode-cn.com/problems/integer-replacement
 */
var integerReplacement = function(n) {
    let res = n;
    var dfs = (n,num) => {
        if(n<1) return;
        if(n === 1) {
            res = Math.min(res,num)
            return;
        }
        if(n%2 === 0) {
            dfs(n/2, num + 1)
        } else {
            dfs(n+1, num + 1)
            dfs(n-1, num + 1)
        }
        return
    }
    dfs(n,0);
    return res
};
var integerReplacement2 = function(_n) {
    let n = _n;
    let ans = 0;
    while (n !== 1) {
        if (n % 2 == 0) {
            n = n >> 1;
        } else {
            if (n !== 3 && ((n >> 1) & 1) == 1) n++;
            else n--;
        }
        ans++;
    }
    return ans;
}
// console.log(integerReplacement2(7));

let a = {a:1}
let b = new Proxy(a,{
    set(target,property,value,receiver) {
        console.log(target[property])
    }
})
b.a=2