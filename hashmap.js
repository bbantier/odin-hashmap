import { Node } from "./node.js";

export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  inBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const newNode = new Node(key, value);

    if (this.length() >= this.loadFactor * this.capacity) this.capacity *= 2;

    if (!this.buckets[index]) {
      this.buckets[index] = newNode;
    } else {
      let current = this.buckets[index];

      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (!current.next) {
          current.next = newNode;
          return;
        }
        current = current.next;
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    let current = this.buckets[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);

    let current = this.buckets[index];
    while (current) {
      return current.key === key;
    }
    return false;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    } else {
      const index = this.hash(key);

      let current = this.buckets[index];
      let previous;
      while (current) {
        if (current.key === key) {
          if (previous) {
            previous.next = current.next;
          } else {
            this.buckets[index] = current.next;
          }
          return true;
        }
        previous = current;
        current = current.next;
      }
    }
  }

  length() {
    let count = 0;
    for (let bucket of this.buckets) {
      let current = bucket;
      while (current) {
        count++;
        current = current.next;
      }
    }
    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.capacity = 16;
  }

  keys() {
    const keysInHash = [];
    for (let bucket of this.buckets) {
      let current = bucket;
      while (current) {
        keysInHash.push(current.key);
        current = current.next;
      }
    }
    return keysInHash;
  }

  values() {
    const valuesInHash = [];
    for (let bucket of this.buckets) {
      let current = bucket;
      while (current) {
        valuesInHash.push(current.value);
        current = current.next;
      }
    }
    return valuesInHash;
  }

  entries() {
    const entriesInHash = [];
    for (let bucket of this.buckets) {
      let current = bucket;
      while (current) {
        entriesInHash.push([current.key, current.value]);
        current = current.next;
      }
    }
    return entriesInHash;
  }
}
