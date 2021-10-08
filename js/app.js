const drawingBoard = document.getElementById('container');
const gridSize = document.getElementById('gridSize');


gridSize.addEventListener('input', function() {
    console.log(gridSize.value);
});