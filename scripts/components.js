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
		$$(".header-placeholder").forEach(el => {
			el.innerHTML = data;
		})
	});