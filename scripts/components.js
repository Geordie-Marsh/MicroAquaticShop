// Including the header
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
			log("There was a problem with the fetch operation: ", error);
		});

	// The function for creating the header and adding it into the DOM
	function includeHeader(html) {
		// Setting the innerHTML of the existing header tag to the fetched HTML
		$$(".page-header").innerHTML = html;
	}






// Including the featured products
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
			log("There was a problem with the fetch operation: ", error);
		});

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

			// Appending the content of the container to the featured products div
			$$(".featured-products__list").appendChild(container);
		}
	}





// Including the shop by category buttons
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
			log("There was a problem with the fetch operation: ", error);
		});

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
		}
	}





// Including the homepage reviews
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
			log("There was a problem with the fetch operation: ", error);
		});

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
		}
	}




// Including the footer
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
			log("There was a problem with the fetch operation: ", error);
		});

	// The function for creating the footer and adding it into the DOM
	function includeFooter(html) {
		// Setting the innerHTML of the existing footer tag to the fetched HTML
		$$(".page-footer").innerHTML = html;
	}