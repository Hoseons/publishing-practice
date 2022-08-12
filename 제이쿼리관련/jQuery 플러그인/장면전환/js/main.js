$(function(){
    $('.slideshow').each(function(){
        var $slides = $(this).find('img'), //모든 슬라이드
            slideCount = $slides.length, // 슬라이드 개수 파악
            currentIndex = 0;            // 현재 슬라이드를 나타내는 인덱스

        // 첫 번째 슬라이드를 페이드인해서 표시
        $slides.eq(currentIndex).fadeIn(); 
        //7500ms마다 showNextSlide 함수를 실행    
        setInterval(showNextSlide, 2000);
        //다음 슬라이드를 표시하는 함수
        function showNextSlide(){
            //다음에 보여 줄 슬라이드의 인덱스
            //(만약 마지막 슬라이드라면 첫번째 슬라이드의 인덱스를 저장)
            var nextIndex = (currentIndex + 1) % slideCount;
            //현재 슬라이드를 페이드아웃
            $slides.eq(currentIndex).fadeOut();
            //다음 슬라이드를 페이드인
            $slides.eq(nextIndex).fadeIn();
            //현재 표시된 슬라이드의 인덱스를 저장
            currentIndex = nextIndex;
        }    
    })
})