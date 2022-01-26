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

//function from the API
var context = new(window.AudioContext || window.webkitAudioContext);
//track 1 needs to be changed 
var mediaElement = audioContainer1; 

var source = context.createMediaElementSource(mediaElement);
var dist = context.createWaveShaper(); 
var gain = context.createGain();

source.connect(gain);
gain.connect(dist);
dist.connect(context.destination);

gain.gain.value =1;
dist.curve = makeDistortionCurve(0);

// http://stackoverflow.com/a/22313408/1090298
function makeDistortionCurve( amount ) {
  var k = typeof amount === 'number' ? amount : 0,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

// function loops and plays the music.
function startAudios(){
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
    //setInterval(testMusic, 5000);
    //setInterval(testSlider, 5000);
}
//linked to a pause button, simply pauses the audio(not finished)
function pauseAudios(){
    audioContainer1.pause();
    audioContainer2.pause();
    audioContainer3.pause();
    audioContainer4.pause();
    audioContainer5.pause();
    audioContainer6.pause();
    audioContainer7.pause();
    audioContainer8.pause();
    audioContainer9.pause();
    audioContainer10.pause();

}

// function sets an interval that decreases the volume of the music.
//sValue -> slider value
function fadeMusic(sValue){
    var timer = setInterval(fadeAudio, sValue); 
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
function increaseMusic(sValue){
    var timer = setInterval(raiseAudio, sValue);
    
    function raiseAudio(){
        if (audioContainer1.volume < 1) {
            audioContainer1.volume += 0.1;
            audioContainer1.volume = audioContainer1.volume.toFixed(1);
            console.log("current Vol level: ", audioContainer1.volume);
        } 
        else if (audioContainer1.volume >= 1){
            clearInterval(timer);
        }
    }
}

function setVolume (uiVolume){
    audioContainer1.volume = uiVolume/100;
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
/*function testMusic(){
    const zone_one = new zoneOne();;
    var vertices = [[zone_one.get_first_lat, zone_one.get_first_lng],
                    [zone_one.get_second_lat, zone_one.get_second_lng],
                    [zone_one.get_third_lat, zone_one.get_third_lng],
                    [zone_one.get_fourth_lat, zone_one.get_fourth_lng]];
    lat = loc.lat;
    lng = loc.lng;

    if(inside([lat, lng],vertices)){
        console.log("In location");
        increaseMusic();
    } else{
        console.log("Not in location");
        fadeMusic();
    }
}*/
