function Box(x, y, w, h, image123, mappedTime) {
  this.vel = 0.8;  
  this.probInverterDirecao = 0.2; 
  this.incAngle = PI / 64;
  this.angVel = random(-PI / 180, PI / 180);
  //this.ang = random(0, TWO_PI); //ver o angulo incial dependendo de onde começa o x e y
  //this.ang = random((TWO_PI) - (PI/6), (PI/6)); //como o item vai começar em cima, o angulo vai ser entre 240 degrees to 300 degrees
  this.ang = (PI)/2;

  this.upAngle = random(PI/3, (2 * PI) / 3);  //60 degrees to 120 degrees
  this.rightAngle = random((2 * PI) - (PI/6), (PI/6));   //330 degrees to 30 degrees
  this.downAngle = random((4 * PI)/3, (5 * PI)/3);  //240 degrees to 300 degrees
  this.leftAngle = random((5 * PI)/6, (5 * PI)/6);   //150 to 210 degrees

  var options = {
    //label: "body", //the name you want
    //isStatic: false, //will not move
    //angle:this.ang,
    friction: 0.0, //0.1, //object resistance
    frictionAir: 0.0, //0.01, //air resistance
    frictionStatic: 0, //0.5,  //the higher,the  more force it will take to initially get the body moving
    //density: 0.001,
    //force: { x: 0, y: 0 }, //see also Body.applyForce
    //restitution: 0.0, //0.1, //elasticity
    //slop: 0.0, //0.05, //how far a body is allowed to 'sink' or rotate into other bodies
    //timeScale: 1, //control speed so you can make slow-motion objects
    //vertices: [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }],
  };

  this.body = Bodies.rectangle(x, y, w * 0.9, h * 0.9, options);
  //Matter.Body.setAngularVelocity(this.body, this.angVel);
  //Matter.Body.setAngularVelocity(this.body, 0.1);
  //Matter.Body.setAngle(this.body, random(0, TWO_PI));
  this.w = w;
  this.h = h;
  this.img = image123;
  this.mappedTime = mappedTime;
  //this.color = color;
  World.add(engine.world, this.body);

  this.timesUp = function () {
    if (this.mappedTime <= 0) {
      return true;
    } else {
      return false;
    }
  };

  this.removeTime = function () {
    this.mappedTime -= 1;
  };

  this.removeFromWorld = function () {
    World.remove(engine.world, this.body);
  };

  this.move = function () {
    let pos = this.body.position;
    //let newX = pos.x + this.vel * cos(this.ang);
    //let newY = pos.y + this.vel * sin(this.ang);
    //console.log("newX: " + newX, "newY: " + newY);

    // Disapear from one edge and coming out of the opposite one
    /*if (newX > windowW + (this.w * 1.2)){
      newX = -(this.w * 1.2);
      newY = random(this.h, (windowH - this.h));
      //this.ang = //change direction
      this.ang = this.rightAngle; //change direction
    }

    if (newX < (this.w * -1.4)){
      newX = windowW + (this.w);
      newY = random(this.h, (windowH - this.h));
      this.ang = this.leftAngle; //change direction
    }

    if (newY > windowH + (this.h * 1.2)){
      newY = (this.h * -1.2);
      newX = random(this.w, (windowW - this.w));
      this.ang = this.upAngle; //change direction
    }

    if (newY < (this.h * -1.4)){
      newY = windowH + (this.h);
      newX = random(this.w, (windowW - this.w));
      this.ang = this.downAngle; //change direction
    }

    if (random(0, 1) < this.probInverterDirecao) {
      this.incAngle *= -1;
      //console.log(this.incAngle, this.ang);
    }
    
    this.ang += this.incAngle;
*/
    //Matter.Body.setPosition(this.body, Matter.Vector.create(newX, newY));
    //Matter.Body.setAngle(this.body, this.ang)
  };

  this.show = function () {
    pos = this.body.position;
    angle = this.body.angle;
    posX = pos.x;
    posY = pos.y;
    push();
    translate(posX, posY);
    rotate(angle);
    rectMode(CENTER);
    //fill(200,0,0);
    //rect(0, 0, this.w, this.h);
    //glass.resize(this.w, this.h);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  };
}
