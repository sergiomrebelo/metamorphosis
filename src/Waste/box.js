function Box(x, y, w, h, image123, mappedTime){
    var options = {
        friction: 0.3,  //0.3
        restitution: 0.6,   //0.6
        slop: 0.01,
        //friction: 0, //0.1, //object resistance
        //frictionAir: 0, //0.01, //air resistance
        //frictionStatic: 0, //0.5,  //the higher,the  more force it will take to initially get the body moving
        density: 0.001,
        //force: {x: 0, y: 0}, //see also Body.applyForce
        //restitution: 0.5,  
    }
    this.body = Bodies.rectangle(x, y, w * 0.9, h * 0.9, options);
    Matter.Body.setAngularVelocity(this.body, 0.1);
    Matter.Body.setAngle(this.body, random(0, TWO_PI));
    this.w = w;
    this.h = h;
    this.img = image123;
    this.mappedTime = mappedTime;
    //this.color = color;
    World.add(engine.world, this.body);  //use splice fromm world to remove items?



    this.timesUp = function(){
        if (this.mappedTime <= 0){
            return true;
        }
        else {
            return false;
        }
    }

    this.removeTime = function(){
        this.mappedTime -= 1;
    }

    this.removeFromWorld = function(){
        World.remove(engine.world, this.body);
    }

    this.show = function(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        //fill(200,0,0);
        //rect(0, 0, this.w, this.h);
        //glass.resize(this.w, this.h);
        imageMode(CENTER);
        //tint(214, 164, 126);
        image(this.img, 0, 0, this.w, this.h);
        pop();
    }


}