// NOTE: Just remember that, under the hood, the same connections are made between functions and prototypes.

/**
 * super must be called before this
        In a subclass constructor function, before this can be used, a call to the super class must be made.
 */
class Apple {}
class GrannySmith extends Apple {
    constructor(tartnessLevel, energy) {
        this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
        super(energy);
    }
}




/**
 * meta property 'new.target'
 * 
 * The new.target meta property doesn't have much purpose in class constructors(only place where it works), except accessing a static property/method (see the next section).
 */
class Foo {
	constructor() {
		console.log( "Foo: ", new.target.name );
    }
    static cool() { console.log( "cool" ); }
	wow() { console.log( "wow" ); }
}

class Bar extends Foo {
	constructor() {
		super();
        console.log( "Bar: ", new.target.name );
        new.target.cool(); // accessing the static method,  from a non-static one
	}
	baz() {
		console.log( "baz: ", new.target );
    }
    static awesome() {
		super.cool();
		console.log( "awesome" );
	}
	neat() {
		super.wow();
		console.log( "neat" );
	}
}

var a = new Foo();
// Foo: Foo

var b = new Bar();
// Foo: Bar   <-- respects the `new` call-site
// Bar: Bar

b.baz();
// baz: undefined

// static checks:
Foo.cool();					// "cool"
Bar.cool();					// "cool"
Bar.awesome();				// "cool"
                            // "awesome"

var b = new Bar();
b.neat();					// "wow"
                            // "neat"

b.awesome;					// undefined
b.cool;						// undefined
// Be careful not to get confused that static members are on the class's prototype chain. They're actually on the dual/parallel chain between the function constructors.