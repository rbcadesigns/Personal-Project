// VARIABLE FOR FURNITURE
let greencouch;
let babyducks;
    
function preload() {
  greencouch = loadImage('data/greencouch.png');
  
  babyducks = loadImage('data/babyducks.png');
  // row of ducks image source:
  // https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fduckling-png-images-transparent-hd-photo-clipart-in-2023--918523286482266799%2F&psig=AOvVaw02ZMFT8XU-Hzq0TeSxTVne&ust=1716624412993000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDzy7TqpYYDFQAAAAAdAAAAABAK
}


// VARIABLE FOR CHANGING COLOR OF RECT() AKA BACK WALL
let wallColor;

// VARIABLES FOR GREEN COUCH
var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?
var x, y, w, h; // Location and size of green sofa
var offsetX, offsetY; // Mouseclick offset

// Webcam capture
let capture;

// VARIABLE FOR IMAGE INPUT
let imageInput;
let img;


// VARIABLE FOR TEXT PROJECTION 'SPLASH'
let textInput; // prompt for text input
var splashButton; // submit text input


// variables for animated title text
let textX, textY; // Position of text
let isTextMoving = 0;
// Boolean variable to determine in images to animate or not
let movingText = true;


function setup() {
  // store canvas in variable to allow imgs to be dropped anywhere on it
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255, 255, 255);
  
  //music1.play();
  
  // TAKES INPUT FROM USER
  textInput = createInput();
  textInput.position(800, 160);
  // SPLASHING TEXT ONTO THE WALLS
  splashButton = createButton("Splash!");
  splashButton.position(1000, 160);
  splashButton.mousePressed(splashText);
  
  //position of heading text at start
  textX = 100;
  textY = 100;
  
  
  // Starting location for green sofa
  x = 180;
  y = 180;

  // Dimensions
  w = 200;
  h = 200;

  
  // button that allows users to add their own images files in
  let furniturebutton = createButton('Drag and move some furniture');
  furniturebutton.position(80, 130);
  furniturebutton.style('color: white; background-color: #ce9eff');
  
  // button that allows users to add their own images files in
  let imagesbutton = createButton('Splash your image all around the room...beware');
  imagesbutton.position(290, 130);
  imagesbutton.style('color: white; background-color: #ce9eff');
  
 // button to allow users to decorate their room by drawing
  let drawButton = createButton('Draw on the side walls');
  // position of button to draw
  drawButton.position(607, 130);
  drawButton.style('color: white; background-color: #ce9eff');
  
  let textButton = createButton('Project text onto your background');
  // position of button to draw
  textButton.position(767, 130);
  textButton.style('color: white; background-color: #ce9eff');
  
  let wallButton = createButton('Press any key to change the wall colour');
  // position of button to draw
  wallButton.position(1000, 130);
  wallButton.style('color: white; background-color: #ce9eff');
  
  //referenced p5js example: ex11_Capture | Processing 4.3
  // CAPTURES WEBCAM OF THE USER
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
 
   // STARTING COLOR FOR BACK WALL
   wallColor = color(255, 204, 255)
   noStroke();
   
 
  // IMAGE INSERTION INTO FRAME + CALLS FUNCTION TO HANDLE FILE (IMAGE)
  // referenced / adapted from https://p5js.org/reference/#/p5/createFileInput
  imageInput = createFileInput(handleImage);
  imageInput.position(300, 160);

}

// END OF FUNCTION SET UP SECTION ()


function draw() {
  //background(255);
  // background removes the remains of past frames
  
  
  // ANIMATED TEXT
  stroke(255);
  strokeWeight(20);
  fill(0);
  textSize(110);
  text("Hi there, welcome to your third space", textX, textY);
  
  // Animation based off: https://editor.p5js.org/kjhollen/sketches/rgyR5loxU
  // Moving text left on the horizontal axis
  textX = textX - random(+1, 3);
  
  // Reset to the starting position
  if (textX < -1420) {
   textX = width;
  }
  
  
  // CHANGING WALL COLOUR
  noStroke();
  //rect fill adjusted by dragging mouse
  fill(wallColor);
  // x, y = top left corner + width, height of rect
  rect(184, 217, 915.5, 582);
  
  
  // CODE FOR MOVING FURNITURE
  // Adjust location of green sofa if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }
  
  // picture frame for the image
  stroke(255);
  strokeWeight(5);
  textSize(20);
  text('your image here', 410, 320);
  

  // Image loads everywhere on page...
  if (img) {
      image(img, random(width), random(height), random(200), random(200));
      image(img, 390, 200, 200, 200);
  }
  
  // WEBCAM OUTPUT 320, 240
  image(capture, 950, 680, 160, 120, 160);
  // FACE OF AVATAR CHARACTER
  noFill();
  stroke(255);
  ellipse(1007, 740, 110, 110); //face
  circle(985, 739, 3, 3); // eye
  circle(1030, 739, 3, 3); // eye
  arc(1011, 755, 30, 30, 0, -180, HALF_PI, OPEN);// mouth
  textSize(15);
  fill(0);
  strokeWeight(3);
  text('hey look, its you', 955, 680);

 
  // room template {
  stroke(90);
  strokeWeight(1);
  //left back wall line
  line(184, 217, 184.24, 800);
  //right back wall line
  line(1100, 800, 1100, 217);
  
  
  //top back wall
  line(184, 217, 1100, 217);
  //back ceiling floor line
  line(184, 800, 1100, 800);
  
  //top corner left
  line(0, 114.56, 184.24, 215.56);
  //bottom corner left
  line(-180, 1100, 184.24, 799.56);
  
  //top corner right
  line(1100, 216, 1440, 20);
  //bottom corner right
  line(1100, 800, 1440, 1100);
  
  // } room template
 

// referenced / adapted from : https://p5js.org/examples/control-conditional-shapes.html
  // DRAWS ON THE LH SIDE OF WALL
  if (mouseX>0 && mouseX<184) {
      stroke(255, 204, 0);
      strokeWeight(10);
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
    
  // DRAWS ON THE RH SIDE OF WALL
  if (mouseX>1100 && mouseX<width) {
      stroke(51, 153, 255);
      strokeWeight(10);
      line(mouseX, mouseY, pmouseX, pmouseY);
    } 

// DRAGGING IMAGES OF FURNITURE
  // Is mouse over the green sofa
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } else {
    rollover = false;
  }
  
  stroke(0);

  image(greencouch, x, y, w, h);
}


function splashText() {
    noStroke();
    for (i = 0; i < 150; i++) {
      fill(random(255), random(255), random(255));
      textSize(random(30));
      text(textInput.value(), random(width), random(height));
    }
}


function mousePressed() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;

    offsetX = x - mouseX;
    offsetY = y - mouseY;
  }
}

function mouseReleased() {
  // stop dragging
  dragging = false;
}

//function to change color of back wall when mouse is clicked
function keyPressed() {
  wallColor = color(random(255), random(255), random(255));
}
  

// Code referenced from: https://editor.p5js.org/NicolasTilly/sketches/mH-TgZcFa
// Create an image if the file is an image.
function handleImage(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}


// MAKING SKETCH RESPONSIVE
function windowResized() { 
    if(windowWidth < 550) {
        size = 10;
    } else {
        size = 100;
    }
}
