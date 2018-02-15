"use strict"

const PSW =  Symbol( "password" ); 

// Magic
const UserObj = {
    [PSW]: 'Just for my eyes budy :)'
};

Object.defineProperty(
	UserObj,
	"name",
	{
        value: 'Raul Proenza',
        writable: false, // not writable!
        configurable: true, // it control the redefinition and property deletion
        enumerable: true // controls if a property will show up in certain object-property enumerations, such as the for..in loop.
    }
);

Object.defineProperty(
	UserObj,	
	"getPassword",		
	{	
		get: function(){ 
	       if (this.logged == true) 
	           return this[PSW];
           else
	           return 'To check the password you need to be logged'; 
		}
	}
);

Object.defineProperty(
	UserObj,
	"logged",
	// make `a` enumerable, as normal
	{ enumerable: true, value: false, writable: true, configurable:true }
);

const UserObjProxyHandler = { 

	get(target, propName) {
        if (propName === [PSW]) { // if the pay is being set, take 15% as commission
           if (target['logged'] == true) 
                return target[PSW]

            return 'To check the password you need to be logged'; 
        }
        if (propName === 'logged') { // this is to avout under strict mode this error: Uncaught TypeError: 'set' on proxy: trap returned falsish for property
           return target[propName] ? 'User logged' :  'User not logged';
        }
        return target[propName];
    },

    set(target, propName, value) {
        if (propName === [PSW] || propName === 'getPassword') { 
           if (target['logged'] !== true) 
              throw new Error('To modify the password you need to be logged'); 
           else
              return target[propName] = value;
        }
        if (propName === 'logged') { // this is to avoit under strict mode this error: Uncaught TypeError: 'set' on proxy: trap returned falsish for property
           return target[propName] = !target[propName];
        }
        target[propName] = value;
    }
};

const SuperUserObj = new Proxy(UserObj, UserObjProxyHandler);




// Helper function
function logger(description, data) {
    const descriptionText = `%c${description} ${data ? ':=>' : ':'}`;
    const descriptionColors = 'background: #0D47A1; color:#fff';

    console.log(
         descriptionText,
         descriptionColors,
         data || ''
    );
}



// Testing implementation
logger('SuperUser object', SuperUserObj);

logger('Object.keys', Object.keys( SuperUserObj )); // ["a"]

logger('Object.getOwnPropertyName', Object.getOwnPropertyNames( SuperUserObj )); // ["a", "b"]

logger("Iteration over all the SuperUserObj's properties");
    console.group();

    for (let key in SuperUserObj) {
        let value = undefined;

        switch(true){
            case (key == "logged" && SuperUserObj[key] == false) :
                value = 'User not logged';
                break;
            case (key == "logged" && SuperUserObj[key] == true) :
                value = 'User logged';
                break;
            default:
                value = SuperUserObj[key];
        }

        logger(`SuperUserObj.${key}`, value);
    }

    console.groupEnd();

logger("Playing with SuperUserObj's properties");
    console.group();

    logger('SuperUserObj.name', SuperUserObj.name);
    logger('SuperUserObj.getPassword', SuperUserObj.getPassword);

    logger('SuperUserObj.logged', SuperUserObj.logged);
    logger('Loging user...');
    SuperUserObj.logged = true;
    logger('SuperUserObj.logged = true');
    logger('SuperUserObj.logged', SuperUserObj.logged);

    logger('SuperUserObj.getPassword', SuperUserObj.getPassword);

    console.groupEnd();