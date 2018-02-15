/**
 * To create a proxy object, we use the Proxy constructor - new Proxy();. The proxy constructor takes two items:
        the object that it will be the proxy for
        an object containing the list of methods it will handle for the proxied object
        
    The second object is called the handler.
 */


/**
 * A Pass Through Proxy
    The simplest way to create a proxy is to provide an object and then an empty handler object.
 */
let richard = { status: 'looking for work' };
let agent = new Proxy(richard, {});

agent.status; // returns 'looking for work'
// The above doesn't actually do anything special with the proxy - it just passes the request directly to the source object! 
// If we want the proxy object to actually intercept the request, that's what the handler object is for!

// NOTE: The key to making Proxies useful is the handler object that's passed as the second object to the Proxy constructor. 


// The handler object is made up of a methods that will be used for property access. Let's look at the get:
/**
 * Get Trap
    The get trap is used to "intercept" calls to properties:
 */
richard = { status: 'looking for work' };
let handler = {
    get(target, propName) {
        console.log(target); // the `richard` object, not `handler` and not `agent`
        console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
    }
};
agent = new Proxy(richard, handler);
agent.status; // logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)
/**
 * What happened? 
    In the code above, the handler object has a get method (called a "trap" since it's being used in a Proxy). When the code agent.status; 
    is run on the last line, because the get trap exists, it "intercepts" the call to get the status property and runs the get trap function. 
    This will log out the target object of the proxy (the richard object) and then logs out the name of the property being 
    requested (the status property). And that's all it does! It doesn't actually log out the property! This is important - if a trap is used, 
    you need to make sure you provide all the functionality for that specific trap.
 */


/**
 * Accessing the Target object from inside the proxy
   If we wanted to actually provide the real result, we would need to return the property on the target object:
 */
richard = { status: 'looking for work' };
handler = {
    get(target, propName) {
        console.log(target);
        console.log(propName);
        return target[propName];
    }
};
agent = new Proxy(richard, handler);
agent.status; // (1)logs the richard object, (2)logs the property being accessed, (3)returns the text in richard.status

// NOTICE we added the return target[propName]; as the last line of the get trap. This will access the property on the target object and will return it.


/**
 * Having the proxy return info, directly
    Alternatively, we could use the proxy to provide direct feedback:
 */
richard = { status: 'looking for work' };
handler = {
    get(target, propName) {
        return `He's following many leads, so you should offer a contract as soon as possible!`;
    }
};
agent = new Proxy(richard, handler);
agent.status; // returns the text `He's following many leads, so you should offer a contract as soon as possible!`
// So the get trap will take over whenever any property on the proxy is accessed. 

/**
 * The set trap
 *  If we want to intercept calls to change properties, then the set trap needs to be used!
 * 
 *  The set trap is used for intercepting code that will change a property. 
 *  The set trap receives: the object it proxies the property that is being set the new value for the proxy
 */
richard = { status: 'looking for work' };
handler = {
    set(target, propName, value) {
        if (propName === 'payRate') { // if the pay is being set, take 15% as commission
            value = value * 0.85;
        }
        target[propName] = value;
    }
};
agent = new Proxy(richard, handler);
agent.payRate = 1000; // set the actor's pay to $1,000
agent.payRate; // $850 the actor's actual pay
/**
 * What happened?
    In the code above, notice that the set trap checks to see if the payRate property is being set. 
    If it is, then the proxy (the agent) takes 15 percent off the top for her own commission! 
    Then, when the actor's pay is set to one thousand dollars, since the payRate property was used, 
    the code took 15% off the top and set the actual payRate property to 850;
 */







// OTHERS proxy traps:

// The apply trap - lets the proxy handle being invoked (the object being proxied is a function) : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply
function sum(a, b) {
    return a + b;
}
handler = {
    apply: function(target, thisArg, argumentsList) {
        console.log(`Calculate sum: ${argumentsList}`);
        // expected output: "Calculate sum: 1,2"

        return argumentsList[0] + argumentsList[1] + 10;
    }
};
var proxy1 = new Proxy(sum, handler);
console.log(proxy1(1, 2)); // expected output: 13
console.log(sum(1, 2)); // expected output: 3. 
// NOTE: this trap is not to call the func/object, instead should be call the proxy directly


