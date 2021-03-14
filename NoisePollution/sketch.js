/*let font;

function preload() {
  font = loadFont("assets/ChickenShopGothicGX.woff2");
}*/

var mic;
let mappedValue, mappedValue2, mappedValue3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  //frameRate(60);
  smooth();

  mappedValue = 5;
  mappedValue2 = 0;
  mappedValue3 = 100;
  
  
  mic = new p5.AudioIn();
  mic.start();

  p1 = createP("NOISE");
  p1.addClass("noiseWord");
  p2 = createP("SILENCE");
  p2.addClass("silenceWord");
  div1 = createDiv("");
  div1.child(p1);
  div1.child(p2);
}


function draw() {
  background(100);
 
  let vol = mic.getLevel();
  let vol2 = int(vol * 1000);
  if( vol2 >= 10) {  //so it doesnt flicker that much with low sound
  //mappedValue = int(map(mouseX, 0, windowWidth, 5, 75));
  mappedValue = int(map(vol2, 0, 450, 5, 75));
  mappedValue2 = int(map(mappedValue, 5, 75, 0, 467));
  mappedValue3 = int(map(vol2, 0, 450, 100, 5));
  }
  
 fill(0,0,200);
  textSize(50);
  text("Volume: " + vol2, 1400, 150);

  /*---------------------------------*/
  
  let pSize1 = 53;
  let pSize2 = 38.5;
  //let pStretch1 = mouseX/10;
  let pStretch1 = 75;
  //let pStretch2 = mouseX/10;
  let pStretch2 = 0;
  p1.style("font-size", pSize1 + "vh");
  p1.style("font-variation-settings", "'susi'" + mappedValue);
  p1.style("transform", "translate" + "(0," + mappedValue2 + "px)"); //translate the font while changing the stretch value
  p2.style("font-size", pSize2 + "vh");
  p2.style("font-variation-settings", "'susi'" + mappedValue3);

}