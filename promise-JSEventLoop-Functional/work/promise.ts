const PENDING = 'pending';// 等待
const FULFILLED = 'fulfilled';//成功
const REJECTED = 'rejected';//失败
class shadowPromise {
  // 初始化一下状态
  status: string = PENDING;
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
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    // 保存值
    this.value = value;
    // 是否存在成功回调
    // this.successCallback && this.successCallback(this.value);
    while(this.successCallback.length) this.successCallback.shift()();
  }
  reject = reason => {
    // 将状态更改为失败
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    // 保存失败原因
    this.reason = reason;
     // 是否存在失败回调
    while(this.failCallback.length) this.failCallback.shift()();
  }
  //直接获取值 @1
  //链式调用 @2
  // then 中return promise 对象或者值 都可以被下一个then 接收 @3
  // 异步等待状态 @4
  then (successCallback,failCallback) {
    // 执行器 直接执行
    // 实现链式调用
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason };
    // @2
    let tempPromise = new shadowPromise((resolve, reject)=> {
      if (this.status === FULFILLED) {
        // 变成异步代码，为了获得 tempPromise
        setTimeout(()=>{
          // 将错误抛出给下一个then
          try {
            // 接收 then 传入 的 成功方法 ，看看返回的是啥
            let res = successCallback(this.value);  // @ 1 直接调用了方法
            // 将获取的值给这个promise存下来，再次调用then的时候传
            // 如果是 promise 对象 要根据promise的返回的值决定  成功 resolve 失败 reject
            // resolve(res);
            // @3
            this.resolvePromise(tempPromise,res, resolve, reject);// 实现处理return 为 promise
          }catch(e){
            reject(e);
          }
        },0);
      } else if(this.status === REJECTED) {
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
    if (tempPromise === res) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    if(res instanceof shadowPromise) {
      // promise 对象
      res.then(resolve,reject)// 直接把 传进来的resolve和reject 执行并返回值 因为then中可以调用成功与失败回调，所以可以简化写成这样
    } else {
      // 普通值
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
    return new shadowPromise((resolve, reject)=>{
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
        if (current instanceof shadowPromise) {
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
  static resolve (value) {
    if (value instanceof shadowPromise) return value;
    return new shadowPromise(resolve=> resolve(value));
  }
  finally (callback) {
    // 获取这个执行后的值
    return this.then(value => {
      //获取执行的值， 然后 传递
      // return shadowPromise.resolve(callback());
      // 注意点1 finally 什么值都不会来 2 return的promise 和   值 都不会进入下一个then，只会拿到初始的 结果
      return shadowPromise.resolve(callback()).then((value)=>value,rea=> {throw rea});
    }, resaon => {
      // return shadowPromise.resolve(callback());
      return shadowPromise.resolve(callback()).then(()=>{throw resaon},rea=> {throw rea});
    });
  }
}
module.exports = shadowPromise;