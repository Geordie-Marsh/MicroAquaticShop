// Upon loading the cart page, run this function to update all the elements based on the current cart
function confirmationPageOnLoad() {
	// Getting the current cart
	const cart = localStorage.getItem("cart");

	// Loading the order information 
	// It's a bit delayed to imitate loading it from a database/server
	setTimeout(() => {
		// If there's nothing in the cart (which is an error), fill the order total as a nothing found
		if (cart == null || cart == undefined || cart == "") {
			$$("#loaded-total").innerHTML = "Total couldn't be loaded";
		} else {
			// Getting the cart total
			let cartSubtotal = calcCartTotalPrice();
			// Updating the subtotal
			$$("#loaded-total").innerHTML = "$" + cartSubtotal.toFixed(2);
		}

	}, 1500);

	//TODO: add in replacing address and delivery date info
}

confirmationPageOnLoad();