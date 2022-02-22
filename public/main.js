//bass slider 
$("#uislider").slider({
    range: "max",
    slide: function (event, ui) {
        console.log("Bass slider: " , ui.value);
        bassFilter.gain.value = ui.value; 

        //take ui.value 0-100 make it the opacity of the yellow element
        $("#yellow-bg").css("opacity", ui.value+'%');      
    }
});

//volume slider
$("#uislider2").slider({
    range: "max",
    slide: function (event, ui) {
        console.log("Volume slider: " , ui.value);

        setVolume(ui.value);

        $("#orange-bg").css("opacity", ui.value+"%");
    }
});

//treble slider 
$("#uislider3").slider({
    range: "max",
    slide: function (event, ui) {
        console.log("Treble slider:" , ui.value);

        trebleFilter.gain.value = ui.value;

        $("#green-bg").css("opacity", ui.value+"%");
    }
});

const ctx = new AudioContext();
let audio;

fetch("./audios/Mendelssohn__Octet Excerpt Violin 1.mp3")
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {audio = decodedAudio})

function playBack(){
    console.log("hey")
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
}

window.addEventListener("mousedown", playBack);