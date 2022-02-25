
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

//window.AudioContext ? new AudioContext() : webkitAudioContext();
ctx = new AudioContext();
ctx1 = new AudioContext();
ctx2 = new AudioContext();
ctx3 = new AudioContext();
ctx4 = new AudioContext();
ctx5 = new AudioContext();
ctx6 = new AudioContext();
ctx7 = new AudioContext();
ctx8 = new AudioContext();
ctx9 = new AudioContext();

//ctx3 = new AudioContext();



const audio = document.getElementById("audioContainer1");
const audio1 = document.getElementById("audioContainer2");
const audio2 = document.getElementById("audioContainer3");
const audio3 = document.getElementById("audioContainer4");
const audio4 = document.getElementById("audioContainer5");
const audio5 = document.getElementById("audioContainer6");
const audio6 = document.getElementById("audioContainer7");
const audio7 = document.getElementById("audioContainer8");
const audio8 = document.getElementById("audioContainer9");
const audio9 = document.getElementById("audioContainer10");

var audioSource1 = ctx.createMediaElementSource(audio);
var audioSource2 = ctx1.createMediaElementSource(audio1);
var audioSource3 = ctx2.createMediaElementSource(audio2);
var audioSource4 = ctx.createMediaElementSource(audio3);
var audioSource5 = ctx1.createMediaElementSource(audio4);
var audioSource6 = ctx2.createMediaElementSource(audio5);
var audioSource7 = ctx.createMediaElementSource(audio6);
var audioSource8 = ctx1.createMediaElementSource(audio7);
var audioSource9 = ctx2.createMediaElementSource(audio8);
var audioSource10 = ctx.createMediaElementSource(audio9);

bassFilter = ctx.createBiquadFilter();
bassFilter.type = "lowshelf";
bassFilter.frequency.value = 200; 

trebleFilter = ctx.createBiquadFilter();
trebleFilter.type = "highshelf"; 
trebleFilter.frequency.value = 2000;

audioSource1.connect(bassFilter);
bassFilter.connect(trebleFilter); 
trebleFilter.connect(ctx.destination);

audio.loop = true;
audio.volume = 0;
audio.play();




bassFilter1 = ctx1.createBiquadFilter();
bassFilter1.type = "lowshelf";
bassFilter1.frequency.value = 200; 

trebleFilter1 = ctx1.createBiquadFilter();
trebleFilter1.type = "highshelf"; 
trebleFilter1.frequency.value = 2000;

audioSource2.connect(bassFilter1);
bassFilter1.connect(trebleFilter1); 
trebleFilter1.connect(ctx1.destination);

audio1.volume = 0;
audio1.loop = true;
audio1.play();
 


bassFilter2 = ctx2.createBiquadFilter();
bassFilter2.type = "lowshelf";
bassFilter2.frequency.value = 200; 

trebleFilter2 = ctx2.createBiquadFilter();
trebleFilter2.type = "highshelf"; 
trebleFilter2.frequency.value = 2000;

audioSource3.connect(bassFilter2);
bassFilter2.connect(trebleFilter2); 
trebleFilter2.connect(ctx2.destination);

audio2.volume = 0;
audio2.loop = true;
audio2.play();


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
    audio1.volume = uiVolume/100;
    audio2.volume = uiVolume/100;
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
