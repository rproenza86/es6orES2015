/**
 * Pausable Functions
    If we do want to be able to pause a function mid-execution, then we'll need a new type of function available to us in ES6 - generator functions! Let's look at one:
 */
function* c() {
        console.log('the function has started');

        yield;
        
        const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

        for (const name of names) {
            console.log(name);
        }

        yield;

        console.log('the function has ended');
    }
    // NOTICE the asterisk (i.e. *) right after the function keyword? That asterisk indicates that this function is actually a generator!

// Now check out what happens when we try running this function:
var getEmployeeIt =  getEmployee(); //  doesn't actually run the code in the generator. Instead, it produces an iterator that will control the generator to execute its code.
// this is the response I get in Chrome:
// getEmployee {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}

// to start/advanced `*getEmployee()`, call
// `getEmployeeIt.next(..)`