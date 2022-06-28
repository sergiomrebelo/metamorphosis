var lat;
var long;
var link;
var temp;

    if ("geolocation" in navigator) {
        console.log("GeoLocation Available");

    navigator.geolocation.getCurrentPosition(position => {   //get the current position, when ready print them
    lat = position.coords.latitude;
    //document.getElementById('latitude').textContent = lat;
    long = position.coords.longitude;
    //document.getElementById('longitude').textContent = long;
    
    console.log(position.coords);

    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", long);

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + 
    '&units=metric&appid=90244066b882660bcf1dca654caddda7')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        temp = data.main.temp;
        //console.log("Temperature " + temp);

    })

    });

    } else {
        console.log("GeoLocation NOT Available");
    }



  