
const _ = require('lodash');
// function fliter (array,fn) {
//   let result = [];
//   for(let i = 0; i< array.length;i++) {
//     if(fn(array[i])) {
//       result.push(array[i]);
//     }
//   }
//   return result;
// }
// let arr = [1,2,3,4,5,6];
// let r = fliter(arr,(item)=>{
//   return item % 2 ===0;
// })
// console.log(r)
// function makeFn(){
//   let msg = "Hello World";
//   return function () {
//     console.log(msg);
//   }
// }
// // const fn = makeFn()
// makeFn()()

// //once 防抖
// function once (fn,delay=300){
//   let fun;
//   return function () {
//     clearTimeout(fun);
//     fun = setTimeout(()=>{fn.apply(this,arguments);},delay)
//   }
// }
//节流 在一定时间内只执行一次，像子弹
//时间戳流派 
// function throttle (fn,delay){
//   let pre;
//   return function (any) {
//     let start = new Date();
//     if (!pre || start.getTime() - pre.getTime() > delay ) {
//       fn.apply(this,arguments)
//       pre = new Date();;
//     }

//   }
// }
// function throttle (fn,delay=300){
//   let timer;
//   return function (any) {
//     if (!timer) {
//       let that = this;
//       let args = arguments;
//       timer = setTimeout(() => {
//         fn.apply(that,args);
//         timer=null;
//       }, delay);
//     }
//   }
// }
// let pay: any = throttle((s)=>{console.log(s)},300);
// let pay = once(()=>{console.log('hello')},300);

// pay(1)
// pay(2)
// pay(3)
// pay(4)
// pay(5)
// pay(6)

// const map = (array,fn) => {
//   let result = [];
//   for(let value of array) {
//     result.push(fn(value))
//   }
//   return result;
// }

// const every = (array,fn) => {
//   let result = true;
//   for(let value of array) {
//     result = fn(value)
//     if(!result) {
//       break;
//     }
//   }
//   return result;
// }
// let arr = [10,12,12,14];
// let r = every(arr,v=>v>10);
// console.log(r)
// const some = (array,fn) => {
//   let result = false;
//   for(let value of array) {
//     result = fn(value)
//     if(result) {
//       break;
//     }
//   }
//   return result;
// }
// let arr = [10,1,2,14];
// let r = some(arr,v=>v>10);
// // console.log(r)
// function makePower(power) {
//   return function (number) {
//     return Math.pow(number,power)
//   }
// }
// let a = makePower(2);
// console.log(a(3))

// function makeSalary(base) {
//   return function (performance) {
//     return base + performance;
//   }
// }
// let salaryLevel1 = makeSalary(12000);
// let salaryLevel2 = makeSalary(15000);
// console.log(salaryLevel1(2000));
// console.log(salaryLevel2(3000));
// console.log(salaryLevel2(4000));
// let arr = [10,1,2,14];

// function getSum(n1,n2) {
//   return n1 + n2;
// }
// console.log(getSum(1,2))
// console.log(getSum(1,2))
// console.log(getSum(1,2))
// console.log(getSum(1,2))
// const _ = require('lodash');
// import _ from 'lodash';
// const array = ['jack','kate','gay','bear'];
// console.log(_.first(array));
// console.log(_.last(array));
// console.log(_.toUpper(array));

// let r = _.each(array,(item,index)=>{
//   console.log(item,index)
// })
// console.log(r)
// console.log(array.includes('kate'))
// console.log(array.findIndex((item)=> item==='kate'))
// console.log(array.findIndex('kate'))

// Function.prototype.mycall = function (context,...rest) {
//   context.fun = this;
//   const r = context.fun(...rest);
//   delete context.fun;
//   return r;
// }
//临时挂载的fun属性可能跟原对象属性冲突，用symbol好些
//不用call apply 实现bind

// function getArea(r) {
//   console.log(r)
//   return Math.PI * r * r;
// }
// let getAreaWithMemery =  _.memoize(getArea);
// console.log(getAreaWithMemery(4));
// console.log(getAreaWithMemery(4));
// console.log(getAreaWithMemery(4));
// console.log(getAreaWithMemery(4));

// function memoize (f) {
//   let cache = {};
//   return function (any) {
//     let key = JSON.stringify(arguments);
//     cache[key] = cache[key] || f.apply(f,arguments);
//     return cache[key];
//   };
// }
// let getAreaWithMemery =  memoize(getArea);
// console.log(getAreaWithMemery(4));
// console.log(getAreaWithMemery(4));
// console.log(getAreaWithMemery(4));
// console.log(getAreaWithMemery(4));
//纯函数 可测试 因为就关注输入输出本身
//不需要访问共享环境，可以并行

