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
let faceDetected;
let opacity1;
let opacityBoolean = false;
let color1, color2, color3, color4, t, max;
let marginTop1, marginSub;

// Image Arrays
let cigarettes = [];
let foodWrappers = [];
let plasticBottles = [];
let plasticBags = [];
let plasticCaps = [];
let cutlery = [];
let straws = [];
let glassBottles = [];
let beverageCans = [];
let paperBags = [];
let net;

/*https://www.fairplanet.org/story/the-top-10-items-that-are-polluting-our-oceans/*/
/*https://www.wwf.org.au/news/blogs/the-lifecycle-of-plastics#gs.8uxl01*/
var trash = [
  { name: "cigarettes", amount: 2117931, image: cigarettes, width: 268, height: 500, sizeMap: 0.55, time: 10 }, //10 years
  { name: "foodWrappers", amount: 1140222, image: foodWrappers, width: 1160, height: 1500, sizeMap: 1, time: 300}, //300 years
  { name: "plasticBottles", amount: 1065171, image: plasticBottles, width: 261, height: 500, sizeMap: 2.2, time: 450}, //450 years
  { name: "plasticBags", amount: 1019902, image: plasticBags, width: 950, height: 1500, sizeMap: 1.8, time: 20}, //10-20 years  polythene bags -> 1000years
  { name: "plasticCaps", amount: 958893, image: plasticCaps, width: 450, height: 348, sizeMap: 0.55, time: 450}, //450 years
  { name: "cutlery", amount: 692767, image: cutlery, width: 127, height: 600, sizeMap: 2, time: 450}, //450 years
  { name: "straws", amount: 611048, image: straws, width: 998, height: 50, sizeMap: 1, time: 200}, //200 years
  { name: "glassBottles", amount: 521730, image: glassBottles, width: 310, height: 1000, sizeMap: 1.6, time: 1000000}, //1 Million years
  { name: "beverageCans", amount: 339875, image: beverageCans, width: 530, height: 999, sizeMap: 1, time: 200}, //80 to 200 years
  { name: "paperBags", amount: 298332, image: paperBags,width: 335, height: 336, sizeMap: 1.5, time: 0.1}, //2 to 6 weeks
];

/*ERROR*/
/*net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)*/

let box2Array = [];
let box3Array = [];

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Vertices = Matter.Vertices;
var Common = Matter.Common;

var engine;

var boxes = [];
var ground, leftWall, rightWall, groundWidth, box1;
let pose;
let leftWrist, rightWrist;
let leftWristX, leftWristY, rightWristX, rightWristY;
let currentLeftX, currentLeftY, currentRightX, currentRightY;
let slide1;
let scaleX, scaleY;
let target, posAtual, dist1;
let target2, posAtual2, dist2;
let varInc = 1;
let modelLoaded1;
let loadingDone;


function preload(){
  netLeft = loadImage(`images1/fishingNet33.png`);
  netRight = loadImage(`images1/fishingNet44.png`);
  cigarettes[0] = loadImage(`images1/cigarettes1.png`);
  cigarettes[1] = loadImage(`images1/cigarettes2.png`);
  cigarettes[2] = loadImage(`images1/cigarettes3.png`);

  foodWrappers[0] = loadImage(`images1/chips3.png`);
  foodWrappers[1] = loadImage(`images1/box2.png`);

  plasticBottles[0] = loadImage(`images1/plastic1.png`);
  plasticBottles[1] = loadImage(`images1/plastic2.png`);

  plasticBags[0] = loadImage(`images1/bag1.png`);
  plasticBags[1] = loadImage(`images1/bag2.png`);
  plasticBags[2] = loadImage(`images1/bag3.png`);

  plasticCaps[0] = loadImage(`images1/cap1.png`);
  plasticCaps[1] = loadImage(`images1/cap2.png`);
  plasticCaps[2] = loadImage(`images1/cap3.png`);
  plasticCaps[3] = loadImage(`images1/cap4.png`);
  plasticCaps[4] = loadImage(`images1/cap5.png`);
  plasticCaps[5] = loadImage(`images1/cap6.png`);

  cutlery[0] = loadImage(`images1/fork.png`); 
  cutlery[1] = loadImage(`images1/knife.png`); 
  cutlery[2] = loadImage(`images1/spoon.png`); 

  straws[0] = loadImage(`images1/straw1.png`);
  straws[1] = loadImage(`images1/straw2.png`);
  straws[2] = loadImage(`images1/straw3.png`);

  glassBottles[0] = loadImage(`images1/glass1.png`);
  glassBottles[1] = loadImage(`images1/glass2.png`);

  beverageCans[0] = loadImage(`images1/can1.png`);
  beverageCans[1] = loadImage(`images1/can2.png`);
  beverageCans[2] = loadImage(`images1/can3.png`);

  paperBags[0] = loadImage(`images1/paperBag1.png`);
  paperBags[1] = loadImage(`images1/paperBag2.png`);
}


