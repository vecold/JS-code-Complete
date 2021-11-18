/**
 * 峰值元素是指其值严格大于左右相邻值的元素。
给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
你可以假设 nums[-1] = nums[n] = -∞ 。
你必须实现时间复杂度为 O(log n) 的算法来解决此问题。
 */

function partition(arr,start,end) {
    let cur = start;
    let com = arr[end];
    for(let i = start;i<=end; i++) {
        if(arr[i]<=com) {
            [arr[i],arr[cur]] = [arr[cur],arr[i]];
            cur++;
        }
    }
    return --cur;
}
// 先写个快速排序吧
function quickSort(arr,start=0,end=arr.length-1) {
    if(end<=start) return arr;
    let index = partition(arr,start,end);
    quickSort(arr,start,index-1);
    quickSort(arr,index+1,end);
    return arr;
}
// console.log(quickSort([1,2,1,3,5,6,4]))
// 嗯 老夫的快排还是有点东西的 嘿嘿嘿

/**
 * 关键 条件 nums[-1] = nums[n] = -∞ , 然后 这就是一个 ⛰️山 状的数组，
 * 两侧都是负无穷，所以，一定有一个山顶，只要往上山的路走（两个数比较，大的那个数的一侧），就能找到峰值（有上山的路就有下山的路）
 */
var findPeakElement = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    let mid;
    while(left<right) {
        mid = left + Math.floor((right-left) / 2);
        if(nums[mid]> nums[mid+1]) {
            right = mid;
        } else {
            left = mid+1;
        }
    }
    return left;
};

var peakIndexInMountainArray = function(arr) {
    let index = 0;
    let end = arr.length - 1;
    let mid;
    while (index<end) {
        mid = index + Math.floor((end - index)/2);
        if(arr[mid] < arr[mid+1]) {
            index = mid + 1;
        } else {
            end = mid;
        }
    }
    return index;
}