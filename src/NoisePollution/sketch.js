let mic;
//var posterWidth;
//let boldFont, lightFont;
let mappedValue;
let highestValue;
let img;
let mycolor;
let b, c;
let mySvg;
let div1, img1;
let sensibility;
let blurLevel;

let windowH, windowW;
let marginLeft;

let marginSub, marginTop1;
let image123;
let pixelSize;
let messageL;
let marginLeft1;

let dangerNoise = false;
let opacityMessage;
let varInc;

function setup() {
  //createCanvas(1800, 893);
  createCanvas(0, 0);
  mic = new p5.AudioIn();
  mic.start();
  posterWidth = 400;
  highestValue = 0;
  
  sensibility = 8;  //was 8, 3
  blurLevel = 20;  //was 5, 10

  windowH = windowHeight * 0.95;  //0.95
  windowW = (windowH * 9) / 16;  //16:9
  marginLeft = (windowWidth - windowW)/2;

  pixelSize = map(windowH, 920, 1840, 8, 16);
  opacityMessage = 0;
  //marginLeft1 = windowW - canvasW/2;

  //image123 = select('#sub1');
  div1 = createDiv("");
  div1.addClass("halftone");
  img1 = createImg("image/shape0.svg");
  div1.child(img1);
  //div1.child(image123);
  //messageL = createImg("image/messageLast.png");
  messageL = createImg("image/MBlack.png");
  messageL.addClass("messageL");
  //messageL.addClass("center");

  //console.log("windowW: " + windowW + "WINDOWh: " + windowH);
  div1.style("width", windowW + "px");
  div1.style("height", windowH + "px");
  div1.style("margin-left", marginLeft + "px");
  
  marginSub = windowH * 0.01875;
  marginTop1 = (windowH * 0.05) / 2; 
  let bottom123 = (windowH * 0.056) / 2; 
  document.documentElement.style.setProperty("--height1", (windowH) + "px");
  document.documentElement.style.setProperty("--width1", (windowW) + "px");  //(windowW - (marginSub * 2))
  document.documentElement.style.setProperty("--bottom1", marginTop1 + "px"); //((marginSub * 0.8) * 2) 
  document.documentElement.style.setProperty("--marginTop1", marginTop1 + "px"); 
  document.documentElement.style.setProperty("--pixelSize", pixelSize + "px"); 
  document.documentElement.style.setProperty("--marginLeft11", marginLeft + "px"); 
  document.documentElement.style.setProperty("--bottom123", bottom123 + "px"); 
}

