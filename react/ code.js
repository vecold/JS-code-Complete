// 你还记得科里化吗

function getSum (a,b,c) {
    return a+b+c;
}
const curry = (fuc) => {
    return function insideCurry(...arg) {
        if(arg.length < fuc.length) {
            return function () {
                return insideCurry(...arg,...Array.from(arguments));
            }
        } else {
            return fuc(...arg)
        }
    }
}
const t = curry(getSum)(1)
console.log(t)
console.log(t(2)(9))

