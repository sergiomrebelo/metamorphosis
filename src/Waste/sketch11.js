let video, poseNet, poses = [];
let dropTen;
let color123;
let path123;
let image123;
let width1;
let height1;
let time1;
let mappedTime;
let minValue, maxValue;
let mapSize;
let totalSeconds = 0;
let removeSeconds;
let counter = setInterval(timer, 1000); 
let m, d;
var items = [];  //guardar os items que estão no ecrã e removê-los após uns segundos/ minutos
let itemsCount;
var items1;
let boolean1 = true;
let opacity1, opacityVideo, opacitySpeed;
let opacityBoolean = false;
let scaleX, scaleY, scaleX2, scaleY2;
let revealSize;
let revealSizeWidth;

let pose;
let faceCenterX, faceCenterY, faceWidth, centerMaskX, centerMaskY, distanceX = 0, distanceY = 0;
let distanceX3, distanceY3;
let target, posAtual, dist1, novaPos;
let changeFaceSize1, changeFaceSize2, currentFaceSize;
let currentTranslateX, currentTranslateY;
let scaleDivide, scaleDivide1;
let translateX1, translateY1;
let leftEyeX;
let leftEyeY;
let rightEyeX;
let rightEyeY;
let noseX;
let noseY;
let maskWidth;

let glass = [];
let metal = [];
let paper = [];
let plastic = [];
let food = [];
let other = [];
let yard = [];
let wood = [];
let rubber = [];
let textil = [];

/*https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/guide-facts-and-figures-report-about-materials#:~:text=Plastics%20comprised%2012.2%20percent%20of,the%20MSW%20generated%20in%202018.*/
var waste = [
  { name: "paper", amount: 67544400, image: paper, width: 500, height: 480, time: 0.1, pSize1: 1 },
  { name: "glass", amount: 12280800, image: glass, width: 396, height: 1080, time: 1000000, pSize1: 1.2 },    //330x900
  { name: "metal", amount: 25731200, image: metal, width: 530, height: 800, time: 200, pSize1: 0.8  },
  { name: "plastic", amount: 35672800, image: plastic, width: 522, height: 1100, time: 450, pSize1: 2.3 },
  { name: "yard", amount: 35380400, image: yard, width: 1480, height: 490, time: 0.1, pSize1: 1.2 },
  { name: "food", amount: 63158400, image: food, width: 535, height: 600, time: 0.5, pSize1: 1.05 },
  { name: "wood", amount: 18128800, image: wood, width: 291, height: 1500, time: 100, pSize1: 1.4 },
  { name: "rubber", amount: 9064400, image: rubber, width: 638, height: 508, time: 80, pSize1: 1.7 },  //rubber, leather (50 to 80 years)
  { name: "textil", amount: 16959200, image: textil, width: 1210, height: 600, time: 200, pSize1: 1 }, 
  { name: "other", amount: 8479600, image: other, width: 261, height: 499, time: 100, pSize1: 0.8 }  //other and inorganic waste
];


var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Vertices = Matter.Vertices;
var Common = Matter.Common;

var engine;

var boxes = [];
var ground, leftWall, rightWall, groundWidth, movable;
let windowH, windowW, windowH2;
let marginSub;
let varInc;
let modelLoaded1;
let loadingDone;

function preload(){
  //message = loadImage('images/messageWaste.png');
  glass[0] = loadImage('images/glass.png');
  glass[1] = loadImage('images/glass2.png');
  metal[0] = loadImage('images/can3.png');
  paper[0] = loadImage('images/paper1.png');
  paper[1] = loadImage('images/paper2.png');
  plastic[0] = loadImage('images/plastic1.png');
  plastic[1] = loadImage('images/plastic2.png');
  food[0] = loadImage('images/apple1.png');
  food[1] = loadImage('images/pepper1.png');
  food[2] = loadImage('images/bread2.png');
  food[3] = loadImage('images/meat.png');
  //food[1] = loadImage('images/sandwich.png');
  //food[2] = loadImage('images/banana.png');
  other[0] = loadImage('images/battery.png');
  other[1] = loadImage('images/battery2.png');
  yard[0] = loadImage('images/yard1.png');
  wood[0] = loadImage('images/spoon2.png');
  rubber[0] = loadImage('images/wallet3.png');
  rubber[1] = loadImage('images/glove.png');
  textil[0] = loadImage('images/sock2.png');
}