// let checkoutAge = min => (age => age >= min);
// let checkoutAge18 = checkoutAge(18);
// let checkoutAge20 = checkoutAge(20);
// //解决18重复的问题
// console.log(checkoutAge18(20));
// console.log(checkoutAge18(19));
let getsum  = (a,b,c)=>{
  return a+b+c;
}
// const curried = _.curry(getsum);
// var curry = function (fn) {
//   let length = fn.length;
//   let fuc = fn;
//   console.log(fuc);
//   let newFuc = function (any) {
//     console.log(arguments);
//     if(arguments.length < length) {
//       return newFuc.bind(null,...arguments);
//     } else {
//       return fuc(...arguments);
//     }
//   }
//   return newFuc;
// }
// function magician(targetfn) {
//   var numOfArgs = targetfn.length;
//   return function fn(any) {
//     if (arguments.length < numOfArgs) {
//       return fn.bind(null, ...arguments);
//     } else {
//       return targetfn(...arguments);
//     }
//   }
// }
//第一步
// function magician (targetfn) {
//   var numOfArgs = targetfn.length;
//   if (arguments.length - 1 < numOfArgs) {
//     return magician.bind(null, ...arguments);
//   } else {
//     return targetfn.apply(null, Array.prototype.slice.call(arguments, 1));//lzyimportant
//   }
// }
//第二步
// const curried = curry(getsum);
//最后一步 带预站位的curry

// var _ = '_';
// function magician3 (targetfn, ...preset) {
//   var numOfArgs = targetfn.length;
//   var nextPos = 0; // 下一个有效输入位置的索引，可以是'_'，也可以是preset的结尾

//   // 查看是否有足够的有效参数
//   if (preset.filter(arg=> arg !== _).length === numOfArgs) {
//     return targetfn.apply(null, preset);
//   } else {
//     // 返回'helper'函数
//     return function (...added) {
//       // 循环并将added参数添加到preset参数
//       while(added.length > 0) {
//         var a = added.shift();
//         // 获取下一个占位符的位置，可以是'_'也可以是preset的末尾
//         while (preset[nextPos] !== _ && nextPos < preset.length) {
//           nextPos++
//         }
//         // 更新preset
//         preset[nextPos] = a;
//         nextPos++;
//       }
//       // 绑定更新后的preset
//       return magician3.call(null, targetfn, ...preset);
//     }
//   }
// }
// function curry(targetfn,...preset) {
//   //定义占位符
//   let sy = '_';
//   let numOfArgs = targetfn.length;
//   let nextPos = 0; // 下一个有效输入位置的索引，可以是'_'，也可以是preset的结尾
//   // 查看是否有足够的有效参数
//   if (preset.filter(arg=> arg !== sy).length === numOfArgs) {
//     return targetfn.apply(null, preset);
//   } else {
//     // 返回'helper'函数
//     return function (...added) {
//       // 循环并将added参数添加到preset参数
//       while(added.length > 0) {
//         let a = added.shift();
//         // 获取下一个占位符的位置，可以是'_'也可以是preset的末尾
//         while (preset[nextPos] !== sy && nextPos < preset.length) {
//           nextPos++
//         }
//         // 更新preset
//         preset[nextPos] = a;
//         nextPos++;
//       }
//       // 绑定更新后的preset
//       return curry.call(null, targetfn, ...preset);
//     }
//   }
// }
// const curried = curry(getsum);
// let res = curried(1)('_',3)(4);
// console.log(res);
// const match =_.curry(function(reg,str){
//   return str.match(reg);
// })
// const haveSpace = match(/\s+/g);
// const haveNumber = match(/\d+/g);
// // console.log(haveSpace('helloworld'));
// // console.log(haveNumber('hello123'));

// const filterArray = _.curry(function (fuc,array) {
//   return array.filter(fuc);
// });

// console.log(filterArray(haveSpace,['hello world','helloworl d']))
// let arrt = [1,2,3,4];
// let ss = function(a) {
//   console.log(a);
// }
// arrt.filter(ss)
// function getSum (a,b,c) {
//   return a+b+c;
// }
// function yescurry(func) {
//   return function curriedFn(...args) {
//     if(func.length> args.length) {
//       return function () {//这个算法的关键在这只有返回function 才能继续传数值
//         return curriedFn(...args.concat(Array.from(arguments)))
//       }
//     }
//     return func(...args);
//   }
// }
// const yescurry2 = (func) => {
//   return function curriedFn(...args) {
//     if(func.length> args.length) {
//       () => {
//         return curriedFn(...args.concat(Array.from(arguments)))
//       }
//     }
//     return func(...args);
//   }
// }
// console.log(yescurry(getSum)(1)(2)(3))
//组合函数
// function compose (...args) {
//   return function(acc) {
//     return args.reverse().reduce(function (acc,fn){
//       return fn(acc)
//     },value) 
//   }
// }

console.log('AAA')
async function  testBB() {
  let str = await testAA("FFF");
  console.log(str);
}
console.log('CCC');
testBB()
console.log('HHH');
setTimeout(() => {
  console.log('KKK')
}, 100);
setTimeout(() => {
  console.log('III')
}, 0);
function testAA(str) {
  console.log(str);
  console.log('BB');
  return new Promise((resolve=>{
    console.log('DDD');
    setTimeout(() => {
      console.log('JJJ')
    }, 0);
    resolve('EEE')
  }))
}
console.log('GGG')


// setTimeout(function(){
//   console.log('定时器开始啦')
// });

// new Promise(function(resolve){
//   console.log('马上执行for循环啦');
//   for(var i = 0; i < 10000; i++){
//       i == 99 && resolve();
//   }
// }).then(function(){
//   console.log('执行then函数啦')
// });

// console.log('代码执行结束');
