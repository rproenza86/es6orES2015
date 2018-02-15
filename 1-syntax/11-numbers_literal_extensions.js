// Here are the new ES6 number literal forms:
var dec = 42,
    oct = 0o52,			// or `0O52` :(
    hex = 0x2a,			// or `0X2a` :/
    bin = 0b101010;		// or `0B101010` :/

// And the string representations of these forms are all able to be coerced/converted to their number equivalent:
Number( "42" );			// 42
Number( "0o52" );		// 42
Number( "0x2a" );		// 42
Number( "0b101010" );	// 42

// Though not strictly new to ES6, it's a little-known fact that you can actually go the opposite direction of conversion (well, sort of):
var a = 42;

a.toString();			// "42" -- also `a.toString( 10 )`
a.toString( 8 );		// "52" octal
a.toString( 16 );		// "2a" hexahecimal
a.toString( 2 );		// "101010" binary
// NOTE: In fact, you can represent a number this way in any base from 2 to 36, though it'd be rare that you'd go outside the standard bases: 2, 8, 10, and 16.