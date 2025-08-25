class Node {
    constructor(value = null) {
        this.value = value;
        this.nextNode = null;
    }
}

class HashMap {
    constructor(loadFactor) {
        this.loadFactor = loadFactor;
        this.capacity = 16;
        this.head = null;
        this.arr = new Array(16).fill(undefined);
        this.keyArr = [];
        this.alreadyPresent = false;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= 16;
        }

        if(this.keyArr.includes(key)) {
            this.alreadyPresent = true;
            return hashCode;
        }

        this.keyArr.push(key);
        return hashCode
    }

    length() {
        let n = 0;
        for(let i = 0; i < this.arr.length; i++) {
            if(typeof this.arr[i] !== 'undefined') {
                if(this.arr[i].nextNode === null) {
                    n += 1;
                }
                while(this.arr[i].nextNode != null) {
                    this.arr[i] = this.arr[i].nextNode;
                    n += 1;
                }
            }
        }
        return n;
    }

    set(key, value) {
        let index = this.hash(key);

        let nodesFilled = this.length();
        let factor = nodesFilled / this.capacity;

        if(factor > this.loadFactor) {
            this.capacity *= 2
        }

        if(typeof this.arr[index] === 'undefined'){
            this.head = null;
        }

        if(typeof this.arr[index] !== 'undefined'){
            this.head = this.arr[index];
        }

        let newNode = new Node(value);
        if(this.head === null) {
            this.arr[index] = newNode;
            return;
        }

        let current = this.arr[index];
        while(current.nextNode !== null) {
            current = current.nextNode
        }

        if(this.alreadyPresent === true) {
            current.value = newNode.value;
            return;
        }

        current.nextNode = newNode;
    }
    get() {
        return this.arr;
    }
    getCapacity() {
        return this.capacity;
    }
}

const test = new HashMap(0.75);
test.set('apple', 'red')
test.set('banana', 'yellow');
test.set('banana', 'skibidi');
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.get());
console.log(test.length());
console.log(test.getCapacity());