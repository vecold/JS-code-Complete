/**
 * 1302
 * 给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。
 * 输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
输出：15
 */
// 所以先要构建一下二叉树 诶嘿嘿嘿
const arr = [1,2,3,4,5,null,6,7,null,null,null,null,8];
class Node {
	constructor (data){
  		this.val = data;
    	this.right = null;
    	this.left = null;
  }
}
function createTree(grid){
let tree = new Node(grid[0]);
  let nodes = [tree];
  let i = 1;
  for(let node of nodes) {
  	if(node === null) continue;
    nodes.push(node.left = grid[i] === null ? null : new Node(grid[i]));
    i++;
    if(i>=grid.length) return tree;
    nodes.push(node.right = grid[i] === null ? null : new Node(grid[i]));
    i++;
    if(i>=grid.length) return tree;
  }
}
// 找到了最深的，所以要个对象存一下
// 这是我的初始想法，就找个最深的点然后加这个最深的点就好了，问题在于我这多了个最深层的存储对象
// var deepestLeavesSum = function(root) {
//     let temp = {}
//     function getDeep(node,index=0) {
//         if(!node) return index - 1;
//         if(!node.left && !node.right) {
//             temp[index] = temp[index] ? temp[index].concat([node.val]) : [node.val];
//             return index;
//         }
//         ++index;
//         index = Math.max(getDeep(node.left,index),getDeep(node.right,index))
//         return index;
//     }
//     let dee = getDeep(root);
//     let sum = temp[dee].reduce((a,b)=> a+b )
//     return sum;
// };
// 优化一下。不用缓存看下
// var deepestLeavesSum = function(root) {
//     let total = 0;
//     let maxDeep = -1;
//     function getDeep(node,index=0) {
//         if(!node) return;
//         if(index > maxDeep) {
//             maxDeep = index;
//             total = node.val;
//         } else if(maxDeep === index) {
//             total += node.val;
//         }
//         index++;
//         getDeep(node.left,index);
//         getDeep(node.right,index);
//     }
//     getDeep(root);
//     return total;
// };


// var deepestLeavesSum = function(root) {
//   let total = 0;
//   let maxDeep = -1;
//   const getTotal = (node,index=0) =>{
//     if(!node) return;
//     if(maxDeep<index) {
//       maxDeep = index;
//       total = node.val;
//     } else if(maxDeep === index) {
//       total += node.val;
//     }
//     index++;
//     getTotal(node.left,index);
//     getTotal(node.right,index);
//   }
//   getTotal(root);
//   return total;
// }


// BFS 广度优先算法
// 思路；将树的每一层都放到数组中，给定一个初始的层级-1，循环将比当前层级更高的节点相加，直到数组中没有元素
// 广度和深度的区别
function deepestLeavesSum(root) {
  let q = [{node:root,dep:0}];
  let maxDeep = -1, total = 0;
  while (q.length > 0){
    let {node,dep} = q.pop();
    if (dep > maxDeep) {
      maxDeep = dep, total = node.val;
    }else if(dep === maxDeep) {
      total += node.val
    }
    if (node.left) q.push({node: node.left, dep: dep + 1})
    if (node.right) q.push({node: node.right, dep: dep + 1})
  }
  return total
}
let a= createTree([1,2,3,4,5,null,6,7,null,null,null,null,8])
console.log(deepestLeavesSum(a))