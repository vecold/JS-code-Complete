const fp = require('lodash/fp');

// const f= fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower);

// console.log(f('Hello   World'))
//pointfree 的编程思想
//不需要指明处理的数据
//只需要合成运算过程
//需要定义一些辅助的基本运算函数
const log = (v)=>{
  console.log(v)
  return v;
}
const f = fp.flowRight(fp.join('. '),fp.map(fp.flowRight(fp.first,fp.toUpper)),fp.split(' '));
console.log(f('world wild web'));