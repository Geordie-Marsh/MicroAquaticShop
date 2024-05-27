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

wishlistPageOnLoad();