let fAway = 255;
let amountPart;
//========= PARTICLE SYSTEM ===========

let ParticleSystem = function (num, v, img_) {
    this.particles = [];
    this.origin = v.copy(); 
    this.img = img_;
    for (let i = 0; i < num; ++i) {
      this.particles.push(new Particle(this.origin, this.img));
    }
  };
  
  
  ParticleSystem.prototype.run = function () {
    let len = this.particles.length;
  
    for (let i = len - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
  
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };
  
  
  ParticleSystem.prototype.addParticle = function () {
    this.particles.push(new Particle(this.origin, this.img));
  };

  
  //========= PARTICLE  ===========
  
  let Particle = function (pos, img_) {
    this.loc = pos.copy();
  
    this.velUp = windowH * 0.0025;
    this.velRand = windowH * 0.001;
    let vx = randomGaussian() * this.velRand;
    let vy = randomGaussian() * this.velRand - this.velUp;  //default: * 0.3 - 1.0
  
    this.vel = createVector(vx, vy);
    this.acc = createVector();
    this.lifespan = 100.0;  //default 100
    this.texture = img_;
    this.widthParticle = windowH * 0.07;  //0.045
  };
  
  
  Particle.prototype.run = function () {
    this.update();
    this.render();
  };
  
  
  Particle.prototype.render = function () {
    imageMode(CENTER);
    //let mappedSize = map(this.lifespan, 100, 0, 40, 20);
    tint(255, this.lifespan);  //default: 120
    image(this.texture, this.loc.x, this.loc.y, this.widthParticle, this.widthParticle);  //Size 30/40
  };
  
  
  Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
      return true;
    } else {
      return false;
    }
  };
  
  
  Particle.prototype.update = function () {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= windowH/1000;  //0.8
    this.acc.mult(0);
  };
  