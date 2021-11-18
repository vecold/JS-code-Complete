/**
 * 给定一个整数数组 nums，
 * 其中恰好有两个元素只出现一次，其余所有元素均出现两次。 
 * 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。
 */
/**
 *在二进制的世界中 相同的数字进行异或操作为0   2^2 = 0 （10⊕10 = 0），
 *可以利用负数和自己进行与 & 运算，得出 最小位的1在哪个位置
 * 此题中，如果只有两个数是不同的，那么 对于这个数组全部的数 异或 操作的时候 就等于 x1 ^ x2 (x1 ⊕ x2)
 * */ 
var singleNumber = function(nums) { 
    let xorsum = nums;
    for(let num of nums) {
        xorsum ^= num;
    }// 先求出那两个数异或出来的值
    let type = xorsum & (-xorsum);// 再进行 自己与自己负数的 与 运算，x1 x2中的某一个数的二进制表示的第 
    //l 位为 0，另一个数的二进制表示的第 l 位为 1。
    let type1 = 0, type2 = 0;
    for(let num of nums) {
        // 那么这个type再与 x1 x2 进行与运算的时候 肯定会出现两类，一类 为0，因为他的l位是0，一位大于0
        // 然后只要把这些两类数都进行异或，就是等于 0 分别 与 x1 x2 异或。因为这些数都出现了两次，所以一类
        // 数中异或肯定只出现 只出现过一次的数
        if(num & type) {
            type1 ^= num
        } else {
            type2 ^= num
        }
    }
    return [type1,type2];
}

var WordDictionary = function() {
    this.children = {};
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let node = this.children;
    for (const ch of word) {
        if (!node[ch]) {
            node[ch] = {};
        }
        node = node[ch];
    }
    node.isEnd = true;
};

WordDictionary.prototype.search = function(word) {
   let node = this.children;
   const dfs = function(index,node) {
        if(!node) return false;
        if(index === word.length) {
            return node.isEnd;
        }
        let ch = word[index];
        if(ch==='.') {
            for(const child of Object.values(node)) {
                if(child && dfs(index+1,child)){
                    return true;
                }
            }
        } else {
            if(node[ch] && dfs(index+1,node[ch])){
                return true;
            } 
        }
        return false;
   }
   return dfs(0,node);
};