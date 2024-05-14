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

			// Replacing the default data of the element with that specific to the product in question
				const title = container.querySelector(".product--listed__title"); // Editing the title
				title.textContent = listedProductsShrimp[i][0];
				
				const price = container.querySelector(".product--listed__price"); // Editing the price
				price.textContent = listedProductsShrimp[i][1];

				const img = container.querySelector(".product--listed__img"); // Editing the image
				img.setAttribute("src", "assets/images/" + listedProductsShrimp[i][2] + ".jpg");

				const colourName = container.querySelector(".product--listed__colour__name"); // Editing the colour name
				colourName.textContent = toStartCase(listedProductsShrimp[i][3]);

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
		for (let i = 0; i < filterSubcategoryShrimp.length; i++) {
			// Creating a button element
			const button = document.createElement("button");

			// Setting the innerHTML of the button to the fetched HTML
			button.innerHTML = html;

			// Giving the button classes
			classAdd(button, "button");
			classAdd(button, "button--tertiary");
			classAdd(button, "button--glass");
			// classAdd(container, "panel");
			// classAdd(container, "flex--vertical");
			// classAdd(container, "standard-spacing");

			// Replacing the default data of the element with that specific to the product in question
				const label = button.querySelector(".button__label--text"); // Editing the title
				label.textContent = filterSubcategoryShrimp[i][0];

			// Appending the content of the button to the featured products div
			$$("#product-filters__filter-type--sub-category").appendChild(button);
		}
	}