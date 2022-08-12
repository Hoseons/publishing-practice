document.body.onload = initSlider;

function initSlider(){
    //변수 지정
    const sliderContainer = document.getElementById('slider');
    const paginationContainer = document.createElement('div');

    //페이지네이션 생성
    paginationContainer.className = 'pagination';
    sliderContainer.prepend(paginationContainer);

    //슬라이드 개수 파악
    const slideCount = document.querySelectorAll('.slide').length;

    for(let i = slideCount; i> 0; i--){
        let radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'slide-radio';
        radioBtn.className = 'slide-radio';
        radioBtn.id = `slide-radio-${i}`;

        if(i === 1) radioBtn.checked = true;

        sliderContainer.prepend(radioBtn);

        //label  생성하기
        let label = document.createElement('label');
        label.setAttribute('for',  `slide-radio-${i}`);
        //label.innerHTML = i;

        paginationContainer.prepend(label);
    }

    //자동 슬라이드
    let autoRun = setInterval(changeSlide, 5000);

    paginationContainer.addEventListener('mouseenter', () => clearTimeout(autoRun));

    paginationContainer.addEventListener('mouseleave', () => autoRun = setInterval(changeSlide, 5000));

}

function changeSlide(){
    // radio 버튼 지정  
    const radioButtons = [...document.querySelectorAll('.slide-radio')];

    const currentIndex = radioButtons.findIndex(rb => rb.checked);

    //라디오 버튼 체크하기
    radioButtons[(currentIndex + 1) % radioButtons.length].checked = true;
}