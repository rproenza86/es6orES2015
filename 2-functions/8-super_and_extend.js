class Tree {
    constructor(size = '10', leaves = { spring: 'green', summer: 'green', fall: 'orange', winter: null }) {
        this.size = size;
        this.leaves = leaves;
        this.leafColor = null;
    }

    changeSeason(season) {
        this.leafColor = this.leaves[season];
        if (season === 'spring') {
            this.size += 1;
        }
    }
}

class Maple extends Tree {
    constructor(syrupQty = 15, size, leaves) {
        super(size, leaves);
        this.syrupQty = syrupQty;
    }

    changeSeason(season) {
        super.changeSeason(season);
        if (season === 'spring') {
            this.syrupQty += 1;
        }
    }

    gatherSyrup() {
        this.syrupQty -= 3;
    }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
/* 
    To get from the "subclass" to the parent class, the super keyword is used. 
    Did you notice that super was used in two different ways? In Maple's constructor 
    method, super is used as a function. In Maple's changeSeason() method, super is used as an object!
*/

// Compared to ES5 subclasses
// Let's see this same functionality, but written in ES5 code:

function Tree() {
    this.size = size || 10;
    this.leaves = leaves || { spring: 'green', summer: 'green', fall: 'orange', winter: null };
    this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
        this.size += 1;
    }
}

function Maple(syrupQty, size, leaves) {
    Tree.call(this, size, leaves);
    this.syrupQty = syrupQty || 15;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function(season) {
    Tree.prototype.changeSeason.call(this, season);
    if (season === 'spring') {
        this.syrupQty += 1;
    }
}

Maple.prototype.gatherSyrup = function() {
    this.syrupQty -= 3;
}

const myMaple2 = new Maple(15, 5);
myMaple2.changeSeason('fall');
myMaple2.gatherSyrup();
myMaple2.changeSeason('spring');





/**
 * extending Natives
 */
class MyCoolArray extends Array {
	first() { return this[0]; }
	last() { return this[this.length - 1]; }
}

var a = new MyCoolArray( 1, 2, 3 );

a.length;					// 3
a;							// [1,2,3]

a.first();					// 1
a.last();					// 3
/*
    Another common pre-ES6 "subclass" limitation is with the Error object, in creating custom error "subclasses." 
    When genuine Error objects are created, they automatically capture special stack information, including the line 
    number and file where the error is created. Pre-ES6 custom error "subclasses" have no such special behavior, which 
    severely limits their usefulness.
*/
// ES6 to the rescue:
class Oops extends Error {
	constructor(reason) {
		super(reason);
		this.oops = reason;
	}
}

// later:
var ouch = new Oops( "I messed up!" );
throw ouch;
/*
    output:
    Uncaught Oops: I messed up!
        at <anonymous>:119:12
*/