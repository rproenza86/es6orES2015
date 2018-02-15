// The for loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
    console.log(digits[i]);
} // Really the biggest downside of a for loop is having to keep track of the counter and exit condition.
/** Prints:
0
1
2
3
4
5
6
7
8
9
} */

// The for...in loop
for (const index in digits) {
    console.log(digits[index]);
} // The for...in loop improves upon the weaknesses of the for loop by eliminating the counting logic and exit condition.
/** Prints:
0
1
2
3
4
5
6
7
8
9
} */

/**
 * The for...in loop can get you into big trouble when you need to add an extra method to an array (or another object). 
 * Because for...in loops loop over all enumerable properties, this means if you add any additional properties to the 
 * array's prototype, then those properties will also appear in the loop.
 */
Array.prototype.decimalfy = function() {
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].toFixed(2);
    }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
    console.log(digits[index]);
}
/** Prints:
0
1
2
3
4
5
6
7
8
9
function() {
 for (let i = 0; i < this.length; i++) {
  this[i] = this[i].toFixed(2);
 }
} */

// NOTE: The forEach loop is another type of for loop in JavaScript. However, forEach() is actually an array method, 
// so it can only be used exclusively with arrays. There is also no way to stop or break a forEach loop. If you need 
// that type of behavior in your loop, you’ll have to use a basic for loop.