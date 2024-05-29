// Upon loading the product page, run this function to update all the elements accordingly
function productPageOnLoad(interactiveProductsIndex) {
	// Checking to see if this product is already in the wishlist and updating the heart symbol accordingly
		// If the wishlist is empty, ignore this
		if (localStorage.getItem("wishlist") != null && localStorage.getItem("cart") != undefined && localStorage.getItem("cart") != "") {
			log(localStorage.getItem("wishlist"))
			// Getting the current data of the wishlist
			let wishlist = getWishlistArray();
			// Searching through the existing wishlist to see if there's already an instance (or multiple) of the product in there
			productInWishlist = checkWishlistForItem(wishlist, interactiveProductsIndex);
			// If in wishlist, change the heart symbol to be filled
			if (productInWishlist !== false) {
				log(productInWishlist, "made filled");
				$$(".product-user-actions__wishlist img").setAttribute("src", "assets/icons/heart-filled--red.svg");
			}
		}
}



// Upon loading the wishlist page, run this function to update all the elements based on the current wishlist
function wishlistPageOnLoad() {
	// Getting the current wishlist
	const wishlist = localStorage.getItem("wishlist");
	
	// If there's nothing in the wishlist, hide all the wishlist elements and display the empty wishlist message
	if (wishlist == null || wishlist == undefined || wishlist == "") {
		classRemove($$(".wishlist-items__empty-wishlist-message"), "display-none");
		
		// Hiding all the items in the wishlist
		for (let i = 0; i < interactiveProducts.length; i++) {
			classAdd($$("#wishlist-item--" + i), "display-none");
		}
	}

	// Getting the current data of the wishlist
	let wishlistArray = getWishlistArray();
	log(wishlistArray)
		
	
	// Going through the list of products and checking which are in the wishlist - the ones in the wishlist will be shown in the wishlist
	for (let i = 0; i < interactiveProducts.length; i++) {
		// Searching through the  wishlist to see if there's  an instance (or multiple) of the product in there
		let productWishlistIndex = checkWishlistForItem(wishlistArray, i);

		// If the product is not in the wishlist, update its quantity and price. If it's not, remove it from the list
		if (productWishlistIndex === false) {
			// Hiding the item
			classAdd($$("#wishlist-item--" + i), "display-none");
		}
	}
}



// Upon loading the cart page, run this function to update all the elements based on the current cart
function cartPageOnLoad() {
	// Getting the current cart
	const cart = localStorage.getItem("cart");
	
	// If there's nothing in the cart, hide all the cart elements and display the empty cart message
	if (cart == null || cart == undefined || cart == "") {
		classRemove($$(".cart-items__empty-cart-message"), "display-none");
		
		// Hiding all the items in the cart
		for (let i = 0; i < interactiveProducts.length; i++) {
			classAdd($$("#cart-item--" + i), "display-none");
		}
	}

	// Getting the current data of the cart
	let cartArray = getCartArray();
	log(cartArray)
		
	
	// Going through the list of products and checking which are in the cart - the ones in the cart will be shown in the cart
	for (let i = 0; i < interactiveProducts.length; i++) {
		// Searching through the  cart to see if there's  an instance (or multiple) of the product in there
		let productCartIndex = checkCartForItem(cartArray, i);

		// If the product is in the cart, update its quantity and price. If it's not, remove it from the list
		if (productCartIndex !== false) {
			log("in cart:", interactiveProducts[i][0])
			// Updating the cart item price
			refreshProductTotalPrice($$("#cart-item__total--" + i), i, cartArray[productCartIndex][1], $$("#cart-item__subtotal--" + i))

			// Updating the cart item quantity value
			$$("#product-quantity-value--" + i).value = cartArray[productCartIndex][1];
		} else {
			// Hiding the item
			classAdd($$("#cart-item--" + i), "display-none");
		}
	}

	// Updating the cart subtotal
	// Getting the current cart subtotal
	let cartSubtotal = calcCartTotalPrice();
	// Updating the subtotal
	$$(".cart-summary__subtotal__price").innerHTML = "$" + cartSubtotal.toFixed(2);
}



