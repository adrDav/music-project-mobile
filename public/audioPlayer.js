
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
let context;
Container = "audioContainer1";

// allocating variables for each container with music.
audioContainer1 = document.getElementById(Container);

// muted containers from start. Volume goes from 0 to 1 (decimal numbers).
audioContainer1.volume = 0;

var track = 0;

//Web Audio API 

/*
    loop all audio. can we have multiple nodes ?
*/

/* Reminder VVV
* bug fix: need to have AudioContext inside of a function for some reason, 
* because chrome (specifically) doesnt like it when it is not properly shut down/started?.
* have to test it with iOS safari and other browesers, because from what i read,
* some browsers wont work if AudioContext is not initilized at the start.  
*/

// function loops and plays the music just the first track for now.
function startAudios(){
    AudioContext = window.AudioContext || window.webkitAudioContext;

    context = new AudioContext();
    //holds current track being played 
    var mediaElement = audioContainer1; 
    console.log(mediaElement);
    //here we create/open the node 
    var source = context.createMediaElementSource(audioContainer1);
    var dist = context.createWaveShaper(); 
    var gain = context.createGain();

    //here we add bass filter/fx to the node
    bassFilter = context.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 200; 

    // here we add treble filter/fx to the node.
    trebleFilter = context.createBiquadFilter();
    trebleFilter.type = "highshelf"; 
    trebleFilter.frequency.value = 2000;

    //connecting the filter nodes to the audio source and send it to the destination (window)
    source.connect(bassFilter);
    bassFilter.connect(trebleFilter); 
    trebleFilter.connect(context.destination);
}
  
function nextTrack(){
    
    audioContainer1.loop = false;
    pauseAudios();
    audioContainer1 = document.getElementById("audioContainer10");
    context.close();
    startAudios();
    
}

//linked to a pause button, simply pauses the audio
function pauseAudios(){
    audioContainer1.pause();
}

//function handles the fade in and out of the tracks. 
function musicFade(sValue){
    
}

//volume controls 
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
