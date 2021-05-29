// 迭代器设计模式
const todos = {
  life: ['eat','sleep'],
  learn: ['chinese','english','math'],
  work: ['react'],

  // each: function (callback) {
  //   const all = [].concat(this.life,this.learn,this.work);
  //   all.forEach(item=>callback(item))
  // },// 适用于当前
  // 对外提供统一迭代接口
  [Symbol.iterator]: function * () {
    let all = [...this.life,...this.learn,...this.work];
    for (const item of all ) {
      yield item;
    }
    // let index = 0;
    // return {
    //   next: function () {
    //     return {
    //       value: all[index],
    //       done: index++ >= all.length
    //     }
    //   }
    // }
  }
}
for (let i of todos) {
  console.log(i)
  
}
