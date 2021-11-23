/**
 * 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。
实现 Solution class:
Solution(int[] nums) 使用整数数组 nums 初始化对象
int[] reset() 重设数组到它的初始状态并返回
int[] shuffle() 返回数组随机打乱后的结果
链接：https://leetcode-cn.com/problems/shuffle-an-array
 */
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.originArr = nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.originArr;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    let len = this.originArr.length;
    let temp = null;
    let newArr = this.originArr.slice(0);
    while(len>1) {
        let rand = Math.floor( Math.random() * len );
        len--;
        temp = newArr[len];
        newArr[len] = newArr[rand];
        newArr[rand] = temp;
    }
    return newArr;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */