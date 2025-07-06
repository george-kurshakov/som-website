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
let dimensions = [];
let dimensionsSVG = null;

function drawPinnedSupport(x, y) {
    let pinnedSVG = document.createElementNS('http://www.w3.org/2000/svg',"g");
    pinnedSVG.setAttributeNS(null, "style", "fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
    pinnedSVG.setAttributeNS(null, "transform", "translate(" + (50 + 500*x/lengthBox.value).toString() + " " + (50 - 500*y/lengthBox.value).toString() + ")");
    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttributeNS(null, "d", "M 0,0 l -10,16 l 20,0 Z");
    let circle = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    circle.setAttributeNS(null, "cx", "0");
    circle.setAttributeNS(null, "cy", "0");
    circle.setAttributeNS(null, "r", "5");
    let hatch = document.createElementNS('http://www.w3.org/2000/svg',"path");
    hatch.setAttributeNS(null, "d", "M -5,16 l -5,5 m 10,-5 l -5,5 m 10,-5 l -5,5 m 10,-5 l -5,5");
    mySVG.appendChild(pinnedSVG);
    pinnedSVG.appendChild(path);
    pinnedSVG.appendChild(circle);
    pinnedSVG.appendChild(hatch);
    supports.push([pinnedSVG, "шарнирно-неподвижная", x]);
}

function drawRollerSupport(x, y) {
    let rollerSVG = document.createElementNS('http://www.w3.org/2000/svg',"g");
    rollerSVG.setAttributeNS(null, "style", "fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
    rollerSVG.setAttributeNS(null, "transform", "translate(" + (50 + 500*x/lengthBox.value).toString() + " " + (50 - 500*y/lengthBox.value).toString() + ")");
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
    fixedSVG.setAttributeNS(null, "transform", "translate(" + (50 + 500*x/lengthBox.value).toString() + " " + (50 - 500*y/lengthBox.value).toString() + ")");
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

function updateDimensions() {
    if (dimensionsSVG != null)
    {
        mySVG.removeChild(dimensionsSVG);
        dimensionsSVG = null;
    }
        
    if (lengthBox.value == "" && lengthBox.value == 0)
        return;
    dimensions = [0.0, parseFloat(lengthBox.value)];
    for (let i = 0; i < supports.length; i++) {
        if (supports[i][2] != 0 && supports[i][2] != lengthBox.value)
            dimensions.push(parseFloat(supports[i][2]));
    }
    console.log("Before sort: " + dimensions);
    dimensions.sort((a, b) => a - b);
    console.log("After sort: " + dimensions);
    dimensionsSVG = document.createElementNS('http://www.w3.org/2000/svg',"g");
    let dimLines = document.createElementNS('http://www.w3.org/2000/svg',"path");
    dimLines.setAttributeNS(null, "d", "M 0, 50 l 500, 0");
    dimensionsSVG.appendChild(dimLines);
    for (let i = 0; i < dimensions.length; i++) {
        dimLines = document.createElementNS('http://www.w3.org/2000/svg',"path");
        dimLines.setAttributeNS(null, "d", `M ${(500 * dimensions[i] / parseFloat(lengthBox.value)).toString()}, 0 l 0, 55`);
        dimensionsSVG.appendChild(dimLines);
        //console.log(typeof(dimensions[i]));
        if (i > 0) {
            let dimText = document.createElementNS('http://www.w3.org/2000/svg',"text");
            dimText.innerHTML = (dimensions[i] - dimensions[i-1]).toString() + "м";
            dimText.setAttributeNS(null, "transform", "translate(" + ((500 / parseFloat(lengthBox.value)) * 0.5*(dimensions[i] + dimensions[i-1]) - 10).toString() + " 45)");
            dimText.setAttributeNS(null, "style", "fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
            dimensionsSVG.setAttributeNS(null, "style", "fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1");
            dimensionsSVG.setAttributeNS(null, "transform", "translate(50 50)");
            dimensionsSVG.appendChild(dimText);
        }
    }
    mySVG.appendChild(dimensionsSVG);
    //console.log(lengthBox.value)
    //console.log(typeof(lengthBox.value))
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

function deleteSupport(index) {
    mySVG.removeChild(supports[index][0]);
    supports.splice(index, 1);
}

myName.addEventListener("mouseenter", function () {this.style.fontWeight=1000;});
myName.addEventListener("mouseleave", function () {this.style.fontWeight=700;});

lengthBox.addEventListener("input", () => {
    if (lengthBox.value != "" && lengthBox.value != 0) {
        if (beamSVG==null) {
            beamSVG = drawBeam();
            //dimensions.push(lengthBox.value);
        }
        if (supportType.value !== "Нет")
            addSupport.disabled = false;
        updateDimensions();
    }
    else {
        addSupport.disabled = true;
        mySVG.removeChild(beamSVG);
        beamSVG = null;
        while (supports.length > 0) {
            deleteSupport(0);
        }
        supports = [];
        dimensions = [];
        updateSupportDisplay();
        updateDimensions();
    }
});

supportType.addEventListener('change', () => {
    if (supportType.value !== "Нет" && lengthBox.value != "" && lengthBox.value != 0) {
        addSupport.disabled = false;
    }
    else {
        addSupport.disabled = true;
    }
})

addSupport.addEventListener('click', () => {
    switch (supportType.value) {
        case "Шарнирно-неподвижная":
            drawPinnedSupport(parseFloat(supportX.value), 0);
            break;
        case "Шарнирно-подвижная":
            drawRollerSupport(parseFloat(supportX.value), 0);
            break;
        case "Заделка":
            drawFixedSupport(parseFloat(supportX.value), 0);
            break;
        default:
            break;
    }
    updateSupportDisplay();
    updateDimensions();
})

supportList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'LI') {
        var index = Array.prototype.indexOf.call(supportList.children, target);
        deleteSupport(index);
        updateSupportDisplay();
    }
})