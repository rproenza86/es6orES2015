new Promise(function() {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {};
        // request ice cream
        // get cone
        // warm up ice cream scoop
        // scoop generous portion into cone!
        if (iceCreamConeIsEmpty(flavor)) {
            reject(`Sorry, we're out of that flavor :-(`); // "reject" indicate that this function should be used if the request fails for some reason. So the reject method is used when the request could not be completed
        }
        resolve(sundae); // The resolve method is used to indicate that the request is complete and that it completed successfully.
    }, Math.random() * 2000);
});
// This code creates a promise that will start in a few seconds after I make the request. Then there are a number of steps that need to be made in the createSundae function.
/*
    A Promise constructor takes a function that will run and then, after some amount of time, will either complete successfully (using the resolve method) 
    or unsuccessfully (using the reject method). When the outcome has been finalized (the request has either completed successfully or unsuccessfully), 
    the promise is now fulfilled and will notify us so we can decide what to do with the response.
*/

/**
 * Promises Return Immediately
    The first thing to understand is that a Promise will immediately return an object.
 */
const myPromiseObj = new Promise(function(resolve, reject) {
    // sundae creation code
});
/**
 * That object has a .then() method on it that we can use to have it notify us if the request we made in the promise was either successful or failed. 
 * The .then() method takes two functions:
        the function to run if the request completed successfully
        the function to run if the request failed to complete
 */
mySundae.then(function(sundae) { // This func will be called and passed the data that the Promise's resolve function used (the sundae object.)
    console.log(`Time to eat my delicious ${sundae}`);
}, function(msg) { // This function will be called and passed the data that the Promise's reject function was called with (the error message "Sorry, we're out of that flavor :-(")
    console.log(msg);
    self.goCry(); // not a real method
});