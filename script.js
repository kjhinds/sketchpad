let gridSize = 16;
let color = 'black';
const colorList = ['black','red','orange','yellow',
                'green','blue','purple','white'];

const container = document.getElementById('container');
const header = document.getElementById('header');

function mouseDidHover() {
    let opacityIncrease = 0.1;
    if (this.style.backgroundColor == color) {
        opacityIncrease += parseFloat(getComputedStyle(this).opacity);
    } else {
        this.style.backgroundColor = color;
    }

    this.style.opacity = `${opacityIncrease}`
}

function clearScreen() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        container.removeChild(cell);
    });
    
    do {
        var newSize = getNewGridSize();
    } while (newSize < 1 || newSize > 100)

    gridSize = newSize;

    initializeGrid();    
}

function getNewGridSize() {
    return newSize = parseInt(prompt(
            'How wide for the new canvas? (Max: 100)', gridSize),10);
}

function initializeGrid() {
    container.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, auto)`;
    for (let i = 1; i <= gridSize*gridSize; i++) {
        const cell = document.createElement('div');
        cell.addEventListener("mouseenter", mouseDidHover);
        cell.classList.add('cell');
        container.appendChild(cell);    
    }
}

function changeColor() {
    color = this.innerHTML;
    const buttons = document.querySelectorAll('BUTTON');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    this.classList.add('selected');
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener("click", clearScreen);

colorList.forEach(buttonColor => {
    const button = document.createElement("BUTTON");
    button.innerHTML = buttonColor;
    button.style.backgroundColor = buttonColor;
    if (buttonColor == 'black') {
        button.style.color = 'white';
        button.classList.add('selected');
    }
    button.addEventListener('click', changeColor);
    header.appendChild(button);
});

initializeGrid();