function setup() {
  windowH = windowHeight * 0.95; //0.95
  windowH2 = (windowHeight * 0.05) / 2; //0.95
  windowW = (windowH * 9) / 16; //16:9
  createCanvas(windowW, windowH);
  groundWidth = windowH * 0.05;
  dropTen = 10;
  opacity1 = 0;
  currentFaceSize = 0;
  currentTranslateX = 0;
  currentTranslateY = 0;

  let message1 = createP('Y <span class="circleface">O</span>U <br> PRODUCE <br> 0.74KG OF <br> TRASH <br> DAILY');
  //let message1 = createP('Y0U <br> PRODUCE <br> 0.74KG OF <br> TRASH <br> DAILY');
  message1.class('message123');
  let canvasDiv = select('#messageDiv');
  canvasDiv.child(message1);

  marginSub = windowH * 0.01875;
  document.documentElement.style.setProperty("--height1", (windowH) + "px"); 
  document.documentElement.style.setProperty("--marginTop", (windowH2) + "px"); 
  document.documentElement.style.setProperty("--width1", (windowW - (marginSub * 2)) + "px");  
  document.documentElement.style.setProperty("--bottom1", (marginSub * 0.825) + "px");  
  //message1.style('margin-top', -windowH);

  //message1.position(0, 0);
  //messageDiv = document.getElementById('message1');
  //messageDiv.child(message1);
 
  centerMaskX = windowW * 0.4965;
  centerMaskY = windowH * 0.255;  //0.272
  maskWidth = windowH * 0.08;   //0.075
  revealSize = (windowH * 0.044);
  revealSizeWidth = revealSize * 2;

  d = 0;
  m = 255;
  minValue = 0.1;
  maxValue = 1000000;
  
  video = createCapture(VIDEO);
  //console.log ("video", video.width, video.height);
  //video.size(video.width * .5, video.height * .5);
  //video.size(video.width, video.height); 
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", (results) => (poses = results));
  video.hide();

  var sum = 0;  //amount of trash
  for (let i = 0; i < waste.length; i++) {
    sum += waste[i].amount;
  }

  for (let i = 0; i < waste.length; i++) {  //gives the percentage -> 0 to 1 -> 0.2 = 20%
    waste[i].prob = waste[i].amount / sum;
  }

  
  // create an engine
  engine = Engine.create();
  
  ground = Bodies.rectangle(width/2, height + (groundWidth/2), width, groundWidth, {
    isStatic: true
  });
  leftWall = Bodies.rectangle(0 - (groundWidth/2), height/2, groundWidth, height, {
    isStatic: true
  });
  rightWall = Bodies.rectangle(width + (groundWidth/2), height/2, groundWidth, height, {
    isStatic: true
  });

  World.add(engine.world, [ground, leftWall, rightWall]);

  // run the engine
  Engine.run(engine);


}

function modelReady() {
  console.log("Model Loaded");
  modelLoaded1 = true;
}

Face.onNewFaceDetected = function (f) {
  console.log("NEW FACE DETECTED");

  
    for (let i=0; i< 60; i++) {   //40
      dropItems();
    }
  

  opacityBoolean = true;
  opacity1 = 1;
  opacityVideo = 255;

}



