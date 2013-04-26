// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require d3
//= require paloma

function resizeInfoModal(id) {
    var winHeight = $(window).height();
    if (winHeight < 500) {
        console.log("winHeight is smaller");
        var height = $(window).height() * 0.4;
        console.log(height);
        $('#modal-body'+id).css({height: height + "px"});
        console.log($('.modal-body'));
    }
    else {
        $('.modal-body').css({height: "500px"});
    }
}

//for map modals
function resizeInfoModalMap(id) {
    var winHeight = $(window).height();
    if (winHeight < 500) {
        console.log("winHeight is smaller");
        var height = $(window).height() * 0.4;
        console.log(height);
        $('#'+id).css({height: height + "px"});
        console.log($('.modal-body'));
    }
    else {
        $('.modal-body').css({height: "500px"});
        $('.modal-body').css({color: "white"});
    }
}
