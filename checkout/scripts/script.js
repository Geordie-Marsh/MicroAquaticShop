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

checkoutPageOnLoad();