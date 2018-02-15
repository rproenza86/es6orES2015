// These protocols aren’t built-ins, but they will help you understand the new concept of iteration in ES6, as well as show you a use case for symbols.

/**
 * The Iterable Protocol
 *  The iterable protocol is used for defining and customizing the iteration behavior of objects. 
 *  What that really means is you now have the flexibility in ES6 to specify a way for iterating through values in an object. 
 * 
 *  For some objects, they already come built-in with this behavior. For example, strings and arrays are examples of built-in iterables.
 */
let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
    console.log(digit);
}

/**
 * The Iterator Protocol
 *  The iterator protocol is used to define a standard way that an object produces a sequence of values. What that really means is you 
 *  now have a process for defining how an object will iterate. This is done through implementing the .next() method.
 */

/* 
How it Works
    An object becomes an iterator when it implements the .next() method. The .next() method is a zero arguments function that returns an object with two properties:
        value : the data representing the next value in the sequence of values within the object
        done : a boolean representing if the iterator is done going through the sequence of values
            If done is true, then the iterator has reached the end of its sequence of values.
            If done is false, then the iterator is able to produce another value in its sequence of values.
            
Here’s the example from earlier, but instead we are using the array’s default iterator to step through the each value in the array.
*/
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next()); // Object {value: 0, done: false}
console.log(arrayIterator.next()); // Object {value: 1, done: false}
console.log(arrayIterator.next()); // Object {value: 2, done: false}


/*
 * Programming Quiz: Make An Iterable Object
 *
 * Turn the `james` object into an iterable object.
 *
 * Each call to iterator.next should log out an object with the following info:
 *   - key: the key from the `james` object
 *   - value: the value of the key from the `james` object
 *   - done: true or false if there are more keys/values
 *
 * For clarification, look at the example console.logs at the bottom of the code.
 *
 * Hints:
 *   - Use `Object.keys()` to store the object's properties in an array.
 *   - Each call to `iterator.next()` should use this array to know which property to return.
 *   - You can access the original object using `this`.
 *   - To access the values of the original object, use `this` and the key from the `Object.keys()` array.
 */

const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185,
    [Symbol.iterator]: function() {
        const keys = Object.keys(this);
        let pointer = 0;
        const next = () => {
            return {
                key: keys[pointer],
                value: this[keys[pointer]],
                done: ++pointer >= keys.length
            }
        }

        return { next }
    }
};

const iterator = james[Symbol.iterator]();

console.log(iterator.next().value); // 'James'
console.log(iterator.next().value); // `5'10`
console.log(iterator.next().value); // 185




// It is possible to define your own default @@iterator for any object that you care to iterate over. For example:
var myObject = {
	a: 2,
	b: 3
};

Object.defineProperty( myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		var o = this;
		var idx = 0;
		var ks = Object.keys( o );
		return {
			next: function() {
				return {
					value: `The number in ${ks[idx]} is ${o[ks[idx++]]}`,
					done: (idx > ks.length)
				};
			}
		};
	}
} );

// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
	console.log( v );
}
// 2
// 3

/*  
    In fact, you can even generate "infinite" iterators which never "finish" and always return a new value (such as 
    a random number, an incremented value, a unique identifier, etc), though you probably will not use such 
    iterators with an unbounded for..of loop, as it would never end and would hang your program.
*/
var randoms = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				return { value: Math.random() };
			}
		};
	}
};

var randoms_pool = [];
for (var n of randoms) {
	randoms_pool.push( n );

	// don't proceed unbounded!
	if (randoms_pool.length === 100) break;
}
// This iterator will generate random numbers "forever", so we're careful to only pull out 100 values so our program doesn't hang.


// Let's try constructing an iterator that produces the infinite series of numbers in the Fibonacci sequence:
var Fib = {
	[Symbol.iterator]() {
		var n1 = 1, n2 = 1;

		return {
			// make the iterator an iterable
			[Symbol.iterator]() { return this; },

			next() {
				var current = n2;
				n2 = n1;
				n1 = n1 + current;
				return { value: current, done: false };
			},

			return(v) {
				console.log(
					"Fibonacci sequence abandoned."
				);
				return { value: v, done: true };
			}
		};
	}
};

for (var v of Fib) {
	console.log( v );

	if (v > 50) break;
}
// 1 1 2 3 5 8 13 21 34 55
// Fibonacci sequence abandoned.


// Let's next consider an iterator that is designed to run through a series (aka a queue) of actions, one item at a time:
var tasks = {
	[Symbol.iterator]() {
		var steps = this.actions.slice();

		return {
			// make the iterator an iterable
			[Symbol.iterator]() { return this; },

			next(...args) {
				if (steps.length > 0) {
					let res = steps.shift()( ...args );
					return { value: res, done: false };
				}
				else {
					return { done: true }
				}
			},

			return(v) {
				steps.length = 0;
				return { value: v, done: true };
			}
		};
	},
	actions: []
};
// The iterator on tasks steps through functions found in the actions array property, if any, and executes them one at a time, passing in whatever arguments you pass to next(..), and returning any return value to you in the standard IteratorResult object.

//Here's how we could use this tasks queue:
tasks.actions.push(
	function step1(x){
		console.log( "step 1:", x );
		return x * 2;
	},
	function step2(x,y){
		console.log( "step 2:", x, y );
		return x + (y * 2);
	},
	function step3(x,y,z){
		console.log( "step 3:", x, y, z );
		return (x * y) + z;
	}
);

var it = tasks[Symbol.iterator]();

it.next( 10 );			// step 1: 10
						// { value:   20, done: false }

it.next( 20, 50 );		// step 2: 20 50
						// { value:  120, done: false }

it.next( 20, 50, 120 );	// step 3: 20 50 120
						// { value: 1120, done: false }

it.next();				// { done: true }




// Array destructuring can partially or completely (if paired with a ... rest/gather operator) consume an iterator:
var a = [1,2,3,4,5];
var it = a[Symbol.iterator]();

var [x,y] = it;			// take just the first two elements from `it`
var [z, ...w] = it;		// take the third, then the rest all at once
// is `it` fully exhausted? Yep.
it.next();				// { value: undefined, done: true }

x;						// 1
y;						// 2
z;						// 3
w;						// [4,5]