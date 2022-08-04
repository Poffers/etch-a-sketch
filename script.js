let mouseDown = false;
let mode = "brush";

function resetSquares(size) {
    document.body.removeChild(document.getElementById("canvas"));

    let canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    gridEnabled = document.getElementById("button-lines").classList == "active";
    for (let i = 1; i <= size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        if (gridEnabled) {
            div.classList.add("lines");
        }
        div.style.backgroundColor = "#ffffff";
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
    
    document.getElementById("button-brush").addEventListener("click", e => {
        mode = "brush";
        e.target.classList.add("active");
        document.getElementById("button-eraser").classList.remove("active");
        document.getElementById("button-rainbow").classList.remove("active");
    });
    
    document.getElementById("button-eraser").addEventListener("click", e => {
        mode = "erase"
        e.target.classList.add("active");
        document.getElementById("button-brush").classList.remove("active");
        document.getElementById("button-rainbow").classList.remove("active");
    });

    document.getElementById("button-rainbow").addEventListener("click", e => {
        mode = "rainbow";
        e.target.classList.add("active");
        document.getElementById("button-brush").classList.remove("active");
        document.getElementById("button-eraser").classList.remove("active");
    });

    document.getElementById("button-lines").addEventListener("click", e => {
        e.target.classList.toggle("active");
        toggleGridLines();
    });

}

function toggleGridLines() {
    let canvas = document.getElementById("canvas");
    Array.from(canvas.children).forEach(child => child.classList.toggle("lines"));
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
        if (touchedElement && touchedElement.className.includes("cell")) {
            colorBox(touchedElement);
        }
    });

}

function colorBox(div) {
    if (mode == "brush") {
        div.style.backgroundColor = document.getElementById("color-picker").value;
    } else if (mode == "erase") {
        div.style.backgroundColor = "#ffffff";
    } else if (mode == "rainbow") {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        div.style.backgroundColor =  `rgb(${r}, ${g}, ${b})`;
    }
}

document.body.addEventListener("mousedown", () => mouseDown = true);
document.body.addEventListener("mouseup", () => mouseDown = false);

resetSquares(16);
createDrawListeners();
createButtonListeners();
createSliderListeners();

