// Adding styling to fillable text forms
function textFormClicked(div) {
	// Creating variables for the elements inside the div
	const label = div.querySelector("label");
	const input = div.querySelector("input");

	// Assigning style classes to the label and input to resize them and bring the input into view
	classAdd( label , "input--not-blank" );
	classAdd( input , "input--not-blank" );

	// Putting the user's cursor and focus into the input so they can automatically start typing
	input.focus();

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

