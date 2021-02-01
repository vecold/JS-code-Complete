//may be 加了一个判断
class Maybe{
  // private _value:any;
  static of(value) {
    return new Maybe(value);
  }

  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing()? Maybe.of(null) : Maybe.of(fn(this._value));
  }
  
  isNothing() {
    return this._value === null || this._value === undefined;
  }
}

let r = Maybe.of('Hello world')
          .map(x=>x.toUpperCase())
          .map(x=> null)
          .map(x=>x.split('  '))
console.log(r)