let a=[]
for(let i=1;i<=54;i++){
    a.push(i)
};

function FYShuffle(nums) {
    let len = nums.length;
    let temp = null;
    while(len>1) {
        let rand = Math.floor(Math.random() * len);
        len--;
        temp = nums[rand];
        nums[rand] = nums[len];
        nums[len] = temp
    }
    return nums;
}

console.log(FYShuffle(a))


// 鸽子洗牌法
const RShuffle = function (arr) {

    let radomNums = nums.slice(0);
    for(let i = 0;i < 7;i++){
        let randIndex = Math.floor(Math.random() * 54);
        let arr1 = radomNums.slice(0,randIndex)
        let arr2 = radomNums.slice(randIndex,55)
        radomNums = aryJoinAry(arr1 ,arr2)
    }
    return radomNums;
}

function aryJoinAry (arr1,arr2) {
    const len1 = arr1.length;
    const len2 = arr2.length;
    const minLength = Math.min(len1,len2);
    const longArr = len2 === minLength ? arr1 : arr2;
    let arr = new Array();
    for(let i=0;i<minLength;i++) {
        arr.push(arr1[i])
        arr.push(arr2[i])
    }
    return arr.concat(longArr.slice(minLength));
}