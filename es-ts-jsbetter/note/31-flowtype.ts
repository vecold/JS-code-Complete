
var smallestDivisor = function(nums, threshold) {
    let right = Math.max(...nums);
    let left = 1;
    while( left < right ) {
      let mid = Math.floor((left + right)/2);
      if( nums.reduce((a,b)=>(a + Math.ceil(b/mid)),0) <= threshold) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
};
console.log(smallestDivisor([1,2,5,9],6))
// 二分法是一种思想，具体right left什么时候赋值要看具体条件

// 一定要小于mid 这个 中位数 完全相等会出现死循环