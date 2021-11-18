/**
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。
请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。
nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。
 */
/**
 * 这是一个单调栈的典型，用了一些巧妙的逻辑，使得每次新元素入栈后，栈内的元素都保持有序（单调递增或单调递减）
 * 分析它的时间复杂度，要从整体来看：总共有 n 个元素，每个元素都被 push 入栈了一次，而最多会被 pop 一次
 * ，没有任何冗余操作。所以总的计算规模是和元素规模 n 成正比的，也就是 O(n) 的复杂度。
 */
/**
 * 输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
    输出: [-1,3,-1]
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    const stack = [];
    const objMap = new WeakMap();
    let len = nums2.length;
    for(let i = len-1; i>=0;--i) {
        num = nums2[i];
        while(stack.length && num >= stack[stack.length - 1]) {
            stack.pop()
        }
        objMap.set(num,stack.length ? stack[stack.length - 1] : -1)
        stack.push(num);
    }
    const res = nums1.map((item,index)=> objMap.get(item));
    return res;
};

// 干 翻转链表别忘
var reverseLink = function (link) {
    let cur = null;
    let node = link;
    while(node) {
        let temp = node.next;
        node.next = cur;
        cur = node;
        node = temp;
    }
    return cur;
}

const reverseList = (head) => {
    let cur = null;
    let pre = head;
    while ( pre !== null ) {
      let t = pre.next;
      pre.next = cur;
      cur = pre;
      pre = t;
    }
    return cur;
  }