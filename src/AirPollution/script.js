var lat;
var long;
var link;
var data1;
var list1;
    if ("geolocation" in navigator) {
        console.log("GeoLocation Available");

    navigator.geolocation.getCurrentPosition(position => {   //get the current position, when ready print them
    //lat = position.coords.latitude;
    //document.getElementById('latitude').textContent = lat;
    //long = position.coords.longitude;
    //document.getElementById('longitude').textContent = long;
    lat = 24;
    long = 90;  //55, 54

    console.log(position.coords);

    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", long);

    //api list is constantly changing size
    fetch('https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=' + lat + '&lon=' + long + 
    '&units=metric&appid=86be75b9a30f14d019d8ff3cfbd2022d')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        //data1 = data.list[1].main.aqi;
        data1 = data.list[0];
        //list1 = data.list;
        //console.log(data1.dt);

    })
    });

    } else {
        console.log("GeoLocation NOT Available");
    }

    /*function findCloserDate(array) { //list
        var today = Date.now();
        var sorted = array.sort( (a,b) => Math.abs(today-a.dt)<Math.abs(today-b.dt)?-1:1);
        return sorted[0];
    }*/



  