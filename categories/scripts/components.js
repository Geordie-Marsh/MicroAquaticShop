// Including the listed products
	// Fetching the HTML for each element from the local component
	fetch("/components/product-listed.html")
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
			includeListedProducts(html);
		})
		.catch(error => {
			// Logging any errors to the console
			// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
			console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
			let html = `
				<!-- This is added into an <article> with the classes "product--listed", "flex--vertical" and "standard-spacing" -->
				<img class="product--listed__img">
				<h4 class="product--listed__title"></h4>
				<div class="product--listed__colour flex--horizontal standard-spacing">
					<div class="product--listed__colour__swatch colour-swatch"></div>
					<p class="product--listed__colour__name"></p>
				</div>
				<div>
					<h3 class="product--listed__price"></h3>
				</div>
				<div class="product--listed__buttons flex--horizontal standard-spacing">
					<a class="product--listed__button--view button button--secondary no-padding--horizontal" aria-label="View">
						<span class="button__label">View</span>
						<img src="assets/icons/arrow-right.svg" class="button__action-symbol" alt="Right arrow icon">
					</a>
					<button class="product--listed__button--heart button button--secondary button--icon-only" aria-label="Toggle Wishlist">
						<img class="button__icon" src="assets/icons/heart--dark.svg" alt="Heart">
					</button>
				</div>
				<button class="product--listed__button--cart button button--primary no-padding--horizontal stop-propagation" aria-label="Add to Cart">
					<span class="button__label">Add to Cart</span>
					<img src="assets/icons/arrow-right.svg" class="button__action-symbol" alt="Right arrow icon">
				</button>
			`;
			includeListedProducts(html);
		});

	// The function for creating each element and adding it into the DOM
	function includeListedProducts(html) {
		// Creating a new a card for each element, using the data from the listedProductsShrimp array
		for (let i = 0; i < listedProductsShrimp.length; i++) {
			// Creating a container element
			const container = document.createElement("article");

			// Setting the innerHTML of the container to the fetched HTML
			container.innerHTML = html;

			// Giving the container classes
			classAdd(container, "product--listed");
			classAdd(container, "panel");
			classAdd(container, "flex--vertical");
			classAdd(container, "standard-spacing");

			// Giving the container classes associated with which filters it applies to
			for (let j = 0; j < listedProductsShrimp[i][5].length; j++) {
				const filter = listedProductsShrimp[i][5][j];
				// The classname used for the filter (eg, filter--shrimp-cherry)
				let classFilter = "filter--" + filter;
				
				classAdd(container, classFilter);
			}
			
			// Giving the container an ID if there's a product code attached to the product
			if (listedProductsShrimp[i][4]) {
				container.setAttribute("id", listedProductsShrimp[i][4]);
			}

			// Replacing the default data of the element with that specific to the product in question
				const title = container.querySelector(".product--listed__title"); // Editing the title
				title.textContent = listedProductsShrimp[i][0];
				
				const price = container.querySelector(".product--listed__price"); // Editing the price
				price.textContent = listedProductsShrimp[i][1];

				const img = container.querySelector(".product--listed__img"); // Editing the image
				img.setAttribute("src", "assets/images/" + listedProductsShrimp[i][2] + ".jpg");

				const colourName = container.querySelector(".product--listed__colour__name"); // Editing the colour name
				colourName.textContent = listedProductsShrimp[i][3][0];
				const colourSwatch = container.querySelector(".product--listed__colour__swatch"); // Editing the colour name
				colourSwatch.style.background = "var(--clr-primitive-" + listedProductsShrimp[i][3][1] + ")";

				const viewButton = container.querySelector(".product--listed__button--view");
				const wishlistButton = container.querySelector(".product--listed__button--heart");
				const cartButton = container.querySelector(".product--listed__button--cart");


				// If this product is an interactive product, make it interactive
				if(listedProductsShrimp[i][4] != null) {
					// Make the view button direct to the product's page
					viewButton.setAttribute("href", "products/" + interactiveProducts[listedProductsShrimp[i][4]][0] + "/");

					// Make clicking anywhere on the product direct to the product's page
					container.setAttribute("onclick", "location.href = 'products/" + interactiveProducts[listedProductsShrimp[i][4]][0] + "/';");

					// Making the wishlist button toggle whether this product is in the wishlist
					wishlistButton.setAttribute("onclick", "toggleWishlist(" + listedProductsShrimp[i][4] + ", this);");

					// Checking to see if this product is already in the wishlist and updating the heart symbol accordingly
					// If the wishlist is empty, ignore this
					if (localStorage.getItem("wishlist") != null && localStorage.getItem("cart") != undefined && localStorage.getItem("cart") != "") {
						// Getting the current data of the wishlist
						let wishlist = getWishlistArray();
						// Searching through the existing wishlist to see if there's already an instance (or multiple) of the product in there
						productInWishlistIndex = checkWishlistForItem(wishlist, listedProductsShrimp[i][4]);
						// If in wishlist, change the heart symbol to be filled
						if (productInWishlistIndex !== false) {
							wishlistButton.querySelector("img").setAttribute("src", "assets/icons/heart-filled--red.svg");
						}
					}

					// Making the add to cart button add 1 of this product to the cart
					on(cartButton, "click", () => {
						// Adding to cart
						addToCart(listedProductsShrimp[i][4]);
						// Updating the button to confirm the user's action
						updateAddToCartButton(cartButton, false);
					});
				} else {
					// Making clicking on the product itself display an alert that lists the product which are interactive
					on(container, "click", () => {
						alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp");
					});
					// Making the view button display an alert that lists the product which are interactive
					on(viewButton, "click", () => {
						alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp");
					});
					// Making the wishlist button display an alert that lists the product which are interactive
					on(wishlistButton, "click", () => {
						alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp");
					});
					// Making the add to cart button display an alert that lists the product which are interactive
					on(cartButton, "click", () => {
						alert("Sorry, this product doesn't have functionality. The products you can interact with are:\n- Red cherry shrimp\n- Tangerine tiger shrimp\n- Ghost shrimp\n- Blue cherry shrimp");
					});
				}


				// Stopping any propagation from happening on the wishlist button since its ancestor container has an onclick event and we don't want bubbling to occur
				on(wishlistButton, "click", (event) => {
					event.stopPropagation();
				});
				// Stopping any propagation from happening on the add to cart button since its ancestor container has an onclick event and we don't want bubbling to occur
				on(cartButton, "click", (event) => {
					event.stopPropagation();
				});

			// Appending the content of the container to the featured products div
			$$(".product-listing").appendChild(container);

			// Sending a success message
			log("Successfully generated the listed products");
		}
	}


