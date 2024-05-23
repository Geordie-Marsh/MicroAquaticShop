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
			log("There was a problem with the fetch operation: ", error);
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

				// If this product is an interactive product, make it interactive
				if(listedProductsShrimp[i][4]) {
					// Make the view button direct to the product's page
					const viewButton = container.querySelector(".product--listed__button--view");
					viewButton.setAttribute("href", "products/" + listedProductsShrimp[i][4] + "/");

					// Make clicking anywhere on the product direct to the product's page
					container.setAttribute("onclick", "location.href = 'products/" + listedProductsShrimp[i][4] + "/';");

					// Making the add to cart button add 1 of this product to the cart\
					const cartButton = container.querySelector(".product--listed__button--cart");
					cartButton.setAttribute("onclick", "addToCart('" + listedProductsShrimp[i][4] + "');");
					// Stopping any propagation from happening since the container has an onclick event and we don't want bubbling to occur
					on(cartButton, "click", (event) => {
						event.stopPropagation();
					})
				}


			// Appending the content of the container to the featured products div
			$$(".product-listing").appendChild(container);
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
			log("There was a problem with the fetch operation: ", error);
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

				// Replacing the default data of the element with that specific to the product in question
					const label = button.querySelector(".button__label--text"); // Editing the title
					label.textContent = filterList[i][0];
					// Removing the colour swatch if it's not a colour filter
					const colourSwatch = button.querySelector(".colour-swatch");
					filterList !== filterColour
						? colourSwatch.remove()
						: changeColourFilterSwatch() ;
				
				// If it's a colour filter, change the colour swatch to the right colour
				function changeColourFilterSwatch() {
					colourSwatch.style.background = "var(--clr-primitive-" + filterList[i][1] + ")";
				}

				// Appending the content of the button to the div
					// Getting the ID specifier for the category div
					let filterDivID = 
						filterList == filterSubcategoryShrimp ? "sub-category" 
							: filterList == filterPrice ? "price"
							: filterList == filterAvailability ? "availability"
							: "colour";
					// Appending the content to the div this has just specified
					$$("#product-filters__filter-type--" + filterDivID).appendChild(button);
			}
		}
	}