// Upon loading the product page, run this function to update all the elements accordingly
function productPageOnLoad(interactiveProductsIndex) {
	// NOTE: Everything on the product page would be generated using a full database, but for the purposes of this assignment, only the elements which pertain to the price are generated

	// Getting from the HTML data attribute which product this page is for (the index of interactiveProducts)
	let pageProductIndex = $$("html").dataset.interactiveProductsIndex;
	pageProductIndex = parseInt(pageProductIndex);
	const pageProduct = interactiveProducts[pageProductIndex];


	// Checking to see if this product is already in the wishlist and updating the heart symbol accordingly
	// If the wishlist is empty, ignore this
	if (localStorage.getItem("wishlist") != null && localStorage.getItem("cart") != undefined && localStorage.getItem("cart") != "") {
		log(localStorage.getItem("wishlist"))
		// Getting the current data of the wishlist
		let wishlist = getWishlistArray();
		// Searching through the existing wishlist to see if there's already an instance (or multiple) of the product in there
		productInWishlist = checkWishlistForItem(wishlist, pageProductIndex);
		// If in wishlist, change the heart symbol to be filled
		if (productInWishlist !== false) {
			log(productInWishlist, "made filled");
			$$(".product-user-actions__wishlist img").setAttribute("src", "assets/icons/heart-filled--red.svg");
		}
	}

	// Generating the bulk-buy table
	function generateBulkBuy() {
		// Creating a table element
		const table = document.createElement("table");

		// Assigning classes to the table
		classAdd(table, "product-bulk-buy-table");


		// Adding the header row
		// Creating a table row (<tr>) element
		const trHeader = document.createElement("tr");

		// Creating the three table header cell (<th>) elements
		const th1 = document.createElement("th");
		const th2 = document.createElement("th");
		const th3 = document.createElement("th");

		// Giving the table header cells values
		th1.innerHTML = "Quantity";
		th2.innerHTML = "Price";
		th3.innerHTML = "Discount";

		// Appending the table header cells to the table header row
		trHeader.appendChild(th1);
		trHeader.appendChild(th2);
		trHeader.appendChild(th3);

		// Appending the table header row to the table
		table.appendChild(trHeader);
		

		// Creating a row for each bulk-buy offer (i = 1 since the first element in the prices subarray is the base price)
		for (let i = 1; i < pageProduct[2].length; i++) {
			const offer = pageProduct[2][i];
			
			// Creating a table row (<tr>) element
			const tr = document.createElement("tr");

			// Creating the three table cell (<th>) elements
			const tdQuantity = document.createElement("td");
			const tdPrice = document.createElement("td");
			const tdDiscount = document.createElement("td");
			
			// Giving the table cells values
			// The quantity is just the minimum quantity for that offer to kick in with a plus (like 10+)
			tdQuantity.innerHTML = offer[0] + "+";

			// The price is the price per unit in this format: $ + price + ea
			tdPrice.innerHTML = "$" + offer[1].toFixed(2) + "ea";

			// The discount amount is calculated and displayed rounded to the closest 5%
			// Getting the fraction of how much the bulk price is compared to the original price
			let originalPrice = parseFloat(pageProduct[2][0]);
			let bulkPrice = parseFloat(offer[1]);
			let bulkFraction = bulkPrice / originalPrice;
			// Since the discount is rounded to the 5, multiply the bulkFraction by 20 and round it
			bulkFraction *= 20;
			bulkFraction = round(bulkFraction);
			// To make the fraction (which is now out of 20) into a percentage, multiply it by 5
			let bulkPercentage = 5 * bulkFraction;
			// The discount is therefore just 100 - the the bulkPercentage
			let discount = 100 - bulkPercentage;
			// So, the discount shown in the discount column is just the discount with a percentage symbol
			tdDiscount.innerHTML = discount + "%";

			// Appending the table  cells to the table row
			tr.appendChild(tdQuantity);
			tr.appendChild(tdPrice);
			tr.appendChild(tdDiscount);

			// Appending the table row to the table
			table.appendChild(tr);
		}

		// Appending the table to the product quantity panel
		$$(".product-quantity").appendChild(table);
	}

	// The bulk-buy table will be generated iff there is bulk-buy info associated with the product
	if (pageProduct[2][1] != undefined) {
		generateBulkBuy();

		// If there are bulk-buy offers, change the quantity panel's title to include 'and bulk-buy'\
		$$(".product-quantity > h4").innerHTML += " and Bulk-Buy";
	}


	// If this product is already in the cart, change the add to cart button to be "add MORE to cart"
	if (checkCartForItem(getCartArray(), pageProductIndex) !== false) {
		log("product already in cart");
		$$(".product-user-actions__cart").querySelector("span").innerHTML = "Add More to Cart";
	}

	// Making the add to cart button add however many of the quantity given to the cart
	on($$(".product-user-actions__cart"), "click", () => {
		let quantity = $$("#product-quantity-value--" + pageProductIndex).value;
		log(quantity);
		// Increasing by that quantity
		cartProductQuantityIncrease(pageProductIndex, quantity);
		// Updating the button to confirm the user's action
		updateAddToCartButton($$(".product-user-actions__cart"));
		// Reverting the quantity shown in the quantity form to 1 to indicate the page has reset
		setTimeout(() => {
			$$("#product-quantity-value--" + pageProductIndex).value = 1;
			// Updating the price shown
			refreshProductTotalPrice($$(".product-summary__price"), pageProductIndex, 1);
		}, 2500);
	});
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

		return;
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
			$$("#checkout-order-item__info__quantity--" + i).innerHTML = cartArray[productCartIndex][1];

			// Updating the cart item price per item value
			let prices = interactiveProducts[i][2];
			// Getting the amount that each item will cost when factoring in bulk-buy offers
			let perItemCost = getPerItemCost(prices, cartArray[productCartIndex][1]);
			$$("#checkout-order-item__info__price-per-item--" + i).innerHTML = perItemCost;
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
			$$("#loaded-date").innerHTML = expectedDeliveryDate;
		}
	}, 1500);
}