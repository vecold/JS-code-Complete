// 没错。前中后序遍历来啦

const arr = ['A','B','C','D','E','F','G'];
class Node {
	constructor (data){
  		this.val = data;
    	this.right = null;
    	this.left = null;
  }
}
function buildTree(arr) {
    let head = new Node(arr[0]);
    let nodes = [head];
    let i = 1;
    for(let node of nodes) {
        if(node === null) continue;
        nodes.push(node.left = arr[i] ? new Node(arr[i]) : null);
        i++;
        nodes.push(node.right = arr[i] ? new Node(arr[i]) : null);
        i++
        if(i>=arr.length) return head;
    }
}
let tree = buildTree(arr);
// 前序 DFS
function preOrder(head) {
    if(!head || !head.val) return;
    console.log(head.val);
    if(head.left) preOrder(head.left);
    if(head.right) preOrder(head.right);
}
// BFS
function walkPreOrder(tree) {
    if(!tree) return;
    const stack = [tree];
    while(stack.length) {
        const node = stack.pop();
        console.log(node.val);
        if(node.right) stack.push(node.right);
        if(node.left) stack.push(node.left);
    }
}
// walkPreOrder(tree);

// 中序遍历
// 先找到最左边的值，然后开始从左到右打印
function walkInOrderDfs(head) {
    if(!head || !head.val) return;
    if(head.left) walkInOrderDfs(head.left);
    console.log(head.val);
    if(head.right) walkInOrderDfs(head.right);
}

walkInOrderDfs(tree);

function walkInOrder(root){
    if(root === null) return
    const stack = []
    let current = root
    while(stack.length || current){
        while(current){
           stack.push(current) //@3 这里就是最深层的右侧值
           current = current.left
        }
        const last = stack.pop()// @2 第二轮进来的时候就拿到最左侧的上一层节点，就打出来了 @3 右侧值
        // @1 这一层会把最左侧的先打出来
        console.log(last)
        current = last.right// @1 然后 最左侧的right是null 所以 上面while 的时候不会走 @2 然后会把右侧的复制给 当前的current
     }
  }
// 后序遍历
function walkPostOrder(root){
    if(root === null) return
  
    if(root.left) walkPostOrder(root.left)
    if(root.right) walkPostOrder(root.right)
  
    // do something here
    console.log(root.val)
}

function walkPostOrder(root){
    if(root === null) return []
    const tempStack = [root], result = []
    while(tempStack.length){
        const last = tempStack.pop()
        result.push(last)
        if(last.left) tempStack.push(last.left)
        if(last.right) tempStack.push(last.right)
      }
      return result.reverse()
  }