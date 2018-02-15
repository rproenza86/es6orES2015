/**
 * Class is just a function
    Just to prove that there isn't anything special about class, check out this code:
 */

class Plane {
    constructor(numEngines) {
        this.numEngines = numEngines;
        this.enginesActive = false;
    }

    startEngines() {
        console.log('starting engines…');
        this.enginesActive = true;
    }
}

typeof Plane; // Returns: function

/**
 * ⚠️ Where Are All The Commas? ⚠️
    Did you notice that there aren't any commas between the method definitions in the Class? 
    Commas are not used to separate properties or methods in a Class. If you add them, you'll get a SyntaxError of unexpected token 
 */

/**
 * Static methods
    To add a static method, the keyword static is placed in front of the method name. Look at the badWeather() method in the code below.
 */
class Plane {
    constructor(numEngines) {
        this.numEngines = numEngines;
        this.enginesActive = false;
    }

    static badWeather(planes) {
        for (plane of planes) {
            plane.enginesActive = false;
        }
    }

    startEngines() {
        console.log('starting engines…');
        this.enginesActive = true;
    }
}
// That makes badWeather() a method that's accessed directly on the Plane class, so you can call it like this:
Plane.badWeather([plane1, plane2, plane3]);

/* 
    Benefits of classes
    Less setup
        There's a lot less code that you need to write to create a function
    Clearly defined constructor function
        Inside the class definition, you can clearly specify the constructor function.
    Everything's contained
        All code that's needed for the class is contained in the class declaration. Instead of having the 
        constructor function in one place, then adding methods to the prototype one-by-one, you can do everything all at once
*/

// NOTE: Using classes requires the use of new
//          When creating a new instance of a JavaScript class, the new keyword must be used

const plane1 = Plane(); // throws an error: Uncaught TypeError: Class constructor Toy cannot be invoked without 'new'
const plane2 = new Plane(); // this works!