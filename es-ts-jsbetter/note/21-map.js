// set 和 map 对应 array object 更准确了
// map 使用任意数据作为键 object 只能用 string
const obj = {
  store: [ 'foo', 'bar', 'baz' ],
  [Symbol.iterator] : function () {
    let index = 0;
    const self = this;
    // iterator 需要实现next
    return {
      next: function () {
        // iterationResult 迭代结果
        const result = {
          value: self.store[index],
          done: index >= self.store.length
        }
        index++;
        return result
      }
    }
  },
}
for(let i of obj) {
  console.log(i)
}