// This is the array used to generate the featured products list (would be generated from a proper database in the real website)
// Each element in the outer array is a product, and the inner array has the name, the price and the product image's filename in that order
const featuredProducts = [
	[
		"Tangerine Tiger Shrimp", 
		"$6.99",
		"shrimp-tangerine-tiger"
	],
	[
		"Dumbo Mosaic Guppy", 
		"$14.99",
		"featured-guppy"
	],
	[
		"Mystery Snail", 
		"From $5.99",
		"featured-snail"
	],
	[
		"Cryptocoryne Flamingo (Rare)", 
		"$55.00",
		"featured-red-plant"
	],
	[
		"Red Tiger Shrimp", 
		"$17.99",
		"shrimp-red-tiger"
	],
	[
		"Panda Corydoras", 
		"$14.99",
		"featured-panda"
	],
	[
		"Bundle - Mixed Cherry Shrimp", 
		"From $6.99ea",
		"shrimp-mixed-cherry"
	],
	[
		"Wild Form Cherry Shrimp", 
		"$9.99",
		"shrimp-cherry-wild"
	],
	[
		"Floating Crystalwort", 
		"$14.99",
		"featured-bush"
	],
	[
		"Crazy Blue Shrimp", 
		"$19.99",
		"shrimp-crazy-blue"
	]	
];


// This is the array used to generate the shop by category buttons
// Each element in the outer array is a category, and the inner array has the product type (animals, aquascaping or supplies), the category name, the logo's filename and (optional) the name of the category page in that order
const shoppingCategories = [
	[
		"animals",
		"Shrimp",
		"category-shrimp",
		"shrimp"
	],
	[
		"animals",
		"Fish",
		"category-fish"
	],
	[
		"animals",
		"Snails & Mussels",
		"category-snail"
	],
	[
		"animals",
		"Algae Eaters",
		"category-algae"
	],
	[
		"aquascaping",
		"Plants",
		"category-grass"
	],
	[
		"aquascaping",
		"Bonsai",
		"category-bonsai"
	],
	[
		"aquascaping",
		"Décor",
		"category-treasure"
	],
	[
		"aquascaping",
		"Flooring",
		"category-flooring"
	],
	[
		"supplies",
		"Tanks",
		"category-tanks"
	],
	[
		"supplies",
		"Tank Care",
		"category-accessories"
	],
	[
		"supplies",
		"Tools & Supplies",
		"category-tools"
	],
	[
		"supplies",
		"Animal Food",
		"category-food"
	]
];



// This is the array used to generate the homepage reviews
// Each element in the outer array is a revoew, and the inner array has the reviewer's name and the review in that order
const homepageReviews = [
	[
		"Cady Heron",
		"My fish were exactly the size mentioned and were delivered on time and healthy. Would highly recommend this shop!"
	],
	[
		"Aaron Samuels",
		"Great service, I love my new little shrimp!"
	],
	[
		"Regina George",
		"These little fish are like TO. DIE. FOR!!!"
	],
	[
		"Gretchen Wieners",
		"I love the bonsai it was really well constructed and fit into my aquarium perfectly! so fetch"
	],
	[
		"Karen Smith",
		"I got the mixed cherry shrimp and they're so cuteeeeee I love them so much and they're all really healthy and pretty colours"
	],
	[
		"Janis Ian",
		"Staff were really helpful and friendly."
	],
	[
		"Shane Omens",
		"These fish are great! They match my fish costume exactly!"
	],
	[
		"Glen Coco",
		"Got my daughter a batch of 1000 FAB little shrimpies for her new aquarium installation... she actually likes them! Great gift!!! "
	]
];




// This is thea array used for the colour swatches
// Each element in the outer array is a colour, and the inner array has the colour's name and the back-end colour variable name
const colourSwatches = [
	[
		"Red",
		"red"
	],
	[
		"Orange",
		"orange"
	],
	[
		"Yellow",
		"yellow"
	],
	[
		"Green",
		"green"
	],
	[
		"Blue",
		"blue"
	],
	[
		"Purple",
		"purple"
	],
	[
		"Pink",
		"pink"
	],
	[
		"White",
		"white"
	],
	[
		"Grey",
		"grey"
	],
	[
		"Black",
		"black"
	],
	[
		"Brown",
		"brown"
	],
	[
		"Multicolour",
		"multi"
	],
	[
		"Translucent",
		"translucent"
	]
];





