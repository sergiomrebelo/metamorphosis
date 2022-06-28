let img1, img2, img3, stump, stump2, stump3, mask;
let tree22, cut22, stump22;
let imgMask;
let rotatePointX, rotatePointY;

let windowW;
let windowH;

let treeWidth, treeWidth3, stumpWidth, maskWidth;
let treeHeight, treeHeight3, stumpHeight, maskHeight;
let circleHeight;
let bottomMargin;
let angle;
let angleInc = 0;
let animation1complete, animation2complete, animation3complete, animation4complete, animation5complete, animation6complete;
let animation1start, animation2start, animation3start, animation4start, animation5start, animation6start;
let animation1running, animation2running, animation3running, animation4running, animation5running, animation6running;
let moveUp, moveUp2;

let ani1 = false;
let ani2 = false;
let treeDefault1 = true;
let treeDefault2 = true;
let treeDefault3 = true;
let stumpDefault = false;

let video;
let poseNet;
let pose;
let poseScore1;
let poseNose, poseRightEye, poseLeftEye;
let faceDetected = false;

let particle_texture = null;
let ps = null;
let ps1 = null;
let ps2 = null;
let smokeAni = false;
let fade = 255;
let opacity1;
let numberHectares;
let dayOfYear, deforestationYear, amountOfTrees, amount2decimals, message1, canvasDiv, increaseSecond;
let marginSub, marginTop1;
let loadingDone = false;
let varInc = 1;

function preload() {
  //particle_texture = loadImage("images/particle_texture3.png");
  particle_texture = loadImage("images/particle6.png");
  tree1 = loadImage("images/tree1.png");
  //img2 = loadImage("images/tree2.png");
  img3 = loadImage("images/tree3.png");
  stump = loadImage("images/stump.png");
  stump2 = loadImage("images/stump2.png");
  stump3 = loadImage("images/stump33.png");
  mask = loadImage("images/whiteMaskWider.png");  

  tree22 = loadImage("images2/tree2.png");
  cut22 = loadImage("images2/cut2.png");
  stump22 = loadImage("images2/stump2.png");
}

function setup() {
  windowH = windowHeight * 0.95;  //0.95
  windowW = (windowH * 9) / 16;  //16:9
  createCanvas(windowW, windowH, WEBGL);   //ADD WEBGL
  
  dayOfYear = getDay();
  deforestationYear = 4200000;
  increaseSecond = deforestationYear/ 365/ 24/ 60/ 60;
  amountOfTrees = map(dayOfYear, 0, 365, 0, deforestationYear);
  amount2decimals = round(amountOfTrees, 2);
  setInterval(updateHectares, 1000);
  
  //console.log(dayOfYear);
  //let message1 = createP('17,723,965.97 <br> OF HECTARES <br> WERE <br> DESTROYED <br> THIS YEAR');
  //amount2decimals + '<br> OF HECTARES <br> WERE <br> DESTROYED <br> THIS YEAR'
  
  //message1 = createP();
  //message1.class('message123');
  //canvasDiv = select('#messageDiv');
  //canvasDiv.child(message1);
  marginSub = windowH * 0.01875;
  marginTop1 = (windowH * 0.05) / 2; 
  document.documentElement.style.setProperty("--height1", (windowH) + "px");
  document.documentElement.style.setProperty("--width1", (windowW - (marginSub * 2)) + "px");  
  document.documentElement.style.setProperty("--bottom1", (marginSub * 0.825) + "px");  
  document.documentElement.style.setProperty("--marginTop1", marginTop1 + "px"); 

  opacity1 = 0;
  //pixelDensity(1);
  //smooth();
  angle = 0;
  moveUp = 0;
  
  treeWidth = width * 0.146;  //0.147
  treeHeight = height * 1;

  treeWidth3 = width * 0.146; //0.147
  treeHeight3 = height * 0.92;  //0.91995

  stumpWidth = width * 0.146; //0.147
  stumpHeight = height * 0.1045;

  stump2Width = width * 0.146; //0.147
  stump2Height = height * 1.11;   //stump/tree

  maskWidth = width * 0.187425;  //0.153
  maskHeight = height * 0.1045;

  circleHeight = width * 0.0234;

  bottomMargin = height * 0.08;

  rotatePointX = stumpWidth / 2;
  rotatePointY = height - stumpHeight - bottomMargin + circleHeight;

  animation1complete = false;
  animation2complete = false;
  animation3complete = false;
  animation4complete = true;
  animation5complete = false;
  animation6complete = true;

  animation1running = false;
  animation2running = false;
  animation3running = false;
  animation4running = false;
  animation5running = false;
  animation6running = false;

  video = createCapture(VIDEO);
  //video.hide();
  //video.size(video.width, video.height);
  video.size(0, 0);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);

  ps = new ParticleSystem(0, createVector(width * 0.75 - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2 - (height*0.005)), particle_texture);
  ps1 = new ParticleSystem(0, createVector(width * 0.50 - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2 - (height*0.005)), particle_texture);
  ps2 = new ParticleSystem(0, createVector(width * 0.25 - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2 - (height*0.005)), particle_texture);  //0.01
}

