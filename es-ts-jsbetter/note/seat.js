// /**
//  * Definition for a binary tree node.
//  * function TreeNode(val, left, right) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.left = (left===undefined ? null : left)
//  *     this.right = (right===undefined ? null : right)
//  * }
//  */
// /**
//  * @param {TreeNode} root
//  * @return {number}
//  */
//  var maxAncestorDiff = function(root) {

// };

// class Node { // 定义节点
//   constructor(data){
//       this.data = data
//       this.leftChild = null
//       this.rightChild = null
//   }
// }
// // 根据数组顺序创建二叉树，此方法精髓为利用内存地址
// const createTree = (arr) => { // 创建二叉树
//   let tree = new Node(arr[0])
//   let Nodes = [tree]
//   let i = 1
//   for (let node of Nodes){
//       console.log(Nodes)
//       if(node === null)continue;
//       Nodes.push(node.leftChild = arr[i]===null ? null : new Node (arr[i]))
//       i += 1
//       if (i == arr.length) return tree
//       Nodes.push(node.rightChild = arr[i]===null ? null : new Node (arr[i]))
//       i += 1
//       if (i == arr.length) return tree
//   }
// }


// function ANode(val) {
//   this.val = val;
//   this.left = null;
//   this.right = null;
// }
// // 闭眼二叉树系列， 这是一棵平铺二叉树
// const bulidTree = (arr) => {
//   const treeNode = new ANode(arr[0]);
//   let nodeList = [treeNode];
//   let i = 1;
//   for(let node of nodeList) {
//     if(node === null)continue;
//     nodeList.push(node.left = arr[i] === null ? null : new ANode(arr[i]));
//     i++
//     if(i===arr.length) return treeNode;
//     nodeList.push(node.right = arr[i] === null ? null : new ANode(arr[i]));
//     i++
//     if(i===arr.length) return treeNode;

//   }
// }
// let datas = [8,3,10,1,6,null,14,null,null,4,7,13]
// let ts = bulidTree(datas)
// console.log(ts)


// 每日的科里化
function getsum(a,b,c) {
  return a+b+c;
}

const curry = (fuc) => {
  return function insideCurry(...args) {
    if(fuc.length > args.length ) {
      return function () {
        return insideCurry(...args,...Array.from(arguments))
      }
    } else {
      return fuc(...args);
    }
  }  
}
const text = curry(getsum)(1);
console.log(text)
console.log(text(1)(2));

// 反转链表

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