function draw() {
  //background(150);
  //console.log(frameRate());
  //let canvasSquare = document.getElementsByClassName("halftone");

  let vol = mic.getLevel();   //Goes from 0 to 1
  let vol2 = vol * sensibility;
  //let vol2 = 1;
  mappedValue = int(map(vol2, 0, 1, 0, 1100));
  //textSize(60);
  //fill(0);
  //text("Volume: " + vol, 700, 80);
  //text("Mapped: " + mappedValue, 700, 140);
  //text("SoundSensibility: " + sensibility + "(↑ ↓)", 700, 220);
  //text("Noise Level: " + blurLevel + "(→ ←)", 700, 300);
  /*text("Highest Value: " + highestValue, 700, 250);

  if (vol >= highestValue) {
    highestValue = vol;
  }*/
  
  
  /*if (mappedValue >= 0) {
    img1.remove();
    img1 = createImg("image/16x9.svg");
    //div1.child(img1);
  }*/

  
  if (mappedValue <= 100) {
    img1.remove();
    img1 = createImg("image/shape0.svg");
    //dangerNoise = false;
    //div1.child(img1);
  }

  if (mappedValue >= 101 && mappedValue <= 200) {
    img1.remove();
    img1 = createImg("image/shape1.svg");
    //dangerNoise = false;
      //div1.child(img1);
  }

  if (mappedValue >= 201 && mappedValue <= 300) {
    img1.remove();
    img1 = createImg("image/shape2.svg");
    //dangerNoise = false;
      //div1.child(img1);
  }

  if (mappedValue >= 301 && mappedValue <= 400) {
    img1.remove();
    img1 = createImg("image/shape3.svg");
    //dangerNoise = false;
  }

  if (mappedValue >= 401 && mappedValue <= 500) {
    img1.remove();
    img1 = createImg("image/shape4.svg");
    //dangerNoise = false;
  }

  if (mappedValue >= 501 && mappedValue <= 600) {
    img1.remove();
    img1 = createImg("image/shape5.svg");
    //dangerNoise = false;
  }

  if (mappedValue >= 601 && mappedValue <= 700) {
    img1.remove();
    img1 = createImg("image/shape6.svg");
    //dangerNoise = false;
  }

  if (mappedValue >= 701 && mappedValue <= 800) {
    img1.remove();
    img1 = createImg("image/shape7.svg");
    //dangerNoise = false;
  }

  if (mappedValue >= 801 && mappedValue <= 900) {
    img1.remove();
    img1 = createImg("image/shape8.svg");
    //dangerNoise = false;
  }

  if (mappedValue >= 901 && mappedValue <= 1000) {
    img1.remove();
    img1 = createImg("image/shape9.svg");
    //dangerNoise = false;
  }

  if (mappedValue >= 1001 && mappedValue <= 1100) {
    img1.remove();
    img1 = createImg("image/shape10.svg");
    //dangerNoise = true;
  }

  if (mappedValue >= 1101 && mappedValue <= 1200) {
    img1.remove();
    img1 = createImg("image/shape11.svg");
    //dangerNoise = true;
  }

  if (mappedValue >= 1201) {
    img1.remove();
    img1 = createImg("image/shape12.svg");
    //dangerNoise = true;
  }
  

  div1.child(img1);
  let mapBlur = (windowH * 0.0009); 
  let NoiseBlur = vol2 * blurLevel * mapBlur;  //vol * 50
  document.documentElement.style.setProperty("--blur", NoiseBlur + "px");  //get the css variable and change it
  //console.log("--blur");
  /*text("NoiseBlurValue: " + NoiseBlur, 700, 340);*/

  if ((mappedValue >= 1001)){
    opacityMessage = 1;
    dangerNoise = true;
  }

 /* if (opacityMessage > 0 && mappedValue <= 1000){
   // while (opacityMessage > 0){
     console
      opacityMessage -= 0.05;
   // }
  }*/

  if (dangerNoise){
    if ((opacityMessage > 0) && (mappedValue <= 1000)){
      //opacity1 -= 0.005;
      varInc++;
      opacityMessage -= 0.00008*(2^ varInc);  //-= 0.02*(2^ varInc);
    }
  }
  
  if (opacityMessage <= 0){
    dangerNoise = false;
    varInc = 1;
  }

  //console.log(opacityMessage);

  document.documentElement.style.setProperty("--opacityMessage", opacityMessage); 
}


function mousePressed() {
  getAudioContext().resume();
  console.log("Clicked.");
  //img1.remove();
  //img1 = createImg("image/shape0.svg");
  //div1.child(img1);
}

function messagePopUp(){

  //opacityMessage = 0;
  if (opacityMessage > 0){
    opacityMessage -= 0.1;
  }
  else {
    opacityMessage=0;
    dangerNoise = false;
  }
}

/*
function keyPressed() {
  if (keyCode === UP_ARROW && sensibility <= 29) {
    sensibility += 1;
  } else if (keyCode === DOWN_ARROW && sensibility >= 2) {
    sensibility -= 1;
  }

   if (keyCode === RIGHT_ARROW && blurLevel <= 99) {
     blurLevel += 5;
   } else if (keyCode === LEFT_ARROW && blurLevel >= 2) {
     blurLevel -= 5;
   }
}*/