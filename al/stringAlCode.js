/**
 * 给你一个字符串 s 和一个字符串数组 dictionary 作为字典，找出并返回字典中最长的字符串，该字符串可以通过删除 s 中的某些字符得到。
如果答案不止一个，返回长度最长且字典序最小的字符串。如果答案不存在，则返回空字符串。
    输入：s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
    输出："apple"
    输入：s = "abpcplea", dictionary = ["a","b","c"]
    输出："a"
*/
// 简单思路 将 s 拆成数组(错了，删除)，一个个去和 dictionary 中的单词比较 全命中 记录最长的字符串 同样最长记录最小
// 将 dictionary 按照长度排序 然后挨个比较 满足的第一个单词就是了

// var findLongestWord = function(s, dictionary) {
//     dictionary.sort((next,cur)=>{
//         if (next.length !== cur.length) {
//             return cur.length - next.length;
//         } else {
//             return next.localeCompare(cur);
//         }
//     });
//     console.log(dictionary)
//     for(const word of dictionary) {
//         let i=0, j=0;
//         while(i<s.length && j< word.length) {
//             if(s[i]===word[j]) {
//                 j++;
//             }
//             i++;
//         }
//         if(j===word.length) {
//             return word;
//         }
//     }
//     return '';
// };
// 直接一个比较过去 就硬怼
var findLongestWord = function(s, dictionary) {
    let maxLminDStr = "";
    for(const word of dictionary) {
        let i=0, j=0;
        while(i<s.length && j< word.length) {
            if(s[i]===word[j]) {
                j++;
            }
            i++;
        }
        if(j===word.length) {
           if(word.length>maxLminDStr.length || (word.length === maxLminDStr.length && maxLminDStr > word)) {
                maxLminDStr = word;
           }
        }
    }
    return maxLminDStr;
}
console.log(findLongestWord("abce",['abe','abc']))
// 所以其实我一开始的思路问题不大， 就是比较的方法不对