/**
 * 快速排序 也叫归并排序
 */
// let a = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1];
// // 此版本的快速排序每一次递归调用，需要额外空间，复杂度为O(n)，不是本地排序。说起空间复杂度，递归也需要空间（相当于手动维护一个调用栈），因此总体空间复杂度是O(nlogn)。相等元素是不会交换前后顺序，因而是稳定排序（这与我们选择最后一个元素为分界点有关）。时间复杂度为O(nlogn)。
// function quickSort(array) {
//     if (array.length < 2) return array
//     let pivot = array[array.length - 1]
//     let left = array.filter((v, i) => v <= pivot && i != array.length -1)
//     let right = array.filter(v => v > pivot)
//     return [...quickSort(left), pivot, ...quickSort(right)]
// }

// console.log(quickSort(a));

let a = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1];
// let a = [1,2,3,4,5,6,7];
// function partition(arr, start,end) {
//     let j = start;
//     let value = arr[end];
//     // 将比选中元素小的放左边，选中元素高的放右边的关键实现方法
//     for(let i = start; i<= end;i++) {
//         if(arr[i] <= value) {
//             [arr[i], arr[j]] = [arr[j], arr[i]]
//             j++;
//         }
//     }
//     return j-1;
// }
// function quickSort(array, start = 0, end = array.length -1) {
//     // 有个神奇的地方 在当数组作为形参传入 
//     if (end - start < 1) return array
//     let pivotIndex = partition(array, start, end)
//     quickSort(array, start, pivotIndex - 1)
//     quickSort(array, pivotIndex + 1, end)
//     return array
// }
// function partition(array,start,end) {
//     let temp = array[end];
//     let j = start;
//     for(let i = start;i<=end;i++) {
//         if(array[i]<=temp) {
//             [array[i],array[j]] = [array[j],array[i]]
//             j++;
//         }
//     }
//     return j-1;
// }
function quickSort(array,start=0,end=array.length-1) {
    if(end-start<1) return array;
    let index = partition(array,start,end);
    quickSort(array,start,index-1);
    quickSort(array,index+1,end);
    return array;
}
console.log(quickSort(a))

function partition(array,start,end) {
    let j = start;
    // 首先一定要有一个比较值
    const temp= array[end];
    for(let i = start;i<=end;i++) {
        if(array[i]<=temp) {
            [array[j],array[i]] = [array[i],array[j]]
            j++;
        }
    }
    return j-1;
}