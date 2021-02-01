//if else 将两个函子合并为一个新的function 为 either  照样能继续用map
class Left {
  private _value: any;
  static of(value) {
    return new Left(value);
  }
  constructor (value) {
    this._value = value;
  }
  map(fn) {
    return this;
  }
}

class Right {
  private _value: any;
  static of(value) {
    return new Right(value);
  }
  constructor (value) {
    this._value = value;
  }
  map(fn) {
    return  Right.of(fn(this._value))
  }
}

function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str))
  } catch(e) {
    return Left.of({error:e.message})
  }
}

let test = parseJSON('{"name": "lzy" }').map(x=>x.name.toUpperCase())
console.log(test)