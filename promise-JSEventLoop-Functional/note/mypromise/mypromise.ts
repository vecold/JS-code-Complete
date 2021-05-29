// @lzy im 是关键点哈， 复习懵逼你就 搜 @lzy im
// @lzy im .then 返回的是一个新的promise 如果你什么也不return 那么上一个值会传下去
const PENDINGTYPE = 'pending';// 等待
const FULFILLEDTYPE = 'fulfilled';//成功
const REJECTEDTYPE = 'rejected';//失败
class fakePromise {
  // 初始化一下状态
  status: string = PENDINGTYPE;
  //success 的价值
  value: any = undefined;
  reason: any = undefined;
  // 成功回调
  successCallback: any = [];
  failCallback: any = [];

  // 失败回调
  // 传入的是一个方法，具体执行看 promise 本身
  constructor (executor) {
    try {
      executor(this.resolve,this.reject);
    } catch(e) {
      this.reject(e)
    }
  }
  resolve = value => {
    // 将状态更改为成功
    if (this.status !== PENDINGTYPE) return;
    this.status = FULFILLEDTYPE;
    // 保存值
    this.value = value;
    // 是否存在成功回调
    // this.successCallback && this.successCallback(this.value);
    while(this.successCallback.length) this.successCallback.shift()();
  }
  reject = reason => {
    // 将状态更改为失败
    if (this.status !== PENDINGTYPE) return;
    this.status = REJECTEDTYPE;
    // 保存失败原因
    this.reason = reason;
     // 是否存在失败回调
    while(this.failCallback.length) this.failCallback.shift()();
  }
  //直接获取值 @1
  //链式调用 @2
  // then 中return promise 对象或者值 都可以被下一个then 接收 @3
  // 异步等待状态 @4
  // @lzy im 执行完了之后。then 直接执行传入的函数 没执行就等着
  then (successCallback,failCallback) {
    // 执行器 直接执行
    // 实现链式调用
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason };
    // @2
    // @lzy im 返回这个 tempPromise 是为了 then的链式调用
    let tempPromise = new fakePromise((resolve, reject)=> {
      if (this.status === FULFILLEDTYPE) {
        // @lzy im 变成异步代码，为了获得 tempPromise
        setTimeout(()=>{
          // 将错误抛出给下一个then
          try {
            // 接收 then 传入 的 成功方法 ，看看返回的是啥
            let res = successCallback(this.value);  // @ 1 直接调用了方法 @lzy im 此处已经执行了 resolve接收到的值了 @im1
            // 将获取的值给这个promise存下来，再次调用then的时候传
            // 如果是 promise 对象 要根据promise的返回的值决定  成功 resolve 失败 reject
            // resolve(res);
            // @3
            // @lzy im 处理一下值方便链式调用 // 为什么我要传新的promise 的 resolve 因为我要改值
            this.resolvePromise(tempPromise,res, resolve, reject);// 实现处理return 为 promise
          }catch(e){
            reject(e);
          }
        },0);
      } else if(this.status === REJECTEDTYPE) {
        setTimeout(()=>{
          // 将错误抛出给下一个then
          try {
            let res = failCallback(this.reason);
            // 将获取的值给这个promise存下来，再次调用then的时候传
            // 如果是 promise 对象 要根据promise的返回的值决定  成功 resolve 失败 reject
            // resolve(res);
            this.resolvePromise(tempPromise,res, resolve, reject);// 实现处理return 为 promise
          }catch(e){
            reject(e);
          }
        },0);
      } else {
        // 等待状态
        // 将回调函数存下来
        // @4
        this.successCallback.push(()=>{
          setTimeout(()=>{
            // 将错误抛出给下一个then
            try {
              let res = successCallback(this.value);
              // 将获取的值给这个promise存下来，再次调用then的时候传
              // 如果是 promise 对象 要根据promise的返回的值决定  成功 resolve 失败 reject
              // resolve(res);
              this.resolvePromise(tempPromise,res, resolve, reject);// 实现处理return 为 promise
            }catch(e){
              reject(e);
            }
          },0);
        });
        this.failCallback.push(()=>{
          setTimeout(()=>{
            // 将错误抛出给下一个then
            try {
              let res = failCallback(this.reason);
              // 将获取的值给这个promise存下来，再次调用then的时候传
              // 如果是 promise 对象 要根据promise的返回的值决定  成功 resolve 失败 reject
              // resolve(res);
              this.resolvePromise(tempPromise,res, resolve, reject);// 实现处理return 为 promise
            }catch(e){
              reject(e);
            }
          },0);
        });
      }
    });
    return tempPromise;
  }

  
  resolvePromise(tempPromise,res,resolve, reject) {
    // 为什么报错? 又一个神奇的写法，循环调用 自己调用自己
    /**
     *  var p1 = new Promise((resolve,reject)=>{
     *    resolve(1)
        }).then(()=>{
          return p1
        })
     */
    
    if (tempPromise === res) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    
    if(res instanceof fakePromise) {
      // promise 对象  // 为什么可以直接then？then为了查看promise 的状态，获取值并且传递，成功走resolve 失败走reject
      // @im lzy 这里的resolve是then创建的新的promise 传过来的resolve ，这时候新的promise还没resolve，直接调用改变值接下去给下一个then就好了
      res.then(resolve,reject)// 直接把 传进来的resolve和reject 执行并返回值 因为then中可以调用成功与失败回调，所以可以简化写成这样
    } else {
      // 普通值 // @lzy im 下一个then的时候就直接拿这个值用啦 参见 @im1 处
      resolve(res);
    }
  }

  catch(failCallback) {
    return this.then(undefined,failCallback);// 利用状态直接获取错误
  }

  static all (array) {
    let result = [];
    let index = 0;
    // 一个失败整个失败
    return new fakePromise((resolve, reject)=>{
      function addData(key,value) {
        result[key] = value;
        index++;
        if(index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i< array.length; i++) {
        let current = array[i];
        //把所有的promise都执行一遍
        if (current instanceof fakePromise) {
          current.then(value=>{
            addData(i,value)
          },(reason)=>{
            reject(reason)
          })
        } else {
          addData(i,current)
        }
      }
    })
  }
  // 这个是干嘛的 用来给finally用的， 还有 promise.resolve
  static resolve (value) {
    if (value instanceof fakePromise) return value;
    return new fakePromise(resolve=> resolve(value));
  }
  finally (callback) {
    // 获取这个执行后的值
    // @im lzy 灵巧的运用 了 then 把方法执行了 还返回了 then链式
    return this.then(value => {
      //获取执行的值， 然后 传递
      // return fakePromise.resolve(callback());
      // 注意点1 finally 什么值都不会来 2 return的promise 和   值 都不会进入下一个then，只会拿到初始的 结果
      // 这么写为了等待callback执行完成，你又返回个 promise呢？ 转成promise 等待执行，用then查看状态，改了这个value 传给下一个then 所以直接 fakePromise.resolve(callback()).then()也行
      // 从这里就是一个promise了 然后在then中把这个promise执行掉，resolve掉 完美
      return fakePromise.resolve(callback());
    }, resaon => {
      // return fakePromise.resolve(callback());
      return fakePromise.resolve(callback()).then(()=>{throw resaon},rea=> {throw rea});
    });
  }
}
module.exports = fakePromise;

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
 const promise = new fakePromise((resolve,reject) => {
   // throw new Error('executor error');
   // resolve('成功');
   // setTimeout(()=>{
   //   resolve('成功');
   // },2000)
   reject('失败');
 })
 
 function other () {
   return new fakePromise((resolve,reject) => {
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
 
 let p1 = new fakePromise((resolve,reject)=>{
   setTimeout(()=>{
     resolve(3);
   },1000)
 })
 let p2 = new fakePromise((resolve,reject)=>{
   setTimeout(()=>{
     resolve(4);
   },3000)
 })
 
 // MyPromise.all([1,2,p1,p2,5]).then(value=>{
 //   console.log(value)
 // },(e)=>{
 //   console.log(e)
 // })
 
 fakePromise.resolve(2).finally((value)=>{
   console.log(value);
   return p2;
 }).then(value=>{
   console.log(value)
 },res=>{
   console.log(res)
 })