/**
 * 此为回溯算法的集合,关于回溯法的判断，怎么加大多靠自己～当然有公示
 */
/**
 * 1。给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * nums = [1,2,3]
 * [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var permute = function(nums) {
//     const len = nums.length;
//     const res = [];
//     var dfs = function(cur,useArr) {
//         if(cur.length === len){
//             res.push(cur);
//             return;
//         }
//         for(let i in useArr) {
//             let nowCur = [...cur,`${useArr[i]}`]; 
//             let tempArr = useArr.slice(0,+i).concat(useArr.slice(+i+1));
//             dfs(nowCur,tempArr);
//         }
//     }
//     dfs([],nums);
//     return res;
// };
// console.log(permute([1,2,3]))
/**
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * 这道题目我第一时间想到的就是转字符串然后set，但是不满足剪枝的思想
 * 
 */

var permuteUnique = function(nums) { 
    const ans = [];
    const vis = new Array(nums.length).fill(false);
    const backtrack = (idx, perm) => {
        if (idx === nums.length) {
            ans.push(perm.slice());
            return;
        }
        for (let i = 0; i < nums.length; ++i) {
            console.log(perm,idx,i,vis,vis[i - 1],vis[i],ans)
            // 折磨 加!vis[i - 1] 的作用，就是为了剪枝，当第一组父子遍历（层级不同）结束后
            // 对兄弟遍历（层级相同）的时候，如果 上一个兄弟元素相同，那就剪枝 掉当前分支
            // 因为如果是相同元素，那遍历重组出来的内容肯定是一样的

            // 而对于 vis[i - 1] 就是在于 同一个父级遍历下面，当前子节点与前一个子节点做比较，
            // 遍历的次数会多，没有 上一个优化的好
            if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
                continue;
            }
            perm.push(nums[i]);
            vis[i] = true;
            backtrack(idx + 1, perm);
            vis[i] = false;
            perm.pop();
        }
    }
    nums.sort((x, y) => x - y);
    backtrack(0, []);
    return ans;
}
// console.log(permuteUnique([1,1,1]))
// 这道题目去掉重复的要求就能用在全排列上了
/**
 * 给定正整数 N ，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。
如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。
 */
// 最后看个再复杂一点的

 var reorderedPowerOf2 = function(n) {
    const nums = Array.from('' + n);
    nums.sort();
    const vis = new Array(nums.length).fill(false);
    const isPowerOfTwo = (n) => {
        return (n & (n - 1)) === 0;
    }
    const backtrack = (idx, num) => {
        if (idx === nums.length) {
            return isPowerOfTwo(num);
        }
        for (let i = 0; i < nums.length; ++i) {
            // 不能有前导零
            if ((num === 0 && nums[i] === '0') || vis[i] || (i > 0 &&  nums[i] === nums[i - 1] && !vis[i - 1] )) {
                continue;
            }
            vis[i] = true;
            if (backtrack( idx + 1, num * 10 + (+nums[i]))) {
                return true;
            }
            vis[i] = false;
        }
        return false;
    }
    return backtrack(0, 0);
};


var minMoves = function(nums) {
    nums.sort((a,b)=>{return a-b});
    nums = new Set(nums);
    nums= [...nums];
    const len = nums.length;
    let res = 0;
    let right = len - 1;
    while(right>0 && len>1) {
        res += (nums[right] - nums[0]);
        right--;
    }
    return res;
};
console.log(minMoves([-1000000000,-1]))