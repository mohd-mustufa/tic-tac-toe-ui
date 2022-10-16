const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
	box.addEventListener("click", () => clicked(box));
});

function clicked(element) {
	if (element.innerText == "") {
		element.innerText = "X";
	} else if (element.innerText == "X") {
		element.innerText = "O";
	} else if (element.innerText == "O") {
		element.innerText = "";
	}
}
