const options = {maximumAge: 0, timeout: 5000, enableHighAccuracy: false};
loc = {
    lat : 0,
    lng : 0,
};

function getGeoLocation(){
    navigator.geolocation.watchPosition(getLoc, function (){}, options);
}
function getLoc(position){
    var lat = parseFloat(position.coords.latitude);
    loc.lat = position.coords.latitude;
    var lng = parseFloat(position.coords.longitude);
    loc.lng = position.coords.longitude;
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lng;
}