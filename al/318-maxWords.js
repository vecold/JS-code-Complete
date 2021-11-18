/**
 * 给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。
输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
输出: 16 
解释: 这两个单词为 "abcw", "xtfn"。
 */
var maxProduct = function(words) {
    let len = words.length;
    let map = new Map();
    for(let i = 0;i<len;i++) {
        let mask = 0;
        let word = words[i];
        let wordLength = word.length;
        for(let j = 0; j<wordLength;j++) {
            mask |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
        }
        if(wordLength > (map.get(mask) || 0)) {
            map.set(mask,wordLength)
        }
    }
    let maxProd = 0;
    let maskArr = Array.from(map.keys());
    for(const mask1 of maskArr) {
        const wordLength1 = map.get(mask1) 
        for(const mask2 of maskArr) {
            if((mask2 & mask1) === 0) {
                const wordLength2 = map.get(mask2);
                maxProd = Math.max(maxProd,wordLength2*wordLength1)
            }
        }
    }
    return maxProd;
};
