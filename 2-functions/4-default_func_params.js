function greet(name, greeting) {
    name = (typeof name !== 'undefined') ? name : 'Student';
    greeting = (typeof greeting !== 'undefined') ? greeting : 'Welcome';

    return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!

/**
 * Default function parameters
    Default function parameters are quite easy to read since they're placed in the function's parameter list:
 */
function greet(name = 'Student', greeting = 'Welcome') {
    return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!