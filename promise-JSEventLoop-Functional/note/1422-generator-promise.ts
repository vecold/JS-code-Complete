function av(){
  return new Promise((resolve,reject)=>{
    resolve('hello world');
  })
}
function av2(){
  return 'hello';
}
function * main() {
  try{
    const users = yield av();//暂停数据给出去2
    console.log(users)//拿到最终数据4
    const users2 = yield av2();//暂停数据给出去2
    console.log(users2)//拿到最终数据4
  } catch (e) {
    console.log(' i know');
  }
  
}
//自动执行生成器函数
function co (generator) {
  const g = generator();
  //返回的都是promise
  function hanleResult(result) {
    if (result.done) return;
    result.value.then(data=>{
      hanleResult(g.next(data))
    }).catch(error=>{
      g.throw(error)
    })
  }
  //这样能将generator 迭代器函数全部执行完毕
  hanleResult(g.next());
}
co(main);

//在2018年时候非常火现在async 和 await 替代了他