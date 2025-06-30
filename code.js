const drawingArea = document.getElementById("drawing-area");
const myName = document.getElementById("my-name");
const mySVG = document.getElementById("my-svg");
const lengthBox = document.getElementById("length");
const supportX = document.getElementById("support-x");
const supportType = document.getElementById("support-type");
const addSupport = document.getElementById("add-support");
const supportList = document.getElementById("support-list");
let beamSVG = null;
let supports = [];

function drawPinnedSupport(x, y) {
    let pinnedSVG = document.createElementNS('http://www.w3.org/2000/svg',"g");
    pinnedSVG.setAttributeNS(null, "style", "fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
    pinnedSVG.setAttributeNS(null, "transform", "translate(" + (50 + 100*x).toString() + " " + (50 - 100*y).toString() + ")");
    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttributeNS(null, "d", "M 0,0 l -10,16 l 20,0 Z");
    let circle = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    circle.setAttributeNS(null, "cx", "0");
    circle.setAttributeNS(null, "cy", "0");
    circle.setAttributeNS(null, "r", "5");
    let hatch = document.createElementNS('http://www.w3.org/2000/svg',"path");
    hatch.setAttributeNS(null, "d", "M -5,16 l -5,5 m 10,-5 l -5,5 m 10,-5 l -5,5 m 10,-5 l -5,5");
    mySVG.appendChild(pinnedSVG);
    pinnedSVG.classList.add("draggable");
    pinnedSVG.appendChild(path);
    pinnedSVG.appendChild(circle);
    pinnedSVG.appendChild(hatch);
    supports.push([pinnedSVG, "шарнирно-неподвижная", x]);
}

function drawRollerSupport(x, y) {
    let rollerSVG = document.createElementNS('http://www.w3.org/2000/svg',"g");
    rollerSVG.setAttributeNS(null, "style", "fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
    rollerSVG.setAttributeNS(null, "transform", "translate(" + (50 + 100*x).toString() + " " + (50 - 100*y).toString() + ")");
    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttributeNS(null, "d", "M 0,0 l -10,16 l 20,0 Z");
    let circle = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    circle.setAttributeNS(null, "cx", "0");
    circle.setAttributeNS(null, "cy", "0");
    circle.setAttributeNS(null, "r", "5");
    let wheel1 = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    wheel1.setAttributeNS(null, "cx", "-5");
    wheel1.setAttributeNS(null, "cy", "18.5");
    wheel1.setAttributeNS(null, "r", "2.5");
    let wheel2 = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    wheel2.setAttributeNS(null, "cx", "5");
    wheel2.setAttributeNS(null, "cy", "18.5");
    wheel2.setAttributeNS(null, "r", "2.5");
    let ground = document.createElementNS('http://www.w3.org/2000/svg',"path");
    ground.setAttributeNS(null, "d", "M -10,21 l 20,0");
    mySVG.appendChild(rollerSVG);
    rollerSVG.appendChild(path);
    rollerSVG.appendChild(circle);
    rollerSVG.appendChild(wheel1);
    rollerSVG.appendChild(wheel2);
    rollerSVG.appendChild(ground);
    supports.push([rollerSVG, "шарнирно-подвижная", x]);
}

function drawFixedSupport(x, y) {
    let fixedSVG = document.createElementNS('http://www.w3.org/2000/svg',"g");
    fixedSVG.setAttributeNS(null, "style", "fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
    fixedSVG.setAttributeNS(null, "transform", "translate(" + (50 + 100*x).toString() + " " + (50 - 100*y).toString() + ")");
    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttributeNS(null, "d", "M 0,-20 l 0,40");
    let hatch = document.createElementNS('http://www.w3.org/2000/svg',"path");
    hatch.setAttributeNS(null, "d", "M 0,0 l -5,5 m 5,0 l -5,5 m 5,0 l -5,5 m 5,0 l -5,5");
    mySVG.appendChild(fixedSVG);
    fixedSVG.draggable = true;
    fixedSVG.appendChild(path);
    fixedSVG.appendChild(hatch);
    supports.push([fixedSVG, "заделка", x]);
}

function drawBeam() {
    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttributeNS(null, "d", "M 0,0 l 500, 0");
    path.setAttributeNS(null, "style", "fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
    path.setAttributeNS(null, "transform", "translate(50 50)");
    mySVG.appendChild(path);
    return path;
}

function updateSupportDisplay() {
    supportList.innerHTML = "";
    if (supports.length > 0) {
        for (let i = 0; i < supports.length; i++) {
            let newSupport = document.createElement("li");
            supportList.appendChild(newSupport);
            newSupport.innerHTML = "Опора " + (i+1) + " " + supports[i][1] + "; z = " + supports[i][2] + " м";
            newSupport.classList.add("deletable");
        }
    }
    else {
        supportList.textContent = "Нет опор"
    }
}

myName.addEventListener("mouseenter", function () {this.style.fontWeight=1000;});
myName.addEventListener("mouseleave", function () {this.style.fontWeight=700;});
lengthBox.addEventListener("input", () => {
    if (lengthBox.value != "" && lengthBox.value != 0) {
        if (beamSVG==null)
            beamSVG = drawBeam();
    }
    else {
        mySVG.removeChild(beamSVG);
        beamSVG = null;
        for (let i = 0; i < supports.length; i++)
            mySVG.removeChild(supports[i]);
        supports = [];
    }
});

supportType.addEventListener('change', () => {
    if (supportType.value !== "Нет") {
        addSupport.disabled = false;
    }
    else {
        addSupport.disabled = true;
    }
})

addSupport.addEventListener('click', () => {
    switch (supportType.value) {
        case "Шарнирно-неподвижная":
            drawPinnedSupport(supportX.value, 0);
            break;
        case "Шарнирно-подвижная":
            drawRollerSupport(supportX.value, 0);
            break;
        case "Заделка":
            drawFixedSupport(supportX.value, 0);
            break;
        default:
            break;
    }
    updateSupportDisplay();
})

supportList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'LI') {
        var index = Array.prototype.indexOf.call(supportList.children, target);
        mySVG.removeChild(supports[index][0]);
        supports.splice(index, 1);
        updateSupportDisplay();
    }
})