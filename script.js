let mouseDown = false;
let erasing = false;

function resetSquares(size) {
    document.body.removeChild(document.getElementById("canvas"));

    let canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 1; i <= size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.color = "#ffffff";
        canvas.appendChild(div);
    }

    document.body.insertBefore(canvas, document.getElementById("settings"));
}

function createSliderListeners() {
    document.getElementById("size-slider").addEventListener("change", e => {
        resetSquares(parseInt(e.target.value));
        createDrawListeners();
    });
    document.getElementById("size-slider").addEventListener("input", e => {
        document.getElementById("size-label").textContent = `${e.target.value} x ${e.target.value}`;
    });
}

function createButtonListeners() {
    document.getElementById("button-clear").addEventListener("click", () => {
        resetSquares(parseInt(document.getElementById("size-slider").value));
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
    document.querySelector(".cell").addEventListener("touchstart", e => colorBox(e.target));
    document.getElementById("canvas").addEventListener("touchmove", e => {
        const touchedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (touchedElement && touchedElement.className === "cell") {
            colorBox(touchedElement);
        }
    });

}

function colorBox(div) {
    if (!erasing) {
        div.style.backgroundColor = document.getElementById("color-picker").value;
    } else {
        div.style.backgroundColor = "#ffffff";
    }
}

document.body.addEventListener("mousedown", () => mouseDown = true);
document.body.addEventListener("mouseup", () => mouseDown = false);

resetSquares(16);
createDrawListeners();
createButtonListeners();
createSliderListeners();