// Including the filters
	// Fetching the HTML for each element from the local component
	fetch("/components/filter.html")
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
			includeFilters(html);
		})
		.catch(error => {
			// Logging any errors to the console
			// Since the website needs to be openable in a local file instead of being hosted on a server, CORS issues arise. So, for the purposes of this assignment, the website will first try to fetch the HTML from the local component file like it would normally, but if it's unsuccessful (because of a CORS issue), it will just use the exact same HTML as that file but copy-pasted into here
			console.warn("There was a problem with the fetch operation, so the html loaded directly into the JavaScript will be used instead ", error);
			let html = `
				<!-- This is added into <button> with the classes "filter", "flex", "flex--vertical" and "flex--justify-between" -->
				<div class="colour-swatch button__icon--colour"></div>
				<span class="button__label--text"></span>
			`;
			includeFilters(html);
		});

	// The function for creating each element and adding it into the DOM
	function includeFilters(html) {
		// Creating a new a button for each element, using the data from the filterSubcategoryShrimp array
		includeThisFilterList(filterSubcategoryShrimp);
		includeThisFilterList(filterPrice);
		includeThisFilterList(filterAvailability);
		includeThisFilterList(filterColour);

		function includeThisFilterList(filterList) {
			for (let i = 0; i < filterList.length; i++) {
				// Creating a button element
				const button = document.createElement("button");

				// Setting the innerHTML of the button to the fetched HTML
				button.innerHTML = html;

				// Giving the button classes
				classAdd(button, "button");
				classAdd(button, "button--tertiary");
				classAdd(button, "button--glass");
				classAdd(button, "button--filter");
				classAdd(button, "button--filter--" + filterList[i][1]);

				// Replacing the default data of the element with that specific to the product in question
				const label = button.querySelector(".button__label--text"); // Editing the title
				label.textContent = filterList[i][0];
				// Removing the colour swatch if it's not a colour filter (the colour swatch is on the filter by default so it is removed if it's not needed)
				const colourSwatch = button.querySelector(".colour-swatch");
				// If it's a colour filter, change the colour swatch to the right colour
				(filterList != filterColour) ?
					colourSwatch.remove() :
					colourSwatch.style.background = "var(--clr-primitive-" + filterList[i][1] + ")";

				// Appending the content of the button to the div
				// Getting the ID specifier for the category div
				let filterDivID = 
					filterList == filterSubcategoryShrimp ? "sub-category" 
						: filterList == filterPrice ? "price"
						: filterList == filterAvailability ? "availability"
						: "colour";
				// Appending the content to the div this has just specified
				$$("#product-filters__filter-type--" + filterDivID).appendChild(button);

				// Making the filter buttons functional
				on(button, "click", () => {
					toggleFilter(filterList[i][1], $$(".button--filter--" + filterList[i][1]));
				});

				// Adding the CSS to the document to make elements not appear when the filter is active
				addCSS(`
					.product-listing.filter--${filterList[i][1]} .product--listed:not(.filter--${filterList[i][1]}) {
						display: none;
					}
				`);

				// Sending a success message
				log("Successfully generated the filter buttons");
			}
		}
	}