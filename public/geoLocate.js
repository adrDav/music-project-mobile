function showLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    const data = { lat, lng};
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lng;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(data)
    const response = fetch('/', options);
}

function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function getLocation() {
    if(navigator.geolocation) {
       // timeout at 60000 milliseconds (60 seconds)
       var options = {timeout:60000};
       navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
       alert("Sorry, browser does not support geolocation!");
    }
 }