//  Extract data from arrays and objects into distinct variables using destructuring.
const point = [10, 25, -34];

const gemstone = {
    type: 'quartz',
    color: 'rose',
    karat: 21.29
};

/**
 * Destructuring:
 * Destructuring borrows inspiration from languages like Perl and Python by allowing you to specify the elements 
 * you want to extract from an array or object on the left side of an assignment. It sounds a little weird, but 
 * you can actually achieve the same result as before, but with much less code; and it's still easy to understand.
 */

const [x, y, z] = point;
console.log(x, y, z); // Prints: 10 25 -34
/**
 * In this example, the brackets [ ] represent the array being destructured and x, y, and z represent the variables 
 * where you want to store the values from the array. Notice how you don’t have to specify the indexes for where to 
 * extract the values from because the indexes are implied.
 */
// TIP: You can also ignore values when destructuring arrays. For example, const [x, , z] = point; ignores the y coordinate and discards it.

const { type, color, karat } = gemstone;
console.log(type, color, karat); // Prints: quartz rose 21.29
/**
 * In this example, the curly braces { } represent the object being destructured and type, color, and karat represent the variables where you want 
 * to store the properties from the object. Notice how you don’t have to specify the property from where to extract the values. Because gemstone has 
 * a property named type, the value is automatically stored in the type variable. Similarly, gemstone has a color property, so the value of color 
 * automatically gets stored in the color variable. And it's the same with karat.
 */
// TIP: You can also specify the values you want to select when destructuring an object. For example, let {color} = gemstone; will only select the color property from the gemstone object.



/**
 * Important note about destructing:
 * 
 * In object literals the { property : value } assignations works as { target <-- source }, 
 * and object destructuring assignments are { source --> target }. 
 * 
 * See how that's flipped?
 * 
 * x: bam => x is the source and bam in the variable target
 */
// Ex. 1
function bar() {
	return {
		x: 4,
		y: 5,
		z: 6
	};
}
var { x: bam, y: baz, z: bap } = bar();

console.log( bam, baz, bap );		// 4 5 6
console.log( x, y, z );				// ReferenceError

// Ex. 2 . There's another way to think about this syntax though, which may help ease the confusion. Consider:
var aa = 10, bb = 20;

var o = { x: aa, y: bb };
var     { x: AA, y: BB } = o;

console.log( AA, BB );				// 10 20




/**
 * Assignment operations.
 */
var a, b, c, x, y, z;

[a,b,c] = foo();
( { x, y, z } = bar() ); // check NOTE

console.log( a, b, c );				// 1 2 3
console.log( x, y, z );				// 4 5 6
/**
 * NOTE: For the object destructuring form specifically, when leaving off a var/let/const declarator, 
 *       we had to surround the whole assignment expression in ( ), because otherwise the { .. } on the 
 *       lefthand side as the first element in the statement is taken to be a block statement instead of an object.
 */

//  Anything that's a valid assignment expression is allowed. For example:
var o = {};
( { x: o.x, y: o.y, z: o.z } = bar() );

console.log( o.x, o.y, o.z );		// 4 5 6

// You can even use computed property expressions in the destructuring. Consider:
var which = "x",
o = {};

( { [which]: o[which] } = bar() );

console.log( o.x );					// 4

// That also means you can both destructure a sub-object/array property and also capture the sub-object/array's value itself. Consider:
var { a: { x: X, x: Y }, a } = { a: { x: 1 } };

X;	// 1
Y;	// 1
a;	// { x: 1 }

( { a: X, a: Y, a: [ Z ] } = { a: [ 1 ] } );

X.push( 2 );
Y[0] = 10;

X;	// [10,2]
Y;	// [10,2]
Z;	// 1

// harder to read:
var { a: { b: [ c, d ], e: { f } }, g } = obj;

// better:
var {
	a: {
		b: [ c, d ],
		e: { f }
	},
	g
} = obj;


// Destructing renaming property and assigning default value
var obj = { x: 4,y: 5,z: 6 };
var { x = 5, y = 10, z = 15, w: WW = 20 } = obj;

console.log( x, y, z, WW );			// 4 5 6 20


/**
 * PROBLEM:
 * Make deep clone of objects or merge two objects checking props existence
 */
var defaults = {
	options: {
		remove: true,
		enable: false,
		instance: {}
	},
	log: {
		warn: true,
		error: true
	}
};

var config = {
	options: {
		remove: false,
		instance: null
	}
}

// You can of course do so manually, as you might have done in the past:
config.options = config.options || {};
config.options.remove = (config.options.remove !== undefined) 
                        ? config.options.remove 
                        : defaults.options.remove;
config.options.enable = (config.options.enable !== undefined) 
                        ? config.options.enable 
                        : defaults.options.enable;
// ...

// Solution
// merge `defaults` into `config`
{
	// destructure (with default value assignments)
	let {
		options: {
			remove = defaults.options.remove,
			enable = defaults.options.enable,
			instance = defaults.options.instance
		} = {},
		log: {
			warn = defaults.log.warn,
			error = defaults.log.error
		} = {}
	} = config;

	// restructure
	config = {
		options: { remove, enable, instance },
		log: { warn, error }
	};
}