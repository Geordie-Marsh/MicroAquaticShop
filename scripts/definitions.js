// Shortcut to call upon a DOM object (the first object with this CSS selector) by a CSS selector (e.g., h1, #ID, .class, etc.)
let $ = (CSSSelector) => document.querySelector(CSSSelector); 
// Shortcut to call upon multiple DOM objects by a CSS selector (e.g., h1, .class, etc.)
let $$ = (CSSSelector) => document.querySelectorAll(CSSSelector);
// Shortcut for changing the style of all elements assigned to a CSS selector
let $$style = (CSSSelector, styleName, styleValue) => $$(CSSSelector).forEach(el => {
	el.style[styleName] = styleValue;
});