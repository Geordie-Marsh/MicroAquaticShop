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
// Round up and down
const roundUp = (number) => Math.ceil(number);
const roundDown = (number) => Math.floor(number);
