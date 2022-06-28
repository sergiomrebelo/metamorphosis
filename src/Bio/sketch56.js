let windowW, windowH;
let video, poseNet, poses = [];
let scaleX, scaleY, scaleX2, scaleY2, slide1;
let pose, faceCenterX, faceCenterY;
let color123;
let path123;
let faces;
 
var items = [];  //guardar os items que estão no ecrã e removê-los após uns segundos/ minutos
let itemsCount;
var items1;
let sumDisappear, sum;

let totalSeconds = 0;
let removeSeconds;
let counter = setInterval(timer, 1000);  
let boolean1;
let chosenType;
let onlyOne;
let removeOnlyOne = true;
let opacity1, opacityBoolean, rateOfExtinction;
let centerFaceX, centerFaceY, currentFaceX, currentFaceY;
let target33, posAtual33, dist33;
let runAgain;
let reRun = false;
let marginTop1, marginSub;

// Image Arrays
let humans = [];
let insects = [];
let plants = [];
let fungi = [];
let arachnids = [];
let molluscs = [];
let crustaceans = [];
let fishes = [];
let reptiles = [];
let birds = [];
let amphibians = [];
let mammals = [];
let corals = [];

let nInsects, nPlants, nFungi, nArachnids, nMolluscs, nCrustaceans, nFishes, nReptiles, nBirds, nAmphibians, nMammals, nCorals;
/*https://ourworldindata.org/biodiversity-and-wildlife*/
var bio = [
  { name: "insects", amount: 1053578, tSpecies: 1926, color: "#00A3A7", images1: insects, pSize: 0.8 },
  { name: "plants", amount: 422745, tSpecies: 21726, color: "#197419", images1: plants, pSize: 1 },
  { name: "fungi", amount: 141317, tSpecies: 252, color: "#726B67", images1: fungi, pSize: 1.1  },   //Fungi and Protists
  { name: "arachnids", amount: 110615, tSpecies: 218, color: "#3F3C3B", images1: arachnids, pSize: 2.5  },
  { name: "molluscs", amount: 81719, tSpecies: 2305, color: "#FFFF73", images1: molluscs, pSize: 1  },
  { name: "crustaceans", amount: 80122, tSpecies: 743, color: "#FB6866", images1: crustaceans, pSize: 0.8  },
  { name: "fishes", amount: 35797, tSpecies: 3210, color: "#BFCDFF", images1: fishes, pSize: 1.2  },
  { name: "reptiles", amount: 11341, tSpecies: 1458, color: "#137A7F", images1: reptiles, pSize: 1.5  },
  { name: "birds", amount: 11158, tSpecies: 1481, color: "#FFFFF0", images1: birds, pSize: 1.1  },  
  { name: "amphibians", amount: 8309, tSpecies: 2442, color: "#86CECB", images1: amphibians, pSize: 0.5  },
  { name: "mammals", amount: 6513, tSpecies: 1323, color: "#DB433B", images1: mammals, pSize: 1.1  },
  { name: "corals", amount: 2175, tSpecies: 237, color: "#FF8300", images1: corals, pSize: 1.4  }  
];

