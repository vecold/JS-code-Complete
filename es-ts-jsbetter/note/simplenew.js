/**
 * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
 */
// 第一版代码

function objectFactory() {
    let obj = new Object();
    Constructor = [].shift.call(arguments);// 砍掉第一个参数
    let res =  Constructor.apply(obj, arguments);
    obj.__proto__ = Constructor.prototype;
    return typeof res === 'object' ? res : obj;
};


// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = objectFactory(Otaku,'Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
