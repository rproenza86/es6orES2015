/**
 * Using the SetIterator
    Because the .values() method returns a new iterator object (called SetIterator), you can store that iterator object in a variable and loop 
    through each item in the Set using .next().
 */
let months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
const iterator = months.values();
iterator.next(); // Object {value: 'January', done: false}
iterator.next(); // Object {value: 'February', done: false}
// And so on until done equals true which marks the end of the Set.

/**
 * Using a for...of Loop
    An easier method to loop through the items in a Set is the for...of loop.
 */
const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
    console.log(color);
}
/*
    PRINT:
        red
        orange
        yellow
        green
        blue
        violet
        brown
        black
*/

/*
 * Programming Quiz: Using Sets (3-1)
 *
 * Create a Set object and store it in a variable named `myFavoriteFlavors`. Add the following strings to the set:
 *     - chocolate chip
 *     - cookies and cream
 *     - strawberry
 *     - vanilla
 *
 * Then use the `.delete()` method to remove "strawberry" from the set.
 */

const myFavoriteFlavors = new Set();

myFavoriteFlavors.add('chocolate chip').add('cookies and cream').add('strawberry').add('vanilla');

myFavoriteFlavors.delete('strawberry');

console.log(myFavoriteFlavors);