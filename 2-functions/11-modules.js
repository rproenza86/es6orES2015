/*
Modules

The most common usage of closure in JavaScript is the module pattern. Modules let you define private implementation details (variables, functions) 
that are hidden from the outside world, as well as a public API that is accessible from the outside.

Consider:
*/

function User(){
	var username, password;

	function doLogin(user,pw) {
		username = user;
		password = pw;

		// do the rest of the login work
	}

	var publicAPI = {
		login: doLogin
	};

	return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( "fred", "12Battery34!" );


/**
 * exporting API Members

	The export keyword is either put in front of a declaration, or used as an operator (of sorts) with a special list of bindings to export. Consider:
 */
export function foo() {
	// ..
}

export var awesome = 42;

var bar = [1,2,3];
export { bar };

// Another way of expressing the same exports:
function foo() {
	// ..
}

var awesome = 42;
var bar = [1,2,3];

export { foo, awesome, bar };

// You can also "rename" (aka alias) a module member during named export:
function foo() { .. }

export { foo as bar }; // When this module is imported, only the bar member name is available to import; foo stays hidden inside the module.

// There can only be one default per module definition. 
// There's a subtle nuance to default export syntax that you should pay close attention to. Compare these two snippets:
function foo(..) {
	// ..
}
export default foo;

// And this one:
function foo(..) {
	// ..
}
export { foo as default };

// By the way, the first snippet could also have been written as:
export default function foo(..) {
	// ..
}

// You can do the good way:
export default function foo() { .. }

export function bar() { .. }
export function baz() { .. }

// Alternatively, some will prefer:
function foo() { .. }
function bar() { .. }
function baz() { .. }

export { foo as default, bar, baz, .. };

// You can also re-export another module's exports, such as:
export { foo, bar } from "baz";
export { foo as FOO, bar as BAR } from "baz";
export * from "baz";


/**
 * importing API Members
 */
import { foo as theFooFunc, bar, baz } from "foo";

theFooFunc();

// If the module has just a default export that you want to import and bind to an identifier, you can opt to skip the { .. } surrounding syntax for that binding. 
import foo from "foo";

// or:
import { default as foo } from "foo";

// You can also import a default export along with other named exports, if the module has such a definition. 
// Recall this module definition from earlier:
export default function foo() { .. }

export function bar() { .. }
export function baz() { .. }
// To import that module's default export and its two named exports:

import FOOFN, { bar, baz as BAZ } from "foo";

FOOFN(); // default module: foo()
bar();
BAZ();

// The import statement has a syntax variation that can support this style of module consumption, called namespace import.
// Consider a "foo" module exported as:
export function bar() { .. }
export var x = 42;
export function baz() { .. }

// You can import that entire API to a single module namespace binding:
import * as foo from "foo";

foo.bar();
foo.x;			// 42
foo.baz();

// If the module you're importing with * as .. has a default export, it is named default in the namespace specified.
export default function foo() { .. }
export function bar() { .. }
export function baz() { .. }

// And this import:
import foofn, * as hello from "world";

foofn();
hello.default();
hello.bar();
hello.baz();

// NOTE: All imported bindings are immutable and/or read-only. Consider the previous import; all of these subsequent assignment attempts will throw TypeErrors:

foofn = 42;			// (runtime) TypeError!
hello.default = 42;	// (runtime) TypeError!
hello.bar = 42;		// (runtime) TypeError!
hello.baz = 42;		// (runtime) TypeError!



/**
 * Loading Modules Outside of Modules
 * 
 * One use for interacting directly with the module loader is if a non-module needs to load a module. Consider:
 */
// normal script loaded in browser via `<script>`,
// `import` is illegal here

Reflect.Loader.import( "foo" ) // returns a promise for `"foo"`
.then( function(foo){
	foo.bar();
} )
/**
 * The Reflect.Loader.import(..) utility imports the entire module onto the named parameter (as a namespace), just like the import * as 
 * foo .. namespace import we discussed earlier.
 * 
 * Note: The Reflect.Loader.import(..) utility returns a promise that is fulfilled once the module is ready. To import multiple modules, 
 * you can compose promises from multiple Reflect.Loader.import(..) calls using Promise.all([ .. ]). For more information about Promises, 
 * see "Promises" in Chapter 4.
 */

//  Customized Loading
Reflect.Loader.import( "foo", { address: "/path/to/foo.js" } )
.then( function(foo){
	// ..
} )