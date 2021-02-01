//避免看起来像是面向对象编程
//将值放入上下文context
class Pointed{
  public _value: any;
  static of(value) {
    return new Pointed(value);
  }
  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return Pointed.of(fn(this._value));
  }
}

//每天一遍curry

function getsum(a,b,c) {
  return a+b+c;
}

const curry = (func)=>{
  return function insideCurry (...args){
    if(args.length<func.length) {//错在这
      return function() {
        return insideCurry(...Array.from(arguments),...args)
      }
    } else {
      return func(...args)
    }
  }
}
let test = curry(getsum)(1);
console.log(test(2)(3))