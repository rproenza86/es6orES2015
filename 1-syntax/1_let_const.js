// What do you expect to be the output from running getClothing(false)?
function getClothing(isCold) {
    if (isCold) {
        var freezing = 'Grab a jacket!';
    } else {
        var hot = 'It’s a shorts kind of day.';
        console.log(freezing);
    }
}

console.clear();
getClothing(false); // will return "undefined"
/**
 * Hoisting:
 * Hoisting is a result of how JavaScript is interpreted by your browser. Essentially, before any JavaScript code is executed, 
 * all variables are "hoisted", which means they're raised to the top of the function scope. So at run-time, the getClothing() 
 * function actually looks more like this…
 * 
      function getClothing(isCold) {
          var freezing, hot;
          if (isCold) {
              freezing = 'Grab a jacket!';
          } else {
              hot = 'It’s a shorts kind of day.';
              console.log(freezing);
          }
      }
 */


/**
 * let and const :
 * Variables declared with let and const eliminate this specific issue of hoisting because they’re scoped to the block, not to the function. 
 * Previously, when you used var, variables were either scoped globally or locally to an entire function scope.
 *   
 * If a variable is declared using let or const inside a block of code (denoted by curly braces { }), then the variable 
 * is stuck in what is known as the temporal dead zone until the variable’s declaration is processed. This behavior prevents
 * variables from being accessed only until after they’ve been declared.
 */

// Variables declared with let and const are only available within the block they're declared.
function getClothing(isCold) {
    if (isCold) {
        const freezing = 'Grab a jacket!';
    } else {
        const hot = 'It’s a shorts kind of day.';
        console.log(freezing);
    }
}
console.clear();
getClothing(false); // will return : Uncaught ReferenceError: freezing is not defined

/**
 * use let when you plan to reassign new values to a variable, and
 * use const when you don’t plan on reassigning new values to a variable.
 */