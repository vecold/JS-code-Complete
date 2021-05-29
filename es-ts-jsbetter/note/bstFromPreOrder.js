/**
 * 
 * @param preorder 返回与给定前序遍历 preorder 相匹配的二叉搜索树（binary search tree）的根结点。

(回想一下，二叉搜索树是二叉树的一种，其每个节点都满足以下规则，对于 node.left 的任何后代，值总 < node.val，而 node.right 的任何后代，值总 > node.val。此外，前序遍历首先显示节点 node 的值，然后遍历 node.left，接着遍历 node.right。）

题目保证，对于给定的测试用例，总能找到满足要求的二叉搜索树。

输入：[8,5,1,7,10,12]
输出：[8,5,10,1,7,null,12]
1 <= preorder.length <= 100
1 <= preorder[i] <= 10^8
preorder 中的值互不相同
 */
var bstFromPreorder = function(preorder) {
  // 构建 二叉树
  const help = (node,value) =>{
    if ( node === null ) {
      node = {
        value,
        left: null,
        right: null
      }
    } else {
      if(value<node.value) {
        node.left = help(node.left,value);
      } else {
        node.right = help(node.right,value);
      }
    }
    return node;
  }
  let treeNode = null;
  for(let i=0;i<preorder.length;i++) {
    treeNode = help(treeNode,preorder[i]);
  }
  return treeNode;
};
