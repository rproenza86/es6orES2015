/**
 * Object literal shorthand
 * You’ve probably written code where an object is being initialized using the same property names as the variable names being assigned to them.
 */

let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
    type: type,
    color: color,
    carat: carat
};

console.log(gemstone); // Prints: Object {type: "quartz", color: "rose", carat: 21.29}

let gemstone_shorthand = {
    type,
    color,
    carat,
    calculateWorth: function() {
        // will calculate worth of gemstone based on type, color, and carat
    }
}; // In this example, an anonymous function is being assigned to the property calculateWorth, but is the function keyword really needed? In ES6, it’s not!

/**
 * Shorthand method names
 * Since you only need to reference the gemstone’s calculateWorth property in order to call the function, having the function keyword is redundant, so it can be dropped.
 */
gemstone_shorthand = {
    type,
    color,
    carat,
    calculateWorth() { /*...*/ }
};