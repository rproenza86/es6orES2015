/**
 * Bitwise operators treat their operands as a sequence of 32 bits (zeroes and ones), rather than as decimal, hexadecimal, 
 * or octal numbers. For example, the decimal number nine has a binary representation of 1001. Bitwise operators perform 
 * their operations on such binary representations, but they return standard JavaScript numerical values.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
 */

console.log(5 & 13); // 0101 & 1101 = 0101
// expected output: 5;

console.log(parseInt("0101",2) & parseInt("1101",2));
// expected output: 5;

console.log(5 & 13 & 3); // 0101 & 1101 & 0011 = 0001
// expected output: 1;

console.log(5 | 13); // 0101 | 1101 = 1101
// expected output: 13

/*
    The following table summarizes JavaScript's bitwise operators:

    Operator	Usage	Description
    Bitwise AND	a & b	Returns a 1 in each bit position for which the corresponding bits of both operands are 1's.
    Bitwise OR	a | b	Returns a 1 in each bit position for which the corresponding bits of either or both operands are 1's.
    Bitwise XOR	a ^ b	Returns a 1 in each bit position for which the corresponding bits of either but not both operands are 1's.
    Bitwise NOT	~ a	Inverts the bits of its operand.
    Left shift	a << b	Shifts a in binary representation b (< 32) bits to the left, shifting in 0's from the right.
    Sign-propagating right shift	a >> b	Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off.
    Zero-fill right shift	a >>> b	Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off, and shifting in 0's from the left.
*/

// Example with indexOf:
var str = 'rawr';
var searchFor = 'a';

// This is alternative way of typing if (-1*str.indexOf('a') <= 0)
if (~str.indexOf(searchFor)) {
  // searchFor is in the string
} else {
  // searchFor is not in the string
}

// here are the values returned by (~str.indexOf(searchFor))
// r == -1
// a == -2
// w == -3


// Conversion snippets
    // Convert a binary String to a decimal Number:
    var sBinString = '1011';
    var nMyNumber = parseInt(sBinString, 2);
    alert(nMyNumber); // prints 11, i.e. 1011

    // Convert a decimal Number to a binary String:
    var nMyNumber = 11;
    var sBinString = nMyNumber.toString(2);
    alert(sBinString); // prints 1011, i.e. 11

// Automate Mask Creation
    // You can create multiple masks from a set of Boolean values, like this:
    function createMask() {
      var nMask = 0, 
          nFlag = 0, 
          nLen = arguments.length > 32 ? 32 : arguments.length;

      for (nFlag; nFlag < nLen; nMask |= arguments[nFlag] << nFlag++);
      return nMask;
    }
    var mask1 = createMask(true, true, false, true); // 11, i.e.: 1011
    var mask2 = createMask(false, false, true); // 4, i.e.: 0100
    var mask3 = createMask(true); // 1, i.e.: 0001
    // etc.
    
    alert(mask1); // prints 11, i.e.: 1011

// Reverse algorithm: an array of booleans from a mask
    // If you want to create an Array of Booleans from a mask you can use this code:

    function arrayFromMask(nMask) {
        // nMask must be between -2147483648 and 2147483647
        if (nMask > 0x7fffffff || nMask < -0x80000000) { 
            throw new TypeError('arrayFromMask - out of range'); 
        }
        for (var nShifted = nMask, aFromMask = []; nShifted; 
            aFromMask.push(Boolean(nShifted & 1)), nShifted >>>= 1);
        return aFromMask;
    }

    var array1 = arrayFromMask(11);
    var array2 = arrayFromMask(4);
    var array3 = arrayFromMask(1);

    alert('[' + array1.join(', ') + ']');
    // prints "[true, true, false, true]", i.e.: 11, i.e.: 1011

    // You can test both algorithms at the same time…
    var nTest = 19; // our custom mask
    var nResult = createMask.apply(this, arrayFromMask(nTest));

    alert(nResult); // 19

    // For didactic purpose only (since there is the Number.toString(2) method), we show how it is possible to modify the arrayFromMask algorithm in order to create a String containing the binary representation of a Number, rather than an Array of Booleans:
    function createBinaryString(nMask) {
        // nMask must be between -2147483648 and 2147483647
        for (var nFlag = 0, nShifted = nMask, sMask = ''; nFlag < 32;
            nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
        return sMask;
    }

    var string1 = createBinaryString(11);
    var string2 = createBinaryString(4);
    var string3 = createBinaryString(1);

    alert(string1);
    // prints 00000000000000000000000000001011, i.e. 11