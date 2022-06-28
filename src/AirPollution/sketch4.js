let video, poseNet, poses = [];
let windowW, windowH;
let aqi, aqi2, aqiDefault, aqiNumber1;

let co, coDefault, coMap;  //Carbon monoxide
let no, noDefault, noMap;  //Nitrogen monoxide, usually 0 in the api, maybe don´t use
let no2, no2Default, no2Map;  //Nitrogen dioxide
let o3, o3Default, o3Map;  //Ozone
let so2, so2Default, so2Map;  //Sulphur dioxide
let pm25, pm25Default, pm25Map;  //Fine particles matter
let pm10, pm10Default, pm10Map;  //Coarse particulate matter
let nh3, nh3Default; //Ammonia

let smallWidth, largeWidth;
let message1;
let textAqi;
let colorAqi;
let gtFlexa;
let subtitle1;
let canvas1;
let marginSub, marginSub2;
let ps1 = null;
let particle_texture = null;
let particle_texture1 = null;
let particle_texture2 = null;
let particle_texture3 = null;
let particle_texture4 = null;
let particle_texture5 = null;
let message2, aqiMessage;

let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Composite = Matter.Composite;
let Vertices = Matter.Vertices;
let Common = Matter.Common;

var engine;

var boxes = [];
let ceiling, ground, rightWall, leftWall;
let groundWidth, itemsCount;
let addCircleOnce = false;
let addCircleOnce2 = false;
let textSizeMap;
let marginTop1;
let faceDetected1 = false;
let randomPos1, randomPosX, randomPosY;
let modelLoaded1;
let loadingDone;

function preload() {
  gtFlexa = loadFont('font/GT-Flexa-X-Compressed-Bold-Trial.otf');
  particle_texture = loadImage("subtitle/particle_texture.png");
  particle_texture1 = loadImage("subtitle/firstParticle.png");
  particle_texture2 = loadImage("subtitle/secondParticle.png");
  particle_texture3 = loadImage("subtitle/thirdParticle.png");
  particle_texture4 = loadImage("subtitle/forthParticle.png");
  particle_texture5 = loadImage("subtitle/fiveParticle.png");
}

function setup() {
  windowH = windowHeight * 0.95;  //0.95
  windowW = (windowH * 9) / 16;  //16:9
  createCanvas(windowW, windowH);
  pixelDensity(2);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(gtFlexa);
  noStroke();

  video = createCapture(VIDEO);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", (results) => (poses = results));
  video.hide();

  marginTop1 = (windowH * 0.05) / 2; 
  document.documentElement.style.setProperty("--marginTop1", marginTop1 + "px"); 

  groundWidth = windowH * 0.05;
  colorAqi = color(0, 0, 0); 
  textSizeMap = map(windowW, 351.084, 517.81, 91.5, 135);
  //textAlign(CENTER, CENTER);
  //message2 = 'YOUR LOCATION AIR QUALITY INDEX IS UNDEFINED';

  /*canvas1 = select('#defaultCanvas0');
  let divMessage = select('messageDiv');
  canvas1.child(divMessage);
  //canvas1.style('margin-left', '500px');*/
  marginSub = windowH * 0.01875;

  smallWidth = windowH * 0.05;
  largeWidth = windowH * 0.3;
  aqiDefault = 0;
  aqi2 = 0;
  
  co = 0;
  no2 = 0;
  o3 = 0;
  so2 = 0;
  pm25 = 0;
  pm10 = 0;
  nh3 = 0;

  ps1 = new ParticleSystem(0, createVector(width * 0.5, height), particle_texture);
  
  /*let message1 = createP('YOUR <br> LOCATION <br> AIR QUALITY <br> INDEX IS <br> VERY POOR');
  message1.class('message123');
  let canvasDiv = select('#messageDiv');
  canvasDiv.child(message1);*/
  document.documentElement.style.setProperty("--height1", (windowH) + "px");
  document.documentElement.style.setProperty("--width1", (windowW - (marginSub * 2)) + "px");  
  document.documentElement.style.setProperty("--bottom1", (marginSub * 0.825) + "px");  
  
   
 // create an engine
 engine = Engine.create();
 
 ceiling = Bodies.rectangle(width/2, (-groundWidth/2), width, groundWidth, {
  isStatic: true
 });
 ground = Bodies.rectangle(width/2, height + (groundWidth/2), width, groundWidth, {
   isStatic: true
 });
 leftWall = Bodies.rectangle(0 - (groundWidth/2), height/2, groundWidth, height, {
   isStatic: true
 });
 rightWall = Bodies.rectangle(width + (groundWidth/2), height/2, groundWidth, height, {
   isStatic: true
 });

 World.add(engine.world, [ceiling, ground, leftWall, rightWall]);

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
  faceDetected1 = true;
}

