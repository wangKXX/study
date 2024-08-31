let Person;
{
  const privateProperties = new WeakMap();

  Person = function() {
    this.sex = 0;
    privateProperties.set(this, {
      name: 'Tom'
    });
  }

  Person.prototype.getName = function() {
    return privateProperties.get(this).name;
  }

  Person.prototype.getSex = function() {
    return this.sex;
  }
}


const p = new Person();
p.sex = 1;
// p.name = 'Jerry';
console.log(p.name)
console.log(p.sex)
console.log(p.getName())