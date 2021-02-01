const loadsh = require('lodash');
const fir = arr=>arr[0];
const sec =  arr => arr.reverse();;
const toU = s=> {
  s = s.map(item => {return item.toUpperCase()});
  return s;
};
// function compose (...args) {
//   return function(value) {
//     return args.reverse().reduce(function (acc,fn){
//       return fn(acc)
//     },value) 
//   }
// }

const coms2 = (...args) => value => args.reverse().reduce((acc,fn)=>fn(acc),value)
  

let f = coms2(fir,sec,toU);
// console.log(f([]))
console.log(f(['one','tow','three']));