// coordinates stores the ever-changing coordinates.
var coordinates = {};

async function showLocation(position) {
    // obtain coordinates from the API.
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    // coordinates stores new coordinates.
    coordinates = {latitude: lat, longitude: lng};
    // print into the HTML file.
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lng;
    
    // POST request to server.
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coordinates)
    };
    const response = await fetch('/', options);
}

function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}
//no request for iOS
//https://stackoverflow.com/questions/48293914/geolocation-in-javascript-on-ios-safari
function getLocation() {
    if(navigator.geolocation) {
       // timeout at 60000 milliseconds (60 seconds)
       var options = {
           
        enableHighAccuracy: true,
        timeout:60000,
        maximumAge: 0
    };
       navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
       // return the updated variables.
       return coordinates;
    } else {
       alert("Sorry, browser does not support geolocation!");
    }
}