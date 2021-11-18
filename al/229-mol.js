/**
 * 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
 * 设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。 摩尔投票法
 * @param {*} nums 
 */
var majorityElement = function(nums) {
    let vote1 = 0,vote2 = 0,element1,element2;
    let res = [];
    let len = nums.length;
    for(let i of nums) {
        if(vote1 > 0 && i === element1) {
            vote1++;
        } else if (vote2>0 && i === element2) {
            vote2++;
        } else if (vote1 ===0) {
            vote1++;
            element1 = i;
        } else if (vote2 === 0) {
            vote2++;
            element2 = i;
        } else {
            vote2--;
            vote1--;
        }
    }
    let calcNum1 = 0,calcNum2=0;
    // console.log(element1,vote1,element2,vote2)// 有可能存在 第一个元素和第二个元素都是 0，最后一个元素给了第一个，那么第二个就没了
    for(let i of nums) {
        if(vote1 >0 && i===element1) calcNum1++;
        if(vote2 >0 && i===element2) calcNum2++;
    }
    if(calcNum1 > (len / 3)) res.push(element1)
    if(calcNum2 > (len / 3)) res.push(element2)
    return res;
};
console.log(majorityElement([4,1,2,3,4,4,3,2,1,4]));
var preWalkOrder = function(root) {
    if(!root) return null;
    const stack = [root];
    let item;
    while(stack.length) {
        item = stack.pop();
        console.log(item.val);
        if(item.right) stack.push(item.right);
        if(item.left) stack.push(item.left);
    }
}

var inOrder = function(root) {
    if(!root) return null;
    const stack =[];
    while(root || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        const item = stack.pop();
        console.log(item.val);
        if(item.right) root = item.right;
    }
}

var postOrder = function(root) {
    if(!root) return null;
    const tempStack = [root], res = [];
    while(tempStack.length) {
        const item = tempStack.pop();
        res.push(item);
        if(item.left) stack.push(item.left);
        if(item.right) stack.push(item.right);
    }
    return res.reverse();
}