Face.onFaceDead = function (f) {
  console.log("FACE DISAPEARED"); 
  faceDetected1 = false;
}



function draw() {
  /*background(255, 255, 255, 30);*/
  background(255, 255, 255);

  if(modelLoaded1){
    document.documentElement.style.setProperty("--opacityLoader", 0);
    document.documentElement.style.setProperty("--opacityLoader2", 1);  
    document.documentElement.style.setProperty("--noneToFlex", "flex");
  }

  /*fill(200, 0, 0, 100);
  rect(width/2, height/2, windowW * 0.77, height);
  fill(0, 0, 200);
  circle(windowW/2, windowH/2, 20);*/
  


  if(data1 == null){
    console.log("Data not found");
    aqi = aqiDefault;
    updateAqi(aqi);
  }

  else{
    addCircleOnce = true;
    aqi = data1.main.aqi;
    
    co = (data1.components.co) / 1000;  //transform up/mg3 in mg/m3
    no2 = data1.components.no2;
    o3 = data1.components.o3;
    so2 = data1.components.so2;
    pm25 = data1.components.pm2_5;
    pm10 = data1.components.pm10;
    nh3 = data1.components.nh3;
    
    //console.log("Data found, The Aqi is  " + data1.main.aqi);
    //console.log("DT: " + data1.dt);
  }

  if((aqi - aqi2) != 0){
    console.log("Change in Aqi");
    updateAqi(aqi);
    aqi2 = aqi;
  }

    /*https://swachhindia.ndtv.com/air-pollution-what-is-air-quality-index-how-is-it-measured-and-its-health-impact-40387/*/
    coMap = map(co, 0, 34, smallWidth, largeWidth);   //34+
    no2Map = map(no2, 0, 400, smallWidth, largeWidth);   //400+
    o3Map = map(o3, 0, 748, smallWidth, largeWidth);   //748+
    so2Map = map(so2, 0, 1600, smallWidth, largeWidth);   //1600+
    pm10Map = map(pm10, 0, 430, smallWidth, largeWidth);   //430+
    pm25Map = map(pm25, 0, 250, smallWidth, largeWidth);   //250+
    nh3Map = map(nh3, 0, 1800, smallWidth, largeWidth);   //1800+

    if (addCircleOnce && !addCircleOnce2){
    addCircleOnce2 = true;
    
    //Add a circle for each component
    boxes.push(new Box( random(coMap, windowW - coMap), random(coMap, windowH - coMap), coMap, "CO"));   
    boxes.push(new Box( random(no2Map, windowW - no2Map), random(no2Map, windowH - no2Map), no2Map, "NO2"));   
    boxes.push(new Box( random(o3Map, windowW - o3Map), random(o3Map, windowH - o3Map), o3Map, "O3"));   
    boxes.push(new Box( random(so2Map, windowW - so2Map), random(so2Map, windowH - so2Map), so2Map, "SO2"));   
    boxes.push(new Box( random(pm10Map, windowW - pm10Map), random(pm10Map, windowH - pm10Map), pm10Map, "PM10"));  
    boxes.push(new Box( random(pm25Map, windowW - pm25Map), random(pm25Map, windowH - pm25Map), pm25Map, "PM2.5"));   
    boxes.push(new Box( random(nh3Map, windowW - nh3Map), random(nh3Map, windowH - nh3Map), nh3Map, "NH3"))  
  }

  

  //itemsCount = boxes.length;
  //text("Number of items: " + itemsCount, 50, 80);   //Number of items in the canvas

  for(let i=0; i<boxes.length; i++){
    boxes[i].show();
    boxes[i].move();
  }


  fill(0);
  noStroke();
  textSize(textSizeMap);   //135 for 
  textLeading(textSizeMap * 0.75);
  text(message2, windowW * 0.512, windowH * 0.41, windowW * 0.82, windowH);   //0.81
  colorAqi.setAlpha(255);
  fill(colorAqi);
  //stroke(0);
  //strokeWeight(4);
  text(aqiMessage, windowW * 0.512, windowH * 0.686, windowW * 0.82, windowH);   //0.81

  //image(video, 0, 0, video.width, video.height);
  let faces = detectDistinctFaces(poses);
    for (let f of faces) {
  }

  ps1.run();
  randomPosX = random(0, width);
  randomPosY = height + height * 0.1;
  randomPos1 = createVector(randomPosX, randomPosY)
  
  if (faceDetected1 && loadingDone){
    if (aqiNumber1 == 1){
      ps1.addParticle(particle_texture1, randomPos1);
    }
    if (aqiNumber1 == 2){
      ps1.addParticle(particle_texture2, randomPos1);
    }
    if (aqiNumber1 == 3){
      ps1.addParticle(particle_texture3, randomPos1);
    }
    if (aqiNumber1 == 4){
      ps1.addParticle(particle_texture4, randomPos1);
    }
    if (aqiNumber1 == 5){
      ps1.addParticle(particle_texture5, randomPos1);
    }
  }
 

}