function setup() {
  windowH = windowHeight * 0.95; //0.95
  windowW = (windowH * 9) / 16; //16:9
  createCanvas(windowW, windowH);
  groundWidth = windowH * 0.05;
  dropTen = 10;
  opacity1 = 0;
  faceDetected = false;
  ellipseMode(CENTER);

  marginTop1 = (windowH * 0.05) / 2; 
  document.documentElement.style.setProperty("--marginTop1", marginTop1);  

  currentLeftX = 0;
  currentLeftY = 0;
  currentRightX = windowW;
  currentRightY = 0;

  let message1 = createP('10 MILLION <br> TONS OF <br> PLASTIC ARE <br> DUMPED IN <br> THE OCEAN <br> ANNUALLY');
  message1.class('message123');
  let canvasDiv = select('#messageDiv');
  canvasDiv.child(message1);
  marginSub = windowH * 0.01875;
  marginTop1 = (windowH * 0.05) / 2; 
  document.documentElement.style.setProperty("--height1", (windowH) + "px"); 
  document.documentElement.style.setProperty("--width1", (windowW - (marginSub * 2)) + "px");  
  document.documentElement.style.setProperty("--bottom1", (marginSub * 0.825) + "px");  

  //message1.position(0, 0);
  //messageDiv = document.getElementById('message1');
  //messageDiv.child(message1);
 
  color1 = color(80, 180 , 255);   //100, 166, 255
  color2 = color(2, 20, 40);
  color3 = color(80, 180 , 255, 80);   //100, 166, 255
  color4 = color(2, 20, 40, 80);
  max = 0;
  t = 0;

  d = 0;
  m = 255;
  minValue = 0.1;
  maxValue = 1000000;
  
  video = createCapture(VIDEO);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", (results) => (poses = results));
  video.hide();
  video.class("videoTexture");

  var sum = 0;  //amount of trash
  for (var i = 0; i < trash.length; i++) {
    sum += trash[i].amount;
  }

  for (var i = 0; i < trash.length; i++) {  //gives the percentage -> 0 to 1 -> 0.2 = 20%
    trash[i].prob = trash[i].amount / sum;
    //trash[i].count = 0;
  }

  
  // create an engine
  engine = Engine.create();
  

  /*
  box1 = Bodies.rectangle(200, 599, windowW * 0.6, windowW * 0.2, options, {
  isStatic: true });*/
  /*
  box1 = Bodies.rectangle(leftWristX, leftWristY, windowH * 0.3, windowH * 0.1, {
    isStatic: true
  });

  //World.add(engine.world, [leftWrist, rightWrist]);
  World.add(engine.world, box1);*/


  // run the engine
  Engine.run(engine);
  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;

}

function modelReady() {
  console.log("Model Loaded");
  modelLoaded1 = true;
}

Face.onNewFaceDetected = function (f) {
  console.log("NEW FACE DETECTED");
  //faceDetected = true;

    for (let i=0; i < 10; i++) {
      //setTimeout (dropItems(), Math.random()*2000);
      dropItems();
    }

    opacityBoolean = true;
    opacity1 = 1;

  }
  


