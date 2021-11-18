/**
 * 字典树
 */
var Trie = function() {
    this.children = {};
}
Trie.prototype.insert = function(word) {
    let node = this.children;
    for(let ch of word) {
        if(!node[ch]) {
            node[ch] = {path:0};
        }
        node = node[ch];
      	node.path++;
    }
    node.isEnd = true;
}

Trie.prototype.searchPrefix = function(word) { 
    let node = this.children;
    for(let ch of word) {
        if(!node[ch]) {
            return false;
        }
        node = node[ch];
    }
    return node;
}

Trie.prototype.search = function(word) { 
    let endNode = this.searchPrefix(word);
    return endNode !== undefined && endNode.isEnd === true;
}

Trie.prototype.startsWith = function(word) { 
    return this.searchPrefix(word) ? true : false;
}

Trie.prototype.delete = function(word) { 
    let node = this.children;
    for(let ch of word) {
        if(!node || !node[ch]) return;
        node[ch].path--;
      	if(node.path === 0){
            delete node[ch]
        } 
        node = node[ch]; 
    }
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
    for(let ch of word) {
        if(!node[ch]) {
            node[ch] = {path:0};
        }
        node = node[ch];
      	node.path++;
    }
    node.isEnd = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    let node = this.children;
    for(let ch of word) {
        if(ch === '.') {
            if(!node || Object.keys(node).filter(key=> key!=='path' && key !== 'isEnd').length === 0 ) return false;
            let allLevelNode = {};
            Object.keys(node).forEach(levelNode=>{
                allLevelNode = { ...allLevelNode,...node[levelNode] };
            })
            node = allLevelNode;
        } else {
            if(!node[ch]) {
                return false;
            }
            node = node[ch];
        }
    }
    return node && node.isEnd === true ? true :false;
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
let a = new WordDictionary()
a.addWord('run')
console.log(a)
console.log(a.search('r.n'))
