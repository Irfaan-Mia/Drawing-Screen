const canvas = document.getElementById('drawingCanvas');

//set the heigh and width of the canvas object 
//Ajust the sizing as wanted but currently it will change when the size of the page changes
canvas.width = window.innerWidth*0.8; 
canvas.height = window.innerHeight*0.8; 

//Require setting the context 
var ctx = canvas.getContext('2d', { willReadFrequently: true });

//initialization of canvas 
ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height);

//Intialization of drawing style and drawing size and methods 
drawingColor = "black"; //Can be dynamically changed when change happens to color 
lineWidth = 5;       //Can easily be dynamically changed to allow different drawing styles 
drawingShape = 'round'; //Can be dynamically changed to allow different drawing shapes

//Detemine if the user is drawing or not
let isDrawing = false;   

//Different pen style to be implemented
let isSprayCan = false; 
let isPen = true;  //Allow user to draw initially when loading the screen 
let isHighlighter = false; 
let isEraser = false; 


//Initialize aspects of drawing style and drawing size
ctx.strokeStyle = drawingColor; 
ctx.lineWidth = lineWidth;  
ctx.lineCap = drawingShape;
//reduce interuption between drawing
ctx.lineJoin = drawingShape;

//Array for strokes so undo function can be utilized
let restoreStrokes = [];
let index = -1; 

    //Events of either using drawing or not 

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

//Need an event listener to stop the drawing
canvas.addEventListener('mouseup', ()=>{
    isDrawing = false; 
    restoreStrokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1; 
    //Close the path that we began when we started drawing
    ctx.closePath();
});

//Need an event listener to track the movement of the mouse 
canvas.addEventListener('mousemove',draw);

//Need an event listener to check if the user is moving internally to the canvas if the user is not moving in the canvas set drawing to false. 
canvas.addEventListener('mouseleave', ()=>{
    isDrawing = false;
    ctx.closePath();
});

//Need a function for drawing 
function draw(event)
{
    //If the user isnt draw dont execute rest of the function 
    if(!isDrawing){return;}

    //Ensure most recent drawing parameters are being used
    ctx.lineWidth = lineWidth;
    ctx.lineCap = drawingShape;
    ctx.strokeStyle = drawingColor;
    ctx.fillStyle = drawingColor;
    //So the spray can will also change color
    //Have to use incase user does not refresh the page when they resize the page
    rect = canvas.getBoundingClientRect();
    //Track the movement of the mouse relative to the canvas 
    if(isPen)
    {
        penDrawing(event);
    }   
    else if(isEraser)
    {
        eraserDrawing(event);
    }
    else if (isHighlighter)
    {
        highlighterDrawing(event);
    }
    else if(isSprayCan)
    {
        sprayCanDrawing(event);
    }
};

//Functions for different types of drawing 

function penDrawing(event){
    ctx.lineTo(event.clientX - rect.left,event.clientY-rect.top);
    ctx.stroke();
};

function eraserDrawing(event){
    ctx.lineTo(event.clientX - rect.left,event.clientY-rect.top);
    ctx.stroke();
};

function sprayCanDrawing(event)
{
    rect = canvas.getBoundingClientRect();
    // Draw multiple small dots in a random pattern around the cursor position
    const density = 50; // adjust this value to change the density of the spray
    for (let i = 0; i < density; i++) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const offsetX = Math.random() * lineWidth*5 - 10; // adjust these values to change the spread of the spray
        const offsetY = Math.random() * lineWidth*5 - 10;
        ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
    }
};

function highlighterDrawing(event){
    ctx.lineTo(event.clientX - rect.left,event.clientY-rect.top);
    ctx.stroke();
};

//Fucntions for changing the color based on predefined set of colors 
function changeColor(element)
{
    drawingColor = element.style.background;
}

//Change color based on the value the user chooses
function changeColorPicker(value)
{
    drawingColor = value;
}

//Allow changes of line size
function changeLineWidth(value)
{
   lineWidth = value; 
}

//Clear the canvas 
function clearCanvas()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restoreStrokes = [];
    index = -1; 
}

function highlighter()
{
    drawingColor = 'yellow';
    drawingShape = 'square';
    isEraser = false;
    isPen = false;
    isHighlighter =true; 
    isSprayCan = false;
}

//Set the eraser 
function eraser()
{
    drawingColor = "white";
    drawingShape = 'round';
    isEraser = true;
    isPen = false;
    isHighlighter =false; 
    isSprayCan = false;
}

//Set the sprayCan in use
function sprayCan()
{
    drawingColor = 'black';
    drawingShape = 'round';
    isSprayCan = true; 
    isPen = false; 
    isEraser =false; 
    isHighlighter = false; 
}

//Set the pen in use
function pen()
{
    drawingColor = 'black';
    drawingShape = 'round';
    isPen = true;
    isSprayCan = false;
    isHighlighter = false;
    isEraser = false;
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
