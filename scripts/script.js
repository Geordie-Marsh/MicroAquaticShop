// Adding styling to fillable text forms
function textFormClicked(clickedElement, clickedElementType) {
	// The clickedElement can either be some kind of input (e.g., input, select, etc.) or the div that contains this input and the label. So, the first thing this function does is assign the correct definition of what the variable 'div' should be
	let div;
	if (clickedElementType == "div") {
		// If it's a div that's just been clicked on, then the div is just this element
		div = clickedElement;
	} else {
		// If it's an input type that's been clicked on, then the div we want is a grandparent of the input (since the input is wrapped in a div of its own which is a sibling of the label and child of the top-level div)
		div = clickedElement.parentNode.parentNode;
	}

	// Working out what kind of input this field has
	if (div.querySelector("select")) {
		var inputType = "select";
	} else {
		var inputType = "input";
	}

	// Creating variables for the various elements of the form
	const label = div.querySelector("label");
	const input = (inputType == "select") ? 
		div.querySelector("select") : 
		div.querySelector("input");
	
	// Assigning style classes to the label and input to resize them and bring the input into view
	classAdd( label , "input--not-blank" );
	classAdd( input , "input--not-blank" );

	// Putting the user's cursor and focus into the input so they can automatically start typing
	input.focus();
	if (inputType == "select") {
		input.open();
	}

	// Adding an event listener for when the user clicks off/unfocuses this form
	on(input, "focusout", () => {
		// Getting the current value of the input
		let inputValue = input.value;
		
		// If the input is currently empty, revert the entire div to its original state by removing the added classes
		if (inputValue == "") {
			classRemove( label, "input--not-blank" );
			classRemove( input, "input--not-blank" );
		}	
	});
}

// When the user changes which country in the checkout
function countryChanged(country) {
	if (country == "australia") {
		classRemove($$(".text-form--aus--apartment"), "display-none");
		classRemove($$(".text-form--aus--state"), "display-none");
		classRemove($$(".text-form--aus--city"), "display-none");
		classAdd($$(".text-form--nz--suburb"), "display-none");
		classAdd($$(".text-form--nz--city"), "display-none");
	} else {
		classAdd($$(".text-form--aus--apartment"), "display-none");
		classAdd($$(".text-form--aus--state"), "display-none");
		classAdd($$(".text-form--aus--city"), "display-none");
		classRemove($$(".text-form--nz--suburb"), "display-none");
		classRemove($$(".text-form--nz--city"), "display-none");
	}
}



// Opening and closing the fullscreen menu
function openFullscreenMenu() {
	$$(".fullscreen-menu").style.display = "flex";
}
function closeFullscreenMenu() {
	$$(".fullscreen-menu").style.display = "none";
}


// Opening and closing the filters panel
function toggleFilters() {
	classToggle($$(".products-finder-cont"), "filters-toggled-off");
	classToggle($$(".product-display-buttons__filters"), "button--cta");
}