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
        this.arr = [];
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= 16;
        }

        return hashCode
    }

    set(key, value) {
        let index = this.hash(key);

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

        current.nextNode = newNode;
    }
    get() {
        return this.arr;
    }
}

const test = new HashMap(0.75);
test.set('apple', 'red')
test.set('banana', 'yellow')
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
