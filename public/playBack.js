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