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
	const img = div.querySelector("img.invalid-message");
	const strong = div.querySelector("strong.invalid-message");
	const input = (inputType == "select") ? 
		div.querySelector("select") : 
		div.querySelector("input");
	
	// Assigning style classes to the label, input, and warning elements to resize them and bring the input into view
	classAdd( label , "input--not-blank" );
	classAdd( img , "input--not-blank" );
	classAdd( strong , "input--not-blank" );
	classAdd( input , "input--not-blank" );

	// Putting the user's cursor and focus into the input so they can automatically start typing
	input.focus();

	// Adding an event listener for when the user clicks off/unfocuses this form
	on(input, "focusout", () => {
		// Getting the current value of the input
		let inputValue = input.value;
		
		// If the input is currently empty, revert the entire div to its original state by removing the added classes
		if (inputValue == "" && inputType !== "select") {
			classRemove( label , "input--not-blank" );
			classRemove( img , "input--not-blank" );
			classRemove( strong , "input--not-blank" );
			classRemove( input , "input--not-blank" );
		} else {
			// If the input isn't empty, check the form's validity and update the formatting accordingly
			showInputValidity(input);
		}
	});
}


// When the user changes which country in the checkout
function countryChanged(country) {
	if (country == "australia") {
		classRemove($$(".text-form--aus--apartment"), "display-none");
		classRemove($$(".text-form--aus--state"), "display-none");
		$$("#checkout__aus--state").required = true;
		classRemove($$(".text-form--aus--city"), "display-none");
		$$("#checkout__aus--city").required = true;
		classAdd($$(".text-form--nz--suburb"), "display-none");
		$$("#checkout__nz--suburb").required = false;
		classAdd($$(".text-form--nz--city"), "display-none");
		$$("#checkout__nz--city").required = false;
	} else {
		classAdd($$(".text-form--aus--apartment"), "display-none");
		classAdd($$(".text-form--aus--state"), "display-none");
		$$("#checkout__aus--state").required = false;
		classAdd($$(".text-form--aus--city"), "display-none");
		$$("#checkout__aus--city").required = false;
		classRemove($$(".text-form--nz--suburb"), "display-none");
		$$("#checkout__nz--suburb").required = true;
		classRemove($$(".text-form--nz--city"), "display-none");
		$$("#checkout__nz--city").required = true;
	}
}

