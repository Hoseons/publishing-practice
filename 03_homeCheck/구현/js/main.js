$(document).ready(function(){
    $('header').hover(function(){
        //로고의 이미지가 변해야함
        $('.logo img').attr('src','images/logo_o.png');
    } ,function(){
        //로고의 이미지가 원래로 돌아가야함
        if(TOP==0){
           $('.logo img').attr('src','images/logo.png');
        }
    });
    
    
    /*서브메뉴*/
    $('nav ul li').hover(function(){
        $('header').addClass('on');
        $('.inner').stop().slideDown(300);
    }, function(){
        $('header').removeClass('on');
        $('.inner').stop().slideUp(100);
    });
    
    
    /*스크롤 했을 때*/
    var TOP=$(window).scrollTop();
    $(window).scroll(function(){
        TOP=$(window).scrollTop();
        //console.log(TOP);
        if(TOP==0){ //조건이 참, 즉 TOP의 값이 0일때
            $('header').removeClass('bg');
            $('.logo img').attr('src','images/logo.png'); 
        } else {
            $('header').addClass('bg');
            $('.logo img').attr('src','images/logo_o.png');
        }
        
        var serTitleOffset=$('.sec2 .title').offset().top;
        serTitleOffset=Number(serTitleOffset)-700;
        
        /*sec2*/
        if(TOP>serTitleOffset){
           $('.sec2 .title, .sec2 .subTitle, .service').addClass('on');
        }
        
        /*sec3*/
        var serTitleOffset=$('.sec3 .title').offset().top;
        serTitleOffset=Number(serTitleOffset)-700;
        if(TOP>serTitleOffset){
           $('.sec3, .sec3 .title, .sec3 .subTitle, .sec3 .expert').addClass('on');
        }
    });
    
     
    
});