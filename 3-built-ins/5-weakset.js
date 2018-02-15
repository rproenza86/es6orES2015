/**
 * What is a WeakSet?
    A WeakSet is just like a normal Set with a few key differences:
        1. WeakSet can only contain objects
        2. WeakSet is not iterable which means it can’t be looped over
        3. WeakSet does not have a .clear() method
 */

//You can create a WeakSet just like you would a normal Set, except that you use the WeakSet constructor.

const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
let student3 = { name: 'Richard', age: 31, gender: 'male' };

let roster = new WeakSet([student1, student2, student3]);
console.log(roster); // WeakSet { Object { name: 'Julia', age: 27, gender: 'female' }, Object { name: 'Richard', age: 31, gender: 'male' }, Object { name: 'James', age: 26, gender: 'male' } }

// …but if you try to add something other than an object, you’ll get an error!
roster.add('Amanda'); // Uncaught TypeError: Invalid value used in weak set(…)

/**
 * Garbage Collection
    In JavaScript, memory is allocated when new values are created and is "automatically" freed up when those values are no longer needed. 
    This process of freeing up memory after it is no longer needed is what is known as garbage collection.

    WeakSets take advantage of this by exclusively working with objects. If you set an object to null, then you’re essentially deleting the object. 
    And when JavaScript’s garbage collector runs, the memory that object previously occupied will be freed up to be used later in your program.
 */
student3 = null;
console.log(roster); // WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'James', age: 26, gender: 'male'}}



/*
 * Programming Quiz: Using Sets (3-2)
 *
 * Create the following variables:
 *     - uniqueFlavors and set it to a new WeakSet object
 *     - flavor1 and set it equal to `{ flavor: 'chocolate' }`
 *     - flavor2 and set it equal to an object with property 'flavor' and value of your choice!
 *
 * Use the `.add()` method to add the objects `flavor1` and `flavor2` to `uniqueFlavors`
 * Use the `.add()` method to add the `flavor1` object (again!) to the `uniqueFlavors` set
 */

const uniqueFlavors = new WeakSet([]);

const flavor1 = { flavor: 'chocolate' };
const flavor2 = { flavor: 'vanilla' };

uniqueFlavors.add(flavor1).add(flavor2);
uniqueFlavors.add(flavor1);