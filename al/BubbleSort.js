/**
 * 冒泡排序
 * 计算机科学领域的较简单的排序算法。
 */
let a = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1];
// function bubbleSort(arr) {
//     const len = arr.length;
//     let temp = null;
//     let flag = 1;
//     // 外层循环i控制比较的轮数
//     for (let i = 0; i < len-1 && flag === 1; i++) {
//         flag = 0;
//         // 里层循环控制每一轮比较的次数j，arr[i] 只用跟其余的len - i个元素比较
//         for (let j = 1; j < len - i; j++) {
//             // 若前一个元素"大于"后一个元素，则两者交换位置
//             if (arr[j - 1] > arr[j]) {
//                 temp = arr[j];
//                 arr[j] = arr[j - 1];
//                 arr[j - 1] = temp;
//                 // 每一轮有交换发生才继续比较
//                 flag = 1;
//             }
//         }
//     }
//     return arr
// }


function bubbleSort(array) {
    const len = array.length;
    let temp = null;
    let flag = true;
    for(let i=0;i<len && flag;i++) {
        flag = false;
        for(let j=0; j< len-1; j++) {
            if(array[j]>array[j+1]) {
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                flag = true;
            }
        }
    }
    return array;
}

console.log(bubbleSort(a));