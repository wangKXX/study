function Person() {
  this.name = ["人"];
}

Person.prototype.getName = function () {
  return this.name;
};

/**
 * @description 构造器继承，无法继承原型上的属性方法
 */
function Child() {
  Person.call(this);
}

const childInstance = new Child();
const childInstance1 = new Child();
childInstance1.name.zh_cn = "孩子";
console.log(childInstance.name, childInstance1.name);

function Person() {
  this.name = { zh_cn: "人" };
}

Person.prototype.getName = function () {
  return this.name;
};

/**
 * @description 原型式继承， “父类的引用数据会共享”
 * tips: 给对象设置属性时会创建自有属性
 */
function Student() {}
// 此处应该使用Object.setPrototypeOf(obj, prototype)而不是使用Student.prototype = new Person()，后面的方式直接损坏子类的构造函数
Object.setPrototypeOf(Student.prototype, new Person());
Student.prototype = new Person();
const studentInstance = new Student();

const studentInstance1 = new Student();

studentInstance1.name.zh_cn = "学生";

console.log(studentInstance.name, studentInstance1.name);

/**
 *
 * @description 组合继承。采用原型继承继承其原型上的属性和方法，利用构造继承继承其自身属性方法。
 * 会调用两次父类构造函数
 */
function Teacher() {
  Person.call(this);
}

Object.setPrototypeOf(Teacher.prototype, new Person());

const teacher1 = new Teacher();
const teacher2 = new Teacher();

teacher2.name.zh_cn = "老师";
console.log(teacher1.name, teacher2.name);

/**
 * @description ES6继承。必须在构造函数中调用super()，其原理同组合继承里面在子类中调用父类的构造函数
 */
class Worker extends Person {
  constructor() {
    super();
  }
}

const worker1 = new Worker();
const worker2 = new Worker();
worker2.name.zh_cn = "工人";
console.log(worker1.getName(), worker2.getName());
