/**
 * 给定一个二叉树，计算 整个树 的坡度 。
一个树的 节点的坡度 定义即为，该节点左子树的节点之和和右子树节点之和的 差的绝对值 。如果没有左子树的话，左子树的节点之和为 0 ；没有右子树的话也是一样。空结点的坡度是 0 。
整个树 的坡度就是其所有节点的坡度之和。
链接：https://leetcode-cn.com/problems/binary-tree-tilt
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 思路就是左节点只合减去右节点之合 递归
 * @param {*} root 
 * @returns 
 */
var findTilt = function(root) {
    let ans = 0;
    const dfs = (node) => {
        if(!node) return 0;
        let leftTotal = dfs(node.left);// 左节点之和
        let rightTotal = dfs(node.right);// 右节点之和
        ans += Math.abs(leftTotal - rightTotal);// 节点差
        return leftTotal + rightTotal + node.val;// 当前节点和
    }
    dfs(root);
    return ans;
};