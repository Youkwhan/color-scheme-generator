render();

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

// get color schemes
function getColorSchemeHTML(data) {
	return data.colors
		.map((color) => {
			return `<div class="generated-color" data-color=${color.hex.value} style="background-color:${color.hex.value}"></div>`;
		})
		.join("");
}

// get color hex
function getColorHexHTML(data) {
	return data.colors
		.map((color) => {
			return `<div class="generated-color" data-color=${color.hex.value}>${color.hex.value}</div>`;
		})
		.join("");
}

// Listen color button
document.getElementById("get-color").addEventListener("click", () => {
	render();
});

// Listen copy color
document.addEventListener("click", (e) => {
	// only if it has a data attribute color!
	if (e.target.dataset.color) {
		navigator.clipboard.writeText(e.target.dataset.color);

		renderPopupHTML(e);
	}
});

function renderPopupHTML(e) {
	const popupEl = document.getElementById("popup");
	popupEl.style.opacity = 1;
	popupEl.textContent = `${e.target.dataset.color} copied to clipboard!`;
	setTimeout(() => {
		popupEl.style.opacity = 0;
	}, 1500);
}
