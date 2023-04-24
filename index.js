// Get color button
document.getElementById("get-color").addEventListener("click", () => {
	render();
});

// get color schemes
function getColorSchemeHTML(data) {
	return data.colors
		.map((color) => {
			return `<div class="generated-color" style="background-color:${color.hex.value}"></div>`;
		})
		.join("");
}

// get color hex
function getColorHexHTML(data) {
	return data.colors
		.map((color) => {
			return `<div class="generated-color">${color.hex.value}</div>`;
		})
		.join("");
}

function render() {
	const colorPickerEl = document.getElementById("color-picker");
	const schemePickerEl = document.getElementById("scheme-picker");

	const colorSchemeEl = document.getElementById("color-scheme");
	const colorHexEl = document.getElementById("color-hex");

	fetch(
		`https://www.thecolorapi.com/scheme?hex=${colorPickerEl.value.substring(
			1
		)}&mode=${schemePickerEl.value}&count=5`,
		{ method: "GET" }
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			colorSchemeEl.innerHTML = getColorSchemeHTML(data);
			colorHexEl.innerHTML = getColorHexHTML(data);
		});
}
render();