function showInputValidity(certainElement) {
	if(certainElement) {
		// If it's just checking validity for a certain element
		// Finding the ancestor of the invalid input that contains the full input field
		let parentDiv = certainElement.closest(".text-form");

		// Assign the class to the respective field to show that it's invalid
		classAdd(parentDiv, "text-form--checking");
	} else {
		// If it's checking validity for all fields
		let allInputs = $$all(".text-form select, .text-form input");
		log(allInputs)//TEMP

		for (let i = 0; i < allInputs.length; i++) {
			// Finding the ancestor of the invalid input that contains the full input field
			const parentDiv = allInputs[i].closest(".text-form");
			
			// Assign the class to the respective field to show that it's invalid
			classAdd(parentDiv, "text-form--checking");
		}
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



function carouselScrollLeft(scrollingList, scrollPercentage) {
	let list = $$(scrollingList)
	let scrollAmount = 250;
	let maxScrollLeft = list.scrollWidth - list.clientWidth;
	if (scrollPercentage) {
		scrollAmount = scrollPercentage * maxScrollLeft;
	}
	log(scrollAmount)//TEMP
	$$(scrollingList).scrollLeft -= scrollAmount;
}
function carouselScrollRight(scrollingList, scrollPercentage) {
	let list = $$(scrollingList)
	let scrollAmount = 250;
	let maxScrollLeft = list.scrollWidth - list.clientWidth;
	if (scrollPercentage) {
		scrollAmount = scrollPercentage * maxScrollLeft;
	}
	log(scrollAmount)//TEMP
	$$(scrollingList).scrollLeft += scrollAmount;
}

function carouselScrolling(list, carouselButtons) {
	let maxScrollLeft = list.scrollWidth - list.clientWidth;
	if (list.scrollLeft < 50) {
		classAdd($$(carouselButtons + "left"), "opacity-none");
	} else {
		classRemove($$(carouselButtons + "left"), "opacity-none");
	}
	if (list.scrollLeft > (maxScrollLeft - 50)) {
		classAdd($$(carouselButtons + "right"), "opacity-none");
	} else {
		classRemove($$(carouselButtons + "right"), "opacity-none");
	}
}




// Updating the add to cart button to confirm adding to the cart
function updateAddToCartButton(button, revertButton = true) {
	log("Changing add to cart button");//TEMP
	// Saving the existing icon of the button
	let oldIcon = button.querySelector("img").getAttribute("src");

	// Updating the text
	button.querySelector("span").innerHTML = "Added to Cart!";
	// Updating the icon
	button.querySelector("img").setAttribute("src", "assets/icons/tick--dark.svg");

	// After a little bit of time, revert the button to its original state to indicate to the user that they can continue adding more to the cart (unless specific not to)
	if (revertButton) {
		setTimeout(() => {
			// Updating the text
			button.querySelector("span").innerHTML = "Add More to Cart";
			// Updating the icon
			button.querySelector("img").setAttribute("src", oldIcon);
		}, 2500);
	}
	
}





// Getting the current cart data
function getCartArray() {
	let cartData = localStorage.getItem("cart");
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
function checkCartForItem(cartArray, interactiveProductsIndex) {
	for (let i = 0; i < cartArray.length; i++) {
		// Getting the name of the existing product in the cart
		const existingProduct = cartArray[i][0];
		// Checking if the names of the new and existing product match
		if (existingProduct == interactiveProductsIndex) {
			// If the product is already in the cart, return the cart index
			return i;
		}
	}
	// If the product isn't already in the cart, return a falsey result
	return false;
}



// Adding a product to the cart
function addToCart(interactiveProductsIndex, quantity = 1) {
	// If no product is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
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
	newProductSubarray = [interactiveProductsIndex, quantity.toString()];

	// Checking to see if there's already a cart LS variable
	if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == undefined || localStorage.getItem("cart") == "") {
		log("cart empty in add") //TEMP
		// If the original cart is empty, the newProductSubarray data can just be set as the cart itself
		// Converting the newProductSubarray to a string
		newCart = newProductSubarray.join(",");
		// Setting the newCart as the cart
		localStorage.setItem("cart", newCart);
	} else {
		// Getting the current data of the cart
		originalCart = getCartArray();
		
		// Searching through the existing cart to see if there's already an instance (or multiple) of the product in there
		productAlreadyInCart = checkCartForItem(originalCart, interactiveProductsIndex);
		// If the product is already in the cart, do a quantity increase instead of adding another instance
		if (productAlreadyInCart !== false) {
			cartProductQuantityIncrease(interactiveProductsIndex, quantity);
			console.log("sent to increase") //TEMP
			return;
		}
		log("past checks in add") //TEMP
		
		// So, if the product's NOT already in the cart, add an instance of it to the cart
		// Assigning the data of the original cart to the new cart variable
		newCart = originalCart;
		// Pushing the new subarray element to the new cart
		newCart.push(newProductSubarray);
		// ? [["productA", "3"], ["productB" , "5"], ["productC", "4"], [product, "1"]]
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
function cartProductQuantityIncrease(interactiveProductsIndex, increaseNo = 1) {
	// If no product is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
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
	if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == undefined || localStorage.getItem("cart") == "") {
		log("cart empty in increase") //TEMP
		// If the original cart is empty, create a subarray for the element and directly assign that as the cart itself
		newProductSubarray = [interactiveProductsIndex, increaseNo.toString()];
		// Converting the newProductSubarray to a string
		newCart = newProductSubarray.join(",");
		// Setting the newCart as the cart
		localStorage.setItem("cart", newCart);
	} else {
		// Getting the current data of the cart
		originalCart = getCartArray();
		
		// Searching through the existing cart to check that there's already an instance (or multiple) of the product in there and getting the index of it in the cart array
		productInCartIndex = checkCartForItem(originalCart, interactiveProductsIndex);
		// If the product is NOT already in the cart, add a new instance instead of doing a quantity increase
		if (productInCartIndex === false) {
			addToCart(interactiveProductsIndex, increaseNo);
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



// Decreasing the quantity of a product in the cart
function cartProductQuantityDecrease(interactiveProductsIndex, decreaseNo = 1) {
	// If no product is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
		console.error("No product specified");
		return;
	}
	if (decreaseNo < 1) {
		console.error("Cannot decrease by a quantity less than 1");
		return;
	}
	if (!(Number.isInteger(decreaseNo))) {
		console.warn("A non-integer decrease was provided, so it has been rounded down");
		decreaseNo = roundDown(decreaseNo);
	}

	
	// Setting up variables
	let originalCart, productInCartIndex, newCart, existingQuantity, newQuantity;
	
	// Checking to see if there's already a cart LS variable
	if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == undefined || localStorage.getItem("cart") == "") {
		// If the cart is empty, nothing will happen (but a warning message will be sent to the console)
		console.warn("Trying to decrease the quantity of an item which is not in the cart (cart is empty)")
	} else {
		// Getting the current data of the cart
		originalCart = getCartArray();
		
		// Searching through the existing cart to check that there's already an instance (or multiple) of the product in there
		productInCartIndex = checkCartForItem(originalCart, interactiveProductsIndex);
		// If the product is NOT already in the cart, nothing will happen (but a warning message will be sent to the console)
		if (productInCartIndex === false) {
			console.warn("Trying to decrease the quantity of an item which is not in the cart")
			return;
		}
		log("past checks in decrease") //TEMP

		// Getting the current quantity of the product in the cart (as a string)
		existingQuantity = originalCart[productInCartIndex][1];
		log(existingQuantity); //TEMP
		
		// Converting the current quantity string into an int
		existingQuantity = parseInt(existingQuantity);
		log(existingQuantity); //TEMP

		// Adding the amount to increase to the existing quantity
		newQuantity = existingQuantity - decreaseNo;
		log(newQuantity); //TEMP

		// If the new quantity is <=0 (ie, the decrease was greater than the existing quantity), just remove the product from the cart
		if (newQuantity <= 0) {
			removeFromCart(interactiveProductsIndex);
			return;
		}

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



// Removing a product from the cart
function removeFromCart(interactiveProductsIndex) {
	// If no product name is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
		console.error("No product specified");
		return;
	}

	// Setting up variables
	let originalCart, productInCartIndex, newCart;

	// Checking to see if there's already a cart LS variable
	if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == undefined || localStorage.getItem("cart") == "") {
		// If the cart is empty, nothing will happen (but a warning message will be sent to the console)
		console.warn("Trying to remove a product which is not in the cart (cart is empty)")
	} else {
		// Getting the current data of the cart
		originalCart = getCartArray();
		
		// Searching through the existing cart to check that there's already an instance (or multiple) of the product in there
		productInCartIndex = checkCartForItem(originalCart, interactiveProductsIndex);
		// If the product is NOT already in the cart, nothing will happen (but a warning message will be sent to the console)
		if (productInCartIndex === false) {
			console.warn("Trying to remove a product which is not in the cart")
			return;
		}
		log("past checks in remove") //TEMP
		
		// So, if the product is in the cart, remove it
		// Assigning the data of the original cart to the new cart variable
		newCart = originalCart;
		// Removing the product in question from the array
		newCart.splice(productInCartIndex, 1);
		log(newCart) //TEMP
		
		// Reconcatenating the cart string
		newCart = newCart.join(";");
		log(newCart); //TEMP
		
		// If the new cart is empty, remove the cart variable instead of updating it
		if (newCart == "") {
			localStorage.removeItem("cart");
		} else {
			// Otherwise, updating the cart to be the new cart
			localStorage.setItem("cart", newCart);
		}

		// Refreshing the page
		window.location.reload();
	}
}



// Getting which price per unit will be used for the calculation (it depends on bulk-buying)
function getPerItemCost(priceList, quantity) {
	if (priceList[1] == undefined) {
		// If there are no bulk-buy options, just use the base price
		return priceList[0];
	} else {
		// Going through from the highest offer down to see if the quantity fits in it
		for (let i = priceList.length - 1; i > 0; i--) {
			const offer = priceList[i];
			let offerMinQuantity = priceList[i][0];
			log(offerMinQuantity)//TEMP
			if (quantity >= offerMinQuantity) {
				log(priceList[i][1])//TEMP
				return priceList[i][1];
			}	
		}

		// If the quantity isn't high enough for a bulk-buy offer, it'll just use the regular price
		return priceList[0];
	}
}



// Calculating the total price of a product
function calcProductTotalPrice(interactiveProductsIndex, quantity = 1) {
	// If no product name is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
		console.error("No product index specified");
		return;
	}
	if (quantity < 1) {
		console.error("Product quantity cannot be less than 1");
		return;
	}
	if (!(Number.isInteger(quantity))) {
		console.warn("A non-integer quantity was provided, so it has been rounded up");
		quantity = roundUp(quantity);
	}

	const prices = interactiveProducts[interactiveProductsIndex][2];

	// Getting the amount that each item will cost when factoring in bulk-buy offers
	let perItemCost = getPerItemCost(prices, quantity);

	// Calculating the total cost
	let totalPrice = quantity * perItemCost;
	log(totalPrice);//TEMP
	return totalPrice;
}



// Refreshing the total of the product after the quantity has been updated
function refreshProductTotalPrice(priceElement, interactiveProductsIndex, quantity, pricePerItemElement) {
	// If no element is provided, this function will break
	if (!priceElement) {
		console.error("No element specified");
		return;
	}
	// If no product is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
		console.error("No product index specified");
		return;
	}
	if (quantity < 1) {
		console.error("Product quantity cannot be less than 1");
		return;
	}
	if (!(Number.isInteger(quantity))) {
		console.warn("A non-integer quantity was provided, so it has been rounded up");
		quantity = roundUp(quantity);
	}

	// Getting the new price
	let newPrice = calcProductTotalPrice(interactiveProductsIndex, quantity);
	
	// Updating the price shown
	priceElement.innerHTML = "$" + newPrice.toFixed(2);

	// If also updating the price per item 
	if (pricePerItemElement) {
		// Getting the new price
		let perItemPrice = getPerItemCost(interactiveProducts[interactiveProductsIndex][2], quantity);
		
		// Updating the price shown
		pricePerItemElement.innerHTML = "$" + perItemPrice.toFixed(2);
	}
}



// Getting the current total price of the cart
function calcCartTotalPrice() {
	let cartArray, runningTotal = 0;

	// Checking to see if there's already a cart LS variable
	if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == undefined || localStorage.getItem("cart") == "") {
		// If the cart is empty, the total value is $0.00
		return 0;
	} 

	// Getting the current data of the cart
	cartArray = getCartArray();

	// Going through each cart item and getting its total price
	for (let i = 0; i < cartArray.length; i++) {
		// Getting the total price of this product
		let thisProductTotal = calcProductTotalPrice(cartArray[i][0], cartArray[i][1]);
		log(thisProductTotal)

		// Updating the running total to include the price of this product
		runningTotal += thisProductTotal;
		log("running total:", runningTotal);
	}

	return runningTotal;
}





// Getting the current wishlist data
function getWishlistArray() {
	let wishlistData = localStorage.getItem("wishlist");
	// ? "productA;productB;productC"
	log(wishlistData); //TEMP


	// Turning the wishlistData string into an array
	wishlistData = wishlistData.split(";");
	// ? ["productA", "product", "productC"]
	log(wishlistData); //TEMP

	return wishlistData;
}

// Checking if an item is already in the wishlist
function checkWishlistForItem(wishlistArray, interactiveProductsIndex) {
	for (let i = 0; i < wishlistArray.length; i++) {
		// Getting the name of the existing product in the wishlist
		const existingProduct = wishlistArray[i];
		// Checking if the names of the new and existing product match
		if (existingProduct == interactiveProductsIndex) {
			// If the product is already in the wishlist, return the wishlist index
			return i;
		}
	}
	// If the product isn't already in the wishlist, return a falsey result
	return false;
}

// Toggle whether an item is in the wishlist
function toggleWishlist(interactiveProductsIndex, heartIconToChange) {
	// If no product is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
		console.error("No product index specified");
		return;
	}

	// Setting up variables
	let originalWishlist, productAlreadyInWishlist, newWishlist;

	// Checking to see if there's already a wishlist LS variable
	if (localStorage.getItem("wishlist") == null || localStorage.getItem("wishlist") == undefined || localStorage.getItem("wishlist") == "") {
		log("wishlist empty in add") //TEMP
		// If the original wishlist is empty, the interactiveProductsIndex data can just be set as the wishlist itself
		newWishlist = interactiveProductsIndex;
		// Setting the newWishlist as the wishlist
		localStorage.setItem("wishlist", newWishlist);

		// Changing the heart icon to be filled
		if (heartIconToChange) {
			heartIconToChange.querySelector("img").setAttribute("src", "assets/icons/heart-filled--red.svg");
		}
	} else {
		// Getting the current data of the wishlist
		originalWishlist = getWishlistArray();
		
		// Searching through the existing wishlist to see if there's already an instance (or multiple) of the product in there
		productAlreadyInWishlist = checkWishlistForItem(originalWishlist, interactiveProductsIndex);

		// If the product is not already in the wishlist, add it; if it is, remove it
		if (productAlreadyInWishlist === false) {
			log("adding to wishlist from toggle");//TEMP
			// Adding to wishlist
			addToWishlist(interactiveProductsIndex);

			// Changing the heart icon to be filled
			if (heartIconToChange) {
				heartIconToChange.querySelector("img").setAttribute("src", "assets/icons/heart-filled--red.svg");
			}
		} else {
			log("removing from wishlist from toggle");//TEMP
			// Removing from wishlist
			removeFromWishlist(interactiveProductsIndex);

			// Changing the heart icon to be unfilled
			if (heartIconToChange) {
				heartIconToChange.querySelector("img").setAttribute("src", "assets/icons/heart--dark.svg");
			}
		}
	}
}

