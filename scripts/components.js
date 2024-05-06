// Including buttons
	// fetch("/components/button.html")
	// 	.then(response => response.text())
	// 	.then(data => {
	// 		$$(".placeholder--button").forEach(el => {
	// 			el.innerHTML = data;
	// 		})
	// 	});

// customElements.define(
// 	"component-button",
// 	class extends HTMLElement {
// 		constructor() {
// 			super();
// 			const shadowRoot = this.attachShadow({ mode: "open" });
			
// 			// Fetching the component from a local file
// 			fetch("/components/button.html")
// 				.then(response => response.text())
// 				.then(templateString => {
// 					const parser = new DOMParser();
// 					const template = parser.parseFromString(templateString, "text/html");
// 					shadowRoot.appendChild(template.querySelector("template").content.cloneNode(true));
// 				})
// 				.catch(error => {
// 					console.error("Error fetching template:", error);
// 				});
// 		}
// 	},
// 	);
// TODO Remove this if not used


// Including the header
fetch("/components/header.html")
	.then(response => response.text())
	.then(data => {
		$$all(".header-placeholder").forEach(el => {
			el.innerHTML = data;
		})
	});

    // log(template);
    // // Clone the product element content
    // const clone = document.importNode(template.content, true);
    
    // Modify the cloned content
    // const title = clone.querySelector('.product-template__title');
    // title.textContent = "test"; // Change the content
    // nameSpan.setAttribute("class", "custom-class"); 
	// Change the class attribute
    
    // Append the modified content to the document
    // document.body.appendChild(template.querySelector("article").content.cloneNode(true));







// Including the featured products
	// Fetching the HTML for each element from the local component
	fetch("/components/featured-product.html")
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
			img.setAttribute("src", "/assets/images/" + featuredProducts[i][2] + ".jpg");

			// Appending the content of the container to the featured products div
			$$(".featured-products__list").appendChild(container);
		}
	}





// Including the shop by category buttons
	// Fetching the HTML for each element from the local component
	fetch("/components/shop-category.html")
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
			const button = document.createElement("button");

			// Setting the innerHTML of the button to the fetched HTML
			button.innerHTML = html;

			// Giving the container classes
			classAdd(button, "shopping-category");

			// Replacing the default data of the element with that specific to the category in question
			const category = button.querySelector(".button__label"); // Editing the category
			category.textContent = shoppingCategories[i][1];
			const img = button.querySelector(".button__logo"); // Editing the logo
			img.setAttribute("src", "/assets/icons/" + shoppingCategories[i][2] + ".png");

			// Appending the content of the button to the div of the product type the category falls under
			$$(".category-type--" + shoppingCategories[i][0]).appendChild(button);
		}
	}





// Including the homepage reviews
	// Fetching the HTML for each element from the local component
	fetch("/components/homepage-review.html")
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