// The has trap - lets the proxy handle the using "in" operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has
let handler1 = {
    has(target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
};

let monster1 = {
    _secret: 'easily scared',
    eyeCount: 4
};

proxy1 = new Proxy(monster1, handler1);
console.log('eyeCount' in proxy1);
// expected output: true

console.log('_secret' in proxy1);
// expected output: false

console.log('_secret' in monster1);
// expected output: true



// The deleteProperty trap - lets the proxy handle if a property is deleted: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty
monster1 = {
    texture: 'scaly'
};

handler1 = {
    deleteProperty(target, prop) {
        if (prop in target) {
            delete target[prop];
            console.log(`property removed: ${prop}`);
            // expected output: "property removed: texture"
        }
    }
};

console.log(monster1.texture);
// expected output: "scaly"

proxy1 = new Proxy(monster1, handler1);
delete proxy1.texture; // expected output: "property removed: texture"

console.log(monster1.texture); // expected output: undefined



// The ownKeys trap - lets the proxy handle when all keys are requested
monster1 = {
    _age: 111,
    [Symbol('secret')]: 'I am scared!',
    eyeCount: 4
}

handler1 = {
    ownKeys(target) {
        return Reflect.ownKeys(target) // The static Reflect.ownKeys() method returns an array of the target object's own property keys.
    }
}

proxy1 = new Proxy(monster1, handler1);

for (let key of Object.keys(proxy1)) {
    console.log(key);
    // expected output: "_age"
    // expected output: "eyeCount"
}



// The construct trap - lets the proxy handle when the proxy is used with the new keyword as a constructor
/*
    The handler.construct() method is a trap for the new operator. In order for the new operation to be valid on the resulting Proxy object, 
    the target used to initialize the proxy must itself have a [[Construct]] internal method (i.e. new target must be valid)
*/
function monster2(disposition) {
    this.disposition = disposition;
}

handler1 = {
    construct(target, args) {
        console.log('monster2 constructor called');
        // expected output: "monster2 constructor called"

        return new target(...args);
    }
};

proxy1 = new Proxy(monster2, handler1);

console.log(new proxy1('fierce').disposition);
// expected output: "fierce"


// The defineProperty trap - lets the proxy handle when defineProperty is used to create a new property on the object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty
/**
 * Trap for Object.defineProperty() method. That method defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
 */
handler1 = {
    defineProperty(target, key, descriptor) {
        invariant(key, 'define');
        return true;
    }
};

function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}

monster1 = {};
proxy1 = new Proxy(monster1, handler1);

console.log(proxy1._secret = 'easily scared');
// expected output: Error: Invalid attempt to define private "_secret" property
console.log(proxy1.secret = 'easily scared'); // expected output: "easily scared"




// The getOwnPropertyDescriptor trap - lets the proxy handle getting the property's descriptors: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
monster1 = {
    eyeCount: 4
};

handler1 = {
    getOwnPropertyDescriptor(target, prop) {
        console.log(`called: ${prop}`);
        // expected output: "called: eyeCount"

        return { configurable: true, enumerable: true, value: 5 };
    }
};

proxy1 = new Proxy(monster1, handler1);

console.log(Object.getOwnPropertyDescriptor(proxy1, 'eyeCount').value); // expected output: 5
/*
    The Object.getOwnPropertyDescriptor() method returns a property descriptor for an own property (that is, one directly present 
    on an object and not in the object's prototype chain) of a given object.
*/



// The preventExtenions trap - lets the proxy handle calls to Object.preventExtensions() on the proxy object : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions
monster1 = {
    canEvolve: true
};

handler1 = {
    preventExtensions(target) {
        target.canEvolve = false;
        Object.preventExtensions(target); // This method prevents new properties from ever being added to an object (i.e. prevents future extensions to the object).

        return true;
    }
};

proxy1 = new Proxy(monster1, handler1);

console.log(monster1.canEvolve);
// expected output: true

Object.preventExtensions(proxy1);

console.log(monster1.canEvolve);
// expected output: false



// The isExtensible trap - lets the proxy handle calls to Object.isExtensible on the proxy object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible
monster1 = {
    canEvolve: true
};

handler1 = {
    isExtensible(target) {
        return Reflect.isExtensible(target); // This method determines if an object is extensible (whether it can have new properties added to it).
    },
    preventExtensions(target) {
        target.canEvolve = false;
        return Reflect.preventExtensions(target);
    }
};

proxy1 = new Proxy(monster1, handler1);

console.log(Object.isExtensible(proxy1));
// expected output: true

console.log(monster1.canEvolve);
// expected output: true

Object.preventExtensions(proxy1);

console.log(Object.isExtensible(proxy1));
// expected output: false

console.log(monster1.canEvolve);
// expected output: false



// The getPrototypeOf trap - lets the proxy handle calls to Object.getPrototypeOf on the proxy object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf
monster1 = {
    eyeCount: 4
};

monsterPrototype = {
    eyeCount: 2
};

handler = {
    getPrototypeOf(target) {
        return monsterPrototype;
    }
};

proxy1 = new Proxy(monster1, handler);

console.log(Object.getPrototypeOf(proxy1) === monsterPrototype);
// expected output: true

console.log(Object.getPrototypeOf(proxy1).eyeCount);
// expected output: 2



// The setPrototypeOf trap - lets the proxy handle calls to Object.setPrototypeOf on the proxy object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf
handler1 = {
    setPrototypeOf(monster1, monsterProto) {
        monster1.geneticallyModified = true;
        return false;
    }
};

monsterProto = {};
monster1 = {
    geneticallyModified: false
};

proxy1 = new Proxy(monster1, handler1);
// Object.setPrototypeOf(proxy1, monsterProto); // throws a TypeError

console.log(Reflect.setPrototypeOf(proxy1, monsterProto));
// expected output: false

console.log(monster1.geneticallyModified);
// expected output: true



/**
 * Proxies Recap
    A proxy object sits between a real object and the calling code. The calling code interacts with the proxy instead of the real object. To create a proxy:
        use the new Proxy() constructor
            pass the object being proxied as the first item
            the second object is a handler object
        the handler object is made up of 1 of 13 different "traps"
        a trap is a function that will intercept calls to properties let you run code
        if a trap is not defined, the default behavior is sent to the target object
        Proxies are a powerful new way to create and manage the interactions between objects.
 */