function addToWishlist(interactiveProductsIndex) {
	// If no product is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
		console.error("No product index specified");
		return;
	}
	
	// Setting up variables
	let newProductSubarray, originalWishlist, productAlreadyInWishlist, newWishlist;
	
	// Checking to see if there's already a wishlist LS variable
	if (localStorage.getItem("wishlist") == null || localStorage.getItem("wishlist") == undefined || localStorage.getItem("wishlist") == "") {
		log("wishlist empty in add") //TEMP
		// If the original wishlist is empty, the interactiveProductsIndex data can just be set as the wishlist itself
		newWishlist = interactiveProductsIndex;
		// Setting the newWishlist as the wishlist
		localStorage.setItem("wishlist", newWishlist);
	} else {
		// Getting the current data of the wishlist
		originalWishlist = getWishlistArray();
		log(originalWishlist);//TEMP

		// Searching through the existing wishlist to see if there's already an instance (or multiple) of the product in there
		productAlreadyInWishlist = checkWishlistForItem(originalWishlist, interactiveProductsIndex);

		// If the product is already in the wishlist, send a warning and break this function
		if (productAlreadyInWishlist !== false) {
			console.warn("Item is already in the wishlist");//TEMP
			return;
		}

		// Setting the new wishlist as the old one
		newWishlist = originalWishlist;

		// Pushing the new product as a new element in the wishlist array
		newWishlist.push(interactiveProductsIndex);
		log(newWishlist);//TEMP

		// Converting the wishlist array back to a string
		newWishlist = newWishlist.join(";");

		// Setting the wishlist as newWishlist
		localStorage.setItem("wishlist", newWishlist);
	}
}