function draw() {
  background(214, 164, 126);
  //background(160, 160, 160);
  //background(20, 20, 220);
  imageMode(CORNER);

  if(modelLoaded1){
    document.documentElement.style.setProperty("--opacityLoader", 0);
    document.documentElement.style.setProperty("--opacityLoader2", 1);  
    document.documentElement.style.setProperty("--noneToFlex", "flex");
  }

  if (opacityBoolean){
    if (opacity1 > 0){
      //opacity1 -= 0.005;
      varInc++;
      opacity1 -= 0.0001*(2 ^ varInc);
      opacityVideo -= 0.0400*(2 ^ varInc);
    }
  }
  
  if (opacity1 <= 0){
    opacityBoolean = false;
    varInc = 1;
  }


  document.documentElement.style.setProperty("--opacity1", opacity1); 

  push();
  scaleX = ((video.width * windowH) / video.height) / video.width;
  scaleY = (windowH / video.height);

  scaleX2 = scaleX * (currentFaceSize);  
  scaleY2 = scaleY * (currentFaceSize);
  let slide1 = (((video.width * scaleX2) - windowW) / 2);

  translate((video.width * scaleX2) - slide1, 0);
  translate(distanceX, distanceY);
  //translate(distanceX3, distanceY3);
  scale(-1, 1);
  scale(scaleX2, scaleY2);
  tint(255, opacityVideo);
  image(video, 0, 0);
  pop();
  

  /*https://editor.p5js.org/js6450/sketches/kWcChe550*/
  
  push();
  translate(centerMaskX, centerMaskY);
  beginShape();
  noStroke();
  fill(214, 164, 126);
  // Exterior part of shape, clockwise winding
  vertex(-width, -height);
  vertex(width, -height);
  vertex(width, height);
  vertex(-width, height);
  // Interior part of shape, counter-clockwise winding
  beginContour();
  vertex(-revealSize + (revealSizeWidth * (1/4)), -revealSize);
  vertex(-revealSize, revealSize - (revealSizeWidth * (3/4)));
  vertex(-revealSize, revealSize - (revealSizeWidth * (1/4)));
  vertex(-revealSize + (revealSizeWidth * (1/4)), revealSize);
  vertex(-revealSize + (revealSizeWidth * (3/4)), revealSize);
  vertex(revealSize, revealSize - (revealSizeWidth * (1/4)));
  vertex(revealSize, revealSize - (revealSizeWidth * (3/4)));
  vertex(-revealSize + (revealSizeWidth * (3/4)), -revealSize);
  endContour();
  endShape(CLOSE);
  pop();



  push();
  let faces = detectDistinctFaces(poses);
  for (let f of faces) {
    //console.log(leftWrist, rightWrist);
    //let center = f.center //face center
    //let width = f.width //face width
    //let r = f.r //rectangle around the face
   
    /*push();
    scaleX = ((video.width * windowH) / video.height) / video.width;
    scaleY = windowH / video.height;
    translate((windowW * scaleX), 0);
    //translate(distanceX, distanceY);
    //scale(changeFaceSize2, changeFaceSize2);
    //ranslate(-translateX1, 0);
    //scale(-1, 1);
    scale(scaleX * -1, scaleY);
    f.drawDebug(true);
    pop();*/

  }

    push();
    if(faces.length > 0) { 
    let f = faces[faces.length-1];
    pose = f.pose //full poseNet pose
    //faceWidth = f.width * (scaleX); //face width
    faceWidth = (f.width * (scaleX)) * 2.3; //face width with multiplier

    faceCenterX = (f.center.x) * (scaleX2 * -1) + ((video.width * scaleX2) - slide1);//face center
    faceCenterY = (f.center.y) * (scaleY * changeFaceSize2);//face center
    changeFaceSize1 = faceWidth / maskWidth;
    changeFaceSize2 = 1 / changeFaceSize1;

    if ((changeFaceSize2 - currentFaceSize) > 0){
      scaleDivide = (changeFaceSize2 - currentFaceSize) / 5;
      currentFaceSize += scaleDivide;
    }

    if ((currentFaceSize - changeFaceSize2) > 0){  
      scaleDivide = (currentFaceSize - changeFaceSize2) / 5;
      currentFaceSize -= scaleDivide;
    }


    distanceX = (centerMaskX - faceCenterX);
    distanceY = (centerMaskY - faceCenterY);
    
    
    pop();
  }
   
    
  /*fill(255);
  noTint();  //prevents from the rest of the elements on the canvas disapearing
  if(totalSeconds > 0) {
  	text(totalSeconds + " seconds", 50, 50);
  } 

  itemsCount = items.length;
  text("Number of items: " + itemsCount, 50, 80);   //Number of items in the canvas*/

  if(totalSeconds % 5 == 0 && boolean1 && loadingDone){
    dropItems();
  }

  if(totalSeconds % 5 != 0){ 
    boolean1 = true;
  }
  
  /*------------------------------*/

  for(let i=0; i<boxes.length; i++){
    boxes[i].show();
    boxes[i].removeTime();
    if (boxes[i].timesUp()){
      boxes[i].removeFromWorld();
      boxes.splice(i, 1);
      i--;
    }
  }


  
  //draw the ground and Walls
  //noStroke();
  //rectMode(CENTER);
  //fill(20, 20, 240, 150);
  //rect(200, mouseY, 800, 50);
  //rect(ground.position.x, ground.position.y, width, groundWidth);
  //rect(leftWall.position.x, leftWall.position.y, groundWidth, height);
  //rect(rightWall.position.x, rightWall.position.y, groundWidth, height);

  pop();

  fill(165, 93, 53, 50);  //Brown Filter
  fill(120, 50);  //Grey Filter
  rect(0, 0, windowW, windowH);
}



function pickOne (list) {  //list of objects
  var index = 0;
  var r = random(1);

  while (r > 0){
    r = r - list[index].prob;
    index++;
  }
  index--;
  return list[index];
}


function timer(){
  if (totalSeconds >= 0) {  
    totalSeconds = totalSeconds + 1;
  } 
  if (removeSeconds >= 0) {  
    removeSeconds = removeSeconds - 1;
    //console.log("removeSeconds: " + removeSeconds);
  } 
}

function dropItems(){
    boolean1 = false;
    items1 = pickOne(waste);  //get an item according to their probability
    items.push(items1);  //add to array
    //console.log("Waste Item Launched: " + items1.name);
    image123 = random(items1.image);
    mapSize = windowH * 0.00007;
    //width1 = items1.width * mapSize;
    //height1 = items1.height * mapSize;
    //let width11 = width1 * 0.6;  //0.5
    //let height11 = height1 * 0.6;   //0.5
    let width11 = (image123.width * mapSize) * items1.pSize1;
    let height11 = (image123.height * mapSize) * items1.pSize1;
    time1 = items1.time;
    //mappedTime = map(time1, minValue, maxValue, 6000, 60000);
    mappedTime = (Math.log10(2 + time1) * 3600);
    //console.log(time1, mappedTime);
    let drop1 = width11;
    let drop2 = width - width11;
    let drop3 = -height11;
    let drop4 = -height11*5;
    boxes.push(new Box(random(drop1, drop2), random(drop3, drop4), width11, height11, image123, mappedTime));   //create a new object
    //boxes.push(new Box(random(width * 0.1, width*0.9), -200, path123, color123));   //create a new object
}

/*
function mouseClicked(){
  for (let i=0; i< 50; i++) {
    dropItems();
  }
}*/