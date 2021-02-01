//promise 封装AJAX

// function ajax(url) {
//   return new Promise(function(resolve,reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET',url);
//     xhr.responseType = 'json';
//     xhr.onload = () => {
//       if(this.status === 200) {
//         resolve(this.response)
//       } else {
//         reject(new Error(this.statusText));
//       }
//     }
//     xhr.send();
//   })
// }
// ajax('http://baidu.com').then(res=>{
//   console.log(res)
// },error=>console.log(error))
// unhandledRejection//全局统一处理异常 并不推荐

//promise.race//只获取第一个完成的promise
//promise MutationObserver  node process.nextTcik 为微任务，在本轮末尾直接执行
//开心的每日curry

function getsum(a,b,c) {
  return a+b+c;
}

const curry = (fuc) => {
  return function insideCurry(...args) {//错误1没有解析
    if(fuc.length > args.length) {//错误2判断写错
      return function () {
        return insideCurry(...args,...Array.from(arguments))
      }
    } else {
      return fuc(...args);
    }
  }
}

let t = curry(getsum)(1)(2)
console.log(t)
console.log(t(3))