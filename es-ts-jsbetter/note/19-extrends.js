class Person {
  constructor (name) {
    this.name = name;
  }
  say() {
    console.log(`My name is ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, number) {
    super(name);
    this.number = number;
  }

  hello() {
    super.say();
    console.log(`${this.name} school is ${this.number}`)
  }

}
const s = new Student('jack','100');
s.hello();