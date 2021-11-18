/**
 * 给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
返回所有可能的结果。答案可以按 任意顺序 返回。
 */

let len;
let max; // 最多可以加多少个括号
let replaceLen;// 删除最小数量的括号后的字符串长度
const resSet = new Set();// 去重用的所有有可能的字符串集合
let _s;
var removeInvalidParentheses = function(s) {
    let left = 0, right = 0;
    len = s.length;
    _s = s;
    let maxRight = 0, maxLeft = 0;
    for(let i of s.split('')) {
        if(i==='(') {
            left++;
            maxLeft++;
        } else if(i===')') {
            maxRight++;
            if(left>0) {
                left--;
            } else {
                right++;
            }
        }
    }
    replaceLen = len - left - right; // 删除最小数量的括号后的字符串长度
    max = Math.min(maxLeft,maxRight);
    dfs('',0,0,left,right)
    return [...resSet]
};
// 枚举所有可能的字符串
/**
 * 
 * @param {*} cur 当前的字符串
 * @param {*} index 当前的下标
 * @param {*} _s 总字符串
 * @param {*} score 括号的添加次数 左括号加 1 右括号减1
  这里的score 很重要，因为 是 左侧先，右侧后所以 大于max可以 和 小于 0 就代表 括号多了
 */
var dfs = function(cur,index,score,leftLost,rightLost) {
    if(leftLost < 0 || rightLost < 0 ||  score>max || score<0) return;
    if(leftLost===0 && rightLost===0 && cur.length === replaceLen) resSet.add(cur);// 当和 删除最小数量的括号后的字符串长度 一致,括号也不多余就添加
    let curStr = _s[index];
    if(index >= len) return; // 要放在这里比较，因为还要添加一下
    if(curStr === '(') {
        // 可加可不加
        dfs(cur+curStr,index + 1,score+1,leftLost,rightLost);
        dfs(cur,index + 1,score,leftLost-1,rightLost);// 不加，左括号计数可以 -1
    } else if(curStr === ')') {
        // 可加可不加
        dfs(cur+curStr,index + 1,score-1,leftLost,rightLost);
        dfs(cur,index + 1,score,leftLost,rightLost-1);// 不加，右括号计数可以 -1
    } else {
        // 字符串直接加
        dfs(cur+curStr,index + 1,score,leftLost,rightLost);
    }
}

console.log(removeInvalidParentheses("()())()"))