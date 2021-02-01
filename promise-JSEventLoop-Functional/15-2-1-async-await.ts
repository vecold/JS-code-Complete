function av(){
  return new Promise((resolve,reject)=>{
    console.log('before load')
    resolve('hello world');
  })
}
function av2(){
  console.log('before me')
  return 'metoo'
}
async function main() {
  const users = await av();
  console.log(users);
  const users2 = await av2();
  console.log(users2);
  return 'I am a ';
}
const prom = main();
console.log('fuck you');
//await 只能在 async函数中 ,await 可以直接接收到 promise resolve 后的结果
prom.then((data)=>{
  console.log(data)
})