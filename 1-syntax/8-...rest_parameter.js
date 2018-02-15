/**
 * Rest parameter
 * The rest parameter, also written with three consecutive dots ( ... ), allows you to represent an indefinite number of elements as an array. This can be helpful in a couple of different situations.

 * One situation is when assigning the values of an array to variables. For example,
 */

const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order; // By using the rest parameter, items is assigned the rest of the values in the array (as an array).
console.log(total, subtotal, tax, items); // Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]
/* 
    This code takes the values of the order array and assigns them to individual variables using destructuring. total, 
    subtotal, and tax are assigned the first three values in the array, however, items is where you want to pay the most attention
*/

// NOTE: You can think of the rest parameter like the opposite of the spread operator; if the spread operator is like unboxing all 
// of the contents of a package, then the rest parameter is like taking all the contents and putting them back into the package.


/**
 * Variadic functions
 * Another use case for the rest parameter is when you’re working with variadic functions. 
 * 
 * Variadic functions are functions that take an indefinite number of arguments.
 */

sum(1, 2);
sum(10, 36, 7, 84, 90, 110);
sum(-23, 3000, 575000);
// There’s literally an endless number of ways the sum() function could be called. Regardless of the amount of numbers 
// passed to the function, it should always return the total sum of the numbers.

/**
 * Using the arguments object - Previous sum() JS version
 * In previous versions of JavaScript, this type of function would be handled using the arguments object. The arguments object 
 * is an array-like object that is available as a local variable inside all functions. It contains a value for each argument 
 * being passed to the function starting at 0 for the first argument, 1 for the second argument, and so on.
 */
function sum() {
    let total = 0;
    for (const argument of arguments) {
        total += argument;
    }
    return total;
}
/*
Now this works fine, but it does have its issues:

    1.- If you look at the definition for the sum() function, it doesn’t have any parameters.
        1.1 This is misleading because we know the sum() function can handle an indefinite amount of arguments.
    2.- It can be hard to understand.
        2.1 If you’ve never used the arguments object before, then you would most likely look at this code and wonder where the arguments object is even coming from. 
        Did it appear out of thin air? It certainly looks that way
*/

/**
 * Using the rest parameter
 * Fortunately, with the addition of the rest parameter, you can rewrite the sum() function to read more clearly.
 */
function sum(...nums) {
    let total = 0;
    for (const num of nums) {
        total += num;
    }
    return total;
}
// This version of the sum() function is both more concise and is easier to read. Also, notice the for...in loop has been replaced with the new for...of loop.