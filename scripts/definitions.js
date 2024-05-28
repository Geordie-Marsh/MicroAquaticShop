// Shortcut to call upon a DOM object (the first object with this CSS selector) by a CSS selector (e.g., h1, #ID, .class, etc.)
const $$ = (CSSSelector) => document.querySelector(CSSSelector); 
// Shortcut to call upon multiple DOM objects by a CSS selector (e.g., h1, .class, etc.)
const $$all = (CSSSelector) => document.querySelectorAll(CSSSelector);

// Shortcut for adding CSS classes
const classAdd = (element, className) => element.classList.add(className);
// Shortcut for removing CSS classes
const classRemove = (element, className) => element.classList.remove(className);
// Shortcut for toggling CSS classes - i.e., if the element doesn't have this class it'll be given it, and if it already does it'll be removed from it
const classToggle = (element, className) => element.classList.toggle(className);

// Shortcut for adding event listeners
const on = (element, event, callback) => element.addEventListener(event, callback);

// Shortcut for console.log
const log = console.log;

// Math shortcuts
// Min and max
const min = (number) => Math.min(number);
const max = (number) => Math.max(number);
// Round to the nearest, up and down
const round = (number) => Math.round(number);
const roundUp = (number) => Math.ceil(number);
const roundDown = (number) => Math.floor(number);

// Shortcut for changing a string into start case (This Is Start Case)
function toStartCase(str) {
	// Creating an array of each word in the sentence
	let splitStr = str.toLowerCase().split(' ');

	for (var i = 0; i < splitStr.length; i++) {
       // Capitalising the first letter of each word in the string
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	}

	// Rejoining the words together back into one string
	let newStr = splitStr.join(" ")

	// Returning the joined string
	return newStr; 
}

// Shortcut for adding a CSS rule (to the global scope)
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

// Get a URL param
const searchParams = new URLSearchParams(window.location.search);