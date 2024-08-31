// 闭包

function createPerson(name) {
	var age = 18;
	return {
		getName: function () {
			return name;
		},
		getAge: function () {
			return age;
		},
		setAge: function (newAge) {
			age = newAge;
		},
	};
}

const person = createPerson("张三");

console.log(person.getAge());

// Symbol

const _privateAge = Symbol("age");

const person2 = {
	name: "张三",
	[_privateAge]: 18,
};
console.log(Reflect.ownKeys(person2))
console.log(Object.getOwnPropertyNames(person2)) // 只能获取可枚举属性
console.log(Object.getOwnPropertySymbols(person2)) // 获取符号属性
console.log(person2[_privateAge]);


class Person3 {
  #age = 18;
	constructor(name) {
		this.name = name;
	}
	getAge() {
		return this.#age;
	}
  getName() {
    return this.name;
  }
}

const p3 = new Person3("张三");

console.log(p3.getAge());
console.log(p3.name);
console.log(p3.age); // 这里不能直接获取到age的值

