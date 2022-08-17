//(function (window, document) {
//    'use strict';
//
//   const weather = document.getElementById("weather");
//   const weatheron =document.querySelector(".weatherBlock");
//   
//    
//    weather.addEventListener('click',function(){
//      toggleElements();
//      
//    });
//    
//    function toggleElements(){
//        weatheron.classList.toggle('on');
//        
//      
//    }
//    })(window,document)


var toggleBtn = document.querySelector(".togBtn");
var menuView = document.querySelector("#leftMenu");
var closeBtn = document.querySelector(".close");
var NullBox = document.querySelector(".menu_box_null");
var MenuToggleBtn = document.getElementsByClassName("MenuCon");
var MenuToggleBtnLen = MenuToggleBtn.length;
var MenuBlock = document.getElementsByClassName("leftMenuSub");

var MenuBlockLen = MenuBlock.length;

var Btn = document.querySelector(".xi-angle-right-min");
var clickCount = 0;

toggleBtn.addEventListener('click', function () {
    menuView.style.left = 0 + "%";


});

closeBtn.addEventListener('click', function () {
    menuView.style.left = -100 + "%";
})
NullBox.addEventListener('click', function () {
    menuView.style.left = -100 + "%";
})
for (var x = 0; x < MenuToggleBtnLen; x++) {
    MenuToggleBtn[x].addEventListener('click', function (event) {
        console.log(event.target.classList);
        event.target.classList.toggle('on');
//        subMenuView();


    });

//    function subMenuView() {
//        MenuBlock.classList.toggle('on');
//        
//
//
//    }
}
