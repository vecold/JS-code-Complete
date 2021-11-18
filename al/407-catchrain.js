/**
 * 给你一个 m x n 的矩阵，其中的值均为非负整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。
 */

// 解法1是一个小根堆 在 js 中没有，维护的话有额外的消耗
var trapRainWater = function(heightMap) {
    if (heightMap.length <= 2 || heightMap[0].length <= 2) {
        return 0;
    }
    let m = heightMap.length;
    let n = heightMap[0].length;
    let visit = [];// 用来记录该点是否被计算过，防止循环遍历
    for(let i = 0; i < m; i++) {
        visit.push(new Array(n).fill(false))
    }
    let pq = [];// 小根堆，
    // 可以先把 最外面一圈的点不遍历
    for (let i = 0; i < n; i++) {
        pq.push([0, i, heightMap[0][i]]);
        pq.push([m - 1, i, heightMap[m - 1][i]]);
        visit[0][i] = true;
        visit[m - 1][i] = true;
    }
    for (let i = 1; i < m - 1; i++) {
        pq.push([i, 0, heightMap[i][0]]);
        pq.push([i, n - 1, heightMap[i][n - 1]]);
        visit[i][0] = true;
        visit[i][n - 1] = true;
    }
    pq.sort((a,b)=> a[2] - b[2]);
    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let ans = 0;
    // 然后从外向内的去找每一个点的蓄水量，由于是小根堆，可以求出该点的最大蓄水量
    while (pq.length>0) {
        let poll = pq.shift();
        let x = poll[0], y = poll[1], h = poll[2];
        for (let d of dirs) {
            let nx = x + d[0], ny = y + d[1];
            if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
            if (visit[nx][ny]) continue;
            if (h > heightMap[nx][ny]) ans += h - heightMap[nx][ny];// 此处是外围一圈最矮的墙，如果这个墙比此点高，那么这个点的蓄水量 = 这个墙高 - 此点高
            pq.push([nx, ny, Math.max(heightMap[nx][ny], h)]);// 然后开始以此点为墙再往里去看，这里保存 相对较高的墙，
            pq.sort((a,b)=> a[2] - b[2]);
            visit[nx][ny] = true;
        }
    }
    return ans;
}
console.log(trapRainWater([[1,4,4,4,4,4],[4,1,1,1,1,4],[4,4,4,4,4,4]]))


var trapRainWater = function(heightMap) {
    const m = heightMap.length;
    const n = heightMap[0].length;
    const dirs = [-1, 0, 1, 0, -1];
    let maxHeight = 0;
    
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            maxHeight = Math.max(maxHeight, heightMap[i][j]);
        }
    }
    const water = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j){
            water[i][j] = maxHeight;      
        }
    }  
    const qu = [];
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                if (water[i][j] > heightMap[i][j]) {
                    water[i][j] = heightMap[i][j];
                    qu.push([i, j]);
                }
            }
        }
    } 
    while (qu.length) {
        const curr = qu.shift();
        const x = curr[0];
        const y = curr[1];
        for (let i = 0; i < 4; ++i) {
            const nx = x + dirs[i], ny = y + dirs[i + 1];
            if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
                continue;
            }
            // 这里会不断的去调整 x,y 周围的水位，保持与 x,y一致
            if (water[x][y] < water[nx][ny] && water[nx][ny] > heightMap[nx][ny]) {
                // 明确，最终会用 水位 减去 自己本身的高度，看似此处在比高，其实在比矮
                // 所以此处的蓄水量是 自己或者它周围的最高的蓄水后的高度
                water[nx][ny] = Math.max(water[x][y], heightMap[nx][ny]);
                qu.push([nx, ny]);
            }
        }
    }

    let res = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            res += water[i][j] - heightMap[i][j];
        }
    }
    return res;
};