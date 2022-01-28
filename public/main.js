//audio filter slider 
$("#uislider").slider({
    range: "max",
    slide: function (event, ui) {
        console.log("slider #1" , ui.value);
        bassFilter.gain.value = ui.value; 

        //trebleFilter.gain.value = ui.value;

        //take ui.value 0-100 make it the opacity of the yellow element
        $("#yellow-bg").css("opacity", ui.value+'%');      
    }
});

//volume slider
$("#uislider2").slider({
    range: "max",
    slide: function (event, ui) {
        console.log("slider #2" , ui.value);

        setVolume(ui.value);

        $("#orange-bg").css("opacity", ui.value+"%");
    }
});