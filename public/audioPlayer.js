
/*           Filter types
- There are many kinds of filters that can be used to achieve certain kinds of effects:
- Low-pass filter Makes sounds more muffled
- High-pass filter Makes sounds more tinny
- Band-pass filter Cuts off lows and highs (e.g., telephone filter)
- Low-shelf filter Affects the amount of bass in a sound (like the bass knob on a stereo)
- High-shelf filter Affects the amount of treble in a sound (like the treble knob on a stereo)
- Peaking filter Affects the amount of midrange in a sound (like the mid knob on a stereo)
- Notch filter Removes unwanted sounds in a narrow frequency range
- All-pass filter Creates phaser effects (dont know what it means)
*/

//Web Audio API 
/* Reminder VVV
* bug fix: need to have AudioContext inside of a function for some reason, 
* because chrome (specifically) doesnt like it when it is not properly shut down/started?.
* have to test it with iOS safari and other browesers, because from what i read,
* some browsers wont work if AudioContext is not initilized at the start.  
*/

/*
How to make multiple audio streams(?):
https://stackoverflow.com/questions/46292957/web-audio-with-multiple-streams
Examples of Web audio API:
https://css-tricks.com/form-validation-web-audio/
Advance tutorial for WEb Audio API: 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#demo
Repository of Web Audio Advance Example:
https://github.com/mdn/webaudio-examples/blob/master/step-sequencer/index.html
yet another tutorial on WAAPI
https://k6.io/blog/webaudio_explained/
*/
ctx = window.AudioContext ? new AudioContext() : webkitAudioContext();
ctx = new AudioContext();

const audio = document.getElementById("audioContainer1");
setupContext(audio);
audio.volume = 0;
audio.loop = true;
audio.play();
const audio1 = document.getElementById("audioContainer2");
setupContext(audio1);
audio1.volume = 0;
audio1.loop = true;
audio1.play();
const audio2 = document.getElementById("audioContainer3");
setupContext(audio2);
audio2.volume = 0;
audio2.loop = true;
audio2.play();
const audio3 = document.getElementById("audioContainer4");
setupContext(audio3);
audio3.volume = 0;
audio3.loop = true;
audio3.play();

// function loops and plays the music just the first track for now.
function setupContext(audioS){
    //here we create/open the node 
    var source =  ctx.createMediaElementSource(audioS);

    //here we add bass filter/fx to the node
    bassFilter = ctx.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 200; 

    // here we add treble filter/fx to the node.
    trebleFilter = ctx.createBiquadFilter();
    trebleFilter.type = "highshelf"; 
    trebleFilter.frequency.value = 2000;

    //connecting the filter nodes to the audio source and send it to the destination (window)
    source.connect(bassFilter);
    bassFilter.connect(trebleFilter); 
    trebleFilter.connect(ctx.destination);
    
    //line below is important
    //setInterval()
}



//pause audio
var isPlaying = false;
function pauseAudios() {
    isPlaying ? audio.pause() : audio.play();
  };
  
  audio.onplaying = function() {
    isPlaying = true;
  };
  audio.onpause = function() {
    isPlaying = false;
  };

//volume controls 
function setVolume (uiVolume){
    audio.volume = uiVolume/100;
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
}

// function handles the logic of the zones in the map.
/*function testMusic(){
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
}*/
