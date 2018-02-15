/**
 * Array.of(..) Static Function
 * 
 * There's a well known gotcha with the Array(..) constructor, which is that if there's only one argument passed, and that argument is a number, instead of making an array of one element with that number value in it, it constructs an empty array with a length property equal to the number. This action produces the unfortunate and quirky "empty slots" behavior that's reviled about JS arrays.
 */
// Array.of(..) replaces Array(..) as the preferred function-form constructor for arrays, because Array.of(..) does not have that special single-number-argument case. Consider:
var a = Array( 3 );
a.length;						// 3
a[0];							// undefined

var b = Array.of( 3 );
b.length;						// 1
b[0];							// 3

var c = Array.of( 1, 2, 3 );
c.length;						// 3
c;				
/**
 * when to use Array.of(..)?
 * If you have a callback that's supposed to wrap argument(s) passed to it in an array, Array.of(..) fits the bill perfectly. That's probably not terribly common, but it may scratch an itch for you.
 * 
 * The other scenario is if you subclass Array (see "Classes" in Chapter 3) and want to be able to create and 
 * initialize elements in an instance of your subclass, such as:
 */
class MyCoolArray extends Array {
	sum() {
		return this.reduce( function reducer(acc,curr){
			return acc + curr;
		}, 0 );
	}
}

var x = new MyCoolArray( 3 );
x.length;						// 3 -- oops!
x.sum();						// 0 -- oops!

var y = [3];					// Array, not MyCoolArray
y.length;						// 1
y.sum();						// `sum` is not a function

var z = MyCoolArray.of( 3 );
z.length;						// 1
z.sum();						// 3




/**
 * Array.from(..) Static Function

    An "array-like object" in JavaScript is an object that has a length property on it, specifically with an integer value of zero or higher.
 */
var arrLike = {
	length: 3,
	0: "foo",
	1: "bar"
};

var arr = Array.from( arrLike );

var arrCopy = Array.from( arr );
//Another common task where slice(..) is often used is in duplicating a real array:

var arr2 = arr.slice();
//Consider:

var arrLike = {
	length: 4,
	2: "foo"
};

Array.from( arrLike );
// [ undefined, undefined, "foo", undefined ]



/**
 * find(..) Prototype Method
 * 
 */
// es5
ar a = [1,2,3,4,5];

(a.indexOf( 3 ) != -1);				// true
(a.indexOf( 7 ) != -1);				// false

(a.indexOf( "2" ) != -1);			// false

//es6
var a = [1,2,3,4,5];

a.find( function matcher(v){
	return v == "2";
} );								// 2

a.find( function matcher(v){
	return v == 7;					// undefined
});

// Using a custom matcher(..) function also lets you match against complex values like objects:

var points = [
	{ x: 10, y: 20 },
	{ x: 20, y: 30 },
	{ x: 30, y: 40 },
	{ x: 40, y: 50 },
	{ x: 50, y: 60 }
];

points.find( function matcher(point) {
	return (
		point.x % 3 == 0 &&
		point.y % 4 == 0
	);
} );	// { x: 30, y: 40 }



/**
 * findIndex(..) Prototype Method
 * 
 * use indexOf(..) if you need the index of a strict match, or findIndex(..) if you need the index of a more customized match.

    With indexOf(..) there's no control over its matching logic; it always uses === strict equality. 
    So ES6's findIndex(..) is the answer:
 */
var points = [
	{ x: 10, y: 20 },
	{ x: 20, y: 30 },
	{ x: 30, y: 40 },
	{ x: 40, y: 50 },
	{ x: 50, y: 60 }
];

points.findIndex( function matcher(point) {
	return (
		point.x % 3 == 0 &&
		point.y % 4 == 0
	);
} );								// 2

points.findIndex( function matcher(point) {
	return (
		point.x % 6 == 0 &&
		point.y % 7 == 0
	);
} ); // -1



/**
 * entries(), values(), keys() Prototype Methods
 */
var a = [1,2,3];

[...a.values()];					// [1,2,3]
[...a.keys()];						// [0,1,2]
[...a.entries()];					// [ [0,1], [1,2], [2,3] ]

[...a[Symbol.iterator]()];			// [1,2,3]