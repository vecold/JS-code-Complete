/**
 * 给你一个数组 rectangles ，其中 rectangles[i] = [xi, yi, ai, bi] 表示一个坐标轴平行的矩形。这个矩形的左下顶点是 (xi, yi) ，右上顶点是 (ai, bi) 。
如果所有矩形一起精确覆盖了某个矩形区域，则返回 true ；否则，返回 false 。
 */
var isRectangleCover = function(rectangles) {
    let n = rectangles.length;
    let rs = new Array(n*2).fill(null).map(item=> new Array(4));
    for(let i = 0,idx=0;i<n;i++){
        let re = rectangles[i];
        rs[idx++] = [re[0],re[1],re[3],1];
        rs[idx++] = [re[2],re[1],re[3],-1];
    }
    rs.sort((a,b)=>{
        if(a[0] != b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });
    n *= 2;
    let L1 = new Array(), L2 = new Array();
    for(let L = 0; L<n;) {
        let r = L;
        L1.length = 0;
        L2.length = 0;
        // 找到横坐标相同部分
        while(r < n && rs[r][0] == rs[L][0]) r++;
        for(let i = L;i<r;i++) {
            let cur = [rs[i][1], rs[i][2]];
            let list = rs[i][3] == 1 ? L1 : L2;
            if (list.length == 0) {
                list.push(cur);
            } else {
                let prev = list[list.length-1];
                if (cur[0] < prev[1]){
                    return false; // 存在重叠
                } 
                else if (cur[0] == prev[1]){prev[1] = cur[1]} // 重叠了
                else list.push(cur); //  或者不相连
            }
        }
        console.log(L1,L2,L,r)
        if (L > 0 && r < n) {
            // 若不是完美矩形的边缘竖边，检查是否成对出现
            if (L1.length != L2.length) return false;
            for (let i = 0; i < L1.length; i++) {
                if (L1[i][0] == L2[i][0] && L1[i][1] == L2[i][1]){
                    continue;
                } else {
                    return false;
                }
            }
        } else {
            // 若是完美矩形的边缘竖边，检查是否形成完整一段
            if (L1.length + L2.length != 1) return false;
        }
        L = r;
    }
    return true
}
let a = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]];
// let a = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]];
console.log(isRectangleCover(a))