// Upon loading the cart page, run this function to update all the elements based on the current cart
function cartPageOnLoad() {
	// Getting the current cart
	const cart = localStorage.getItem("cart");
	
	// If there's nothing in the cart, hide all the cart elements and display the empty cart message
	if (cart == null || cart == undefined || cart == "") {
		classRemove($$(".cart-items__empty-cart-message"), "display-none");
	}

	// Getting the current data of the cart
	let cartArray = getCartArray();
	log(cartArray)
		
	
	// Going through the list of products and checking which are in the cart - the ones in the cart will be shown in the cart
	for (let i = 0; i < interactiveProducts.length; i++) {
		// Searching through the  cart to see if there's  an instance (or multiple) of the product in there
		let productCartIndex = checkCartForItem(cartArray, i);

		if (productCartIndex !== false) {
			log("in cart:", interactiveProducts[i][0])
			// Updating the cart item price
			refreshProductTotalPrice($$("#cart-item__total--" + i), i, cartArray[productCartIndex][1], $$("#cart-item__subtotal--" + i))

			// Updating the cart item quantity value
			$$("#product-quantity-value--" + i).value = cartArray[productCartIndex][1];
		}
	}

	// Updating the cart subtotal
	// Getting the current cart subtotal
	let cartSubtotal = calcCartTotalPrice();
	// Updating the subtotal
	$$(".cart-summary__subtotal__price").innerHTML = "$" + cartSubtotal.toFixed(2);
}

cartPageOnLoad();