let video, poseNet, poses = [];
let canvasW, canvasH;
let lowTemp, highTemp;
let tempMap;
let scaleMap, numOct, numOctMultiplier, scaleMultiplier;
let marginTop;
let temp1, temp2;
let tempInc;
let color1, color2, color3, colorMap, colorLerp, colorLerp2;
let newS, sMin, sMax, newMin, newMax;
let defaultTemp;
let marginSub, marginTop1;
let opacityBoolean = true;
let opacity1 = 0;
let varInc = 1;
let modelLoaded1 = false;
let loadingDone = false;

function setup() {
  canvasH = windowHeight * 0.95;  //0.95
  canvasW = (canvasH * 9) / 16;  //16:9
  createCanvas(0, 0); 
  numOct = 4;
  scaleMultiplier = 1;

  video = createCapture(VIDEO);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", (results) => (poses = results));
  video.hide();

  //highest and lowest recorded temp, maybe use api
  lowTemp = -89.2;  
  highTemp = 56.7;
  //defaultTemp = ((lowTemp + highTemp) / 2) + canvasH * 0.005;
  defaultTemp = lowTemp;
  //temp1 = 20;
  temp2 = lowTemp; //bottom of the screen
  tempInc = 0.8;

  newMin = 0;
  newMax = 1;
  color1 = color(0, 0, 255);  //blue   //85, 0, 255
  color2 = color(255, 150, 20);   //yellow
  color3 = color(251, 7, 7);   //red

  let img1 = createImg('image/GW123.png', 'Global Warming Image');
  img1.class('image1122');
  let message1 = createImg('image/messageGW2.png', 'Global Warming Message');
  message1.class('message1122');
  scale1 = select('feDisplacementMap');
  octaves1 = select('feTurbulence');
  blueSquare = createDiv("");
  blueSquare.addClass("blueSquare");
  canvas1 = select('#myDiv');
  //console.log("canvas1" + canvas1);
  canvas1.child(blueSquare);
  canvas1.child(img1);
  canvas1.child(message1);
  
  marginSub = canvasH * 0.01875;
  marginTop1 = (canvasH * 0.05) / 2; 
  document.documentElement.style.setProperty("--height1", (canvasH) + "px");
  document.documentElement.style.setProperty("--width1", (canvasW - (marginSub * 2)) + "px");  
  document.documentElement.style.setProperty("--bottom1", (marginSub * 0.85) + "px");   // * 0.825 
  document.documentElement.style.setProperty("--marginLeft1", (marginSub) + "px");  


  canvas1.style("width", canvasW + "px");
  canvas1.style("height", canvasH + "px");
}


function modelReady() {
  console.log("Model Loaded");
  modelLoaded1 = true;
}

Face.onNewFaceDetected = function (f) {
  console.log("NEW FACE DETECTED"); 
  opacityBoolean = true;
  opacity1 = 1;
  scaleMultiplier = 3;
  //numOctMultiplier = 100;
}

/*Face.onFaceDead = function (f) {
  console.log("FACE DISAPEARED"); 
  faceDetected1 = false;
}*/



function draw() {
  //background(255);
  
  if (opacityBoolean && loadingDone){
    if (opacity1 > 0){
      //opacity1 -= 0.005;
      varInc++;
      opacity1 -= 0.00002*(2^ varInc);
    }
  }
  
  if (opacity1 <= 0){
    opacityBoolean = false;
    varInc = 1;
  }

  if (scaleMultiplier > 1){
    scaleMultiplier -= 0.01;
  }

  if (scaleMultiplier < 1){
    scaleMultiplier = 1;
  }

  /*if (numOctMultiplier > 1){
    numOctMultiplier -= 0.4;
  }

  if (numOctMultiplier < 1){
    numOctMultiplier = 1;
  }*/
  

  document.documentElement.style.setProperty("--opacityMessage", opacity1);
  

  if(temp == null){
    //console.log("location not found");
    //temp1 = lowTemp;
    temp1 = defaultTemp;  //if it cant access the location and temp, display a random temp
  }

  if(modelLoaded1){
    document.documentElement.style.setProperty("--opacityLoader", 0);
    document.documentElement.style.setProperty("--opacityLoader2", 1);  
    document.documentElement.style.setProperty("--noneToFlex", "flex");
  }
  
  if (loadingDone){
    if (temp!=null){
      //console.log("location found. " + "Temp = " + temp);
      temp1 = temp;
    }
  }

  if((temp1 - temp2) > 0) {
    temp2 += (tempInc);   
  }

  else {
    temp2 = temp1;
  }

 
  //console.log(temp);
  tempMap = map(temp2, lowTemp, highTemp, 0, canvasH);
  //tempMap = map(temp2, lowTemp, highTemp, canvasH * 0.1, canvasH);
  scaleMap = map(temp2, lowTemp, highTemp, 30, 60);
  marginTop = canvasH - tempMap;

  colorMap = map(temp2, lowTemp, highTemp, 0, 1);
  
  /*https://stackoverflow.com/questions/18594852/how-can-i-write-code-to-lerp-between-three-colors*/

  if (colorMap >= 0 && colorMap <= 0.5) {
    sMin = 0;
    sMax = 0.5;
    newS =  (((colorMap - sMin) * (newMax - newMin)) / (sMax - sMin)) + newMin;
    colorLerp = lerpColor(color1, color2, newS);
  }

  if (colorMap > 0.5 && colorMap <= 1) {
    sMin = 0.5;
    sMax = 1;
    newS =  (((colorMap - sMin) * (newMax - newMin)) / (sMax - sMin)) + newMin;
    colorLerp = lerpColor(color2, color3, newS);
  }
 

  blueSquare.style("height", tempMap + "px");
  blueSquare.style("margin-top", marginTop + "px");

  scale1.attribute('scale', scaleMap * scaleMultiplier);
  //octaves1.attribute('numOctaves', numOct * numOctMultiplier);
  document.documentElement.style.setProperty("--x1", marginTop + "px"); 
  document.documentElement.style.setProperty("--y1", marginTop + "px"); 
  document.documentElement.style.setProperty("--x2", (marginTop * 1.2) + "px"); 
  document.documentElement.style.setProperty("--y2", (marginTop * 1.2) + "px"); 
  document.documentElement.style.setProperty("--color22", colorLerp); 
  //fill(0, 0, 255, 200);
  //rect(0, (windowH - tempMap), windowW, (tempMap) );

  //image(video, 0, 0, video.width, video.height);
  let faces = detectDistinctFaces(poses);
    for (let f of faces) {
  }

}

/*
function mouseClicked(){
  temp2 += 2;
  console.log("click." + colorMap);
}

function keyPressed(){
  temp2 -= 2;
  console.log("click." + colorMap);
}*/