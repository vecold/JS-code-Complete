/**
 * 找出给定范围的对称数   对称数  11 22 121 1111 1441
 * @param {*} start 
 * @param {*} end 
 * @returns 
 */
function getSymmetryNum (start, end) {
    var arr = [];
    for(let i = start; i< end; i++ ) {
        if(i.toString() === i.toString().split('').reverse().join('') && i > 10) {
            arr.push(i);
        }
    }
    return arr;
}
// console.log(getSymmetryNum(1,1000));

/**
 * 设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。
 * 输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]
 */
// 从小到大一排返回
// 
var smallestK = function(arr, k) {
    
};

function part(start,end,arr) {
    let j = start
    let val = arr[end];
    for(let i = start;i<=end;i++) {
        if(arr[i]<=val) {
            [arr[j],arr[i]] = [arr[i],arr[j]];
            j++
        }
    }
    return j-1;
}
//直接先来个快速排序
function sort (arr,start=0,end=arr.length-1){
    if(end <= start) return array;
    let position = part(start,end,arr);
    sort(arr,start,position-1);
    sort(arr,position+1,end);
    return array;
}
// 然后只要一直排最小的就好了，