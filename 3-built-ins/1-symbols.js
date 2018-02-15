/**
 * Symbol:
 *  A symbol is a unique and immutable data type that is often used to identify object properties.
 */

// To create a symbol, you write Symbol() with an optional string as its description.
const sym1 = Symbol('apple');
console.log(sym1); // PRINT: Symbol(apple)

// NOTE: This will create a unique symbol and store it in sym1. The description "apple" is just a way to describe the symbol, but it can’t be used to access the symbol itself.

// How it works:
const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3); // PRINT: false

// Ex. 1 
//      The bowl contains fruit which are objects that are properties of the bowl. 
let bowl = {
    'apple': { color: 'red', weight: 136.078 },
    'banana': { color: 'yellow', weight: 183.15 },
    'orange': { color: 'orange', weight: 170.097 }
};
//      But, we run into a problem when the second banana gets added.
bowl = {
    'apple': { color: 'red', weight: 136.078 },
    'banana': { color: 'yellow', weight: 183.151 },
    'orange': { color: 'orange', weight: 170.097 },
    'banana': { color: 'yellow', weight: 176.845 }
};
console.log(bowl); // PRINT: Object {apple: Object, banana: Object, orange: Object}
//Instead of adding another banana to the bowl, our previous banana is overwritten by the new banana being added to the bowl. 

//To fix this problem, we can use symbols.
bowl = {
    [Symbol('apple')]: { color: 'red', weight: 136.078 },
    [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
    [Symbol('orange')]: { color: 'orange', weight: 170.097 },
    [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl); // PRINT: Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}

// NOTE: By changing the bowl’s properties to use symbols, each property is a unique Symbol and the first banana doesn’t get overwritten by the second banana.







// The main point of a symbol is to create a string-like value that can't collide with any other value. So, for example, consider using a symbol as a constant representing an event name:
const EVT_LOGIN = Symbol( "event.login" );
// You'd then use EVT_LOGIN in place of a generic string literal like "event.login":
evthub.listen( EVT_LOGIN, function(data){
	// ..
} );
// The benefit here is that EVT_LOGIN holds a value that cannot be duplicated (accidentally or otherwise) by any other value, so it is impossible for there to be any confusion of which event is being dispatched or handled.

/**
 * Symbol.for(..) looks in the global symbol registry to see if a symbol is already stored with the provided description text, and returns it if so. 
 * If not, it creates one to return. In other words, the global symbol registry treats symbol values, by description text, as singletons themselves.
 */
const EVT_LOGIN = Symbol.for( "event.login" );

console.log( EVT_LOGIN );		// Symbol(event.login)

function HappyFace() {
	const INSTANCE = Symbol.for( "instance" ); // symbol create and added to the global symbol registry.

	if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];

	// ..

	return HappyFace[INSTANCE] = { .. };
}

// To avoid accidental collisions, you'll probably want to make your symbol descriptions quite unique. Ex:  include prefix/context/namespacing information in them
function extractValues(str) {
	var key = Symbol.for( "extractValues.parse" ),
		re = extractValues[key] ||
			/[^=&]+?=([^&]+?)(?=&|$)/g,
		values = [], match;

	while (match = re.exec( str )) {
		values.push( match[1] );
	}

	return values;
}