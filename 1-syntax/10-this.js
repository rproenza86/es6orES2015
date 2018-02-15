/*
    "this" is actually a binding that is made when a function is invoked, and what it references is determined entirely 
    by the call-site(context) where the function is called.
*/

// This code snippet allows the identify() and speak() functions to be re-used against multiple context (me and you) 
// objects, rather than needing a separate version of the function for each object.

function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER

// Instead of relying on this, you could have explicitly passed in a context object to both identify() and speak().
function identify(context) {
	return context.name.toUpperCase();
}

function speak(context) {
	var greeting = "Hello, I'm " + identify( context );
	console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE

/*
    However, the this mechanism provides a more elegant way of implicitly "passing along" an object reference, leading to 
    cleaner API design and easier re-use.

    The more complex your usage pattern is, the more clearly you'll see that passing context around as an explicit 
    parameter is often messier than passing around a this context. When we explore objects and prototypes, you will 
    see the helpfulness of a collection of functions being able to automatically reference the proper context object
*/

// Yet another way of approaching the issue is to force this to actually point at the foo function object:
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	// Note: `this` IS actually `foo` now, based on
	// how `foo` is called (see below)
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		// using `call(..)`, we ensure the `this`
		// points at the function object (`foo`) itself
		foo.call( foo, i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4


//Which is more precedent, implicit binding or explicit binding? Let's test it:
function foo() {
	console.log( this.a );
}

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
// So, explicit binding takes precedence over implicit binding, which means you should ask first if explicit binding applies before checking for implicit binding.

// Now, we just need to figure out where new binding fits in the precedence.
function foo(something) {
	this.a = something;
}

var obj1 = {
	foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4