/**
 * 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
 */
// 所谓二叉搜索树，满足一个特点 比根节点小的都在左边，比他大的都在他右边，所以一个中序遍历就好了
// 这里用一手BFS 直接找，

var kthSmallest = function(root, k) {
    const stack = [];
    while(stack.length || root !== null) {
        while(root!==null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        --k;
        if(k<1) break;
        root = root.right;
    }
    return root.val;
};
