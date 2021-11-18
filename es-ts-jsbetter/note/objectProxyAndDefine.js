const lzy = {
    os: '我想打游戏'
}
// // 过一下脑子
// Object.defineProperty(lzy,'say', {
//     get() {
//         return lzy.os.replace('打游戏','有益身心的活动')
//     }
// })
// 回家后想干的事
function afterBackHome(obj) {
    console.log(obj.say)
    return '还是做饭去吧'
}
// console.log(afterBackHome(lzy))

// lzy的头脑代理
const lzyProxy = new Proxy(lzy,{
    get(target,key) {
        if(key === 'say') {
            return target['os'].replace('打游戏','有益身心的活动')
        }
    }
})
console.log(afterBackHome(lzyProxy))


// function observe(obj, callback) {
//     let newObj = {};
//     Object.keys(obj).forEach(key=>{
//         Object.defineProperty(newObj,key,{
//             get() {
//                 return obj[key];
//             },
//             set(value) {
//                 obj[key] = value;
//                 callback(key,value)
//             },
//         });
//     });
//     return newObj;
// }
// function observe(obj, callback) {
//     return new Proxy(obj,{
//         set(target,key,value) {
//             Reflect.set(target,key,value)
//             callback(key,value);
//         }
//     });
// }

// const obj = observe(
//   {
//     name: '子君',
//     sex: '男'
//   },
//   (key, value) => {
//     console.log(`属性[${key}]的值被修改为[${value}]`)
//   }
// )

// // 这段代码执行后，输出 属性[name]的值被修改为[妹纸]
// obj.name = '妹纸'

// // 这段代码执行后，输出 属性[sex]的值被修改为[女]
// obj.sex = '女'
// console.log(obj.name)