let pos, angle, target, posAtual, dist2, novaPos, novaPosX, novaPosY;
let target44, posAtual44, dist44, novaPos44;
let forceFace = 0;
let forceCenter = 100;
let faceInside = false;
let velFinal;

function Box(x, y, w, h, color, name123, image123) {

    let group = Matter.Body.nextGroup(true);
  let options = {
    //label: "body", //the name you want
    //isStatic: false, //will not move  
    //angle: random(0, 2 * PI),
    //friction: 0.0, //0.1, //object resistance
    //frictionAir: 0.00, //0.01, //air resistance
    //frictionStatic: 0, //0.5,  //the higher,the  more force it will take to initially get the body moving
    //density: 0.001,
    //force: { x: 0, y: 0 }, //see also Body.applyForce
    //restitution: 0.0, //0.1, //elasticity
    //slop: 0.0, //0.05, //how far a body is allowed to 'sink' or rotate into other bodies
    //timeScale: 1, //control speed so you can make slow-motion objects
    //vertices: [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }],

  };
  this.body = Bodies.rectangle(x, y, w, h, options);

  //Matter.Body.setAngularVelocity(this.body, 0.1);
  //Matter.Body.setAngle(this.body, random(0, TWO_PI));


  this.w = w;
  this.h = h;
  this.color = color;
  this.name123 = name123;
  this.image123 = image123;
  World.add(engine.world, this.body);


  this.show = function () {
    //let group = Body.nextGroup(true);
    //this.body.collisionFilter.group = group;
    this.body.collisionFilter.group = group;
    
    pos = this.body.position;
    angle = this.body.angle;

    //forceFace = 200;
    //forceCenter = 100;

    
    /*if (attractorX > width || attractorX < 0 || attractorY > height || attractorY < 0){
      faceInside = true;
      forceFace = 1000;
    }*/

    let velRandom = createVector(random(0,0.1), random(0,0.1));
    dist2 = createVector(0, 0);
    posAtual = createVector(mouseX, mouseY);

    if (forceFace > 0) {
    target = createVector(attractorX, attractorY);  //center of the Face
    dist2 = target.copy().sub(posAtual);
    dist2.div(forceFace); //60
    //console.log(forceFace);
    //dist = dist.div(10);
    //let dist2 = dist.div(20);
    novaPos = posAtual.copy().sub(dist2);
    novaPos.add();
    }

    /*--------------------------*/

    dist44 = createVector(0, 0);
    if (forceCenter > 0) {
    target44 = createVector(width/2, height/2);
    //posAtual44 = createVector(pos.x, pos.y);
    dist44 = target44.copy().sub(posAtual);
    dist44.div(forceCenter);
    }
    dist2.mult(-1, -1);
    velFinal = dist2.add(velRandom).add(dist44);
  
    //novaPos = posAtual.copy().add(dist44);
    //novaPos44.add(createVector(random(0,0.1), random(0,0.1)));
    
    //Matter.Body.setPosition(this.body, Matter.Vector.create(novaPos.x, novaPos.y));
    //Matter.Body.setVelocity(this.body, Matter.Vector.create(dist44.x, dist44.y));
    Matter.Body.setVelocity(this.body, Matter.Vector.create(velFinal.x, velFinal.y));
    /*if(faceInside){
      Matter.Body.setVelocity(this.body, Matter.Vector.create(-dist2.x, -dist2.y));
    }
    else {
      Matter.Body.setVelocity(this.body, Matter.Vector.create(-dist2.x, -dist2.y));
    }*/
    

    push();
    translate(this.body.position.x, this.body.position.y);
    //translate(novaPos.x, novaPos.y);
    //translate(novaPos.x / (forceFace / 10), novaPos.y / (forceFace / 10));
    
    //rotate(angle);
    //fill(color);
    //ellipse(0, 0, this.r *2, this.r*2);
    rectMode(CENTER);
    //rect(0, 0, this.w, this.h);
    imageMode(CENTER);
    image(this.image123, 0, 0, this.w, this.h);
    pop();
  }

  this.removeFromWorld = function(){
    World.remove(engine.world, this.body);
  }


}
