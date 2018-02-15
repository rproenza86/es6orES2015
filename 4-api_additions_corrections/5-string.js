/**
 * String.raw(..) Static Function
 * 
 * The String.raw(..) utility is provided as a built-in tag function to use with template string literals (see Chapter 2) for obtaining the raw string value without any processing of escape sequences.
 */
var str = "bc";

String.raw`\ta${str}d\xE9`;
// "\tabcd\xE9", not "	abcdé"



/**
 * repeat(..) Prototype Function
 */
"foo".repeat( 3 );					// "foofoofoo"


/**
 * String Inspection Functions:
 * 
 * startsWith(..), endsWith(..), and includes(..).
 */
var palindrome = "step on no pets";

palindrome.startsWith( "step on" );	// true
palindrome.startsWith( "on", 5 );	// true

palindrome.endsWith( "no pets" );	// true
palindrome.endsWith( "no", 10 );	// true

palindrome.includes( "on" );		// true
palindrome.includes( "on", 6 );		// false

// For all the string search/inspection methods, if you look for an empty string "", it will either be found at the beginning or the end of the string.

// Warning: These methods will not by default accept a regular expression for the search string. 