// Not all the products are interactable, only a few; this is the array that contains and deals with them
const interactiveProducts = [
	[
		"shrimp--tangerine-tiger", // The product code
		"Tangerine tiger shrimp", // The product name
		[ // The prices
			6.99, // The base price
			// Any bulk-buy offers go here:
			[ // A bulk-buy offer
				10, // Min. quantity for this bulk-buy offer to take effect
				6.29 // Bulk-buy price (p/ea)
			],
			[ // A bulk-buy offer
				20, // Min. quantity for this bulk-buy offer to take effect
				5.59 // Bulk-buy price (p/ea)
			],
			[ // A bulk-buy offer
				50, // Min. quantity for this bulk-buy offer to take effect
				4.89 // Bulk-buy price (p/ea)
			],
			[ // A bulk-buy offer
				100, // Min. quantity for this bulk-buy offer to take effect
				4.19 // Bulk-buy price (p/ea)
			]
		],
		[
			"tangerine-tiger-shrimp" // The main product image
			// Any additional product images go here:
		],
		[colourSwatches][1] // The product colour
	],
	[
		"shrimp--cherry--blue", // The product code
		"Cherry Shrimp", // The product name
		[ // The prices
			9.99, // The base price
			// Any bulk-buy offers go here:
			[ // A bulk-buy offer
				10, // Min. quantity for this bulk-buy offer to take effect
				9.49 // Bulk-buy price (p/ea)
			],
			[ // A bulk-buy offer
				20, // Min. quantity for this bulk-buy offer to take effect
				8.99 // Bulk-buy price (p/ea)
			]
		],
		[
			"shrimp-cherry-blue" // The main product image
			// Any additional product images go here:
		],
		[colourSwatches][4] // The product colour
	],
	[
		"shrimp--cherry--red", // The product code
		"Cherry Shrimp", // The product name
		[ // The prices
			3.49, // The base price
			// Any bulk-buy offers go here:
			[ // A bulk-buy offer
				10, // Min. quantity for this bulk-buy offer to take effect
				3.29 // Bulk-buy price (p/ea)
			],
			[ // A bulk-buy offer
				25, // Min. quantity for this bulk-buy offer to take effect
				3.09 // Bulk-buy price (p/ea)
			]
		],
		[
			"shrimp-cherry-red" // The main product image
			// Any additional product images go here:
		],
		[colourSwatches][0] // The product colour
	],
	[
		"shrimp--ghost", // The product code
		"Ghost Shrimp", // The product name
		[ // The prices
			4.49, // The base price
			// Any bulk-buy offers go here:
		],
		[
			"shrimp-ghost" // The main product image
			// Any additional product images go here:
		],
		[colourSwatches][12] // The product colour
	]
];



