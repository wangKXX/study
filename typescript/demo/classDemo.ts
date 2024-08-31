class ClassDemo {
  public wrapName: string;
  private phone: string;
  protected static age: number;
  constructor(public name: string) {
    this.wrapName = name;
  }
  static getAge() {
    return this.age;
  }
  setPhone(phone: string) {
    this.phone = phone;
  }
  getName() {
    return this.name;
  }
}

class ClassDemo2 extends ClassDemo {
  constructor(name: string) {
    super(name);
  }
  getPhone() {
    return '666';
  }
  static getAge() {
    return this.age
  }
}

export {
  ClassDemo,
  ClassDemo2
};