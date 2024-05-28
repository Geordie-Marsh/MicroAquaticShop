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

confirmationPageOnLoad();