// This is the array used to generate the products list in the shrimp category page (would be generated from a proper database in the real website)
// Each element in the outer array is a product, and the inner array has the name, the price, the product image's filename, the colour, the product's code (optional), and the filters in that order
const listedProductsShrimp = [
	[
		"Cherry Shrimp",
		"$3.49",
		"shrimp-cherry-red",
		colourSwatches[0],
		2,
		[
			"shrimp-cherry",
			"shrimp-neocaridina",
			"0-10",
			"in-stock",
			colourSwatches[0][1]
		]
	],
	[
		"Tangerine Tiger Shrimp",
		"$6.99",
		"shrimp-tangerine-tiger",
		colourSwatches[1],
		0,
		[
			"shrimp-tiger",
			"shrimp-caridina",
			"0-10",
			"in-stock",
			colourSwatches[1][1]
		]
	],
	[
		"Ghost Shrimp",
		"$4.49",
		"shrimp-ghost",
		colourSwatches[12],
		3,
		[
			"shrimp-ghost",
			"0-10",
			"in-stock",
			colourSwatches[12][1]
		]
	],
	[
		"Cherry Shrimp",
		"$6.99",
		"shrimp-cherry-yellow",
		colourSwatches[2],
		null,
		[
			"shrimp-cherry",
			"shrimp-neocaridina",
			"0-10",
			"in-stock",
			colourSwatches[2][1]
		]
	],
	[
		"King Kong Shrimp",
		"$17.99",
		"shrimp-king-kong-red",
		colourSwatches[0],
		null,
		[
			"shrimp-bee",
			"shrimp-caridina",
			"10-20",
			"in-stock",
			colourSwatches[0][1]
		]
	],
	[
		"Medium-High Grade Rili Shrimp",
		"$6.99",
		"shrimp-rili-red-high-grade",
		colourSwatches[0],
		null,
		[
			"shrimp-rili",
			"shrimp-neocaridina",
			"0-10",
			"in-stock",
			colourSwatches[0][1]
		]
	],
	[
		"Yellow Devil's Shrimp",
		"$17.99",
		"shrimp-yellow-devil",
		colourSwatches[2],
		null,
		[
			"shrimp-bee",
			"shrimp-caridina",
			"10-20",
			"in-stock",
			colourSwatches[2][1]
		]
	],
	[
		"Bundle - Mixed Cherry Shrimp",
		"From $6.99ea",
		"shrimp-cherry-mixed",
		colourSwatches[11],
		null,
		[
			"shrimp-cherry",
			"shrimp-neocaridina",
			"bundles",
			"0-10",
			"in-stock",
			colourSwatches[11][1]
		]
	],
	[
		"Cherry Shrimp",
		"$9.99",
		"shrimp-cherry-blue",
		colourSwatches[4],
		1,
		[
			"shrimp-cherry",
			"shrimp-neocaridina",
			"0-10",
			"in-stock",
			colourSwatches[4][1]
		]
	],
	[
		"Wild Form Cherry Shrimp",
		"$9.99",
		"shrimp-cherry-wild",
		colourSwatches[12],
		null,
		[
			"shrimp-cherry",
			"shrimp-neocaridina",
			"0-10",
			"in-stock",
			colourSwatches[12][1]
		]
	],
	[
		"Crazy Blue Shrimp",
		"$19.99",
		"shrimp-crazy-blue",
		colourSwatches[4],
		null,
		[
			"shrimp-crystal",
			"shrimp-caridina",
			"10-20",
			"in-stock",
			colourSwatches[4][1]
		]
	],
	[
		"Tiger Shrimp",
		"$17.99",
		"shrimp-tiger",
		colourSwatches[0],
		null,
		[
			"shrimp-tiger",
			"shrimp-caridina",
			"10-20",
			"in-stock",
			colourSwatches[0][1]
		]
	]
];



// These is the arrays used to generate the category page filters
// Each element in the outer array is a filter, and the inner array has the filter name and the back-end filter variable
const filterSubcategoryShrimp = [
	[
		"Bundles",
		"bundles"
	],
	[
		"Cherry shrimp",
		"shrimp-cherry"
	],
	[
		"Rili shrimp",
		"shrimp-rili"
	],
	[
		"Bee shrimp",
		"shrimp-bee"
	],
	[
		"Crystal shrimp",
		"shrimp-crystal"
	],
	[
		"Ghost shrimp",
		"shrimp-ghost"
	],
	[
		"Tiger shrimp",
		"shrimp-tiger"
	],
	[
		"Caridina shrimp",
		"shrimp-caridina"
	],
	[
		"Neocaridina shrimp",
		"shrimp-neocaridina"
	]
];
const filterPrice = [
	[
		"<$10",
		"0-10"
	],
	[
		"$10-$20",
		"10-20"
	],
	[
		"$20-$40",
		"20-40"
	],
	[
		"$40-$60",
		"40-60"
	],
	[
		"$60-$100",
		"60-100"
	],
	[
		">$100",
		"100-infinity"
	]
];
const filterAvailability = [
	[
		"In stock",
		"in-stock"
	],
	[
		"Coming soon",
		"coming-soon"
	]
];
const filterColour = [
	[
		"Red",
		"red"
	],
	[
		"Orange",
		"orange"
	],
	[
		"Yellow",
		"yellow"
	],
	[
		"Green",
		"green"
	],
	[
		"Blue",
		"blue"
	],
	[
		"Purple",
		"purple"
	],
	[
		"Pink",
		"pink"
	],
	[
		"White",
		"white"
	],
	[
		"Grey",
		"grey"
	],
	[
		"Black",
		"black"
	],
	[
		"Brown",
		"brown"
	],
	[
		"Multicolour",
		"multi"
	],
	[
		"Translucent",
		"translucent"
	]
];


