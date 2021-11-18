/**
 * 你正在参与祖玛游戏的一个变种。
在这个祖玛游戏变体中，桌面上有 一排 彩球，每个球的颜色可能是：红色 'R'、黄色 'Y'、蓝色 'B'、绿色 'G' 或白色 'W' 。你的手中也有一些彩球。
你的目标是 清空 桌面上所有的球。每一回合：
从你手上的彩球中选出 任意一颗 ，然后将其插入桌面上那一排球中：两球之间或这一排球的任一端。
接着，如果有出现 三个或者三个以上 且 颜色相同 的球相连的话，就把它们移除掉。
如果这种移除操作同样导致出现三个或者三个以上且颜色相同的球相连，则可以继续移除这些球，直到不再满足移除条件。
如果桌面上所有球都被移除，则认为你赢得本场游戏。
重复这个过程，直到你赢了游戏或者手中没有更多的球。
给你一个字符串 board ，表示桌面上最开始的那排球。另给你一个字符串 hand ，
表示手里的彩球。请你按上述操作步骤移除掉桌上所有球，计算并返回所需的 最少 球数。如果不能移除桌上所有的球，返回 -1 。
 */
/**
 * 还是用回溯，将手中球 按照顺序一个个打入数组中，看最小所需要的
 * @param {} board 
 * @param {*} hand 
 */
var findMinStep = function(board, hand) {

};


var trap = function(height) {
    let res = 0;
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax=0;
    while(left<right) {
        leftMax = Math.max(height[left],leftMax);
        rightMax = Math.max(height[right],rightMax);
        if(height[left]<=height[right]){
            res += leftMax - height[right];
            left++;
        } else {
            res += rightMax - height[right];
            right--;
        }
    }
    return res;
};