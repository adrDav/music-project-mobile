// allocating variables for each container with music.
const audioContainer1 = document.getElementById("audioContainer1");
const audioContainer2 = document.getElementById("audioContainer2");
const audioContainer3 = document.getElementById("audioContainer3");
const audioContainer4 = document.getElementById("audioContainer4");
const audioContainer5 = document.getElementById("audioContainer5");
const audioContainer6 = document.getElementById("audioContainer6");
const audioContainer7 = document.getElementById("audioContainer7");
const audioContainer8 = document.getElementById("audioContainer8");
const audioContainer9 = document.getElementById("audioContainer9");
const audioContainer10 = document.getElementById("audioContainer10");

// muted containers from start. Volume goes from 0 to 1 (decimal numbers).
audioContainer1.volume = 0;
audioContainer2.volume = 0;
audioContainer3.volume = 0;
audioContainer4.volume = 0;
audioContainer5.volume = 0;
audioContainer6.volume = 0;
audioContainer7.volume = 0;
audioContainer8.volume = 0;
audioContainer9.volume = 0;
audioContainer10.volume = 0;

// function loops and plays the music.
async function startAudios(){
    audioContainer1.loop = true;
    audioContainer2.loop = true;
    audioContainer3.loop = true;
    audioContainer4.loop = true;
    audioContainer5.loop = true;
    audioContainer6.loop = true;
    audioContainer7.loop = true;
    audioContainer8.loop = true;
    audioContainer9.loop = true;
    audioContainer10.loop = true;

    audioContainer1.play(); 
    audioContainer2.play(); 
    audioContainer3.play(); 
    audioContainer4.play(); 
    audioContainer5.play(); 
    audioContainer6.play();
    audioContainer7.play(); 
    audioContainer8.play(); 
    audioContainer9.play(); 
    audioContainer10.play();

    // testMusic has to constantly be executed to work. It handles all the logic of the zones.
    setInterval(testMusic, 5000);
}

// function sets an interval that decreases the volume of the music.
function fadeMusic(){
    var timer = setInterval(fadeAudio, 500);
    function fadeAudio(){
        if (audioContainer1.volume > 0) {
            audioContainer1.volume -= 0.1;
            audioContainer1.volume = audioContainer1.volume.toFixed(1);
        } 
        else if (audioContainer1.volume <= 0){
            clearInterval(timer);
        }
    }
}

// function sets an interval that increases the volume of the music.
function increaseMusic(){
    var timer = setInterval(raiseAudio, 500);
    function raiseAudio(){
        if (audioContainer1.volume < 1) {
            audioContainer1.volume += 0.1;
            audioContainer1.volume = audioContainer1.volume.toFixed(1);
        } 
        else if (audioContainer1.volume >= 1){
            clearInterval(timer);
        }
    }
}

// function determines if coordinates are inside a polygon.
function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

// function handles the logic of the zones in the map.
function testMusic(){
    const zone_one = new zoneOne();;
    var vertices = [[zone_one.get_first_lat, zone_one.get_first_lng],
                    [zone_one.get_second_lat, zone_one.get_second_lng],
                    [zone_one.get_third_lat, zone_one.get_third_lng],
                    [zone_one.get_fourth_lat, zone_one.get_fourth_lng]];
    updated = getLocation();

    lat = updated.latitude;
    lng = updated.longitude;

    console.log(lat);
    console.log(lng);

    if(inside([lat, lng],vertices)){
        console.log("In location");
        increaseMusic();
    } else{
        console.log("Not in location");
        fadeMusic();
    }
}
