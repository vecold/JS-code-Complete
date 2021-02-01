/**
 * 1.promise 是一个类 在执行 这个类的时候， 需要传递一个执行器 执行器立即执行
 * 2。 Promis 三种状态 成功 fulfilled 失败 rejected 等待 pending
 *  pending -》fulfilled
 * pending -rejected
 *  一旦状态确定不可更改
 * 3. resolve 和 reject
 *  resoleve: Fulfilled
 *  reject: rejected
 * 4.then 判断成功失败状态，执行函数，被定义在原型对象中
 * 5.then 成功回调又一个参数 成功传递值 失败传递原因
 * 6. then 处理异步数据
 * 7. then 方法可以被多次调用，而且可以链式调用，链式调用要返回promise
 * 8. then return 的值判断，如果是 promise 的话要执行以下
 * 9. then 返回的promise 不能 return 当前then 返回的 promise
 * 10. 当然 catch 肯定是要的
 */
const MyPromise = require('./mypromise')
const promise = new MyPromise((resolve,reject) => {
  // throw new Error('executor error');
  // resolve('成功');
  // setTimeout(()=>{
  //   resolve('成功');
  // },2000)
  reject('失败');
})

function other () {
  return new MyPromise((resolve,reject) => {
    resolve('other');
  })
}

// let p3 = promise
// .then()
// .then()
// .then(value=>{
//   console.log(value)
//   // throw new Error('executor error');
//   return 100;
// }, reason => {
//   console.log(reason)
//   return 200;
// }).then(value=>{
//   console.log(value)
// }, reason => {
//   console.log(reason.message)
// })

let p1 = new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(3);
  },1000)
})
let p2 = new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(4);
  },500)
})

// MyPromise.all([1,2,p1,p2,5]).then(value=>{
//   console.log(value)
// },(e)=>{
//   console.log(e)
// })

MyPromise.resolve(2).finally((value)=>{
  console.log(value);
  return p2;
},res=>{
  console.log(res)
}).then(value=>{
  console.log(value)
},res=>{
  console.log(res)
})