function updateAqi(aqiNumber){
  //aqiNumber1 = aqiNumber;
  aqiNumber1 = 4;

  if(aqiNumber1 == 0){
    //textAqi = 'UNDEFINED';
    message2 = 'YOUR LOCATION AIR QUALITY INDEX IS';
    aqiMessage = 'UNDEFINED';
    colorAqi = color(0, 0, 0);  
  }

  if(aqiNumber1 == 1){
    //textAqi = 'GOOD';
    message2 = 'YOUR LOCATION AIR QUALITY INDEX IS';
    aqiMessage = 'GOOD';
    colorAqi = color(79, 201, 30);
  }
  if(aqiNumber1 == 2){
    //textAqi = 'FAIR';
    message2 = 'YOUR LOCATION AIR QUALITY INDEX IS';
    aqiMessage = 'FAIR';
    colorAqi = color(255, 204, 0);
  }
  if(aqiNumber1 == 3){
    //textAqi = 'MODERATE';
    message2 = 'YOUR LOCATION AIR QUALITY INDEX IS';
    aqiMessage = 'MODERATE';
    colorAqi = color(240, 100, 20);
  }
  if(aqiNumber1 == 4){
    //textAqi = 'POOR';
    message2 = 'YOUR LOCATION AIR QUALITY INDEX IS';
    aqiMessage = 'POOR';
    colorAqi = color(255, 17, 17);
  }
  if(aqiNumber1 == 5){
    //textAqi = 'VERY POOR';
    message2 = 'YOUR LOCATION AIR QUALITY INDEX IS';
    aqiMessage = 'VERY POOR';
    //colorAqi = color(99, 20, 46);
    colorAqi = color(77, 5, 42);
  }

  //document.documentElement.style.setProperty("--colorAqi", colorAqi); 
  //document.getElementById("m123").innerHTML = ' YOUR <br> LOCATION <br> AIR QUALITY <br> INDEX IS <br> <span>' + textAqi + '</span>';

}

/*
function mouseClicked(){
  aqi += 1;
  updateAqi(aqi);
  console.log("clicked" + aqi);
}*/


