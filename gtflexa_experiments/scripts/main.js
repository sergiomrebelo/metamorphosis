let canvas, ctx, resizer, fontParams;
let mWeight = 100, mWidth= 'ultra-condensed';

const txt = [
    "I love",
    "the big scale",
    "and immediate impact",
    "of posters.",
    "They're my favourite",
    "things to design.",
    "I love the big scale",
    "and immediate impact of posters."
]

setup = () => {
    canvas = createCanvas(windowWidth, windowHeight, WebGL2RenderingContext); //WebGL2RenderingContext
    pixelDensity(1);
    frameRate(60);
    smooth();

    ctx = canvas.drawingContext;

    fontParams = {
        'weight' : '800',
        'size' : 50,
        'typeface' : `flexa`,
        'font-stretch': `ultra-expanded`
    };
}

draw = (inc=60) => {
    push();
    background ('#ff0000');
    fill('#ffffff');
    stroke('#ffffff');
    let h = inc, weight = 100;
    textAlign(CENTER, TOP);

    // static
    for (let i in txt) {
        i = parseInt(i);
        const content = txt[i];
        ctx.font = `${weight} ${getStretchShortcut(i)} ${fontParams.size}px ${fontParams.typeface}`;
        text (content, windowWidth/2, h);
        line (0, h, windowWidth, h);
        console.info(`info: ${content} => ${ ctx.font}`);
        weight+=100;
        h+=inc;
    }

    // variable
    h+=(inc*2)
    ctx.font = `${mWeight} ultra-expanded ${fontParams.size}px ${fontParams.typeface}`;
    text ("GT FLEXA", windowWidth/2, h);
    line (0, h, windowWidth, h);


    h+=(inc*2)
    ctx.font = `${mWeight} ${defWidthValue(mouseY).value} ${fontParams.size}px ${fontParams.typeface}`;
    text ("GT FLEXA", windowWidth/2, h);
    line (0, h, windowWidth, h);


    h+=(inc*2)
    ctx.font = `${mWeight} ${defWidthValue(mouseY).value} ${defWidthValue(mouseY).font}px ${fontParams.typeface}`;
    text ("GT FLEXA", windowWidth/2, h);
    noFill();
    rect (windowWidth/2-300, h, 600, 200);


    pop();




    mWeight = map(mouseX, 0, windowWidth, 100, 800);
    mWidth = defWidthValue();
}


windowResized = () => {
    clearInterval(resizer);
    resizer = setTimeout( () => {
        resizeCanvas(windowWidth, windowHeight);
    }, 10);
}

/*  NOTE:
    numerical values are not fully implemented in canvas,
    you should convert to default alias values
 */
const defWidthValue = (n, min = 0, max= 8) => {
    const v = round(map(n, 0, windowHeight, min, max));

    return {
        'value': getStretchShortcut(v),
        'n': v,
        'font': defSizeBasedOnWidth(v)
    };
}

// it is necessary due to the current limitations
const getStretchShortcut = (v) => {
    let alias = undefined;
    switch (v) {
        case 0:
            alias = 'ultra-expanded';
            break;
        case 1:
            alias = 'extra-expanded';
            break;
        case 2:
            alias = 'expanded';
            break;
        case 3:
            alias = 'semi-expanded';
            break;
        case 4:
            "inside";
            alias = 'normal'
            break;
        case 5:
            alias = 'semi-condensed'
            break;
        case 6:
            alias = 'condensed';
            break;
        case 7:
            alias = 'extra-condensed';
            break;
        default:
            alias = 'ultra-condensed';
            break;
    }

    return alias;
}

const defSizeBasedOnWidth = (v, max=75, min=200, maxWidth=8) => {
    return round(map(v,0,maxWidth,max, min));
}