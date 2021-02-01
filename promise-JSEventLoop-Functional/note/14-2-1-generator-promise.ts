function av(){
  return new Promise((resolve,reject)=>{
    resolve('hello world');
  })
}
function * main() {
  const users = yield av();//暂停数据给出去2
  
  console.log(users)//拿到最终数据4
}

const g = main();
const result = g.next();//开始执行 此处为1
console.log(result)
//获得promise

result.value.then(data=>{
  let c = g.next(data)//将数据继续执行下去3
  console.log(c)//done 表示代码已经结束
})