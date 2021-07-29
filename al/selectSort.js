/**
 *  选择排序法
 * @param {*} arr 
 */
let a = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1];
// function selectSort(arr) {
//     const len = arr.length;
//     let temp = null;
//     let minIndex = null;
//     // 首先遍历一遍
//     for(let i = 0;i<len;i++) {
//         // 保存下当前的值
//         temp = arr[i];
//         minIndex = i;
//         for(let j = i+1;j< len;j++) {
//             // 往下遍历看看有没有比自己小的
//             if(arr[minIndex]>arr[j]) {
//                 // 有记录下 index
//                 minIndex = j;
//             }
//         }
//         arr[i] = arr[minIndex];
//         arr[minIndex] = temp;
//     }
//     return arr;
// }

function selectSort(array) {
    const len = array.length;
    let temp = null;
    let minIndex = null;
    for(let i = 0; i< len;i++) {
        temp = array[i];
        minIndex = i;
        for(let j=i+1;j<len;j++) {
            if(array[minIndex]>array[j]) {
                minIndex = j;
            }
        }
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array;
}

console.log(selectSort(a));