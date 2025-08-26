class Node {
    constructor(value = null, key) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

class HashMap {
    constructor(loadFactor) {
        this.loadFactor = loadFactor;
        this.capacity = 16;
        this.head = null;
        this.arr = new Array(16).fill(null);
        this.keyArr = [];
        this.valueArr = [];
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
            let node = this.arr[i]
            while(node !== undefined && node !== null) {
                n++
                node = node.nextNode
            }         
        }

        return n;
    }

    set(key, value) {
        let index = this.hash(key);
        this.valueArr.push(value);

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

        let newNode = new Node(value, key);
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
            this.alreadyPresent = false;
            return;
        }

        current.nextNode = newNode;
    }

    get(key) {
        for(let i = 0; i < this.arr.length; i++) {
            let node = this.arr[i];

            while(node !== undefined && node !== null) {
                if(node.key === key) return node.value;
                node = node.nextNode;
            }
        }
        return false;
    }

    has(key) {
        for(let i = 0; i < this.arr.length; i++) {
            let node = this.arr[i];

            while(node !== undefined && node !== null) {
                if(node.key === key) {
                    return true;
                }
                node = node.nextNode;
            }
        }
        return false;
    }

    remove(key) {
        let index = this.hash(key);
        let prev = null;
        let node = this.arr[index];

        while(node !== null) {
            if(node.key === key) {
                if(prev === null) {
                    this.arr[index] = node.nextNode;
                }
                else {
                    prev.nextNode = node.nextNode
                }
            }
            return true;
        }
        return false;
    }

    clear() {
        for(let i = 0; i < this.arr.length; i++) {
            this.arr[i] = null;
        }
    }

    keys() {
        return this.keyArr;
    }

    values() {
        return this.valueArr;
    }

    entries() {
        let keyValueArr = []
        for(let i = 0; i < this.keyArr.length; i++) {
            keyValueArr.push([this.keyArr[i]], [this.valueArr[i]]);
        }
        return keyValueArr;
    }
    
    getCapacity() {
        return this.arr;
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


console.log(test.get('lion'));
console.log(test.has('apple'));
console.log(test.has('kite'));
console.log(test.has('meow'));
console.log(test.remove("carrot"));

console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.getCapacity());