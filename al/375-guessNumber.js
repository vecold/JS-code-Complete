/**
 * 我们正在玩一个猜数游戏，游戏规则如下：

我从 1 到 n 之间选择一个数字。
你来猜我选了哪个数字。
如果你猜到正确的数字，就会 赢得游戏 。
如果你猜错了，那么我会告诉你，我选的数字比你的 更大或者更小 ，并且你需要继续猜数。
每当你猜了数字 x 并且猜错了的时候，你需要支付金额为 x 的现金。如果你花光了钱，就会 输掉游戏 。
给你一个特定的数字 n ，返回能够 确保你获胜 的最小现金数，不管我选择那个数字 。
 */
/**
 * 首先第一点，没有给你确定要猜哪个数字
 * 第二点，是 确保能获胜 的 最小 
 * 也就是 最坏的最好情况
 * @param {*} n 
 */
 var getMoneyAmount = function(n) {
    const f = new Array(n + 2).fill(0).map(() => new Array(n + 2).fill(0));
    for (let len = 2; len <= n; len++) {
        for (let l = 1; l + len - 1 <= n; l++) {
            let r = l + len - 1;
            f[l][r] = Number.MAX_VALUE;
            for (let x = l; x <= r; x++) {
                let cur = Math.max(f[l][x - 1], f[x + 1][r]) + x;
                f[l][r] = Math.min(f[l][r], cur);
            }
        }
    }
    return f[1][n];
};