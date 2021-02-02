const fp3 = require('lodash/fp');

class CodeContainer {
  private _value: any;

  static of(value) {
    return new CodeContainer(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return CodeContainer.of(fn(this._value));
  }

}

class CodeMaybe {
  private _value: any;
  static of(x) {
    return new CodeMaybe(x);
  }

  isNothing() {
    return this._value === null || this._value === undefined;
  }

  constructor(x) {
    this._value = x;
  }

  map(fn) {
    return this.isNothing() ? this : CodeMaybe.of(fn(this._value));
  }
}

let maybe = CodeMaybe.of([5,6,11]);
console.log(maybe);
let ex1 = () =>{
  return fp3.flowRight(fp3.map(fp3.add(1)));
}
maybe = maybe.map(ex1());
console.log(maybe);

let xs = CodeContainer.of(['do','ray','me','fa','so','la','ti','do']);
//能够使用fp.first 获取列表的第一个元素
let ex2 = (_value) => {
  if(_value && _value instanceof Array) {
    return fp3.first(_value);
  } else {
    return null;
  }
}
xs = xs.map(ex2);
console.log(xs);

let safeProp = fp3.curry(function(x,o) {
  return CodeMaybe.of(o[x]);
});
let user = { id:2,name: 'Albert' };
let ex3 = (user) => {
  let xs3 = safeProp('name',user);
  xs3 = xs3.map(fp3.first);
  return xs3;
}
console.log(ex3(user));

let ex4before = function (n) {
  if(n) {
    return parseInt(n)
  }
}

let ex4 = function(n) {
  let fuc4 = CodeMaybe.of(n);
  fuc4 = fuc4.map(parseInt);
  return fuc4;
}
console.log(ex4(4))