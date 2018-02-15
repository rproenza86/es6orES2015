/**
 * Template Literals
 * Template literals are essentially string literals that include embedded expressions.
 * 
 * Denoted with backticks ( `` ) instead of single quotes ( '' ) or double quotes ( "" ), 
 * template literals can contain placeholders which are represented using ${expression}. This makes it much easier to build strings.
 * 
 * Here's the previous examples using template literals.
 */

const student = {
    name: 'Richard Kalehoff',
    guardian: 'Mr. Kalehoff'
};

const teacher = {
    name: 'Mrs. Wilson',
    room: 'N231'
}

let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;
// Returns: Richard Kalehoff please see Mrs. Wilson in N231 to pick up your report card.

let note = `${teacher.name},

  Please excuse ${student.name}
  He is recovering from the flu.
  
  Thank you
  ${student.guardian}`;
/**
    Returns:
        Mrs. Wilson,

        Please excuse Richard Kalehoff.
        He is recovering from the flu.

        Thank you,
        Mr. Kalehoff
 */

const cardHTML = `<div class="card">
<h3 class="name">${animal.name} </h3>
<img src="${animal.name}.jpg" alt="${animal.name}" class="picture">
<div class="description">
    <p class="fact"> ${animal.fact} </p>
    <ul class="details">
        <li><span class="bold">Scientific Name</span>:  ${animal.scientificName} </li>
        <li><span class="bold">Average Lifespan</span>:  ${animal.lifespan} </li>
        <li><span class="bold">Average Speed</span>:  ${animal.speed} </li>
        <li><span class="bold">Diet</span>:  ${animal.diet} </li>
    </ul>
    <p class="brief"> ${animal.summary} </p>
</div>
</div>`;



/**
 * Tagged Template Literals:
 * 
 *  It's essentially a special kind of function call that doesn't need the ( .. ). The tag -- the foo part before 
 *  the `..` string literal -- is a function value that should be called. Actually, it can be any expression that 
 *  results in a function, even a function call that returns another function, like:
 */

// So what are some practical uses? There are many advanced ones that 
// are beyond our scope to discuss here. But here's a simple idea that 
// formats numbers as U.S. dollars (sort of like basic localization):
var dollabillsyall = (strings, ...values) =>
	strings.reduce( (s,v,idx) => {
		if (idx > 0) {
			if (typeof values[idx-1] == "number") {
				// look, also using interpolated
				// string literals!
				s += `$${values[idx-1].toFixed( 2 )}`;
			}
			else {
				s += values[idx-1];
			}
		}

		return s + v;
    }, "" );

var amt1 = 11.99,
	amt2 = amt1 * 1.08,
	name = "Kyle";

var text = dollabillsyall
`Thanks for your purchase, ${name}! Your
product cost was ${amt1}, which with tax
comes out to ${amt2}.`

console.log( text );
// Thanks for your purchase, Kyle! Your
// product cost was $11.99, which with tax
// comes out to $12.95.