// Upon loading the cart page, run this function to update all the elements based on the current cart
function checkoutPageOnLoad() {
	// Getting the current cart
	const cart = localStorage.getItem("cart");
	
	// If there's nothing in the cart (which is an error), alert the user with an error message and redirect to the cart page
	if (cart == null || cart == undefined || cart == "") {
		alert("You cannot checkout with an emtpy cart.\nRedirecting you to the cart page...")
		
		// Redirecting to the cart page
		window.location.href = "cart/";
		return;
	}

	// Getting the current data of the cart
	let cartArray = getCartArray();
	log(cartArray)
		
	
	// Going through the list of products and checking which are in the cart - the ones in the cart will be shown in the order summary
	for (let i = 0; i < interactiveProducts.length; i++) {
		// Searching through the  cart to see if there's  an instance (or multiple) of the product in there
		let productCartIndex = checkCartForItem(cartArray, i);

		// If the product is in the cart, update its quantity and price. If it's not, remove it from the list
		if (productCartIndex !== false) {
			log("in cart:", interactiveProducts[i][0])
			// Updating the cart item price
			refreshProductTotalPrice($$("#checkout-order-item__total--" + i), i, cartArray[productCartIndex][1])

			// Updating the cart item quantity value
			// $$("#product-quantity-value--" + i).value = cartArray[productCartIndex][1];
		} else {
			// Hiding the item
			classAdd($$("#checkout-order-item--" + i), "display-none");
		}
	}

	// Updating the cart subtotal
	// Getting the current cart subtotal
	let cartSubtotal = calcCartTotalPrice();
	// Updating the subtotal
	$$(".order-summary__subtotal").innerHTML = "$" + cartSubtotal.toFixed(2);
	$$(".order-summary__total").innerHTML = "$" + cartSubtotal.toFixed(2);
}



// Upon loading the cart page, run this function to update all the elements based on the current cart
function confirmationPageOnLoad() {
	// Getting the current cart
	const cart = localStorage.getItem("cart");
	
	/* Sample checkout info http://localhost:5500/order-confirmation/?
	checkout__email=hello@example.com&
	checkout__given-name=John&
	checkout__family-name=Smith&
	checkout__phone=0412345678&
	checkout__country=australia&
	checkout__address=12 Example St&
	checkout__aus--address2=&
	checkout__nz--suburb=Suburb&
	checkout__aus--city=City&
	checkout__nz--city=City&
	checkout__aus--state=act&
	checkout__postcode=3000&
	checkout__card-no=1234123412341234&
	checkout__card-month=01&
	checkout__card-year=24&
	checkout__security-code=123&
	checkout__card-name=John Smith&
	checkout__billing-address=on&
	checkout__remember=on */

	let cartSubtotal
	let deliveryAddress;
	let expectedDeliveryDate;

	// Getting the cart total
	cartSubtotal = calcCartTotalPrice();
	
	// Checking to see if there's checkout info that's been provided
	if (searchParams.has("checkout__email")) {
		// Constructing the address
		// Adding the address
		deliveryAddress = searchParams.get("checkout__address");
		// Adding the extra address info (apt, etc., optional)
		if (searchParams.get("checkout__aus--address2")) {
			deliveryAddress += ", " + searchParams.get("checkout__aus--address2");
		}
		// The address varies depending on the country
		if (searchParams.has("checkout__country") === "new-zealand") {
			// Adding the suburb
			deliveryAddress += ", " + searchParams.get("checkout__nz--suburb");
			// Adding the city
			deliveryAddress += ", " + searchParams.get("checkout__nz--city");
		} else {
			// Adding the city
			deliveryAddress += ", " + searchParams.get("checkout__aus--city");
			// Adding the state
			deliveryAddress += " " + (searchParams.get("checkout__aus--state")).toUpperCase();
		}
		// Adding the postcode
		deliveryAddress += " " + searchParams.get("checkout__postcode");
		log(deliveryAddress);

		// Making up an expected delivery date (if loading from a real server, it would come back with a real estimate)
		// Finding the date of the next Wednesday, even if the current date is a Wednesday
		let nextWedDate = new Date();
		nextWedDate.setDate(nextWedDate.getDate() + (((3 + 7 - nextWedDate.getDay()) % 7) || 7));
		// Defining how to format each component of the date (and which will be included, namely not time)
		let dateOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}
		// Formatting the expected delivery date in the locale of the computer (ie, according to region-specific ordering, names, languages, etc.)
		expectedDeliveryDate = nextWedDate.toLocaleString("default", dateOptions);
	}

	
	// Loading the order information 
	// It's a bit delayed to imitate loading it from a database/server (on a real site it actually would be loaded from a server, it wouldn't have a timeout)
	setTimeout(() => {
		// Order total
		if (cartSubtotal === 0) {
			// If there's nothing in the cart (which is an error), fill the order total as a nothing found
			$$("#loaded-total").innerHTML = "Total couldn't be loaded";
			console.error("Total price couldn't be loaded");
		} else {
			// Updating the subtotal
			$$("#loaded-total").innerHTML = "$" + cartSubtotal.toFixed(2);
		}
		
		// Delivery address
		if (deliveryAddress === null) {
			// If there's no checkout info (which is an error), fill the order total as a nothing found
			$$("#loaded-address").innerHTML = "Address couldn't be loaded";
			console.error("Delivery address couldn't be loaded");
			
			// Also fill the expected delivery date as nothing found
			$$("#loaded-date").innerHTML = "Delivery date couldn't be loaded";
			console.error("Delivery date couldn't be loaded");

		} else {
			// Updating the address
			$$("#loaded-address").innerHTML = deliveryAddress;

			// Updating the delivery date
			$$("#loaded-date").innerHTML = expectedDeliveryDate
		}
	}, 1500);
}