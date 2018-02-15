// The following code takes a list of names and converts each one to uppercase using a regular function:
let upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
    return name.toUpperCase();
});

// The code below does the same thing except instead of passing a regular function to the map() method, 
// it passes an arrow function. Notice the arrow in the arrow function ( => ) in the code below:
upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
    name => name.toUpperCase()
);


/**
 * Problem with this scope:
 * Issue: 'this' scope predictibility depend on how the function is called
 */
// problem :
var controller = {
	makeRequest: function(..){
		var self = this;

		btn.addEventListener( "click", function(){
			// ..
			self.makeRequest(..);
		}, false );
	}
};

// solution: 
var controller = {
	makeRequest: function(..){
		btn.addEventListener( "click", () => {
			// ..
			this.makeRequest(..);
		}, false );
	}
};
// Explanation: 'this' in the arrow function callback points to the same value as in the enclosing makeRequest(..) function. 
//              In other words, => is a syntactic stand-in for var self = this(or, alternatively, a function .bind(this) call).

/**
 * Conclusion: So now we can conclude a more nuanced set of rules for when => is appropriate and not:

    If you have a short, single-statement inline function expression, where the only statement is a return of some computed value, 
    and that function doesn't already make a this reference inside it, and there's no self-reference (recursion, event binding/unbinding), 
    and you don't reasonably expect the function to ever be that way, you can probably safely refactor it to be an => arrow function.
    
    If you have an inner function expression that's relying on a var self = this hack or a .bind(this) call on it in the enclosing function 
    to ensure proper this binding, that inner function expression can probably safely become an => arrow function.
    
    If you have an inner function expression that's relying on something like var args = Array.prototype.slice.call(arguments) in the 
    enclosing function to make a lexical copy of arguments, that inner function expression can probably safely become an => arrow function.
    
    For everything else -- normal function declarations, longer multistatement function expressions, functions that need a lexical name 
    identifier self-reference (recursion, etc.), and any other function that doesn't fit the previous characteristics -- you should probably 
    avoid => function syntax.
 */