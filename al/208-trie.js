/**
 * Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。
Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 */
/**
 * 实现一个 MapSum 类，支持两个方法，insert 和 sum：

MapSum() 初始化 MapSum 对象
void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。
 */
var MapSum = function() {
    this.children = {};
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    let node = this.children;
    const len = key.length;
    for(let i = 0;i<len;i++) {
        if(!node[key[i]]){
            node[key[i]] = {};
        }
        node = node[key[i]];
    }
    node.val = val;
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    const len = prefix.length;
    let node = this.children;
    var dfs = (node) => {
        if(!node || typeof node == 'number') return 0;
        let res = 0;
        if(node.val) res = node.val;
        for(let i of Reflect.ownKeys(node)) {
            res += dfs(node[i]);
        }
        return res
    }
    
    for(let i = 0;i<len;i++) {
        if(!node[prefix[i]]){
            return 0;
        }
        node = node[prefix[i]];
    }
    return dfs(node);
};

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */