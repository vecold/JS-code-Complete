function av() {
  setTimeout(() => {
    return 'I am fuck coming';
  }, 3000);
}
function * foo() {
  console.log('start')

  const res = yield av();//向外返回值
  console.log(res);//然后可以接收传参wow！
  yield 'here';
}


const generator = foo();//不会立即执行
const result = generator.next();//开始执行
console.log(result);

generator.next();//继续执行
// generator.next('bar');//继续在yield处往下执行我擦！！！神奇
// generator.throw(new Error('Generator error'));//在yield处继续执行？