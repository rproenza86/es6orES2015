/**
 * Sets
 *  In ES6, there’s a new built-in object that behaves like a mathematical set and works similarly to an array. 
 *  This new object is conveniently called a "Set". The biggest differences between a set and an array are:
        - Sets are not indexed-based - you do not refer to items in a set based on their position in the set
        - items in a Set can’t be accessed individually

 *  Basically, a Set is an object that lets you store unique items. You can add items to a Set, remove items from a Set, 
 *  and loop over a Set. These items can be either primitive values or objects.
 */
var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );
s.add( x );

s.size;							// 2

s.delete( y );
s.size;							// 1

s.clear();
s.size;							// 0

/**
 * How to Create a Set
 */
let games = new Set();
console.log(games); // Set {}

// If you want to create a Set from a list of values, you use an array:
games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(games); // Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}
// NOTE: Notice the example above automatically removes the duplicate entry "Super Mario Bros." when the Set is created. Pretty neat!


/**
 * Modifying Sets
    After you’ve created a Set, you’ll probably want to add and delete items from the Set. So how do you that? You use the appropriately named, .add() and .delete() methods:
 */
games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Super Mario Bros.');

console.log(games); // Set {'Banjo-Kazooie', 'Mario Kart', 'Banjo-Tooie', 'Age of Empires'}

// On the other hand, if you want to delete all the items from a Set, you can use the .clear() method.
games.clear()
console.log(games); // Set {}

/* 
TIP: If you attempt to .add() a duplicate item to a Set, you won’t receive an error, but the item will not be added to the Set. 
     Also, if you try to .delete() an item that is not in a Set, you won’t receive an error, and the Set will remain unchanged.

    .add() returns the Set if an item is successfully added. On the other hand, .delete() returns a Boolean (true or false) depending on successful deletion.
*/


/**
 * Working With Sets
 *  Checking The Length
 *      Once you’ve constructed your Set, there are a couple of different properties and methods you can use to work with Sets.
 */

// Use the .size property to return the number of items in a Set:
let months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
console.log(months.size); // 12
/**
 * Checking If An Item Exists
    Use the .has() method to check if an item exists in a Set. If the item is in the Set, then .has() will return true. If the item doesn’t exist in the Set, then .has() will return false.
 */
console.log(months.has('September')); // true
/**
 * Retrieving All Values
    Finally, use the .values() method to return the values in a Set. The return value of the .values() method is a SetIterator object.
 */
console.log(months.values()); // SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}
/* 
    TIP: The .keys() method will behave the exact same way as the .values() method by returning the values of a Set within a new Iterator Object. 
    The .keys() method is an alias for the .values() method for similarity with maps. 
    
    You’ll see the .keys() method later in this lesson during the Maps section
*/

/**
 * Set Iterators

    Sets have the same iterator methods as maps. Their behavior is different for sets, but symmetric with the behavior of map iterators. Consider:
 */
var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x ).add( y );

var keys = [ ...s.keys() ],
	vals = [ ...s.values() ],
	entries = [ ...s.entries() ];

keys[0] === x;
keys[1] === y;

vals[0] === x;
vals[1] === y;

entries[0][0] === x;
entries[0][1] === x;
entries[1][0] === y;
entries[1][1] === y;
// The keys() and values() iterators both yield a list of the unique values in the set. The entries() iterator yields a list of entry arrays, where both items of the array are the unique set value. The default iterator for a set is its values() iterator.

// The inherent uniqueness of a set is its most useful trait. For example:
var s = new Set( [1,2,3,4,"1",2,4,"5"] ),
	uniques = [ ...s ];

uniques;						// [1,2,3,4,"1","5"]
// Set uniqueness does not allow coercion, so 1 and "1" are considered distinct values