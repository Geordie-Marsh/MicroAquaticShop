// Providing a welcome message to anyone in the console :P
log("%cWelcome!", "font-weight: bold; font-size: 50px; color: #f53b2a; text-shadow: 2px 2px 0 #f58320, 4px 4px 0 #f5b618, 6px 6px 0 #08d442, 8px 8px 0 #1b9de3, 10px 10px 0 #4225fa, 12px 12px 0 #9128ed; margin-bottom: 10px;");
log("%cWelcome to the Micro Aquatic Shop. Stick around a while!", "font-weight: bold; font-size: 15px; color: #2884ed; margin-bottom: 10px;");
log("———————————————————————");

// Providing a header for generating the components
log("%cComponent generation statuses:", "font-weight: bold;");

// TODO Include a check for if the page has this section first
// Including the header
	// If the page doesn't have a header section, don't run this function
	if (!$$(".page-header")) {
		// Provide a message that no header cont was found
		log("Cannot find a header container, so it won't be generated");
	} else {
		// Fetching the HTML for the header from the local component
		fetch("../components/header.html")
			.then(response => {
				// Checking if the request was successful
				if (!response.ok) {
					throw new Error("Couldn't retrieve HTML data");
				}
				// Returning the HTML content as text
				return response.text();
			})
			.then(html => {
				// If successful, sending this HTML content to the function that creates the header
				includeHeader(html);
			})
			.catch(error => {
				// Logging any errors to the console
				// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
				console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
			});
	}
	// The function for creating the header and adding it into the DOM
	function includeHeader(html) {
		// Setting the innerHTML of the existing header tag to the fetched HTML
		$$(".page-header").innerHTML = html;
		
		// Sending a success message
		log("Successfully generated the header");
	}






// Including the featured products
	// If the page doesn't have a featured products section, don't run this function
	if (!$$(".featured-products__list")) {
		// Provide a message that no featured products cont was found
		log("Cannot find a featured products container, so they won't be generated");
	} else {	
		// Fetching the HTML for each element from the local component
		fetch("components/featured-product.html")
			.then(response => {
				// Checking if the request was successful
				if (!response.ok) {
					throw new Error("Couldn't retrieve HTML data");
				}
				// Returning the HTML content as text
				return response.text();
			})
			.then(html => {
				// If successful, sending this HTML content to the function that creates each element
				includeFeaturedProducts(html);
			})
			.catch(error => {
				// Logging any errors to the console
				// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
				console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
			});
	}

	// The function for creating each element and adding it into the DOM
	function includeFeaturedProducts(html) {
		// Creating a new a card for each element, using the data from the featuredProducts array
		for (let i = 0; i < featuredProducts.length; i++) {
			// Creating a container element
			const container = document.createElement("article");

			// Setting the innerHTML of the container to the fetched HTML
			container.innerHTML = html;

			// Giving the container classes
			classAdd(container, "featured-product");
			classAdd(container, "panel");
			classAdd(container, "flex--vertical");
			classAdd(container, "standard-spacing");

			// Replacing the default data of the element with that specific to the product in question
			const title = container.querySelector(".featured-product__title"); // Editing the title
			title.textContent = featuredProducts[i][0];
			const price = container.querySelector(".featured-product__price"); // Editing the price
			price.textContent = featuredProducts[i][1];
			const img = container.querySelector(".featured-product__img"); // Editing the image
			img.setAttribute("src", "assets/images/" + featuredProducts[i][2] + ".jpg");

			const viewButton = container.querySelector(".featured-product__button--view");
			const wishlistButton = container.querySelector(".featured-product__button--heart");
			const cartButton = container.querySelector(".featured-product__button--cart");

			// If the product is the tangerine tiger shrimp (the only one that's interactive), make it interactive
			if (i == 0) {
				// Make the view button direct to the product's page
				viewButton.setAttribute("href", "products/" + interactiveProducts[0][0] + "/");
	
				// Make clicking anywhere on the product direct to the product's page
				container.setAttribute("onclick", "location.href = 'products/" + interactiveProducts[0][0] + "/';");

				// Making the wishlist button toggle whether this product is in the wishlist
				wishlistButton.setAttribute("onclick", "toggleWishlist(0, this);");

				// Checking to see if this product is already in the wishlist and updating the heart symbol accordingly
				// If the wishlist is empty, ignore this
				if (localStorage.getItem("wishlist") != null && localStorage.getItem("cart") != undefined && localStorage.getItem("cart") != "") {
					log("wishlist not empty")//TEMP
					// Getting the current data of the wishlist
					let wishlist = getWishlistArray();

					// Searching through the existing wishlist to see if there's already an instance (or multiple) of the product in there
					productInWishlistIndex = checkWishlistForItem(wishlist, 0);

					// If in wishlist, change the heart symbol to be filled
					if (productInWishlistIndex !== false) {
						log(productInWishlistIndex, "made filled")
						wishlistButton.querySelector("img").setAttribute("src", "assets/icons/heart-filled--red.svg");

						// Giving the container a specific class which will hide it so the user won't see a duplicate product
						classAdd(container, "featured-product--hide");
					}
				}
				
				// Making the add to cart button add 1 of this product to the cart
				cartButton.setAttribute("onclick", "addToCart(0);");
			} else {
				// Making the view button display an alert that lists the product which are interactive
				on(viewButton, "click", () => {
					alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp")
				})
				// Making the wishlist button display an alert that lists the product which are interactive
				on(wishlistButton, "click", () => {
					alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp")
				})
				// Making the add to cart button display an alert that lists the product which are interactive
				on(cartButton, "click", () => {
					alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp")
				})
			}

			// Stopping any propagation from happening on the wishlist button since its ancestor container has an onclick event and we don't want bubbling to occur
			on(viewButton, "click", (event) => {
				event.stopPropagation();
			})
			on(wishlistButton, "click", (event) => {
				event.stopPropagation();
			})
			// Stopping any propagation from happening on the add to cart button since its ancestor container has an onclick event and we don't want bubbling to occur
			on(cartButton, "click", (event) => {
				event.stopPropagation();
			})

			// Appending the content of the container to the featured products div
			$$(".featured-products__list").appendChild(container);

			// Sending a success message
			log("Successfully generated the featured products");
		}
	}





