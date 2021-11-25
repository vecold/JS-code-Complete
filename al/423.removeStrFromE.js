/**
 * 给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。
 * https://leetcode-cn.com/problems/reconstruct-original-digits-from-english/
 */
//统计词频率 先挑出唯一的词，然后再剩下的词语中挑出唯一的词再减 ，这么做在 此题中没有为题，数量大了就要写多个算法了
var originalDigits = function(s) {
    // const wordsArr = ['zero','one','two','three','four','five','six','seven','eight','nine'];
    // 0 = 'z', 6='x',8 = 'g',2='w',4='u',5='f'-4, 3='h' - 8, 7='s'-6,9='i'-5-6-8,1='n' - (9 的 n *2)-7
    // 统计词频
    let map = new Map();
    let numArr = new Array(10).fill(0);
    for(let i = 0;i<s.length;i++) {
        map.set(s[i],(map.get(s[i]) || 0) + 1);
    }
    numArr[0] = map.get('z') || 0;
    numArr[6] = map.get('x') || 0;
    numArr[8] = map.get('g') || 0;
    numArr[2] = map.get('w') || 0;
    numArr[4] = map.get('u') || 0;
    
    numArr[5] = (map.get('f') || 0) - numArr[4];
    numArr[3] =( map.get('h') || 0) - numArr[8];
    numArr[7] = (map.get('s') || 0) - numArr[6];
    numArr[9] = (map.get('i') || 0) - numArr[5] - numArr[6] - numArr[8];
    numArr[1] =( map.get('n') || 0) - (numArr[9] * 2) - numArr[7];
    let res = [];
    for(let i=0;i<10;i++) {
        for(let j=0;j<numArr[i];j++) {
            res.push(i);
        }
    }
    
    return res.join('');
};