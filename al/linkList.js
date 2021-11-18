// 删除链表的倒数第N个节点
// [1,2,3,4,5]
// 2
/**
 * 
 因为head指针始终指向的是链表的头部，而head指针又是JavaScript里的引用类型，所以当改变cur的引用时，head的内部也会同步改变，但head始终还是头指针。
    let cur = this.head

    cur = cur.next // head不会有任何变化
    this.head = this.head.next // 改变了头指针的位置

    cur.next = null // 同样head.next也会变为null
    this.head.next === null // true
 */
// var removeNthFromEnd = function(head, n) {
//     let pre = head
//     let list = head
//     let len = 1
//     while(list.next !== null) {
//         list = list.next
//         len++
//     }// 获取了链表的长度
//     if (len - n == 0) return head.next;// 如果删除的是倒数最后（就是正数第一个）直接返回第二个节点就好了
//     for(let i = 0; i < len - n -1 ; i++) {
//         pre = pre.next
//     }
//     pre.next = pre.next.next
//     return head
//  };


// 自己写
// 删除 倒数的 第N个
var removeNthFromEnd = function(head, n) { 
    let pre = head;
    let list = head;
    let len = 1;
    while(list.next !== null) {
        list = list.next;
        len++;
    }
    if(n === len) return head.next;
    for(let i=0;i<len-n-1;i++) {
        pre = pre.next;
    }
    pre.next = pre.next.next;
    return head
}
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
// 反转链表
var reverseList = function(head) {
    let list = null;
    let node = null;
    while(head) {
        node = new ListNode(head.val);
        node.next = list;
        list = node;
        head = head.next;
    }
    return list;
}

let a = {"val":5,"next":{"val":4,"next":{"val":3,"next":{"val":2,"next":{"val":1,"next":null}}}}};
let res = removeNthFromEnd(a,2);
console.log(JSON.stringify(a));