// Including the shop by category buttons
	// If the page doesn't have shop by category section, don't run this function
	if (!$$(".category-type")) {
		// Provide a message that no shop by category cont was found
		log("Cannot find a shop by category container, so they won't be generated");
	} else {	
		// Fetching the HTML for each element from the local component
		fetch("./components/shop-category.html")
			.then(response => {
				// Checking if the request was successful
				if (!response.ok) {
					throw new Error("Couldn't retrieve HTML data");
				}
				// Returning the HTML content as text
				return response.text();
			})
			.then(html => {
				// If successful, sending this HTML content to the function that creates each element
				includeShoppingCategories(html);
			})
			.catch(error => {
				// Logging any errors to the console
				// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
				console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
			});
	}
	// The function for creating each element and adding it into the DOM
	function includeShoppingCategories(html) {
		// Creating a new a card for each element, using the data from the shoppingCategories array
		for (let i = 0; i < shoppingCategories.length; i++) {
			// Creating a button element
			const button = document.createElement("a");

			// Setting the innerHTML of the button to the fetched HTML
			button.innerHTML = html;

			// Giving the container classes
			classAdd(button, "button");
			classAdd(button, "button--secondary");
			classAdd(button, "shopping-category");

			// Replacing the default data of the element with that specific to the category in question
			const category = button.querySelector("span"); // Editing the category
			category.textContent = shoppingCategories[i][1];
			const img = button.querySelector(".button__logo"); // Editing the logo
			img.setAttribute("src", "assets/icons/" + shoppingCategories[i][2] + ".png");

			// Setting the href of the button if the category has a page
			shoppingCategories[i][3] ? button.setAttribute("href", "/categories/" + shoppingCategories[i][3]) : null ;

			// Appending the content of the button to the div of the product type the category falls under
			$$(".category-type__buttons-cont--" + shoppingCategories[i][0]).appendChild(button);

			// Sending a success message
			log("Successfully generated the shop by categories buttons");
		}
	}





// Including the homepage reviews
	// If the page doesn't have homepage reviews section, don't run this function
	if (!$$(".category-type")) {
		// Provide a message that no homepage reviews cont was found
		log("Cannot find a homepage reviews container, so they won't be generated");
	} else {	
		// Fetching the HTML for each element from the local component
		fetch("components/homepage-review.html")
			.then(response => {
				// Checking if the request was successful
				if (!response.ok) {
					throw new Error("Couldn't retrieve HTML data");
				}
				// Returning the HTML content as text
				return response.text();
			})
			.then(html => {
				// If successful, sending this HTML content to the function that creates each element
				includeHomepageReviews(html);
			})
			.catch(error => {
				// Logging any errors to the console
				// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
				console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
			});
	}
	// The function for creating each element and adding it into the DOM
	function includeHomepageReviews(html) {
		// Creating a new a card for each element, using the data from the homepageReviews array
		for (let i = 0; i < homepageReviews.length; i++) {
			// Creating a review element
			const review = document.createElement("article");

			// Setting the innerHTML of the review to the fetched HTML
			review.innerHTML = html;

			// Giving the container classes
			classAdd(review, "homepage-review");
			classAdd(review, "panel");
			classAdd(review, "flex--vertical");
			classAdd(review, "standard-spacing");
			// The bottom review in the 1st and 3rd columns should stretch vertically to fill the space
			

			// Replacing the default data of the element with that specific to the category in question
			const name = review.querySelector(".homepage-review__name"); // Editing the name
			name.textContent = homepageReviews[i][0];
			const text = review.querySelector(".homepage-review__text"); // Editing the review text
			text.textContent = homepageReviews[i][1];

			// Determining which column to put the review into (2 reviews per column)
			let columnNo = roundUp((i + 1) / 2);

			// Appending the content of the review to the div of the product type the category falls under
			$$(".reviews__reviews-cont__column" + columnNo).appendChild(review);

			// Sending a success message
			log("Successfully generated the homepage reviews");
		}
	}




