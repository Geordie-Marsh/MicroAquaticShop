// Providing a welcome message to anyone in the console :P
log("%cWelcome!", "font-weight: bold; font-size: 50px; color: #f53b2a; text-shadow: 2px 2px 0 #f58320, 4px 4px 0 #f5b618, 6px 6px 0 #08d442, 8px 8px 0 #1b9de3, 10px 10px 0 #4225fa, 12px 12px 0 #9128ed; margin-bottom: 10px;");
log("%cWelcome to the Micro Aquatic Shop. Stick around a while!", "font-weight: bold; font-size: 15px; color: #2884ed; margin-bottom: 10px;");
log("———————————————————————");

// Providing a header for generating the components
log("%cComponent generation statuses:", "font-weight: bold;");


// Including the header
	// If the page doesn't have a header section, don't run this function
	if (!$$(".page-header")) {
		// Provide a message that no header cont was found
		log("Cannot find a header container, so it won't be generated");
	} else {
		// Fetching the HTML for the header from the local component
		fetch("components/header.html")
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
				let html = `
					<!-- This is added into a <header> on the respective page with the classes "page-header", "flex--horizontal" and "standard-spacing" -->
					<div class="collapsed-navbar flex--horizontal">
						<img onclick="openFullscreenMenu();" class="collapsed-navbar__icon" src="assets/icons/hamburger.svg" alt="Menu">
						<img class="collapsed-navbar__icon" src="assets/icons/search.svg" alt="Magnifying glass">
					</div>
					
					<!-- The logo and brand name -->
					<a class="logo grid standard-spacing" href="">
						<img src="assets/icons/logo.svg" alt="The brand logo">
						<h4>Micro Aquatic Shop</h4>
					</a>
					

					<!-- The navbar -->
					<div class="navbar flex--horizontal">
						<!-- Search icon -->
						<img class="navbar__icon" src="assets/icons/search.svg" alt="Magnifying glass">

						<!-- Divider -->
						<!-- TODO replace dividers with SVGs -->
						<div class="header-divider"></div>

						<!-- Pages -->
						<!-- Home page -->
						<a class="link" href="">Home</a>
						<!-- Shop page/dropdown -->
						<div class="navbar__drop-down flex--horizontal">
							<a class="link" href="categories/">Shop</a>
							<img class="navbar__drop-down__arrow" src="assets/icons/arrow-down.svg" alt="Down arrow">
							<div class="header__dropdown-menu panel flex--horizontal">
								<div class="header__dropdown-menu__list flex--vertical">
									<h4>Discover</h4>
									<a class="link">Featured products</a>
									<a class="link">New arrivals</a>
									<a class="link">Best sellers</a>
									<a class="link"><strong>ON SALE</strong></a>
								</div>
								<div class="header__dropdown-menu__list flex--vertical">
									<h4>Animals</h4>
									<a class="link" href="categories/shrimp/">Shrimp</a>
									<a class="link">Fish</a>
									<a class="link">Snails</a>
									<a class="link">Algae Eaters</a>
								</div>
								<div class="header__dropdown-menu__list flex--vertical">
									<h4>Aquascaping</h4>
									<a class="link">Plants</a>
									<a class="link">Bonsai</a>
									<a class="link">Décor</a>
									<a class="link">Flooring</a>
								</div>
								<div class="header__dropdown-menu__list flex--vertical">
									<h4>Supplies</h4>
									<a class="link">Tanks</a>
									<a class="link">Accessories</a>
									<a class="link">Tools</a>
									<a class="link">Food</a>
								</div>
							</div>
						</div>
						<!-- Blog page -->
						<a class="link">Blog</a>
						<!-- About page/dropdown -->
						<div class="navbar__drop-down flex--horizontal">
							<a class="link">About</a>
							<img class="navbar__drop-down__arrow" src="assets/icons/arrow-down.svg" alt="Down arrow">
						</div>

						<!-- Divider -->
						<div class="header-divider"></div>
						
						<!-- Link to login or account page -->
						<a class="link">Login &#47; Sign up</a>

						<!-- Divider -->
						<div class="header-divider"></div>

						<!-- Wishlist and cart icons -->
						<div class="navbar__purchasing-icons flex--horizontal standard-spacing">
							<a href="wishlist/">
								<img class="navbar__icon" src="assets/icons/heart.svg" alt="Wishlist">
							</a>
							<a href="cart/">
								<img class="navbar__icon" src="assets/icons/shopping-bag.svg" alt="Shopping bag">
							</a>
						</div>
					</div>
				`;
				includeHeader(html);
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
				let html = `
					<!-- This is added into an <article> with the classes "featured-product", "flex--vertical" and "standard-spacing" -->
					<img class="featured-product__img">
					<strong class="featured-product__title"></strong>
					<div>
						<h4 class="featured-product__price"></h4>
					</div>
					<div class="featured-product__buttons flex--horizontal standard-spacing">
						<a class="featured-product__button--view button button--secondary no-padding--horizontal" aria-label="View">
							<span class="button__label">View</span>
							<img src="assets/icons/arrow-right.svg" class="button__action-symbol" alt="Right arrow icon">
						</a>
						<button class="featured-product__button--heart button button--secondary button--icon-only" aria-label="Toggle Wishlist">
							<img class="button__icon" src="assets/icons/heart--dark.svg" alt="Heart">
						</button>
					</div>
					<button class="featured-product__button--cart button button--primary no-padding--horizontal" aria-label="Add to Cart">
						<span class="button__label">Add to Cart</span>
						<img src="assets/icons/arrow-right.svg" class="button__action-symbol" alt="Right arrow icon">
					</button>
				`;
				includeFeaturedProducts(html);
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
				on(cartButton, "click", () => {
					// Adding to cart
					addToCart(0);
					// Updating the button to confirm the user's action
					updateAddToCartButton(cartButton, false);
				});
			} else {
				// Making clicking on the product itself display an alert that lists the product which are interactive
				on(container, "click", () => {
					alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp")
				});
				// Making the view button display an alert that lists the product which are interactive
				on(viewButton, "click", () => {
					alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp")
				});
				// Making the wishlist button display an alert that lists the product which are interactive
				on(wishlistButton, "click", () => {
					alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp")
				});
				// Making the add to cart button display an alert that lists the product which are interactive
				on(cartButton, "click", () => {
					alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp")
				});
			}

			// Stopping any propagation from happening on the view button since its ancestor container has an onclick event and we don't want bubbling to occur
			on(viewButton, "click", (event) => {
				event.stopPropagation();
			})
			// Stopping any propagation from happening on the wishlist button since its ancestor container has an onclick event and we don't want bubbling to occur
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
		fetch("components/shop-category.html")
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
				let html = `
					<!-- This is added into <button> with the classes "featured-product", "flex", "flex--vertical" and "flex--justify-between" -->
					<img class="button__logo">
					<span class="button__label--text strong"></span>
					<img src="assets/icons/arrow-right.svg" class="button__action-symbol">
				`;
				includeShoppingCategories(html);
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
			shoppingCategories[i][3] ? 
				button.setAttribute(
					"href", 
					"categories/" + shoppingCategories[i][3]
				) : 
				button.setAttribute(
					"onclick", 
					`alert("Sorry, this category doesn't have functionality. The only category you can interact with is Shrimp");`
				);

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
				let html = `
					<!-- This is added into an <article> with the classes "homepage-review", "flex--vertical" and "standard-spacing" -->
					<h4 class="homepage-review__name"></h4>
					<div class="homepage-review__stars-cont flex--horizontal">
						<img src="assets/icons/star.svg" class="homepage-review__stars-cont__star">
						<img src="assets/icons/star.svg" class="homepage-review__stars-cont__star">
						<img src="assets/icons/star.svg" class="homepage-review__stars-cont__star">
						<img src="assets/icons/star.svg" class="homepage-review__stars-cont__star">
						<img src="assets/icons/star.svg" class="homepage-review__stars-cont__star">
					</div>
					<p class="homepage-review__text"></p>
				`;
				includeHomepageReviews(html);
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
				let html = `
					<!-- This is added into a <footer> on the respective page with the classes "page-footer" and "grid" -->
					<!-- The logo and brand name -->
					<a class="logo logo--footer grid standard-spacing" href="">
						<img src="assets/icons/logo.svg" alt="The brand logo">
						<h2>Micro Aquatic Shop</h2>
					</a>
				
					<div class="footer-list footer-list--policies flex--vertical">
						<h4>Our Policies</h4>
						<a class="link">Privacy Policy</a>
						<a class="link">Shipping Policy</a>
						<a class="link">Refund & Return Policy</a>
						<a class="link">Terms & Conditions</a>
						<a class="link">Billing Terms & Conditions</a>
						<a class="link">Data Protection Policy</a>
						<a class="link">Stock Control Policy</a>
						<a class="link">RSPCA Policy</a>
					</div>
					<div class="footer-list footer-list--links flex--vertical">
						<h4>Useful Links</h4>
						<a class="link">FAQs</a>
						<a class="link">Contact Us</a>
						<a class="link">Support Services</a>
						<a class="link">Affiliate Program</a>
						<a class="link">About Us</a>
					</div>
					<div class="footer-list footer-list--contact flex--vertical">
						<h4>Contact Details</h4>
						<p><strong>Address:</strong> <a class="link">Unit 15, 2-8 Daniel St,<br>Wetherill Park NSW 2164</a></p>
						<p><strong>Phone:</strong> <a class="link">(02) 8320 3037</a></p>
						<p><strong>Email:</strong> <a class="link">support@&#8203;microaquaticshop&#8203;.com.au</a></p>
					</div>
				
					<div class="footer-copyright-bar panel">
						<p class="footer-copyright-bar__copyright">© 2024 Micro Aquatic Shop. All rights reserved.</p>
						<div class="footer-copyright-bar__cards grid standard-spacing">
							<img src="assets/icons/card-visa.svg">
							<img src="assets/icons/card-mastercard.svg">
							<img src="assets/icons/card-maestro.svg">
							<img src="assets/icons/card-amex.svg">
							<img src="assets/icons/card-shop.svg">
							<img src="assets/icons/card-paypal.svg">
							<img src="assets/icons/card-apple.svg">
							<img src="assets/icons/card-google.svg">
						</div>
					</div>
				`;
				includeFooter(html);
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
			let html = `
				<!-- This is added into a <section> on the respective page with the classes "fullscreen-menu" and "flex--horizontal" -->
				<header class="page-header flex--horizontal standard-spacing">
					<!-- Close and search icons -->
					<div class="collapsed-navbar flex--horizontal">
						<img onclick="closeFullscreenMenu();" class="collapsed-navbar__icon" src="assets/icons/cross.svg" alt="Close">
						<img class="collapsed-navbar__icon" src="assets/icons/search.svg" alt="Magnifying glass">
					</div>
			
					<!-- Wishlist and cart icons -->
					<div class="navbar__purchasing-icons flex--horizontal standard-spacing">
						<a href="wishlist/">
							<img class="navbar__icon" src="assets/icons/heart.svg" alt="Wishlist">
						</a>
						<a href="cart/">
							<img class="navbar__icon" src="assets/icons/shopping-bag.svg" alt="Shopping bag">
						</a>
					</div>
				</header>
			
				<div class="daily-featured-product-cont flex--vertical">
					<h3>Today's Featured Product</h3>
					<article class="daily-featured-product panel flex--horizontal">
						<img class="daily-featured-product__img" src="assets/images/featured-guppy.jpg">
						<div class="daily-featured-product__info flex--vertical">
							<h4 class="daily-featured-product__title">Dumbo Mosaic Guppy</h4>
							<h2 class="daily-featured-product__total">$4.99</h2>
						</div>
					</article>
				</div>
			
				<div class="fullscreen-menu__page-links-cont flex--vertical">
					<!-- Account page -->
					<a class="link h2">My Account</a>
			
					<!-- Divider -->
					<div class="fullscreen-menu__page-links-cont__divider"></div>
			
					<!-- Home page -->
					<a class="link h2" href="">Home</a>
					<!-- Shop page -->
					<a class="link h2" href="categories/">Shop</a>
					<!-- Blog page -->
					<a class="link h2">Blog</a>
					<!-- About page -->
					<a class="link h2">About</a>
				</div>
			`;
			includeFullscreenMenu(html);
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