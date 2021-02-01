const fp = require('lodash')

const f = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '));//函数优先数据之后

console.log(f('NEVER GO WHERE'))