// Including the footer
	// If the page doesn't have a footer section, don't run this function
	if (!$$(".page-footer")) {
		// Provide a message that no footer cont was found
		log("Cannot find a footer container, so it won't be generated");
	} else {
		// Fetching the HTML for the footer from the local component
		fetch("components/footer.html")
			.then(response => {
				// Checking if the request was successful
				if (!response.ok) {
					throw new Error("Couldn't retrieve HTML data");
				}
				// Returning the HTML content as text
				return response.text();
			})
			.then(html => {
				// If successful, sending this HTML content to the function that creates the footer
				includeFooter(html);
			})
			.catch(error => {
				// Logging any errors to the console
				// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
				console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
			});
	}

	// The function for creating the footer and adding it into the DOM
	function includeFooter(html) {
		// Setting the innerHTML of the existing footer tag to the fetched HTML
		$$(".page-footer").innerHTML = html;

		// Sending a success message
		log("Successfully generated the footer");
	}


// Including the fullscreen-mobile (this is generated into the body of every page so it doesn't need a checker)
	// Fetching the HTML for the footer from the local component
	fetch("components/fullscreen-menu.html")
		.then(response => {
			// Checking if the request was successful
			if (!response.ok) {
				throw new Error("Couldn't retrieve HTML data");
			}
			// Returning the HTML content as text
			return response.text();
		})
		.then(html => {
			// If successful, sending this HTML content to the function that creates the footer
			includeFullscreenMenu(html);
		})
		.catch(error => {
			// Logging any errors to the console
				// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
				console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
		});

	// The function for creating the footer and adding it into the DOM
	function includeFullscreenMenu(html) {
		// Creating a cont element
		const cont = document.createElement("section");

		// Setting the innerHTML of the cont to the fetched HTML
		cont.innerHTML = html;

		// Giving the container classes
		classAdd(cont, "fullscreen-menu");
		classAdd(cont, "section--highlighted");

		// Appending the content of the cont to the div of the product type the category falls under
		$$("body").appendChild(cont);

		// Sending a success message
		log("Successfully generated the mobile fullscreen menu");
	}



// Making the minus and plus buttons on the quantity input functional
	function productQuantityDecrease(interactiveProductsIndex, affectsWhichPriceElement, affectsWhichPricePerItemElement) {
		// This is the number input that's being affected
		const numberInput = $$("#product-quantity-value--" + interactiveProductsIndex);
		let minQuantity, currentQuantity, newQuantity;

		if (numberInput.value == "") {
			numberInput.value = 1;
			newQuantity = 1;
		} else {
			minQuantity = parseInt(numberInput.min);
			currentQuantity = parseInt(numberInput.value);
			if (currentQuantity > minQuantity) {
				newQuantity = currentQuantity - 1;
				numberInput.value = newQuantity;
			} else {
				newQuantity = currentQuantity;
			}
		}

		// Updating the price shown
		refreshProductTotalPrice(affectsWhichPriceElement, interactiveProductsIndex, newQuantity, affectsWhichPricePerItemElement);
	}
	function productQuantityIncrease(interactiveProductsIndex, affectsWhichPriceElement, affectsWhichPricePerItemElement) {
		// This is the number input that's being affected
		const numberInput = $$("#product-quantity-value--" + interactiveProductsIndex);
		let maxQuantity, currentQuantity, newQuantity;

		if (numberInput.value == "") {
			numberInput.value = 1;
			newQuantity = 1;
		} else {
			maxQuantity = parseInt(numberInput.max);
			currentQuantity = parseInt(numberInput.value);
			if (currentQuantity < maxQuantity) {
				newQuantity = currentQuantity + 1;
				numberInput.value = newQuantity;
			} else {
				newQuantity = currentQuantity;
			}
		}

		// Updating the price shown
		refreshProductTotalPrice(affectsWhichPriceElement, interactiveProductsIndex, newQuantity, affectsWhichPricePerItemElement);
	}