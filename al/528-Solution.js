/**
 * @param {number[]} w
 * 给定一个正整数数组 w ，其中 w[i] 代表下标 i 的权重（下标从 0 开始），请写一个函数 pickIndex ，它可以随机地获取下标 i，选取下标 i 的概率与 w[i] 成正比。

例如，对于 w = [1, 3]，挑选下标 0 的概率为 1 / (1 + 3) = 0.25 （即，25%），而选取下标 1 的概率为 3 / (1 + 3) = 0.75（即，75%）。

也就是说，选取下标 i 的概率为 w[i] / sum(w) 。
 */
var Solution = function(w) {
    let tempNum = 0;
    // 重构出一个数组
    this.numArr = w.map(item=>{
        tempNum = tempNum + item;
        return tempNum;
    });
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    let len = this.numArr.length;
    let total = this.numArr[len - 1];
    let random = Math.random() * total;
    //加点二分 
    let low = 0, high = len - 1;
    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low;// 从最左侧开始计算中位数
        if (this.numArr[mid] < random) {
            low = mid + 1;// 中位数小了 取右边一半 加1就是取右边一半  1-50 51-100
        } else {
            high = mid;// 中位数大了 取左边一半
        }
    }
    return low;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */

var obj = new Solution([1])
var param_1 = obj.pickIndex()
console.log(param_1)