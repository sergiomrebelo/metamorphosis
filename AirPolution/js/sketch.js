/*https://www.iqair.com/world-air-quality-ranking*/

var url1 = 'http://api.airvisual.com/v2/city?city=Coimbra&state=Coimbra&country=Portugal&key=1e75503b-8b6a-4079-8f72-98835005eb65';
var url2 = 'http://api.waqi.info/feed/Bangkok/?token=2191f6e5f5c3d2cffac2c7039706d31a2b1b90f4';
var url3 = 'https://api.waqi.info/feed/Milano/?token=2191f6e5f5c3d2cffac2c7039706d31a2b1b90f4';
var url4 = 'https://api.waqi.info/feed/Mumbai/?token=2191f6e5f5c3d2cffac2c7039706d31a2b1b90f4';
var url6 = 'https://api.waqi.info/feed/Dhaka/?token=2191f6e5f5c3d2cffac2c7039706d31a2b1b90f4';
var url7 = 'https://api.waqi.info/feed/Khabul/?token=2191f6e5f5c3d2cffac2c7039706d31a2b1b90f4';

//fontes variáveis , ex:weight:504
//atitude positiva mata as particuals nocivas
//atitude negativa cria particulas nocivas

const c = '#fffdc7';
let p1, p2, p3, p4, p6, p7;
var t1, t2, t3, t4, t6, t7;

var div1;
var string1, string2, string3, string4, string6, string7;
var canvas;


function preload() {
}

function setup() {
    /*createCanvas(windowWidth, windowHeight - 100);*/
    loadJSON(url1, pollution1);
    loadJSON(url2, pollution2);
    loadJSON(url3, pollution3);
    loadJSON(url4, pollution4);
    loadJSON(url6, pollution6);
    loadJSON(url7, pollution7);


    //canvas = document.getElementById('defaultCanvas0');
    div1 = document.getElementById('div1');
    t1 = document.createElement('p');
    t2 = document.createElement('p');
    t3 = document.createElement('p');
    t4 = document.createElement('p');
    t6 = document.createElement('p');
    t7 = document.createElement('p');
    div1.classList.add("cities");
    div1.appendChild(t1);
    div1.appendChild(t2);
    div1.appendChild(t3);
    div1.appendChild(t4);
    div1.appendChild(t6);
    div1.appendChild(t7);
    //canvas.appendChild(t1);
}

function pollution1(data) {
    p1 = data;
}

function pollution2(data) {
    p2 = data;
}

function pollution3(data) {
    p3 = data;
}

function pollution4(data) {
    p4 = data;
}

function pollution6(data) {
    p6 = data;
    /*p6level = p6.data.aqi;
    print(p6level);*/
}

function pollution7(data) {
    p7 = data;
}


function draw() {
    //noLoop();
    textAlign(CENTER);
    textSize(94);
    fill(0);
    //print(((windowWidth/2) - 200));


    if (p1 != null) {
        //print(p1);
        let city1 = p1.data.city;
        let value1 = p1.data.current.pollution.aqius;
        let mappedValue = map(value1, 0, 400, 100, 900);
        string1 = city1 + ": " + value1;
        t1.innerHTML = string1;
        t1.style.fontWeight = mappedValue;
    }

    if (p2 != null) {
        let city2 = p2.data.city.name;
        let value2 = p2.data.aqi;
        let mappedValue = map(value2, 0, 400, 100, 900);
        string2 = city2 + ": " + value2;
        t2.innerHTML = string2;
        t2.style.fontWeight = mappedValue;
    }

    if (p3 != null) {
        let city3 = p3.data.city.name;
        let splitString = split(city3, ' ');
        let city3name = splitString[0];
        let value3 = p3.data.aqi;
        let mappedValue = map(value3, 0, 400, 100, 9000);
        string3 = city3name + ": " + value3;
        t3.innerHTML = string3;
        t3.style.fontWeight = mappedValue;
    }


    if (p4 != null) {
        let city4 = p4.data.city.name;
        let splitString = split(city4, ' ');
        let city4name = splitString[0];
        let value4 = p4.data.aqi;
        let mappedValue = map(value4, 0, 400, 100, 900);
        string4 = city4name + ": " + value4;
        t4.innerHTML = string4;
        t4.style.fontWeight = mappedValue;
    }


    if (p6 != null) {
        let city6 = p6.data.city.name;
        let splitString = split(city6, ' ');
        let city6name = splitString[0];
        let value6 = p6.data.aqi;
        let mappedValue = map(value6, 0, 400, 100, 900);
        string6 = city6name + ": " + value6;
        t6.innerHTML = string6;
        t6.style.fontWeight = mappedValue;
    }

    if (p7 != null) {
        let city7 = p7.data.city.name;
        let splitString = split(city7, ' ');
        let city7name = splitString[0];
        let value7 = p7.data.aqi;
        let mappedValue = map(value7, 0, 600, 100, 900);
        string7 = city7name + ": " + value7;
        t7.innerHTML = string7;
        t7.style.fontWeight = mappedValue;

    }
}