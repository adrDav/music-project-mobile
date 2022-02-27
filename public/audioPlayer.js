
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
window.addEventListener("submit", (event)=> {
    window.AudioContext ? new AudioContext() : webkitAudioContext();
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
    var audioSource4 = ctx3.createMediaElementSource(audio3);
    var audioSource5 = ctx4.createMediaElementSource(audio4);
    var audioSource6 = ctx5.createMediaElementSource(audio5);
    var audioSource7 = ctx6.createMediaElementSource(audio6);
    var audioSource8 = ctx7.createMediaElementSource(audio7);
    var audioSource9 = ctx8.createMediaElementSource(audio8);
    var audioSource10 = ctx9.createMediaElementSource(audio9);

    // lowshelf nodes

    bassFilter = ctx.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 200; 

    bassFilter1 = ctx1.createBiquadFilter();
    bassFilter1.type = "lowshelf";
    bassFilter1.frequency.value = 200; 

    bassFilter2 = ctx2.createBiquadFilter();
    bassFilter2.type = "lowshelf";
    bassFilter2.frequency.value = 200;

    bassFilter3 = ctx3.createBiquadFilter();
    bassFilter3.type = "lowshelf";
    bassFilter3.frequency.value = 200; 

    bassFilter4 = ctx4.createBiquadFilter();
    bassFilter4.type = "lowshelf";
    bassFilter4.frequency.value = 200;

    // highself nodes

    trebleFilter = ctx.createBiquadFilter();
    trebleFilter.type = "highshelf"; 
    trebleFilter.frequency.value = 2000;

    trebleFilter1 = ctx1.createBiquadFilter();
    trebleFilter1.type = "highshelf"; 
    trebleFilter1.frequency.value = 2000;

    trebleFilter2 = ctx2.createBiquadFilter();
    trebleFilter2.type = "highshelf"; 
    trebleFilter2.frequency.value = 2000;

    trebleFilter3 = ctx3.createBiquadFilter();
    trebleFilter3.type = "highshelf"; 
    trebleFilter3.frequency.value = 2000;

    trebleFilter4 = ctx4.createBiquadFilter();
    trebleFilter4.type = "highshelf"; 
    trebleFilter4.frequency.value = 2000;

    //connected nodes
    audioSource1.connect(bassFilter);
    bassFilter.connect(trebleFilter); 
    trebleFilter.connect(ctx.destination);

    audioSource2.connect(bassFilter1);
    bassFilter1.connect(trebleFilter1); 
    trebleFilter1.connect(ctx1.destination);

    audioSource3.connect(bassFilter2);
    bassFilter2.connect(trebleFilter2); 
    trebleFilter2.connect(ctx2.destination);

    audioSource4.connect(bassFilter3);
    bassFilter3.connect(trebleFilter3); 
    trebleFilter3.connect(ctx3.destination);

    audioSource5.connect(bassFilter4);
    bassFilter4.connect(trebleFilter4); 
    trebleFilter4.connect(ctx4.destination);
})
//play and loop all audios

function playAudio(){
    audio.volume = 0.3;
    audio1.volume = 0.3;
    audio2.volume = 0.3;
    audio3.volume = 0.3;
    audio4.volume = 0.3;

    audio.loop = true;
    audio1.loop = true;
    audio2.loop = true;
    audio3.loop = true;
    audio4.loop = true;

    audio.play();
    audio1.play();
    audio2.play();
    audio3.play();
    audio4.play();
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
function testMusic(){
    const zone_one = new zoneOne();
    const zone_two = new zoneTwo();
    const zone_three = new zoneThree();
    const zone_four = new zoneFour();
    const zone_five = new zoneFive();


    var verZoneOne = [
        [zone_one.get_first_lat, zone_one.get_first_lng],
        [zone_one.get_second_lat, zone_one.get_second_lng],
        [zone_one.get_third_lat, zone_one.get_third_lng],
        [zone_one.get_fourth_lat, zone_one.get_fourth_lng]
    ];
    
    var verZoneTwo = [
        [zone_two.get_first_lat, zone_two.get_first_lng],
        [zone_two.get_second_lat, zone_two.get_second_lng],
        [zone_two.get_second_lng, zone_two.get_third_lng]
    ];
    
    var verZoneThree = [
        [zone_three.get_first_lat, zone_three.get_first_lng],
        [zone_three.get_second_lat, zone_three.get_second_lng],
        [zone_three.get_third_lat, zone_three.get_third_lng]
    ];
    
    var verZoneFour = [
        [zone_four.get_first_lat, zone_four.get_first_lng],
        [zone_four.get_second_lat, zone_four.get_second_lng],
        [zone_four.get_third_lat, zone_four.get_third_lng],
        [zone_four.get_fourth_lat, zone_four.get_fourth_lng]
    ];

    var verZoneFive = [
        [zone_five.get_first_lat, zone_five.get_first_lng],
        [zone_five.get_second_lat, zone_five.get_second_lng],
        [zone_five.get_third_lat, zone_five.get_third_lng],
        [zone_five.get_fourth_lat, zone_five.get_fourth_lng]
    ];
    
    updated = getLocation();

    lat = updated.latitude;
    lng = updated.longitude;

    console.log(lat);
    console.log(lng);

    if(inside([lat, lng],verZoneOne)){
        console.log("In location");
        audio.volume = 1;
    } 
    else{
        console.log("Not in location");
        //audio.volume = 0; 
    }
    if(inside([lat, lng],verZoneTwo)){
        console.log("In location");
        audio1.volume = 1;
    } 
    else{
        console.log("Not in location");
        //audio1.volume = 0; 
    }
    if(inside([lat, lng],verZoneThree)){
        console.log("In location");
        audio2.volume = 1;
    } 
    else{
        console.log("Not in location");
        //audio2.volume = 0; 
    }
    if(inside([lat, lng],verZoneFour)){
        console.log("In location");
        audio3.volume = 1;
    } 
    else{
        console.log("Not in location");
        //audio3.volume = 0; 
    }
    if(inside([lat, lng],verZoneFive)){
        console.log("In location");
        audio4.volume = 1;
    } 
    else{
        console.log("Not in location");
        //audio4.volume = 0; 
    }
    
}
