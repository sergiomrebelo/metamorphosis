let canvas, halftone;
let uScale = 0.8, uYrot=0.5;
let img, imgSize = Array(2), staticImg = true;

preload = () => {
    halftone = loadShader('assets/halftone.vert', 'assets/halftone.frag');
    img = loadImage('assets/example_poster.jpeg');
}

setup = () => {
    canvas = createCanvas(600, 700, WEBGL); //WebGL2RenderingContext
    pixelDensity(1);
    frameRate(300);
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();
    smooth();
    shader(halftone);

    imgSize = [width, height];
    img.resize(imgSize[0],imgSize[1]);

}

draw = () => {
    background(255,0,0);

    let xMouse = mouseX / width;

    // shader attributes
    halftone.setUniform('uScale', uScale);
    halftone.setUniform('uYrot', 1.0);
    if (!staticImg) {
        // animated
        const p = drawPoster();
        halftone.setUniform('uSampler', p);
        document.getElementById('tWidth').textContent = imgSize[0];
        document.getElementById('tHeight').textContent = imgSize[1];
    } else {
        // static
        halftone.setUniform('uSampler', img);
        document.getElementById('tWidth').textContent = img.width;
        document.getElementById('tHeight').textContent = img.height;
    }

    // drawPoster();
    // image(drawPoster(), 0,0);

    // shader geometry
    rect(0,0,width, height);

    document.getElementById('count').textContent = round(frameRate());
    document.getElementById('uScale').textContent = uScale;
    document.getElementById('uYrot').textContent = uYrot;
}

drawPoster = () => {
    const pg = createGraphics(imgSize[0], imgSize[1]);
    pg.ellipseMode(CENTER);
    pg.translate(width/2, height/2)
    const c1 = color(255, 204, 0);
    const c2 = color(255);
    pg.fill(255,255,0);
    pg.ellipse(
        0,
        0,
        map(Math.abs(mouseX - width/2), 0, width/2, 10, width/2),
        map(Math.abs(mouseY - height/2), 0, height/2, 10, height/2),
    );
    return pg;
}




function keyPressed() {
    const kc = keyCode;
    const k = key.toLowerCase();
    if (kc === LEFT_ARROW) {
        uScale +=0.1;
    } else if (kc === RIGHT_ARROW) {
        uScale -=0.1;
    } else if (kc === UP_ARROW) {
        uYrot -=0.1;
    }  else if (kc === DOWN_ARROW) {
        uYrot += 0.1;
    }
    else if (key === 'a') {
        imgSize[0] += 10;
        imgSize[1] += 10;
        if(staticImg) {
            img.resize(imgSize[0],imgSize[1]);
        }
    } else if (key === 's' &&  imgSize[0] > 20 && imgSize[1] > 20 ) {
        imgSize[0] -= 10;
        imgSize[1] -= 10;
        if(staticImg) {
            img.resize(imgSize[0],imgSize[1]);
        }
    }
    else if (key === 'b') {
        staticImg = !staticImg;
    } else if (key === 'r') {
        uScale = 0.8;
        uYrot = 0.5;
        imgSize = [width, height];
        if(staticImg) {
            img.resize(imgSize[0],imgSize[1]);
        }
    }
}