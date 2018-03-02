/**
 * Spread operator
 * The spread operator, written with three consecutive dots ( ... ), is new in ES6 and gives you the ability to expand, or spread, iterable objects 
 * into multiple elements.
 */

const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
// Prints: Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
// Prints: 2 3 5 7 11 13 17 19 23 29

/**
 * If you look at the output from the examples, notice that both the array and set have been expanded into their individual elements. 
 * So how is this useful?
 */


/**
 * Combining arrays with concat
 * One example of when the spread operator can be useful is when combining arrays.

 * If you’ve ever needed to combine multiple arrays, prior to the spread operator, you were forced to use the Array’s concat() method.
 */

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
let produce = fruits.concat(vegetables);
console.log(produce); // Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

produce = [fruits, vegetables];
console.log(produce); // Prints: [Array[3], Array[3]]

produce = [...fruits, ...vegetables];
console.log(produce); // Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]