function removeFromWishlist(interactiveProductsIndex) {
	// If no product is provided, this function will break
	if (!interactiveProductsIndex && (interactiveProductsIndex !== 0)) {
		console.error("No product index specified");
		return;
	}

	// Setting up variables
	let originalWishlist, productInWishlistIndex, newWishlist;

	// Checking to see if there's already a wishlist LS variable
	if (localStorage.getItem("wishlist") == null || localStorage.getItem("wishlist") == undefined || localStorage.getItem("wishlist") == "") {
		log("wishlist empty in remove") //TEMP
		// If the original wishlist is empty, the interactiveProductsIndex data can just be set as the wishlist itself
		newWishlist = interactiveProductsIndex;
		// Setting the newWishlist as the wishlist
		localStorage.setItem("wishlist", newWishlist);
	} else {
		// Getting the current data of the wishlist
		originalWishlist = getWishlistArray();
		log(originalWishlist);//TEMP

		// Searching through the existing wishlist to see if there's already an instance (or multiple) of the product in there
		productInWishlistIndex = checkWishlistForItem(originalWishlist, interactiveProductsIndex);

		// If the product isn't already in the wishlist, send a warning and break this function
		if (productInWishlistIndex === false) {
			console.warn("Cannot remove an item not in the wishlist");//TEMP
			return;
		}

		// Setting the new wishlist as the old one
		newWishlist = originalWishlist;

		// Removing the product in question from the array
		newWishlist.splice(productInWishlistIndex, 1);
		log(newWishlist) //TEMP

		// Converting the wishlist array back to a string
		newWishlist = newWishlist.join(";");

		// If the new wishlist is empty, remove the wishlist variable instead of updating it
		if (newWishlist == "") {
			localStorage.removeItem("wishlist");
		} else {
			// Otherwise, updating the wishlist to be the new wishlist
			localStorage.setItem("wishlist", newWishlist);
		}

		// Refresh the page to update it
		window.location.reload();
	}
}

function removeAllFromWishlist() {
	// Removing the wishlist variable
	localStorage.removeItem("wishlist");

	// Refreshing the page to update it
	window.location.reload();
}

function moveAllFromWishlistToCart() {
	// Checking to see that there's a wishlist LS variable
	if (localStorage.getItem("wishlist") == null || localStorage.getItem("wishlist") == undefined || localStorage.getItem("wishlist") == "") {
		log("wishlist empty in move all") //TEMP
		return;
	}

	// Setting up variables
	let wishlist;

	// Getting the current data of the wishlist
	wishlist = getWishlistArray();
	log(wishlist);//TEMP

	// Going through the wishlist for each item 
	for (let i = 0; i < wishlist.length; i++) {
		// let interactiveProductsIndex = checkWishlistForItem(wishlist, i);
		let interactiveProductsIndex = wishlist[i];
		
		// Adding this product to the cart
		addToCart(interactiveProductsIndex);
	}

	// Removing all items from the wishlist
	removeAllFromWishlist();
}