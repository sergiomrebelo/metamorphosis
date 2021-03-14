var mic;
var posterWidth;
let boldFont, lightFont;
let mappedValue, mappedValue2;
let highestValue;
let img;
let mycolor;
let b, c;

function setup() {
  //createCanvas(1800, 893);
  createCanvas(1800, 893, WebGL2RenderingContext);
  mic = new p5.AudioIn();
  mic.start();
  posterWidth = 400;
  highestValue = 0;
  img = loadImage("image/Noise123.png"); // Load the image
  //frameRate(10);
}

function draw() {
  background(200);
  let vol = mic.getLevel();
  let vol2 = int(vol * 1000);
  mappedValue = int(map(vol2, 0, 450, 0, 1000));
  textSize(60);
  fill(0);
  text("Volume: " + vol2, 700, 80);
  text("Mapped: " + mappedValue, 700, 140);
  text("Highest Value: " + highestValue, 700, 250);

  if (mappedValue >= highestValue + 1) {
    highestValue = mappedValue;
  }

  noStroke();
  fill(0);

  if (mappedValue <= 50) {
    rect(115, 393, posterWidth, 102);
  }

  if (mappedValue >= 51 && mappedValue <= 100) {
    rect(115, 337, posterWidth, 213);
  }

  if (mappedValue >= 101 && mappedValue <= 200) {
    rect(115, 287, posterWidth, 315);
  }

  if (mappedValue >= 201 && mappedValue <= 300) {
    rect(115, 242, posterWidth, 408);
  }

  if (mappedValue >= 301 && mappedValue <= 400) {
    rect(115, 200, posterWidth, 490);
  }

  if (mappedValue >= 401 && mappedValue <= 500) {
    rect(115, 162, posterWidth, 565);
  }

  if (mappedValue >= 501 && mappedValue <= 600) {
    rect(115, 132, posterWidth, 627);
  }

  if (mappedValue >= 601 && mappedValue <= 700) {
    rect(115, 103, posterWidth, 684);
  }

  if (mappedValue >= 701 && mappedValue <= 800) {
    rect(115, 80, posterWidth, 730);
  }

  if (mappedValue >= 801 && mappedValue <= 900) {
    rect(115, 62, posterWidth, 768);
  }

  if (mappedValue >= 901) {
    rect(115, 45, posterWidth, 800);
  }

  
  noFill();
  strokeWeight(1);
  stroke(0);
  image(img, 0, 0); //Image in the end so it stays on top

  //c = get(mouseX, mouseY);
  //text("GET X,Y: " + int(brightness(c)), 700, 400);
   
  if( mappedValue >= 101){    //to add texture only from "101db" and louder
  
  mappedValue2 = int(map(vol2, 100, 450, 40, 10));
  fill(0);
  noStroke();
  let tilesX = mappedValue2;
  //let tilesX = 30;
  //let tilesX = mouseX/10;
  //text("TilesX: " + tilesX, 700, 400);
  let tileSize = ((210 * 3) / tilesX ) /5;
    for (let y = 5; y < (297 * 3); y += tileSize) {
      for (let x = 5; x < (210 * 3); x += tileSize) {
        let c = get(x, y);  
        let b = map(brightness(c), 0, 100, 1.5, 0.1);
        push();
        translate(x, y);
        ellipse(0, 0, b * tileSize, b * tileSize);
        pop();
      }
    }
  }
}
