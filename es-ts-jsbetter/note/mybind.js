Function.prototype.mybind = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }// 如果调用bind的不是函数直接报错

    var self = this;
    var args = Array.from(arguments).slice(1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);// 获取参数
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
      	// 如果是new 出来的 话 this 应该 指向fBound 其他情况直接调用的就用之前的this就好了
      	// 这里 fNOP 是一层中转
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    // 我们直接修改 fNOP.prototype 的时候，也会直接修改绑定函数的 prototype。
  	// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    return fBound;
}



Function.prototype.mybind2= function(context){
    if(typeof this !== 'function') {
        throw new Error('not a function');
    }
    let args = Array.from(arguments).slice(1);
    let self = this;
    let fBound =  function () {
        let newArgs = Array.from(arguments);
        return self.apply(this instanceof fBound ? this : context,args.concat(newArgs));
        // new的 话 this 指向自己，抛弃之前制定的 上下文
    }
    fBound.prototype = this.prototype;
    return fBound;
}
var curry = (fuc,...args) => fuc.length === args.length ? fuc(...args) : (...newArgs)=>curry(fuc,...args,...newArgs)
let getsum = (a,b,c) => a+b+c;
let test = curry(getsum);
console.log(test(1)(2)(3))
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
    console.log(this.friend);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.mybind(foo, 'daisy');
var obj = new bindFoo('18');

console.log(obj.habit);
console.log(obj.friend);