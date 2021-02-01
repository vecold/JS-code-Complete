// const lodash = require('lodash');
const fp = require('lodash/fp');
// fp中函数都实现了curry
// const parseIntV = (value,index,array)=>{
//   return parseInt(value);
// };
// console.log(lodash.map(['23','8','10'],parseIntV)); 一般 数据在前 函数在后
//map 会遍历 并且处理
console.log(fp.map(parseInt,['23','8','10']));//直接函数在前
