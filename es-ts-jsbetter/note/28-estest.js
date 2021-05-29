// es9 - es2018
const obj = {
  foo: 1,
  b: 2
}
console.log(Object.values(obj))
const mapObj = new Map(Object.entries(obj));
console.log(mapObj)
// Map(2) { 'foo' => 1, 'b' => 2 }
const entries = [ ['foo', 'bar'] ];// 有来有回
const object = Object.fromEntries(mapObj);
console.log(object)
// { foo: 'bar' }

// es8
// async await

console.log('fu'.padEnd(18,'-'),'ck'.padStart(4,'fu'));

// 使用 ?= 匹配一个字符串，该字符串后面跟着一个特定的子字符串：
console.log(/Roger(?= Waters)/.test('Roger is my dog')); // false
/Roger(?= Waters)/.test('Roger is my dog and Roger Waters is a famous musician'); // true

// ?! 执行逆操作，匹配一个字符串，该字符串后面没有一个特定的子字符串
/Roger(?! Waters)/.test('Roger is my dog'); //true
/Roger(?! Waters)/.test('Roger Waters is a famous musician'); //false

// 后行断言
/(?<=Roger) Waters/.test('Pink Waters is my dog'); //false
/(?<=Roger) Waters/.test('Roger is my dog and Roger Waters is a famous musician'); //true
// 逆操作
/(?<!Roger) Waters/.test('Pink Waters is my dog'); //false
/(?<!Roger) Waters/.test('Roger is my dog and Roger Waters is a famous musician'); //true

// es10
const string = ' Hello ES2019! ';
string.trimStart();
// 'Hello ES2019! '
string.trimEnd();
// ' Hello ES2019!'
[1, 2, [3, 4]].flat();
// [ 1, 2, 3, 4 ]
[1, 2, [3, 4, [5, 6]]].flat(2);
// [ 1, 2, 3, 4, 5, 6 ]
[1, 2, [3, 4]].flatMap(v => {
  if (typeof v === 'number') {
    return v * 2
  } else {
    return v.map(v => v * 2)
  }
})
// [2, 4, 6, 8]
const symbol = Symbol('This is a Symbol');
// Symbol(This is a Symbol)
console.log(Symbol.description);
// 'This is a Symbol'

// es11 
const regexp = RegExp('foo[a-z]*','g');
const str = 'table football, foosball';
const matches = str.matchAll(regexp);
for (const match of matches) { 
  console.log(match)
}

const big2 = BigInt(9007199254740991); // 9007199254740991n
const big3 = BigInt('9007199254740991'); // 9007199254740991n

typeof big2 // bigint

//只会左边的值严格等于null或undefined时才使用右边的值

'' || 'default' // default
'' ?? 'default' // ''
0 || 'defa' // defa
0 ?? 'defa' // defa

let data = {}
//使用?.
const name1 = data?.info?.name
//还可以与空值合并运算符搭配使用
const name2 = data?.info?.name ?? 'jack';

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];
// 返回一个在给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果
Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));
// es12
// 'Hello my estest'.replaceAll(/e/g, 't/t');
// c replaceAll时,searchValue如果是正则但是是非全局时(即没有加g关键字)，会引发异常，
// 该方法会返回第一个成功的 promise 。只要有一个 promise 成功此方法就会终止，它不会等待其他的 promise 全部完成。
// Promise.any