function draw() {

  max = map(itemsCount, 1, 40, 0, 1);
  c = lerpColor(color1, color2, t);
  c2 = lerpColor(color3, color4, t);
  background(c);
  if (t < max) {
    t += 0.005;
  }

  if (t > max) {
    t-= 0.005;
  }

  /*-------------------------------------*/

  if(modelLoaded1){
    document.documentElement.style.setProperty("--opacityLoader", 0);
    document.documentElement.style.setProperty("--opacityLoader2", 1);  
    document.documentElement.style.setProperty("--noneToFlex", "flex");
  }

  /*-------------------------------------*/

  for(let b of box2Array){
    World.remove(engine.world, b);
  }
  for(let b of box3Array){
    World.remove(engine.world, b);
  }
  box2Array = [];
  box3Array = [];

  if (opacityBoolean){
    if (opacity1 > 0){
      //opacity1 -= 0.005;
      varInc++;
      opacity1 -= 0.0001*(2^ varInc);
    }
  }
  
  if (opacity1 <= 0){
    opacityBoolean = false;
    varInc = 1;
  }
  

  document.documentElement.style.setProperty("--opacity1", opacity1); 
  
  imageMode(CORNER);
  push();
  
  //Video with tint/opacity
  push();
  scaleX = ((video.width * windowH) / video.height) / video.width;
  scaleY = windowH / video.height;
  //scaleX2 = scaleX;  
  slide1 = (((video.width * scaleX) - windowW) / 2);
  translate((video.width * scaleX) - slide1, 0);
  scale(-1, 1);
  scale(scaleX, scaleY);
  tint(255, 40);
  image(video, 0, 0);
  pop(); 


  push();
  let faces = detectDistinctFaces(poses);
  for (let f of faces) {
    //USEFUL VARIABLES
    //console.log(leftWrist, rightWrist);
    //let center = f.center //face center
    //let width = f.width //face width
    //let r = f.r //rectangle around the face
    
    /*push();
    translate((video.width * scaleX) - slide1, 0);
    scale(-1, 1);
    scale(scaleX, scaleY);
    f.drawDebug(true);
    pop();*/
  
    
    pose = f.pose //full poseNet pose
    //console.log(pose);
    leftWristX = (pose.leftWrist.x) * (scaleX * -1) + ((video.width * scaleX) - slide1);
    leftWristY = (pose.leftWrist.y) * (scaleY);
    rightWristX = (pose.rightWrist.x) * (scaleX * -1) + ((video.width * scaleX) - slide1);
    rightWristY = (pose.rightWrist.y) * (scaleY);
    //console.log(leftWristX, leftWristY);   //currentLeftX, currentLeftY  //currentRightX, currentRightX

    target = createVector(leftWristX, leftWristY);
    posAtual = createVector(currentLeftX, currentLeftY);
    dist1 = target.copy().sub(posAtual);
    dist1.div(10);  //20

    posAtual = posAtual.copy().add(dist1);
    currentLeftX = posAtual.x;
    currentLeftY = posAtual.y;

    target2 = createVector(rightWristX, rightWristY);
    posAtual2 = createVector(currentRightX, currentRightY);
    dist2 = target2.copy().sub(posAtual2);
    dist2.div(10);  //20

    posAtual2 = posAtual2.copy().add(dist2);
    currentRightX = posAtual2.x;
    currentRightY = posAtual2.y;
    

    //fill(200,200,0);
    //circle(posAtual.x, posAtual.y, 50, 50);
    
    let box2 = Bodies.circle(posAtual.x, posAtual.y, windowH * 0.05, {
      isStatic: true  
    });

    let box3 = Bodies.circle(posAtual2.x, posAtual2.y, windowH * 0.05, {
      isStatic: true  
    });

    box2Array.push(box2);
    box3Array.push(box3);

    World.add(engine.world, [box2, box3]);
  }

    
  /*fill(255);
  noTint();  //prevents from the rest of the elements on the canvas disapearing
  if(totalSeconds > 0) {
  	text(totalSeconds + " seconds", 50, 50);
  } */

  /*fill(255);
  textSize(80);
  itemsCount = boxes.length;
  text("Number of items: " + itemsCount, 80, 80);   //Number of items in the canvas*/

  itemsCount = boxes.length;

  if(totalSeconds % 10 == 0 && boolean1 && loadingDone){   
      dropItems();
  }

  if(totalSeconds % 10 != 0){ 
    boolean1 = true;
  }
    


  /*------------------------------*/



  pop();

  //draw the left and right Wrist "Cleaner"
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  fill(255, 255, 255, 220);

  let netWidth = (windowH * 0.0825) * 1.7;
  let netHeight = (windowH * 0.0460) * 1.7;

  for(let box2 of box2Array){
    //rect(box2.position.x, box2.position.y, windowH * 0.3, windowH * 0.1);
    //circle(box2.position.x, box2.position.y, (windowH * 0.04) * 2);
    //image(net, box2.position.x - (windowH * 0.04), box2.position.y - (windowH * 0.04), (windowH * 0.0825), (windowH * 0.0460));
    image(netLeft, box2.position.x - (netWidth * 0.185), box2.position.y, netWidth, netHeight);
  }
  for(let box3 of box3Array){
    //circle(box3.position.x, box3.position.y, (windowH * 0.04) * 2);
    image(netRight, box3.position.x + (netWidth * 0.185), box3.position.y, netWidth, netHeight);
  }

  
  //fill(0, 255, 0, 200);
  //circle(leftWristX, leftWristY, 50, 50);
  //circle(rightWristX, rightWristY, 50, 50);

  
  for(let i=0; i<boxes.length; i++){
    boxes[i].show();
    boxes[i].move();
    boxes[i].removeTime();
    if (boxes[i].timesUp()){
      boxes[i].removeFromWorld();
      boxes.splice(i, 1);
      i--;
    }
  }

  fill(c2);
  //tint(200, 0, 0, 100);
  rect(windowW/2, windowH/2, windowW, windowH);
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
    items1 = pickOne(trash);  //get an item according to their probability
    items.push(items1);  //add to array
    //console.log("Waste Item Launched: " + items1.name);
    image123 = random(items1.image);
    mapSize = height * 0.0001;
    width1 = items1.width * mapSize;
    height1 = items1.height * mapSize;
    let resize = items1.sizeMap;
    let width11 = (width1 * 0.6) * resize;  //0.5
    let height11 = (height1 * 0.6) * resize;   //0.5
    time1 = items1.time;
    //mappedTime = map(time1, minValue, maxValue, 6000, 60000);
    mappedTime = (Math.log10(2 + time1)) * 3600;
    //console.log(time1, mappedTime);
    let drop1 = width11;
    let drop2 = width - width11;
    //let drop3 = height11;
    //let drop4 = height - height11;
    let drop5 = -width11;
    boxes.push(new Box(random(drop1, drop2), drop5, width11, height11, image123, mappedTime));   //create a new object
    //boxes.push(new Box(random(width * 0.1, width*0.9), -200, path123, color123));   //create a new object
}

