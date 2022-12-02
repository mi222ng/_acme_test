let header = document.querySelector('header');
let goTop = document.querySelector('.go_top');
let qnaWrapper = document.querySelectorAll('.qna_list');
if(qnaWrapper.length > 0) {
    //about 페이지의 아코디언 
    qnaList = qnaWrapper[0].querySelectorAll('.qna_list li');
    /*qnaList를 클릭하면 할일
        모든 quaList에서 active 제거하고 클릭한 그 요소만 active 추가
    */
    for(ql of qnaList){
        ql.addEventListener('click',e=>{
            console.log(e.currentTarget);
            for(li of qnaList){
                li.classList.remove('active');
            }
            e.currentTarget.classList.add('active');
            });
        }
}
    


window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 0){
         header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    if(window.pageYOffset > 300){
        goTop.classList.add('active');
        } else {
        goTop.classList.remove('active');
        }
    }
);

//go_top 스크롤이 300이상이면 보이고, 이하면 안보이고, 클릭하면 링크의 기본 속성을 제거하고 상단으로 부드럽게 이동

goTop.addEventListener('click',e=>{
    e.preventDefault();
    scrollTo({top:0,left:0, behavior:'smooth'})
});


let slideWrapper = document.querySelector('.slide_wrapper'),
    slideContainer = document.querySelector('.slide_container'),
    slide = slideContainer.querySelectorAll('li'),
    slideCount = slide.length,
    prevBtn = slideWrapper.querySelector('.fa-chevron-left'),
    nextBtn = slideWrapper.querySelector('.fa-chevron-right'),
    currentIndex = 0,
    timer;

//슬라이드 가로 배치
/*
슬라이드 마다 할일
    각 슬라이드의 left 값을 0, 100%, 200%, 300% ... 가 되도록
    slide.forEach((item,idx) => {
        item.style.left=`${idx*100}%`;
    });
*/

//슬라이드 개수에 따라 slideContainer 너비를 늘리겠다

slideContainer.style.width = `${slideWrapper.offsetWidth*slideCount}px`;
for(item of slide){
    item.style.width = `${slideWrapper.offsetWidth}px`;
}
//슬라이드 이동 함수
/*
gotoSlide 함수 생성, 매개변수 idx가 들어오면
    slideContainer left 값을 idx 0 -> 0, idx 1 -> -100% . . .
    idx번호로 currentIndex
    css - slideContainer에 transition 0.4s
*/
function gotoSlide(idx) {
    if(idx > slideCount-1){
        idx = 0;
    } else if(idx < 0){
        idx = slideCount-1;
    }
    slideContainer.style.left = `${idx * -100}%`;
    currentIndex = idx;
};


//다음버튼을 클릭하면 할일
/*
현재 슬라이드 번호에 +1 한 숫자를 gotoSlide에 전달
만약 마지막일때 다음 버튼을 클릭하면 처음으로 이동
*/

nextBtn.addEventListener('click',()=>{
    gotoSlide(++currentIndex);
});
prevBtn.addEventListener('click',()=>{
    gotoSlide(--currentIndex);
});

// 자동슬라이드
/*
4초마다 gotoSlide에 현재번호 +1 
*/

function autoSlide () {timer =setInterval(() => {
    gotoSlide(++currentIndex);
}, 4000);
}
autoSlide();

slideWrapper.addEventListener('mouseover',()=>{
    clearInterval(timer);
})
slideWrapper.addEventListener('mouseleave',()=>{
    autoSlide();
})
