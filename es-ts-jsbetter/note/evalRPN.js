/**
 * 根据 逆波兰表示法，求表达式的值。

有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

说明：

整数除法只保留整数部分。
给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。
逆波兰表示法
一个表达式E的后缀形式可以如下定义：
（1）如果E是一个变量或常量，则E的后缀式是E本身。
（2）如果E是E1 op E2形式的表达式，这里op是任何二元操作符，则E的后缀式为E1'E2' op，这里E1'和E2'分别为E1和E2的后缀式。
（3)如果E是（E1）形式的表达式，则E1的后缀式就是E的后缀式。
如：我们平时写a+b，这是中缀表达式，写成后缀表达式就是：ab+
(a+b)*c-(a+b)/e的后缀表达式为：
(a+b)*c-(a+b)/e
→((a+b)*c)((a+b)/e)-
→((a+b)c*)((a+b)e/)-
→(ab+c*)(ab+e/)-
→ab+c*ab+e/-
思路 数字入栈 符号出栈 计算后重新入栈 直到栈的长度只有1
*/
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  let newTokens = [];
  let a = null;
  let b = null;
  for(let i of tokens) {
    if(isNaN(i)) {
      b = newTokens.pop();
      a = newTokens.pop();
    }
    
    switch(i) {
      case '+':
        newTokens.push(a+b);
        break;
      case '-':
        newTokens.push(a-b);
        break;
      case '*':
        newTokens.push(a*b);
      break;
      case '/':
        newTokens.push(parseInt(a/b));
      break;
      default:
        newTokens.push(parseInt(i));
        break;
    }
  }
  return newTokens[0];
};

console.log(evalRPN(["4","13","5","/","+"]));