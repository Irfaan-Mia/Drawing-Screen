const canvas = document.getElementById('drawingCanvas');

//set the heigh and width of the canvas object 
//Ajust the sizing as wanted but currently it will change when the size of the page changes
canvas.width = window.innerWidth - 1000; 
canvas.height = window.innerHeight - 500; 

//Require setting the context 
var ctx = canvas.getContext('2d', { willReadFrequently: true });

//Background color of the canvas
ctx.fillStyle = "white"; 

//Filling the canvas with whatever color is set 
ctx.fillRect(0,0,canvas.width,canvas.height);

//Intialization of drawing style and drawing size and methods 
ctx.strokeStyle = "black"; //Can be dynamically changed when change happens to color 
ctx.lineWidth = 5;       //Can easily be dynamically changed to allow different drawing styles 
let isDrawing = false;   
let isSprayCan = false; 
ctx.lineCap = 'round';
//reduce interuption between drawing
ctx.lineJoin = 'round';

//Array for strokes 
let restoreStrokes = [];
let index = -1; 


//Need an event listner to start the drawing 
canvas.addEventListener('mousedown', (event)=>{
    //Have to use it here incase user resizes the page without refreshing it
    rect = canvas.getBoundingClientRect();
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left,event.clientY-rect.top);

    //Prevents defaults changes from happening. reduced offset away from the mouse due to prevention of default sizes 
    event.preventDefault();

    //Allows for the case where the user doesnt move but clicks to make a dot on the screen
    draw(event);
});

//Need an event listener to track the movement of the mouse 
canvas.addEventListener('mousemove',draw);

//Need an event listener to stop the drawing
canvas.addEventListener('mouseup', ()=>{
    isDrawing = false; 
    restoreStrokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1; 
    //Close the path that we began when we started drawing
    ctx.closePath();
});

//Need an event listener to check if the user is moving internally to the canvas 
//If the user is not moving in the canvas set drawing to false. 
canvas.addEventListener('mouseleave', ()=>{
    isDrawing = false;
    ctx.closePath();
});

//Need a function for drawing 
function draw(event)
{
    //If the user isnt draw dont execute rest of the function 
    if(!isDrawing){return;}

    //Have to use incase user does not refresh the page when they resize the page
    rect = canvas.getBoundingClientRect();
    //Track the movement of the mouse relative to the canvas 
    if(isSprayCan)
    {
    // Draw multiple small dots in a random pattern around the cursor position
    const density = 50; // adjust this value to change the density of the spray
    for (let i = 0; i < density; i++) {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const offsetX = Math.random() * 20 - 10; // adjust these values to change the spread of the spray
            const offsetY = Math.random() * 20 - 10;
            ctx.fillStyle = "black";
            ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
    }
    }   
    else
    {
    ctx.lineTo(event.clientX - rect.left,event.clientY-rect.top);
    ctx.stroke();
    }
}

//Change the color 
function changeColor(element)
{
    //If the eraser was used and color is chosen need to set the size and color to the new one 
    if(ctx.strokeStyle == "#ffffff")
    {
        const penRange = document.getElementById('pen-range');
        ctx.lineWidth = penRange.value;
    }
    ctx.strokeStyle = element.style.background;
}

//Clear the canvas 
function clearCanvas()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restoreStrokes = [];
    index = -1; 
}

//Set the eraser 
function eraser()
{
    ctx.strokeStyle = "white";
    ctx.lineWidth = 20; 
}

//Allow for undo function
function undoDrawing()
{
    if(index <= 0)
    {
        clearCanvas();
    }
    else
    {
        index -= 1;
        restoreStrokes.pop();
        ctx.putImageData(restoreStrokes[index],0,0);
    }
}

function sprayCan()
{
    isSprayCan = true; 
}