var bio2 = [
  { name: "insects" },
  { name: "plants" },
  { name: "fungi" },   //Fungi and Protists
  { name: "arachnids" },
  { name: "molluscs" },
  { name: "crustaceans" },
  { name: "fishes" },
  { name: "reptiles" },
  { name: "birds" },  
  { name: "amphibians" },
  { name: "mammals" },
  { name: "corals" }  
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
var ground, leftWall, rightWall, groundWidth, attractor, attractorX, attractorY;
let humans1;
let mapSize1;
let modelLoaded1;
let loadingDone;
let varInc = 1;


function preload(){
  humans[0] = loadImage(`images/woman1.png`);
  humans[1] = loadImage(`images/man1.png`);
  humans[2] = loadImage(`images/oldMan1.png`);
  humans[3] = loadImage(`images/woman2.png`);
  
  insects[0] = loadImage(`images/bee2.png`);
  insects[1] = loadImage(`images/butterfly1.png`);
  insects[2] = loadImage(`images/butterfly2.png`);
  insects[3] = loadImage(`images/beetle.png`);
  insects[4] = loadImage(`images/dragonfly.png`);
  
  plants[0] = loadImage(`images/flower.png`);
  plants[1] = loadImage(`images/flower2.png`);
  plants[2] = loadImage(`images/fern2.png`);
  plants[3] = loadImage(`images/flower4.png`);

  fungi[0] = loadImage(`images/mushroom.png`);

  arachnids[0] = loadImage(`images/scorpion.png`);

  molluscs[0] = loadImage(`images/snail2.png`);
  molluscs[1] = loadImage(`images/Hapalochlaena.png`);

  crustaceans[0] = loadImage(`images/DiogenesCrab.png`);

  fishes[0] = loadImage(`images/BluefinTuna.png`);
  fishes[1] = loadImage(`images/redSnapper.png`);

  reptiles[0] = loadImage(`images/seaTurtle2.png`);

  birds[0] = loadImage(`images/RedBilledQuelea.png`);
  birds[1] = loadImage(`images/atlanticPuffin.png`);

  amphibians[0] = loadImage(`images/frog1.png`);

  mammals[0] = loadImage(`images/bear.png`);
  mammals[1] = loadImage(`images/AfricanForestElephant.png`);

  corals[0] = loadImage(`images/coral.png`);

}


function setup() {
  windowH = windowHeight * 0.95; //0.95
  windowW = (windowH * 9) / 16; //16:9
  createCanvas(windowW, windowH);
  groundWidth = windowH * 0.2;   //0.05
  onlyOne = 3;
  opacity1 = 0;
  opacityBoolean = false;
  rateOfExtinction = 20;

  mapSize1 = height * 0.00005;
  humans1 = random(humans);
  //currentFaceX = 0;
  //currentFaceY = 0;
  
  //inicial position for the face
  
  //centerFaceX = windowW/2;   
  //centerFaceY = windowH/2;
  
  //centerFaceX = windowW/2;   
  //centerFaceY = windowH/2;

  let message1 = createP(' OVER 34,480<br> SPECIES ARE <br> THREATENED <br> WITH <br> EXTINCTION');
  message1.class('message123');
  let canvasDiv = select('#messageDiv');
  canvasDiv.child(message1);
  document.documentElement.style.setProperty("--height1", (windowH) + "px"); 

  marginSub = windowH * 0.01875;
  marginTop1 = (windowH * 0.05) / 2; 
  document.documentElement.style.setProperty("--height1", (windowH) + "px");
  document.documentElement.style.setProperty("--width1", (windowW - (marginSub * 2)) + "px");  
  document.documentElement.style.setProperty("--bottom1", (marginSub * 0.825) + "px");  
  document.documentElement.style.setProperty("--marginTop1", marginTop1 + "px"); 

  numberParticles = 100;
  runAgain = numberParticles;
  sum = 0;  //amount of species
  for (var i = 0; i < bio.length; i++) {
    sum += bio[i].amount;
  }

  for (var i = 0; i < bio.length; i++) {  //gives the percentage -> 0 to 1 -> 0.2 = 20%
    bio[i].prob = bio[i].amount / sum;
    bio2[i].probDisappear = bio[i].tSpecies / bio[i].amount;
  }

  //sumDisappear = 0;
  for (var i = 0; i < bio.length; i++) {  
    bio[i].nParticles = (numberParticles * bio[i].prob);
    //console.log(bio[i].probDisappear);
    //sumDisappear += bio[i].probDisappear;
  }

  for (var i = 0; i < bio.length; i++) {  
    np = bio[i].nParticles;
    //console.log(np);
    
    for (var j = 0; j < np; j++) {
      items.push(bio[i]);
    }
  }
  

  //Video Setup
  video = createCapture(VIDEO);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", (results) => (poses = results));
  video.hide();
  

  // create an engine
  engine = Engine.create();
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;

  
  ground = Bodies.rectangle(width/2, height + groundWidth/2, windowW * 1.5, groundWidth, {
    isStatic: true
  });
  leftWall = Bodies.rectangle(-groundWidth/2, height/2, groundWidth, height * 1.5, {
    isStatic: true
  });
  rightWall = Bodies.rectangle(width + groundWidth/2, height/2, groundWidth, height * 1.5, {
    isStatic: true
  });
  ceiling = Bodies.rectangle(width/2, 0 - groundWidth/2, windowW * 1.5, groundWidth, {
    isStatic: true
  });
  attractor = Bodies.rectangle(width/2, height/2, windowH * 0.03, windowH * 0.08, {
    isStatic: true
  });
  

  World.add(engine.world, [ground, leftWall, rightWall, ceiling, attractor]);

  // run the engine
  Engine.run(engine);

  for (var k = 0; k < items.length; k++){
    addSpecies(k);  
  }
}

function modelReady() {
  console.log("Model Loaded");
  modelLoaded1 = true;
}

Face.onNewFaceDetected = function (f) {
  console.log("NEW FACE DETECTED");
    
  rateOfExtinction = rateOfExtinction/2;    //From 20s to 10s
  opacityBoolean = true;
  opacity1 = 1;
  forceCenter = 0;
  forceFace = 200;

  

  attractor = Bodies.rectangle(width/2, height/2, windowH * 0.03, windowH * 0.08, {
    isStatic: true
  });
  World.add(engine.world, attractor);
}


Face.onFaceDead = function (f) {
  //console.log("amount of faces: " + faces.length);
  
  if (faces.length <= 1){
    forceFace = 0;
    forceCenter = 100; 
  }

  console.log("face dead");
  World.remove(engine.world, attractor);
  //when the face leaves the screen, change the location to outside the canvas
  //centerFaceX = windowW/2;
  //centerFaceY = -windowH * 0.1;
}


function draw() {
  background(204,217,223);

  if (modelLoaded1){
    if (faces.length >= 1){
      rateOfExtinction = 5;
    }
  
    if (faces.length == 0){
      rateOfExtinction = 10;
    }  
  }
  

  if(modelLoaded1){
    document.documentElement.style.setProperty("--opacityLoader", 0);
    document.documentElement.style.setProperty("--opacityLoader2", 1);  
    document.documentElement.style.setProperty("--noneToFlex", "flex");
  }


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
  

  push();
  //Video with tint/opacity
  push();
  scaleX = ((video.width * windowH) / video.height) / video.width;
  scaleY = windowH / video.height;
    
  slide1 = (((video.width * scaleX) - windowW) / 2);
  translate((video.width * scaleX) - slide1, 0);
  scale(-1, 1);
  scale(scaleX, scaleY);
  tint(255, 0);
  image(video, 0, 0);
  pop(); 



  faces  = detectDistinctFaces(poses);
  for (let f of faces) {
    //f.drawDebug(true);
    //pose = f.pose //full poseNet pose
    //console.log(f.center);
    centerFaceX = (f.center.x) * (scaleX * -1) + ((video.width * scaleX) - slide1);
    centerFaceY = (f.center.y) * (scaleY);
  }

  target33 = createVector(centerFaceX, centerFaceY);
  posAtual33 = createVector(currentFaceX, currentFaceY);
  dist33 = target33.copy().sub(posAtual33);
  dist33.div(10);

  posAtual33 = posAtual33.copy().add(dist33);
  currentFaceX = posAtual33.x;
  currentFaceY = posAtual33.y;



  if(totalSeconds % rateOfExtinction == 0 && boolean1){
    if ((onlyOne >= 2) && (bio2.length != 0)){   //only to chose one specie to disapear
      onlyOne = 0; 
      console.log(bio2);
      chosenType = pickOneToDisappear(bio2).name;
      //console.log(chosenType, onlyOne);
    }
    
    for(let i = 0; i < boxes.length; i++){
      if ((boxes[i].name123 == chosenType) && removeOnlyOne){     //(boxes[i].r > 10)   //boxes[i].name123 == "insects"
        removeOnlyOne = false;
        //console.log(boxes[i].name123, chosenType, bio2);
        boxes[i].removeFromWorld();
        boxes.splice(i, 1);
        i--;
      }
    }
  }

  if(totalSeconds % rateOfExtinction != 0){ 
    boolean1 = true;
    removeOnlyOne = true;
    onlyOne = 3;
  }


  sumDisappear = 0;
  for (var i = 0; i < bio2.length; i++) {  
    sumDisappear += bio2[i].probDisappear;
  }

 

  /*------------------------------------*/

  nInsects = 0; 
  nPlants = 0;
  nFungi = 0;
  nArachnids = 0;
  nMolluscs = 0;
  nCrustaceans = 0;
  nFishes = 0;
  nReptiles = 0;
  nBirds = 0;
  nAmphibians = 0;
  nMammals = 0;
  nCorals = 0;

  //Count the number of circles for each type of being
  for(let i=0; i < boxes.length; i++){
    if (boxes[i].name123 == "insects"){
      nInsects += 1;
    }
    if (boxes[i].name123 == "plants"){
      nPlants += 1;
    }
    if (boxes[i].name123 == "fungi"){
      nFungi += 1;
    }
    if (boxes[i].name123 == "arachnids"){
      nArachnids += 1;
    }
    if (boxes[i].name123 == "molluscs"){
      nMolluscs += 1;
    }
    if (boxes[i].name123 == "crustaceans"){
      nCrustaceans += 1;
    }
    if (boxes[i].name123 == "fishes"){
      nFishes += 1;
    }
    if (boxes[i].name123 == "reptiles"){
      nReptiles += 1;
    }
    if (boxes[i].name123 == "birds"){
      nBirds += 1;
    }
    if (boxes[i].name123 == "amphibians"){
      nAmphibians += 1;
    }
    if (boxes[i].name123 == "mammals"){
      nMammals += 1;
    }
    if (boxes[i].name123 == "corals"){
      nCorals += 1;
    }
  }


  //If the number of circles is 0, remove that type from the bio2 array, for not to be picked 
  for(let i=0; i < bio2.length; i++){
    let bio2name = bio2[i].name; 
    if ((bio2name === "insects") && (nInsects < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "plants") && (nPlants < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "fungi") && (nFungi < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "arachnids") && (nArachnids < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "molluscs") && (nMolluscs < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "crustaceans") && (nCrustaceans < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "fishes") && (nFishes < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "reptiles") && (nReptiles < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "birds") && (nBirds < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "amphibians") && (nAmphibians < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "mammals") && (nMammals < 1)){
      bio2.splice(i, 1);
    }
    if ((bio2name === "corals") && (nCorals < 1)){
      bio2.splice(i, 1);
    }
  }  
  
  if (boxes === undefined || boxes.length == 0){   //bio2 === undefined || bio2.length == 0
    console.log("All species have been removed.");
    
    bio2 = [
      { name: "insects" },
      { name: "plants" },
      { name: "fungi" },   
      { name: "arachnids" },
      { name: "molluscs" },
      { name: "crustaceans" },
      { name: "fishes" },
      { name: "reptiles" },
      { name: "birds" },  
      { name: "amphibians" },
      { name: "mammals" },
      { name: "corals" }  
    ];

    for (var i = 0; i < bio.length; i++) {  //gives the percentage -> 0 to 1 -> 0.2 = 20%
      bio[i].prob = bio[i].amount / sum;
      bio2[i].probDisappear = bio[i].tSpecies / bio[i].amount;
    }

    reRun = true;
  }
   
  if (reRun){
    if (boxes.length < numberParticles){
      for (var k = 0; k < items.length; k++){
        addSpecies(k);  
      }
    }
    if (boxes.length > numberParticles - 1){
      reRun = false;
    }
  }

  /*------------------------------*/

  //console.log(boxes.length);
  for(let i = 0; i < boxes.length; i++){
    boxes[i].show();
  }

  //pop();
  
  rectMode(CENTER);
  //ellipseMode(CENTER);

  Matter.Body.setPosition(attractor, Matter.Vector.create(posAtual33.x, posAtual33.y));

  attractorX = attractor.position.x;
  //attractorY = attractor.position.y - (windowH * 0.05/2);
  attractorY = attractor.position.y;
  
  fill(200, 0, 0);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, windowW, groundWidth);
  rect(leftWall.position.x, leftWall.position.y, groundWidth, height);
  rect(rightWall.position.x, rightWall.position.y, groundWidth, height);
  rect(ceiling.position.x, ceiling.position.y, windowW, groundWidth);
  
  //fill(20, 20, 240, 50);
  //ellipse(attractorX, attractorY, windowH * 0.1, windowH * 0.1);

  //Draw Center of the face
  fill(200, 0, 0);
  imageMode(CENTER);
  let humanWidth = (humans1.width) * mapSize1 * 1.8;
  let humanHeight = (humans1.height) * mapSize1 * 1.8;
  if (faces.length >= 1){
    console.log("Display Image");
    //fill(200, 0, 0);
    //rect(posAtual33.x, posAtual33.y, windowH * 0.03, windowH * 0.08);
    image(humans1, posAtual33.x, posAtual33.y, humanWidth, humanHeight);
    
  }
  //ellipse(posAtual33.x, posAtual33.y, windowH * 0.1, windowH * 0.1);
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


function pickOneToDisappear (list) {  //list of objects
  var index = 0;
  var r = random(sumDisappear);   //sumDisappear

  while (r > 0){
    r = r - list[index].probDisappear;
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


function addSpecies(k){
   //let color123 = color(204, 102, 0);
   let color123 = items[k].color;
   let name123 = items[k].name;
   
   let image123 = random(items[k].images1);
   let images123width = image123.width;
   let images123height = image123.height;
   let pSize1 = items[k].pSize;
   //console.log(pSize1);
   let width1 = (images123width * mapSize1) * pSize1;
   let height1 = (images123height * mapSize1) * pSize1;

   let drop1 = random(width1, windowW - width1);
   let drop2 = random(height1, windowH - height1);
   //boxes.push(new Box(drop1, drop2, width1, height1, color123, name123));
   boxes.push(new Box(drop1, drop2, width1, height1, color123, name123, image123));
}