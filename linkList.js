// 链表 1.值 2.指针

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  getElementAt(position) {
    if (position < 0 || position > this.length) return null;
    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    return current;
  }

  append(element) {
    const node = new Node(element);
    if (!this.head) this.head = node;
    else {
      const last = this.getElementAt(this.length - 1);
      last.next = node;
    }
    this.length++;
  }

  insert(element, position) {
    if (position < 0 || position > this.length) return false;
    const node = new Node(element);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const current = this.getElementAt(position - 1);
      node.next = current.next;
      current.next = node;
    }
    this.length++;
    return true;
  }

  removeAt(position) {
    if (position < 0 || position > this.length) return false;
    let current = this.head;
    if (position === 0) this.head = current.next;
    else {
      const rmNode = this.getElementAt(position - 1);
      current = rmNode.next;
      rmNode.next = current.next;
    }
    this.length--;
    return current.value;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.value === element) return i;
      current = current.next;
    }
    return -1;
  }

  remove(element) {
    const position = this.indexOf(element);
    return this.removeAt(position);
  }

  isEmpty() {
    return !!this.length;
  }

  size() {
    return this.length;
  }

  clear() {
    this.length = 0;
    this.head = null;
  }

  getHead() {
    return this.head;
  }

  toString() {
    let current = this.head;
    const temp = [];
    for (let i = 0; i < this.length; i++) {
      const { value, next } = current;
      temp.push(JSON.stringify({ value, next: next ? next.value : "null" }));
      current = current.next;
    }
    return temp.join(",");
  }
}


const test = new LinkList();
test.append(1);
test.append(2);
test.append(3);
test.append(4);
test.append(5);
test.append(6);
test.insert(8, 0);
test.insert(9, 2);
console.log(test.getHead(), test.toString());
