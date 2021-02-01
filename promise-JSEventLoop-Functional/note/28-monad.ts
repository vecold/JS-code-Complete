const fp = require('lodash/fp');
const fs = require('fs')
// class IO {
//   public _value: any;
//   static of(value) {
//     if(Object.prototype.toString.call(value) === "[object Function]") {
//       return new IO(value);
//     } else {
//       return new IO(function() {
//         return value;
//       })
//     }
//   }
//   constructor (fn) {
//     this._value = fn;
//   }

//   map(fn) {
//     return new IO(fp.flowRight(fn,this._value))
//   }
// }


//异步操作不是纯函数，不会每次都是一致的结构，所以要用IO
// let readFile = function (filename) {
//   return IO.of(function() {
//     return fs.readFileSync(filename, 'utf-8');
//   });
// }

// let printLog = function (x) {
//   return IO.of(function () {
//     console.log(x);
//     return x;
//   })
// }

// let cat = fp.flowRight(printLog,readFile);
// let r = cat('package.json')._value()._value();
// console.log(r)
//以上为比较复杂的写法
//Monad 为 可变扁的Pointed函子， IO(IO(x)) 函子嵌套

class MonadIO {
  public _value: any;
  static of(value) {
    if(Object.prototype.toString.call(value) === "[object Function]") {
      return new MonadIO(value);
    } else {
      return new MonadIO(function() {
        return value;
      })
    }
  }
  constructor (fn) {
    this._value = fn;
  }

  map(fn) {
    return MonadIO.of(fp.flowRight(fn,this._value))
  }

  join() {
    return this._value(); 
  }

  flatMap(fn) {
    let step = this.map(fn);
    console.log('step')
    return step.join();
  }
}

let readFile2 = function (filename) {
  return MonadIO.of(function() {
    return fs.readFileSync(filename, 'utf-8');
  });
}

let printLog2 = function (x) {
  return MonadIO.of(function () {
    console.log(x);
    return x;
  })
}
let test2 = readFile2('package.json')//返回函子
              .flatMap(printLog2)//组合函数后返回函子 //因为参数返回的是函子所以可以继续当函子用
              .join()//然后执行
              // ._value()//这就回到老路了