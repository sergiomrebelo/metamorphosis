function Box(x, y, r, subtitle1) {
  this.vel = windowH * 0.002;  //0.8 //3
  //this.angVel = random(-PI / 180, PI / 180);
  this.ang = random(0, TWO_PI); //ver o angulo incial dependendo de onde começa o x e y
  //this.ang = random((TWO_PI) - (PI/6), (PI/6)); //como o item vai começar em cima, o angulo vai ser entre 240 degrees to 300 degrees
  //this.ang = (PI)/2;
  this.angX = random(0, TWO_PI);
  this.angY = random(0, TWO_PI);
  this.incAngle = PI / 64;
  this.probInverterDirecao = 0.2; 

 

  var options = {
    isStatic: false, //will not move
    angle: random(0, 2 * PI),
    friction: 0, //0.1, //object resistance
    frictionAir: 0, //0.01, //air resistance
    frictionStatic: 0, //0.5,  //the higher,the  more force it will take to initially get the body moving
    //density: 0.001,
    //force: {x: 0, y: 0}, //see also Body.applyForce
    restitution: 0.5,  //0.1, //elasticity
    //slop: 0.5, //0.05, //how far a body is allowed to 'sink' or rotate into other bodies
    //timeScale: 1, //control speed so you can make slow-motion objects
    //vertices: [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }],

  };

  this.body = Bodies.circle(x, y, r, options);
  //Matter.Body.setAngularVelocity(this.body, this.angVel);
  //Matter.Body.setAngularVelocity(this.body, 0.1);
  //Matter.Body.setAngle(this.body, random(0, TWO_PI));
  this.r = r;
  this.subtitle1 = subtitle1;
  //this.color = color;
  World.add(engine.world, this.body);

  
  this.removeFromWorld = function () {
    World.remove(engine.world, this.body);
  };


  this.move = function () {
    let pos = this.body.position;
    let newX = pos.x + this.vel * cos(this.angX);
    let newY = pos.y + this.vel * sin(this.angY);
    //console.log("newX: " + newX, "newY: " + newY);
    //console.log(this.angX, this.angY, newX);
    
    // Make the balls bounce
    if (newX >= windowW - (this.r)){
       this.angX -= PI;
       this.angX += this.incAngle;
    }
    if (newX <= 0 + (this.r)){
      this.angX += PI;
      this.angX += this.incAngle;
    }

    if (newY >= windowH - (this.r)){
      this.angY -= PI;
      this.angY += this.incAngle;
    }
    if (newY <= 0 + (this.r)){
      this.angY += PI;
      this.angY += this.incAngle;
    }
    
    /*if (random(0, 1) < this.probInverterDirecao) {
      this.incAngle *= -0.5;
      //console.log(this.incAngle, this.ang);
    }*/

    Matter.Body.setPosition(this.body, Matter.Vector.create(newX, newY));
    //Matter.Body.setAngle(this.body, this.ang)
  };

  this.show = function () {
    //console.log(this.subtitle1);
    pos = this.body.position;
    angle = this.body.angle;
    posX = pos.x;
    posY = pos.y;
    //let opacity1 = map(this.r, smallWidth, largeWidth, 150, 250);
    let opacity1 = 120;
    push();
    translate(posX, posY);
    rotate(angle);
    //fill(0, 100, 255, opacity1);   //180
    //fill(255,255,255,0);
    //strokeWeight(5);
    colorAqi.setAlpha(opacity1);
    noFill();
    fill(colorAqi, 100);
    //stroke(0);
    //strokeWeight(2);
    ellipseMode(CENTER);
    ellipse(0, 0, this.r * 2, this.r * 2);
    //fill(255);
    fill(255);
    noStroke();
    //noFill();
    textAlign(CENTER, BASELINE);
    textSize(this.r);
    text(this.subtitle1, 0, this.r/3);
    pop();
  };
}
