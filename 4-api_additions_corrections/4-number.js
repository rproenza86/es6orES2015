// Two additions to Number are just references to the preexisting globals: Number.parseInt(..) and Number.parseFloat(..).

/**
 * Number.isNaN(..) Static Function
 */
var a = NaN, b = "NaN", c = 42;

isNaN( a );							// true
isNaN( b );							// true -- oops!
isNaN( c );							// false

Number.isNaN( a );					// true
Number.isNaN( b );					// false -- fixed!
Number.isNaN( c );					// false

/**
 * Number.isFinite(..) Static Function
 */
var a = NaN, b = Infinity, c = 42;

Number.isFinite( a );				// false
Number.isFinite( b );				// false

Number.isFinite( c );				// true
// The standard global isFinite(..) coerces its argument, but Number.isFinite(..) omits the coercive behavior:
var a = "42";

isFinite( a );						// true
Number.isFinite( a );				// false


/**
 * Integer-Related Static Functions
 */
Number.isInteger( 4 );				// true
Number.isInteger( 4.2 );			// false
// Note: In JavaScript, there's no difference between 4, 4., 4.0, or 4.0000. All of these would be considered an "integer", and would thus yield true from Number.isInteger(..).
Number.isInteger( NaN );			// false
Number.isInteger( Infinity );		// false

// Because of Number.isInteger(..)'s handling of NaN and Infinity values, defining a isFloat(..) utility would not be just as simple as !Number.isInteger(..). You'd need to do something like:

function isFloat(x) {
	return Number.isFinite( x ) && !Number.isInteger( x );
}

isFloat( 4.2 );						// true
isFloat( 4 );						// false

isFloat( NaN );						// false
isFloat( Infinity );				// false