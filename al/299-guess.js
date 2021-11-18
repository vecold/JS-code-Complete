/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    let len = secret.length;
    let bulls = 0;
    let cows = 0;
    let seArr = new Array(10).fill(0);
    let guArr = new Array(10).fill(0);
    for(let i=0;i<len;i++) {
        if(secret[i]===guess[i]){
            bulls++;
        } else {
            ++seArr[+secret[i]];
            ++guArr[+guess[i]];
        }
    }
    for(let i=0;i<10;i++) {
        cows += Math.min(seArr[i],guArr[i])
    }
    return `${bulls}A${cows}B`;
};