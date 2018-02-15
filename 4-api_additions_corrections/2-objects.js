/**
 * Object.is(..) Static Function
 * 
 * It makes value comparisons in an even more strict fashion than the === comparison.
 */
// Consider:
var x = NaN, y = 0, z = -0;

x === x;							// false
y === z;							// true

Object.is( x, x );					// true
Object.is( y, z );					// false
/*
    You should continue to use === for strict equality comparisons; Object.is(..) shouldn't be thought of as a replacement for the operator. However, in cases where you're trying to strictly identify a NaN or -0 value, Object.is(..) is now the preferred option.
*/



/**
 * Object.getOwnPropertySymbols(..) Static Function
 * 
 * Symbols are likely going to be mostly used as special (meta) properties on objects. So the Object.getOwnPropertySymbols(..) utility was introduced, which retrieves only the symbol properties directly on an object:
 */
var o = {
	foo: 42,
	[ Symbol( "bar" ) ]: "hello world",
	baz: true
};

Object.getOwnPropertySymbols( o );	// [ Symbol(bar) ]



/**
 * Object.assign(..) Static Function
 * 
 * The first argument is the target, and any other arguments passed are the sources, which will be processed in listed order. For each source, its enumerable and own (e.g., not "inherited") keys, including symbols, are copied as if by plain = assignment
 */
// Consider this object setup:

var target = {},
o1 = { a: 1 }, o2 = { b: 2 },
o3 = { c: 3 }, o4 = { d: 4 };

// setup read-only property
Object.defineProperty( o3, "e", {
value: 5,
enumerable: true,
writable: false,
configurable: false
} );

// setup non-enumerable property
Object.defineProperty( o3, "f", {
value: 6,
enumerable: false
} );

o3[ Symbol( "g" ) ] = 7;

// setup non-enumerable symbol
Object.defineProperty( o3, Symbol( "h" ), {
value: 8,
enumerable: false
} );

Object.setPrototypeOf( o3, o4 );
o3.d // 4

// Only the properties a, b, c, e, and Symbol("g") will be copied to target:
Object.assign( target, o1, o2, o3 ); // {a: 1, b: 2, c: 3, e: 5, Symbol(g): 7}

target.a;							// 1
target.b;							// 2
target.c;							// 3

Object.getOwnPropertyDescriptor( target, "e" );
// { value: 5, writable: true, enumerable: true,
//   configurable: true }

Object.getOwnPropertySymbols( target );
// [Symbol("g")]
// The d, f, and Symbol("h") properties are omitted from copying; non-enumerable properties and non-owned properties are all excluded from the assignment. Also, e is copied as a normal property assignment, not duplicated as a read-only property.

// In an earlier section, we showed using setPrototypeOf(..) to set up a [[Prototype]] relationship between an o2 and o1 object. There's another form that leverages Object.assign(..):

var o1 = {
	foo() { console.log( "foo" ); }
};

var o2 = Object.assign(
	Object.create( o1 ), // Note: Object.create(..) is the ES5 standard utility that creates an empty object that is [[Prototype]]-linked
	{
		// .. o2's definition ..
	}
);

// delegates to `o1.foo()`
o2.foo();		