/**
 * 
 * @param {给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
返回被除数 dividend 除以除数 divisor 得到的商。
整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

 * @param {*} divisor 
 */
// 傻子题目对吧 。。。 关键核心在于 倍增思想 当一个数 x 的 2^n 倍都比 被除数 a 小的 话，那就让这个数再相加扩大2倍，
// 直到比 a 大，那么这个相除结果就在 2^n 与 2^(n+1) 之间，使用 a 减去 x * 2^n 然后再次从 x 开始去计算剩下的结果，递归就出现啦～ logn 哦
var getCount = function(toNum,calcNum) {
    if(calcNum > toNum) return 0;
    let count = 1;
    let tempCalcNum = calcNum;
    while(toNum >= (tempCalcNum + tempCalcNum)) {
        count += count;
        tempCalcNum += tempCalcNum;
    }
    return count + getCount(toNum-tempCalcNum,calcNum)
}
var divide = function(dividend, divisor) {
    let res = 0;
    let flag = true; // 正数
    if(divisor === 1) res = dividend;
    if(divisor === -1) res = -dividend;
    if(divisor!==1 && divisor!==-1) {
        if((dividend>0 && divisor<0) || (dividend<0 && divisor>0)) flag = false;// 负数
        if(dividend<0) dividend = -dividend;
        if(divisor<0) divisor =  -divisor;
        res = getCount(dividend, divisor);
        if(!flag) res = -res;
    }
    if(res < Math.pow(-2,31)) res = Math.pow(-2,31);
    if(res >= Math.pow(2,31)) res = Math.pow(2,31) - 1;
    return res;
};

// console.log(divide(-2147483648,-1))


// 太简单的我就不写了过程了

var fizzBuzz = function(n) {
    let res = new Array(n);
    let temp;
    for(let i = 1; i<=n; i++) {
        temp=i
        if(i%3 === 0) temp = 'Fizz';
        if(i%5 === 0) temp = 'Buzz';
        if(i%3 === 0 && i%5 === 0) temp = 'FizzBuzz';
        res[i-1] = temp+'';
    }
    return res;
};

console.log(fizzBuzz(3))