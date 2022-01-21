$("#uislider").slider({
    range: "max",
    slide: function (event, ui) {
        console.log("desktop" , event);
   
        //take ui.value 0-100 make it the opacity of the yellow element
        $("#yellow-bg").css("opacity", ui.value+'%');      
    }
});

$("#uislider2").slider({
    range: "max",
    slide: function (event, ui) {
        $("#orange-bg").css("opacity", ui.value+"%");
    }
});