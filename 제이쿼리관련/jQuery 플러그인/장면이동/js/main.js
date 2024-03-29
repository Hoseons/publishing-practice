$(function () {

    imagesProgress();
    initNav();
    initScene1();
    initScene2();
    initScene3();

    // 진행률 표시 함수를 호출
    function imagesProgress () {

        var $container    = $('#progress'),                    // 1
            $progressBar  = $container.find('.progress-bar'),  // 2
            $progressText = $container.find('.progress-text'), // 3
            // 1. 진행률 표시 전체 컨테이너
            // 2. 진행률 표시 막대 부분
            // 3. 진행률 표시 텍스트 부분

            // imagesLoaded 라이브러리에서 body 요소의 이미지 로딩을 모니터링
            // 동시에 body 전체 이미지 수를 저장
            imgLoad       = imagesLoaded('body'),
            imgTotal      = imgLoad.images.length,

            // 읽을 완료 한 이미지의 숫자 카운터와
            // 진행률 표시의 현재 위치에 해당하는 수치 (모두 처음에는 0)
            imgLoaded     = 0,
            current       = 0,

            // 1 초에 60 번씩 읽어 여부 확인
            progressTimer = setInterval(updateProgress, 1000 / 60);

        // imagesLoaded을 이용하여 이미지를로드 할 때마다 카운터를 가산
        imgLoad.on('progress', function () {
            imgLoaded++;
        });

        // 이미지로드 상황을 바탕으로 진행 표시를 업데이트
        // 이 함수는 setInterval () 메소드에 의해 1 초에 60 번 불려
        function updateProgress () {

            // 읽을 완료 한 이미지의 비율
            var target = (imgLoaded / imgTotal) * 100;

            // current (현재 위치)와 target (목적지)의 거리를 바탕으로 여유를 건다
            current += (target - current) * 0.1;

            // 표시 바의 폭과 텍스트에 current 값을 반영
            // 텍스트는 소수점 이하를 버리고 정수로
            $progressBar.css({ width: current + '%' });
            $progressText.text(Math.floor(current) + '%');

            // 종료
            if(current >= 100){
                // 진행률 표시의 업데이트를 중지
                clearInterval(progressTimer);
                // CSS 스타일을 바꾸기 위하여 클래스를 추가
                $container.addClass('progress-complete');
                // 진행률 막대와 텍스트를 동시에 애니메이션시키기 위해
                // 그룹화하고 하나의 jQuery 객체에
                $progressBar.add($progressText)
                    // 0.5 초 대기
                    .delay(500)
                    // 0.25 초에 걸쳐 진행률 막대와 텍스트를 투명하게
                    .animate({ opacity: 0 }, 250, function () {
                        // 1 초에 걸쳐 오버레이를 위쪽으로 슬라이드 아웃
                        $container.animate({ top: '-100%' }, 1000, 'easeInOutQuint');
                    });
            }

            // current가 99.9보다 크면 100으로 간주하여 종료
            if (current > 99.9) {
                current = 100;
            }
        }
    }

    // Scene 1 : 이미지 시퀀스 애니메이션
    function initScene1 () {

        var
            // 이미지의 컨테이너와 그 안에있는 모든 이미지의 jQuery 객체
            $container       = $('#scene-1 .image-sequence'),
            $images          = $container.find('img'),

            // 이미지의 수와 현재 표시되는 이미지의 인덱스
            frameLength      = $images.length,
            currentFrame     = 0,

            // 애니메이션 작업에서 사용하는 수치
            counter          = 0, // 애니메이션의 진행 상황 카운터
            velocity         = 0, // 애니메이션의 속도

            // 애니메이션 타이머 (처음에는 빈)
            timer            = null,

            // 화면비율(width / height)
            imageAspectRatio = 864 / 486;

        // 컨테이너에서 마우스 휠 이벤트가 발생하면 작업 실행
        $container.on('mousewheel', function (event, delta) {
            // 마우스 휠의 방향에 따라 속도에 가산 또는 감산
            if (delta < 0) {
                velocity += 1.5;
            } else if (delta > 0) {
                velocity -= 1.5;
            }
            // 애니메이션을 시작하는 함수를 호출
            startAnimation();
        });

        // 애니메이션을 시작하는 함수
        function startAnimation () {
            // 이미 실행중인 애니메이션이 없으면 애니메이션을 실행
            if (!timer) {
                // 1/60 초마다 업데이트
                timer = setInterval(animateSequence, 1000 / 30);
            }
        }

        // 애니메이션을 종료하는 함수
        function stopAnimation () {
            clearInterval(timer);
            timer = null;
        }

        // 애니메이션의 함수
        function animateSequence () {

            // 새로 표시되는 이미지의 인덱스
            var nextFrame;

            // 속도에 마찰 계수를 걸어 호출 될 때마다 조금씩 줄여가는
            velocity *= 0.9;

            // 속도를 선택합니다. 0 ± 0.00001의 범위이면 0으로 간주 정지
            if (-0.00001 < velocity && velocity < 0.00001) {
                stopAnimation();
            } else {
                // 그 이외라면 카운터에 속도를 더할 때,
                // 카운터의 숫자를 이미지 수의 범위 내에서 제한
                counter = (counter + velocity) % frameLength;
            }

            // 카운터의 수치를 정수 화 해당 프레임을 표시
            nextFrame = Math.floor(counter);
            if (currentFrame !== nextFrame) {
                $images.eq(nextFrame).show();
                $images.eq(currentFrame).hide();
                currentFrame = nextFrame;
            }
        }

        // 컨테이너 종횡비를 유지하면서 표시 영역 가득 배치
        // 윈도우가 리사이즈 될 때마다 재조정된다
        $(window).on('resize', function () {

            // 윈도우의 폭과 높이를 취득
            var $window = $(this),
                windowWidth = $window.width(),
                windowHeight = $window.height();

            // 사진과 창의 가로 세로 비율을 비교하고
            // 컨테이너의 크기와 위치를 조정
            if (imageAspectRatio > windowWidth / windowHeight) {
                $container.css({
                    width: windowHeight * imageAspectRatio,
                    height: '100%',
                    top: 0,
                    left: (windowWidth - windowHeight * imageAspectRatio) / 2
                });
            } else {
                $container.css({
                    width: '100%',
                    height: windowWidth / imageAspectRatio,
                    top: (windowHeight - windowWidth / imageAspectRatio) / 2,
                    left: 0
                });
            }
        });

        // 창 크기 이벤트를 발생시킨 최초의 배치를 조정
        $(window).trigger('resize');
    }

    // Scene 2를 표시
    function initScene2 () {
        $('#scene-2-content').css({ right: '-50%' });
    }

    

    // 네비게이션 초기화
    function initNav () {

        var $pageMain = $("#page-main"),
            $nav = $('#nav'),
            $navItem = $nav.find('li'),
            currentScene = 0;

        updateNav();

        $nav.on('click', 'a', function (event) {
            event.preventDefault();
            var i = $(this).closest($navItem).index();
            if (i === currentScene) {
                return;
            }
            if (i === 1) {
                initScene2();
            }
            currentScene = i;
            $pageMain.
                stop(true).
                animate({ top: - 100 * i + '%' }, 1200, 'easeInOutQuint', function () {
                    if (i === 1) {
                        activateScene2(); // Scene 2 렌더링
                    } else {
                        initScene2();
                    }
                });
            updateNav();
        });

        function updateNav () {
            $navItem.
                removeClass('active').
                eq(currentScene).addClass('active');
        }

    }

});
