const ns = ['+','-','*','/',''];

var addOperators = function(num, target) {
    const nums = num.split('');
    const res = [];
    let srtRes = [];
    let tempNum;
    let str = nums.shift();
    tempNum = nums.shift();
    srtRes = getString(str,tempNum);
    let tempStringRs = [];
    // 暴力运算
    while (nums.length) {
        tempNum = nums.shift();
        tempStringRs = [];
        for(let i of srtRes) {
            tempStringRs = tempStringRs.concat(getString(i,tempNum))
        }
        srtRes = tempStringRs;
    }
    for(let i of srtRes) {
        if(eval(i) === target)
            res.push(i)
    }
    return res;
};

var getString = function(str,num) {
    let res = [];
    let newStr  = '';
    for(let i of ns) {
        if(str[str.length-1] == 0 && i === '') continue
        newStr = str;
        newStr += `${i}${num}`;
        res.push(newStr)
    }
    return res;
}
console.log(addOperators("3456237490",9191));
