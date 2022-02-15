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