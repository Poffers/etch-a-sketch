let mouseDown = false;
let erasing = false;

function resetSquares() {
    const canvas = document.querySelector(".canvas");
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }

    for (let i = 1; i <= 400; i++) {
        let div = document.createElement("div");
        div.classList.add("cell");
        canvas.appendChild(div);
    }
}

function createDrawListeners() {
    document.querySelectorAll(".cell").forEach(box => box.addEventListener("mousedown", e => {
        colorBox(e.target);
    }));

    document.querySelectorAll(".cell").forEach(box => box.addEventListener("mouseover", e => {
        if (mouseDown) {
            colorBox(e.target);
        }
    }));

}

function colorBox(div) {
    if (!erasing) {
        div.style.backgroundColor = document.getElementById("color-picker").value;
    } else {
        div.style.backgroundColor = "#ffffff"
    }
}

document.body.addEventListener("mousedown", () => mouseDown = true);
document.body.addEventListener("mouseup", () => mouseDown = false);
document.querySelector(".canvas").addEventListener("touchmove", e => {
    const touchedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (touchedElement && touchedElement.className === "cell") {
        colorBox(touchedElement);
    }
});
document.querySelector(".canvas").addEventListener("touchstart", e => colorBox(e.target));

resetSquares();
createDrawListeners();

document.getElementById("button-clear").addEventListener("click", () => {
    resetSquares();
    createDrawListeners();
});

document.getElementById("button-brush").addEventListener("click", () => {
    erasing = false;
    document.getElementById("button-brush").classList.add("active");
    document.getElementById("button-eraser").classList.remove("active");
});

document.getElementById("button-eraser").addEventListener("click", () => {
    erasing = true;
    document.getElementById("button-eraser").classList.add("active");
    document.getElementById("button-brush").classList.remove("active");
});

