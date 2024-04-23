const canvas = document.getElementById('drawingCanvas');

console.log(canvas.offsetHeight)
//set the heigh and width of the canvas object 
//Ajust the sizing as wanted but currently it will change when the size of the page changes
canvas.width = window.innerWidth * 0.8;  // 80% of the viewport width
canvas.height = window.innerHeight * 0.8; 

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

//Initialize aspects of drawing style and drawing size
ctx.strokeStyle = drawingColor; 
ctx.lineWidth = lineWidth;  
ctx.lineCap = drawingShape;
ctx.lineJoin = drawingShape;

    //Events of either using drawing or not 

//Need an event listner to start the drawing 
canvas.addEventListener('mousedown', (event)=>{
    //Have to use it here incase user resizes the page without refreshing it
    rect = canvas.getBoundingClientRect();
    isDrawing = true;
    ctx.beginPath();

        // Calculate the scale factor
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
    
        // Adjust the mouse position by the scale factor
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
    ctx.moveTo(x,y);

    //Prevents defaults changes from happening. reduced offset away from the mouse due to prevention of default sizes 
    event.preventDefault();

    //Allows for the case where the user doesnt move but clicks to make a dot on the screen
    draw(event);
});

//Need an event listener to stop the drawing
canvas.addEventListener('mouseup', ()=>{
    isDrawing = false; 
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
    if(!isDrawing)
    {
        return;
    }

    //Ensure most recent drawing parameters are being used
    ctx.lineWidth = lineWidth;
    ctx.lineCap = drawingShape;
    ctx.strokeStyle = drawingColor;
    ctx.fillStyle = drawingColor;
    //So the spray can will also change color
    //Have to use incase user does not refresh the page when they resize the page
    rect = canvas.getBoundingClientRect();
            // Calculate the scale factor
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
        
            // Adjust the mouse position by the scale factor
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
    ctx.lineTo(x,y);
    ctx.stroke();
};


