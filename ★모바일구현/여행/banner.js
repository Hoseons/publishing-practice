var banUl=document.querySelector(".ban_ul");
var banCon=document.getElementsByClassName("ban_con");
var currentIndex=0;
var banConLen=banCon.length;
function slide(index){
    
    banCon[index].classList.add('on');
    currentIndex=index;
}
function AutoSlide(){
    setInterval(function(){
        banCon[currentIndex].classList.remove('on');
        var CountIndex=(currentIndex+1)%banConLen;
        slide(CountIndex);
        
    },4000);
}
slide(0);
AutoSlide();