function gotPoses(poses) {
  //console.log(pose);
  if (poses.length >= 1) {
    pose = poses[0].pose; //save the first index/person on the array in the variable pose
    //console.log(pose.score);
  }

  if (poses.length < 1) {
    faceDetected = false;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}


function draw() {
  background(255);
  imageMode(CORNER);

  //console.log(amountOfTrees);
  //document.getElementById("message4").innerHTML = amount2decimals + '<br> OF HECTARES <br> WERE <br> DESTROYED <br> THIS YEAR';
  updateHectares();
  
  /*for (let i = 0; i < 1; i++) {
    ps.addParticle();
  }*/
  
  /*--------------------------------------------------------------------------*/
  /*
  if (treeDefault1){
    image(tree1, width * 0.25 - (treeWidth / 2), (height - treeHeight) - bottomMargin, treeWidth, treeHeight);
  }

  if (treeDefault2){
    image(tree1, width * 0.50 - (treeWidth / 2), (height - treeHeight) - bottomMargin, treeWidth, treeHeight);
  }*/

  if (treeDefault3){
    image(tree22, width * 0.75 - (treeWidth / 2) - windowW/2, (height - treeHeight) - bottomMargin - windowH/2, treeWidth, treeHeight);
    //image(mask, width * 0.75 - maskWidth / 2, (height) - bottomMargin - (height * 0.013), maskWidth, maskHeight); //MASK
  }

  /*--------------------------------------------------------------------------*/

  if (faceDetected && !animation1complete && loadingDone){
    treeDefault3 = false;
    animation1start = true;
  }

  if (animation1start && !animation1complete) {
      animationOne();
  }

  if(animation1complete && !animation2running && !animation2complete){ 
    image(stump22, width * 0.75 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2, stump2Width, stump2Height); 
    image(mask, width * 0.7514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
  }

  /*--------------------------------------------------------------------------*/

  if (!faceDetected && animation1complete && animation4complete && (!animation1running && !animation3running && !animation4running)){  //add Animation4complete
    animation2start = true;
  }

  if (animation2start && !animation2complete){
    animationTwo();
  }

  if(animation2complete && !animation1running){
    image(stump22, width * 0.75 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - (height * 1.004) - windowH/2, stump2Width, stump2Height); 
    image(mask, width * 0.7514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
  }

  /*--------------------------------------------------------------------------*/

  if (faceDetected && animation1complete && !animation3complete && (!animation1running && !animation2running)) {
    treeDefault2 = false;
    animation3start = true;
  }

  if (animation3start && !animation3complete) {
    animationThree();
  }

  if(animation3complete && !animation4running && !animation4complete){ 
    image(stump3, width * 0.50 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2, stump2Width, stump2Height); 
    image(mask, width * 0.5014 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
  }

  /*--------------------------------------------------------------------------*/

  
  if (!faceDetected && animation1complete && animation3complete && animation6complete && (!animation1running && !animation2running && !animation3running && !animation4running && !animation5running && !animation6running)){   /////
    animation4start = true;
  }

  if (animation4start && !animation4complete){
    animationFour();
  }

  if(animation4complete && !animation3running){
    image(stump3, width * 0.50 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - (height * 1.004) - windowH/2, stump2Width, stump2Height); 
    image(mask, width * 0.5014 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120), maskWidth - windowH/2, maskHeight); //MASK
  }

  /*--------------------------------------------------------------------------*/

  if (faceDetected && animation1complete && animation3complete && !animation5complete && (!animation1running && !animation2running && !animation3running && !animation4running)) {
    treeDefault1 = false;
    animation5start = true;
  }

  if (animation5start && !animation5complete) {
    animationFive();
  }

  if(animation5complete && !animation6running && !animation6complete){ 
    image(stump3, width * 0.25 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2, stump2Width, stump2Height); 
    image(mask, width * 0.2514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
  }

  /*--------------------------------------------------------------------------*/

  if (!faceDetected && animation5complete && (!animation1running && !animation2running && !animation3running && !animation4running)){  //add Animation4complete
    animation6start = true;
  }

  if (animation6start && !animation6complete && !smokeAni){
    animationSix();
  }

  if(animation6complete && !animation5running){
    image(stump3, width * 0.25 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - (height * 1.004) - windowH/2, stump2Width, stump2Height); 
    image(mask, width * 0.2514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
  }

  /*--------------------------------------------------------------------------*/

  ps.run();
  ps1.run();
  ps2.run();
  //if all 3 animations complete, it starts dropping particles
  if (animation1complete && animation3complete && animation5complete && !animation5running && !animation6running){  //and if no animation is running
    //console.log("ALL 3 TREES CUT");
    if (faceDetected){
      smokeAni = true;
      if (smokeAni) {
        //ps1.run();
        //ps2.run();
        opacity1 = 1;

        for (let i = 0; i < 1; i++) {
         ps.addParticle();
         ps1.addParticle();
         ps2.addParticle();
        }
      }
    }
    if(!faceDetected){   //check if face is not available and if every particle as been removed from the array

      if (opacity1 > -0.01){
        opacity1 -= 0.01;
      }
      let amountPart = ps.particles.length;
      let amountPart1 = ps1.particles.length;
      let amountPart2 = ps2.particles.length;
      
      if (amountPart <= 0 && amountPart1 <= 0 && amountPart2 <= 0){
        smokeAni = false;
      }
    }
  }

  document.documentElement.style.setProperty("--opacity1", opacity1); 
  
   
  if (pose) {
    poseNose = pose.nose.confidence;
    poseRightEye = pose.rightEye.confidence;
    poseLeftEye = pose.leftEye.confidence;
    //console.log("nose: " + poseNose, "left: " + poseLeftEye + "right: " + poseRightEye);

    if ((poseNose >= 0.95) && (poseRightEye >= 0.95) && (poseLeftEye >= 0.95)) {
      faceDetected = true;
    }
    else {
      faceDetected = false;
    }
  }

  /*-----Remove the outlines----------*/ 
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(-(windowH*0.1915), windowH*0.455, windowH * 0.02, stumpHeight);  
  rect(-(windowH*0.0890), windowH*0.455, windowH * 0.02, stumpHeight);  
  rect(-(windowH*0.051), windowH*0.455, windowH * 0.02, stumpHeight);  
  rect(windowH * 0.0514, windowH*0.455, windowH * 0.02, stumpHeight);  
  rect(windowH * 0.0890, windowH*0.455, windowH * 0.02, stumpHeight); 
  rect(windowH * 0.1915, windowH*0.455, windowH * 0.02, stumpHeight); 

}



function animationOne() {
  //Add tree cutting Sound
  angleInc += 10;
  animation1running = true;
  image(stump22, width * 0.75 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2, stump2Width, stump2Height); //width * 0.5
  
  push();
  translate(width * 0.75 + rotatePointX - windowW/2, rotatePointY - windowH/2);
  //angle += (angleInc/100);  
  //varInc++;
  angle += 0.001*(2^ angleInc);
  let opacity1 = map(angle, 0, 80, 255, 0);
  if(angle <= 80){   //rotate the tree until 80degrees
    rotate(radians(angle));
    tint(255, opacity1);
    image(cut22, (width * 0.749 - (treeWidth3 / 2)) - ((width * 0.75) + rotatePointX), (0 - bottomMargin) - rotatePointY, treeWidth3, treeHeight3); //width * 0.5
  }

  if (angle >= 80.1){
    angle = 0;
    angleInc = 0;
    animation1running = false;
    animation1start = false;
    animation1complete = true;
    animation2complete = false;
  }

  pop();
  image(mask, width * 0.7514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
}


function animationTwo() {
  animation2running = true;
  //let moveUpLimit = height * 0.9829242262540021; //921 to 924, 921 to percentage is 0.9829242262540021
  let moveUpLimit = height * 1.004;
  let moveUpSpeed = height * 0.0032017075773746; //3  to percentage is 0.0032017075773746
  if(moveUp <= moveUpLimit){   
    moveUp += moveUpSpeed;       
  }
  if(moveUp > moveUpLimit){ 
    animation2start = false;
    animation2running = false;
    animation2complete = true;
    animation1complete = false;
    moveUp = 0;  
  }
  
  image(stump22, width * 0.75 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - moveUp - windowH/2, stump2Width, stump2Height); 
  image(mask, width * 0.7514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
}


function animationThree() {
  //Add tree cutting Sound
  angleInc += 10;
  animation3running = true;
  image(stump3, width * 0.50 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2, stump2Width, stump2Height); //width * 0.5
  
  push();
  translate(width * 0.50 + rotatePointX - windowW/2, rotatePointY - windowH/2);
  //angle += (angleInc/100);  
  angle += 0.001*(2^ angleInc);
  let opacity1 = map(angle, 0, 80, 255, 0);
  if(angle <= 80){   //rotate the tree until 80degrees
    rotate(radians(angle));
    tint(255, opacity1);
    image(img3, (width * 0.501 - (treeWidth3 / 2)) - ((width * 0.50) + rotatePointX), (0 - bottomMargin) - rotatePointY, treeWidth3, treeHeight3); //width * 0.5
  }

  if (angle >= 80.1){
    angle = 0;
    angleInc = 0;
    animation3running = false;
    animation3start = false;
    animation3complete = true;
    animation4complete = false;
  }

  pop();
  image(mask, width * 0.5014 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
}


function animationFour() {
  animation4running = true;
  //let moveUpLimit = height * 0.9829242262540021; //921 to 924, 921 to percentage is 0.9829242262540021
  let moveUpLimit = height * 1.004;
  let  moveUpSpeed = height * 0.0032017075773746; //3  to percentage is 0.0032017075773746
  if(moveUp <= moveUpLimit){   
    moveUp += moveUpSpeed;       
  }
  if(moveUp > moveUpLimit){ 
    animation4start = false;
    animation4running = false;
    animation4complete = true;
    animation3complete = false;
    moveUp = 0;  
  }
  
  image(stump3, width * 0.5 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - moveUp - windowH/2, stump2Width, stump2Height); 
  image(mask, width * 0.5014 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
}


function animationFive() {
  //Add tree cutting Sound
  angleInc += 10;
  animation5running = true;
  image(stump3, width * 0.25 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - windowH/2, stump2Width, stump2Height); //width * 0.5
  
  push();
  translate(width * 0.25 + rotatePointX - windowW/2, rotatePointY - windowH/2);
  //angle += (angleInc/100);
  angle += 0.001*(2^ angleInc);  
  let opacity1 = map(angle, 0, 80, 255, 0);
  if(angle <= 80){   //rotate the tree until 80degrees
    rotate(radians(angle));
    tint(255, opacity1);
    image(img3, (width * 0.251 - (treeWidth3 / 2)) - ((width * 0.25) + rotatePointX), (0 - bottomMargin) - rotatePointY, treeWidth3, treeHeight3); //width * 0.5
  }

  if (angle >= 80.1){
    angle = 0;
    angleInc = 0;
    animation5running = false;
    animation5start = false;
    animation5complete = true;
    animation6complete = false;
  }

  pop();
  image(mask, width * 0.2514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
}


function animationSix() {
  animation6running = true;
  //let moveUpLimit = height * 0.9829242262540021; //921 to 924, 921 to percentage is 0.9829242262540021
  let moveUpLimit = height * 1.004;
  let  moveUpSpeed = height * 0.0032017075773746; //3  to percentage is 0.0032017075773746
  if(moveUp <= moveUpLimit){   
    moveUp += moveUpSpeed;       
  }
  if(moveUp > moveUpLimit){ 
    animation6start = false;
    animation6running = false;
    animation6complete = true;
    animation5complete = false;
    moveUp = 0;  
  }
  
  image(stump3, width * 0.25 - (stumpWidth / 2) - windowW/2, (height - stumpHeight) - bottomMargin - moveUp - windowH/2, stump2Width, stump2Height); 
  image(mask, width * 0.2514 - maskWidth / 2 - windowW/2, (height) - bottomMargin - (height * 0.0120) - windowH/2, maskWidth, maskHeight); //MASK
}



function updateHectares(){
  amountOfTrees += increaseSecond;
  //amount2decimals = round(amountOfTrees, 2);
  amount2decimals = amountOfTrees.toFixed(2);
  document.getElementById("message4").innerHTML = amount2decimals + '<br> HECTARES <br> WERE <br> DESTROYED <br> THIS YEAR';

}


