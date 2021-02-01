//控制副作用
//js中容器指 值与值的变形关系（函数）
//函子 为特殊容器 通过对象实现，该对象有map方法，可以运行一个函数处理值
//函子自己有值对外公布一个map方法
//暂时未知函子有什么作用
class Container {
  static of (value) {
    return new Container(value);
  }
  constructor(value) {
    this._value = value;
  }
  //接受处理值的函数
  map(fn){
    return Container.of(fn(this._value))
  }
}
// let r = new Container(5)
//   .map(x=>x+1)
//   .map(x=>x*x)
// // console.log(r)
let r = Container.of(5)
          .map(x=>x+1)
          .map(x=>x*x)
console.log(r._value)

function getSum (a,b,c) {
    return a+b+c;
  }

//每天一遍curry啦
const curry = (func)=>{
  return function insideCurry(...args) {
    if(args.length<func.length) {
      return function() {
        return insideCurry(...args,...arguments);
      }
    } else {
      return func(...args)
    }
  }
}
let test = curry(getSum)(1)(2)(3);
console.log(test)
// //每天一遍curry
// const curry = (func)=>{
//   return function newFunc(...args){
//     if(func.length>args.length) {
//       return function() { //错误点箭头函数没有arguments
//         return newFunc(...args,...arguments)
//       }
//       // return ()=>newFunc(...args,...arguments);//错误点，参数没有叠加
//     } else {
//       return func(...arguments);
//     }
//   }
// }
//每天一遍curry2333
// const curry = (func) =>{
//   return function test(...args) {
//     if(func.length > args.length) {
//       return function() {
//         return test(...args,...arguments);
//       }
//     } else {
//      return func(...arguments)
//     }
//   }
// }
// console.log(curry(getSum)(1)(2)(3))