/* 
    Regular functions can be either function declarations or function expressions, however arrow functions are always expressions. 
    In fact, their full name is "arrow function expressions", so they can only be used where an expression is valid. This includes being:

        * stored in a variable,
        * passed as an argument to a function,
        * and stored in an object's property.
*/

//  One confusing syntax is when an arrow function is stored in a variable
const greet = name => `Hello ${name}!`;
greet('Asser'); // Returns: Hello Asser!

// empty parameter list requires parentheses
const sayHi = () => console.log('Hello Udacity Student!');
sayHi(); // Prints: Hello Udacity Student!

// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle'); // Prints: Here's your chocolate ice cream in a waffle cone.

/**
 * Concise and block body syntax
    When the function only have a single expression as the function body, that format is called the "concise body syntax". 
    
    The concise syntax:
        * has no curly braces surrounding the function body
        * and automatically returns the expression.
 */
let upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
    name => name.toUpperCase()
);

// If you need more than just a single line of code in your arrow function's body, then you can use the "block body syntax".
upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(name => {
    name = name.toUpperCase();
    return `${name} has ${name.length} characters in their name`;
});

/**
 * When not to use an arrow function:
    - there's a gotcha with the this keyword in arrow functions
        * go to the next lesson to find out the details!
    - arrow functions are only expressions
        * there's no such thing as an arrow function declaration
 */