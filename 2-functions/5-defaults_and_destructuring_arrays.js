// Ex. 1.1
function createGrid([width = 5, height = 5]) {
    return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
// There is a problem with this though, the following code will not work:
createGrid(); // throws an error : Uncaught TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined

// This throws an error because createGrid() expects an array to be passed in that it will then destructure. 
// Since the function was called without passing an array, it breaks. But, we can use default function parameters for this!

// Solution: default array as param 
// Ex. 1.2
function createGrid([width = 5, height = 5] = []) {
    return `Generates a ${width} x ${height} grid`;
}
createGrid(); // Generates a 5 x 5 grid



/**
 * Defaults and destructuring objects
    Just like array destructuring with array defaults, a function can have an object be a default parameter and use object destructuring:
 */
// Ex. 2.1
function createSundae({ scoops = 1, toppings = ['Hot Fudge'] }) {
    const scoopText = scoops === 1 ? 'scoop' : 'scoops';
    return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({ scoops: 2 }); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({ scoops: 2, toppings: ['Sprinkles'] }); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({ toppings: ['Cookie Dough'] }); // Your sundae has 1 scoop with Cookie Dough topping

// Just like the array example before, if you try calling the function without any arguments it won't work:
createSundae(); // throws an error: Uncaught TypeError: Cannot match against 'undefined' or 'null'.

// We can prevent this issue by providing a default object to the function:
// Ex. 2.2
function createSundae({ scoops = 1, toppings = ['Hot Fudge'] } = {}) {
    const scoopText = scoops === 1 ? 'scoop' : 'scoops';
    return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}
// By adding an empty object as the default parameter in case no arguments are provided, calling the function without any arguments now works.
createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.



/**
 * Array defaults vs. object defaults
    Default function parameters are a simple addition, but it makes our lives so much easier! One benefit of object defaults over array 
    defaults is how they handle skipped options. Check this out:
 */
// Ex. 3.1
function createSundae({ scoops = 1, toppings = ['Hot Fudge'] } = {}) {

}

// ...with the createSundae() function using object defaults with destructuring, if you want to use the default value for scoops but change 
//    the toppings, then all you need to do is pass in an object with toppings:
createSundae({ toppings: ['Hot Fudge', 'Sprinkles', 'Caramel'] });


//Compare the above example with the same function that uses array defaults with destructuring.
// Ex. 3.2
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) {

}

// With this function setup, if you want to use the default number of scoops but change the toppings, you'd have to call your function a little...oddly:
createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);

// NOTE: Unless you've got a strong reason to use array defaults with array destructuring, we recommend going with object defaults with object destructuring!