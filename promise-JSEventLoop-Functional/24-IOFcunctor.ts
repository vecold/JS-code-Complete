//IO 的——value都是函数 
//不纯的操作给调用者处理，包装纯操作
//副作用在可控的时间发生
const fp = require('lodash/fp');
class IO {
  public _value: any;
  static of(value) {
    return new IO(function() {
      return value
    });
  }
  constructor (fn) {
    this._value = fn;
  }
  map(fn) {
    return new IO(fp.flowRight(fn,this._value))
  }
}

let text =  IO.of(process).map(p => p.execPath);
console.log(text._value())

//每日的curry

// function getSum(a,b,c) {
//   return a+b+c;
// }
// const curry = (func) =>{
//   return function insideCurry(...args) {
//     if(args.length<func.length) {
//       return function() {
//         return insideCurry(...args,...Array.from(arguments));
//       }
//     } else {
//       return func(...args)
//     }
//   }
// }
// let test = curry(getSum)(1)(2)
// console.log(test)
// console.log(test(3))
