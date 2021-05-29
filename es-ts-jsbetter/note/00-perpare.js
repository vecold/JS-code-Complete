console.log('准备工作')
// let block

// for(var i = 0;i<3;i++){
//   for(var i = 0;i<3;i++){
//     console.log(i);
//   }
//   console.log('finish',i);
// }

// for(var i = 0;i<3;i++){
//   for(let i = 0;i<3;i++){
//     console.log(i);
//   }
//   console.log('finish',i);
// }

// function test (a,b,c) {
//   return a+b+c;
// }

// const curry=(fuc) => {
//   return function insideCurry(...args) {
//     if(args.length < fuc.length) {
//       return function() {
//         return insideCurry(...args,...Array.from(arguments));
//       }
//     } else {
//       return fuc(...args);
//     }
//   }
// }

// let y = curry(test)(1);
// console.log(y);
// console.log(y(2)(3));

// const message = "Error: foo is not defined.";

// console.log(message.startsWith('Error'))

// 普通函数中 this 指向调用这个函数的类
// 箭头函数指向调用方法 的作用域


// const a = {an:1,ba:2,a:123};
// const target = {
//   a:123,
//   c: 456
// }
// const result =  Object.assign(target,a,{o:3});
// console.log(target)
// // 后面覆盖前面

// console.log(Object.is(1,'1'))

const person = {
  name: 'zce',
  age: 20
}
//  Proxy为了监视对象和数组
// const personProxy = new Proxy(person, {
//   get (target, property) {
//     return property in target ? target[property] : undefined;
//     // console.log(target, property);
//     // return 100;
//   },
//   set (target, property, value) {
//     if(property==='age') {
//       if(!Number.isInteger(value)) {
//         throw new TypeError(`${value} is not an int`)
//       }
//     }
//     target[property] = value;
//     console.log(target, property, value);
//   },
//   deleteProperty(target, property) {
//     console.log('delete', property);
//     delete target[property];
//   }
// });
// personProxy.age = 100
// personProxy.genter = true
// delete personProxy.age;
// console.log(personProxy);

// const list = [];
// const listProxy = new Proxy(list, {
//   set (target, property, value) {
//     console.log(target, property, value);
//     target[property] = value;
//     return true;
//   },
// })
// listProxy.push(100)

const obj = {
  foo: 123,
  bar: 456
}

const proxy = new Proxy(obj, {
  get (target, property) {
    console.log('watch logic!')
    return Reflect.get(target, property);
  }
})
console.log(proxy.foo)

Reflect.has(obj,'name')
console.log(Reflect.ownKeys(obj))