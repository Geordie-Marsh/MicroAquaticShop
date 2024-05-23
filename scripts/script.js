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



// Getting the current cart data
function getCartString(cartData) {
	cartData = localStorage.getItem("cart");
	// ? "productA,3;productB,5;productC,4"
	log(cartData); //TEMP


	// Turning the cartData string into an array with each element being both the product name and quantity
	cartData = cartData.split(";");
	// ? ["productA,3", "product,5", "productC,4"]
	log(cartData); //TEMP


	// Turning each element of the cartData array into a subarray with the product name and quantity
	for (let i = 0; i < cartData.length; i++) {
		const splitElement = cartData[i].split(",");
		cartData[i] = splitElement;
	}
	// ? [["productA", "3"], ["product" , "5"], ["productC", "4"]]
	log(cartData); //TEMP
	
	return cartData;
}

// Checking if an item is already in the cart
function checkCartForItem(cartArray, product) {
	for (let i = 0; i < cartArray.length; i++) {
		// Getting the name of the existing product in the cart
		const existingProduct = cartArray[i][0];
		// Checking if the names of the new and existing product match
		if (existingProduct == product) {
			// If the product is already in the cart, return a truthy result
			return i;
		}
	}
	// If the product isn't already in the cart, return a falsey result
	return false;
}



// Adding a product to the cart
function addToCart(product, quantity = 1) {
	// If no product name is provided, this function will break
	if (!product) {
		console.error("No product specified");
		return;
	}
	if (quantity < 1) {
		console.error("Quantity cannot be less than 1");
		return;
	}
	if (!(Number.isInteger(quantity))) {
		console.warn("A non-integer increase was provided, so it has been rounded up");
		quantity = roundUp(quantity);
		log("new quantity: " + quantity);
	}

	// Setting up variables
	let newProductSubarray, originalCart, productAlreadyInCart, newCart;

	// Creating an array (which will be used as a subarray element) with the product's name and the quantity
	newProductSubarray = [product, quantity.toString()];

	// Checking to see if there's already a cart LS variable
	if (localStorage.getItem("cart") == null) {
		log("cart empty in add") //TEMP
		// If the original cart is empty, the newProductSubarray data can just be set as the cart itself
		// Converting the newProductSubarray to a string
		newCart = newProductSubarray.join(",");
		// Setting the newCart as the cart
		localStorage.setItem("cart", newCart);
	} else {
		// Getting the current value of the cart
		originalCart = getCartString(originalCart);
		
		// Searching through the existing cart to see if there's already an instance (or multiple) of the product in there
		productAlreadyInCart = checkCartForItem(originalCart, product);
		// If the product is already in the cart, do a quantity increase instead of adding another instance
		if (productAlreadyInCart) {
			cartProductQuantityIncrease(product, quantity);
			console.log("sent to increase") //TEMP
			return;
		}
		log("past checks in add") //TEMP
		
		// So, if the product's NOT already in the cart, add an instance of it to the cart
		// Assigning the data of the original cart to the new cart variable
		newCart = originalCart;
		// Pushing the new subarray element to the new cart
		newCart.push(newProductSubarray);
		// ? [["productA", "3"], ["product" , "5"], ["productC", "4"], [product, "1"]]
		log(newCart) //TEMP
		
		// Reconcatenating the cart string
		newCart = newCart.join(";");
		// ? "productA,3;productB,5;productC,4;product,1"
		log(newCart); //TEMP
		
		// Updating the cart to be the new cart
		localStorage.setItem("cart", newCart);
	}
}



// Increasing the quantity of a product in the cart
function cartProductQuantityIncrease(product, increaseNo = 1) {
	// If no product name is provided, this function will break
	if (!product) {
		console.error("No product specified");
		return;
	}
	if (increaseNo < 1) {
		console.error("Cannot increase by a quantity less than 1");
		return;
	}
	if (!(Number.isInteger(increaseNo))) {
		console.warn("A non-integer increase was provided, so it has been rounded up");
		increaseNo = roundUp(increaseNo);
	}

	
	// Setting up variables
	let newProductSubarray, originalCart, productInCartIndex, newCart, existingQuantity, newQuantity;
	
	// Checking to see if there's already a cart LS variable
	if (localStorage.getItem("cart") == null) {
		log("cart empty in increase") //TEMP
		// If the original cart is empty, create a subarray for the element and directly assign that as the cart itself
		newProductSubarray = [product, increaseNo.toString()];
		// Converting the newProductSubarray to a string
		newCart = newProductSubarray.join(",");
		// Setting the newCart as the cart
		localStorage.setItem("cart", newCart);
	} else {
		// Getting the current value of the cart
		originalCart = getCartString(originalCart);
		
		// Searching through the existing cart to check that there's already an instance (or multiple) of the product in there and getting the index of it in the cart array
		productInCartIndex = checkCartForItem(originalCart, product);
		// If the product is NOT already in the cart, add a new instance instead of doing a quantity increase
		if (!productInCartIndex) {
			addToCart(product, increaseNo);
			console.log("sent to add") //TEMP
			return;
		}
		log("past checks in increase") //TEMP

		// Getting the current quantity of the product in the cart (as a string)
		existingQuantity = originalCart[productInCartIndex][1];
		log(existingQuantity); //TEMP
		
		// Converting the current quantity string into an int
		existingQuantity = parseInt(existingQuantity);
		log(existingQuantity); //TEMP

		// Adding the amount to increase to the existing quantity
		newQuantity = existingQuantity + increaseNo;
		log(newQuantity); //TEMP

		// Converting the new quantity to a string
		newQuantity = newQuantity.toString();

		// Assigning the data of the original cart to the new cart variable
		newCart = originalCart;
		// Changing the quantity of the product in question in the new cart
		newCart[productInCartIndex][1] = newQuantity;
		log(newCart);

		// Reconcatenating the cart string
		newCart = newCart.join(";");
		log(newCart); //TEMP
		
		// Updating the cart to be the new cart
		localStorage.setItem("cart", newCart);
	}	
}