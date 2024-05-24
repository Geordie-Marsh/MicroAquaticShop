// NOTE: Everything on the product page would be generated using a full database, but for the purposes of this assignment, only the elements which pertain to the price are generated

// Getting from the HTML data attribute which product this page is for (the index of interactiveProducts)
let pageProductIndex = $$("html").dataset.interactiveProductsIndex;
pageProductIndex = parseInt(pageProductIndex);
const pageProduct = interactiveProducts[pageProductIndex];
log(pageProduct) //TEMP

// Generating the bulk-buy table
function generateBulkBuy() {
	log("generating bulkbuy");//TEMP

	// Creating a table element
	const table = document.createElement("table");

	// Assigning classes to the table
	classAdd(table, "product-bulk-buy-table");


	// Adding the header row
	// Creating a table row (<tr>) element
	const trHeader = document.createElement("tr");

	// Creating the three table header cell (<th>) elements
	const th1 = document.createElement("th");
	const th2 = document.createElement("th");
	const th3 = document.createElement("th");

	// Giving the table header cells values
	th1.innerHTML = "Quantity";
	th2.innerHTML = "Price";
	th3.innerHTML = "Discount";

	// Appending the table header cells to the table header row
	trHeader.appendChild(th1);
	trHeader.appendChild(th2);
	trHeader.appendChild(th3);
	log(trHeader.innerHTML);//TEMP

	// Appending the table header row to the table
	table.appendChild(trHeader);
	log(table.innerHTML);//TEMP
	

	// Creating a row for each bulk-buy offer (i = 1 since the first element in the prices subarray is the base price)
	for (let i = 1; i < pageProduct[2].length; i++) {
		const offer = pageProduct[2][i];
		
		// Creating a table row (<tr>) element
		const tr = document.createElement("tr");

		// Creating the three table cell (<th>) elements
		const tdQuantity = document.createElement("td");
		const tdPrice = document.createElement("td");
		const tdDiscount = document.createElement("td");
		
		// Giving the table cells values
		// The quantity is just the minimum quantity for that offer to kick in with a plus (like 10+)
		tdQuantity.innerHTML = offer[0] + "+";
		log(tdQuantity.innerHTML);//TEMP

		// The price is the price per unit in this format: $ + price + ea
		tdPrice.innerHTML = "$" + offer[1] + "ea";
		log(tdPrice.innerHTML);//TEMP

		// The discount amount is calculated and displayed rounded to the closest 5%
		// Getting the fraction of how much the bulk price is compared to the original price
		let originalPrice = parseFloat(pageProduct[2][0]);
		let bulkPrice = parseFloat(offer[1]);
		let bulkFraction = bulkPrice / originalPrice;
		log(originalPrice, bulkPrice, bulkFraction)//TEMP
		// Since the discount is rounded to the 5, multiply the bulkFraction by 20 and round it
		bulkFraction *= 20;
		bulkFraction = round(bulkFraction);
		// To make the fraction (which is now out of 20) into a percentage, multiply it by 5
		let bulkPercentage = 5 * bulkFraction;
		// The discount is therefore just 100 - the the bulkPercentage
		let discount = 100 - bulkPercentage;
		log(discount)//TEMP
		// So, the discount shown in the discount column is just the discount with a percentage symbol
		tdDiscount.innerHTML = discount + "%";
		log(tdDiscount.innerHTML);//TEMP

		// Appending the table  cells to the table row
		tr.appendChild(tdQuantity);
		tr.appendChild(tdPrice);
		tr.appendChild(tdDiscount);
		log(tr.innerHTML);//TEMP

		// Appending the table row to the table
		table.appendChild(tr);
		log(table.innerHTML);//TEMP
	}

	// Appending the table to the product quantity panel
	$$(".product-quantity").appendChild(table);
}

// The bulk-buy table will be generated iff there is bulk-buy info associated with the product
if (pageProduct[2][1] != undefined) {
	generateBulkBuy();

	// If there are bulk-buy offers, change the quantity panel's title to include 'and bulk-buy'\
	$$(".product-quantity > h4").innerHTML += " and Bulk-Buy";
}


// Making the minus and plus buttons on the quantity input functional
function productQuantityDecrease() {
	let minQuantity = parseInt($$("#product-quantity-value").min);
	let currentQuantity = parseInt($$("#product-quantity-value").value);
	if (currentQuantity > minQuantity) {
		let newQuantity = currentQuantity - 1;
		$$("#product-quantity-value").value = newQuantity;
	}
}
function productQuantityIncrease() {
	let maxQuantity = parseInt($$("#product-quantity-value").max);
	let currentQuantity = parseInt($$("#product-quantity-value").value);
	if (currentQuantity < maxQuantity) {
		let newQuantity = currentQuantity + 1;
		$$("#product-quantity-value").value = newQuantity;
	}
}

// Making the add to cart button add however many of the quantity given to the cart
on($$(".product-user-actions__cart"), "click", () => {
	let quantity = $$("#product-quantity-value").value;
	log(quantity);
	cartProductQuantityIncrease(pageProduct[0], quantity);
});