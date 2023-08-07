"use strict";

class IteratorQueue {
  constructor(queue) {
    this.queue = queue;
    this.currentItem = 0;
  }
  
  next() {
    if (this.currentItem < this.queue.size) {
      const value = this.queue[`_${this.currentItem}`];
      this.currentItem++;
      return { value: value, done: false };
    }
    return { value: undefined, done: true };
  }
}

class Queue {
  constructor(...args) {
    this._head = 0;
    this._tail = 0;
    for (const arg of args) {
      this.enQueue(arg);
    }
  }
  [Symbol.iterator]() {
    return new IteratorQueue(this);
  }
  get size() {
    return this._tail - this._head;
  }
  enQueue(value) {
    this[`_${this._tail}`] = value; //queue['_0'] = 12
    this._tail++;
    return this.size;
  }
  deQueue() {
    const deleteItem = this[`_${this._head}`];
    delete this[`_${this._head}`];
    this._head++;
    return deleteItem;
  }
  peek() {
    return this[`_${this._head}`];
  }
}

const queue1 = new Queue("asd", {"qwerty": "lll"}, [0], "true", "aaaa");
const queue2 = new Queue(4, 5, 6, 2, 5, 8, 5, 8);
for (const elem of queue1) {
  console.log(elem);
}
console.log(...queue2);
