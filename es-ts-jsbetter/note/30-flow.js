// @flow
// js 的弱类型问题
// const obj = {};
// obj.foo();//运行时报错
// function t(a: number,b: number) {
//   return a+b;
// }
// console.log(t(100,1));
// console.log(t(100,'1'));
// const a= {};
// a[true] === a['true'];
// 强类型 
// 错误更早暴露
// 代码更智能，编码准确
// 重构牢靠
// 减少了类型判断

// 移除注解的方式  flow-bin flow-remove-types
// @babel/preset-flow @babel/cli @babel/core

function  getSum(a,b,c) {
  return a + b + c;
}

const curry = (fuc) => {
  return function insideCurry(...args) {
    if(fuc.length > args.length){
      return function () {
        return insideCurry(...args,...Array.from(arguments));
      }
    } else {
      return fuc(...args);
    }
  }
}
const t = curry(getSum);
console.log(t);
console.log(t(3)(3)(3));