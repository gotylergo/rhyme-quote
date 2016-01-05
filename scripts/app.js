$(function() {
    var bgArray = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg", "bg11.jpg", "bg12.jpg", "bg13.jpg"];
    var bg = bgArray[Math.floor(Math.random() * bgArray.length)];
    var path = 'images/';
    $("body").css("background-image","url('"+path+bg+"')"); 
});