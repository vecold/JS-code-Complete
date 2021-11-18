/**
 * 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
 * 剑指 Offer 32 - I. 从上到下打印二叉树
 */
var levelOrder =  function(root) {
    // 根节点为空的情况返回空数组
    if (root === null) return [];
    // 生成一个队列，用来保存节点
    let queue = [];
    // 生成一个 list，用来保存输出的节点
    let list = [];
    // 首先让根节点入队
    queue.push(root);
    let node = null;
    // 遍历队列，直到队列为空
    while (queue.length > 0) {
        // 获取队列的头部元素
        node = queue.shift();
        // 把结点值存放到 list 中
        list.push(node.val);
        // 判断该节点是否有左右子节点
        // 如果左子节点有值，则把左子节点加入到队列中
        if (node.left != null){
            queue.push(node.left); 
        }
        // 如果右子节点有值，则把右子节点加入到队列中 
        if (node.right != null){
          queue.push(node.right);
        }          
    }
    // 返回 res
    return list;
}

/**
 * 
 *请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
 输入[3,9,20,null,null,15,7]
 输出[
  [3],
  [20,9],
  [15,7]
] 
 */
// 思路 BFS 整体思路同上 加一个临时的数组用来放每一层的节点值 ，用返回的接口数组判断层级
var levelOrder =  function(root) {
    if (root === null) return [];
    let queue = [];
    let list = [];
    queue.push(root);
    let node, tempList;
    while (queue.length > 0) {
        // 缓存数组用来存当前深度的顺序数组
        tempList = [];
        // for(let i = 0; i < queue.length;i++) { 这么写的话queue.length会变就不能操作queue了
        for(let i = queue.length; i > 0  ;i--) {
            node = queue.shift();
            // 用来判断层级
            if(list.length % 2 === 0) {
                tempList.push(node.val);
            } else {
                tempList.unshift(node.val);
            }
            if (node.left != null )queue.push(node.left); 
            if (node.right != null) queue.push(node.right);
        }
        list.push(tempList)
    }
    return list;
}


var levelOrder =  function(root) {
    if(root===null) return [];
    let queue = [];
    let res = [];
    let node,tempList;
    queue.push(root);
    while(queue.length) {
        tempList = [];
        for(let i = queue.length;i>0;i--) {
            node = queue.shift();
            tempList.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        res.push(tempList)
    }
    return res;
}