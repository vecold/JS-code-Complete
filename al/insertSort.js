/**
 * 插入排序法
 */
let a = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1];
// function insertSort(arr) {
//     let len = arr.length;
//     let j = null;
//     let temp = null;
//     for(let i= 1;i<len;i++) {
//         j = i - 1;
//         temp = arr[i];
//         while(j>=0 && temp < arr[j]) {
//             arr[j+1] = arr[j];
//             j--;
//         }
//         arr[j+1] = temp;
//     }
//     return arr;
// }

//来吧脱手空写

function insertSort(arr) {
    let temp = null;
    let j = null;
    const len = arr.length;
    for(let i = 1; i< len;i++) {
        temp = arr[i];
        j = i - 1;
        while(j>=0 && temp < arr[j]) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = temp;
    }
    return arr;
}

console.log(insertSort(a))