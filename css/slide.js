const track = document.querySelector(".track");
let slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".btn.prev");
const nextBtn = document.querySelector(".btn.next");
const indicatorsContainer = document.querySelector(".indicators");

let currentIndex = 0;
let slideCount = slides.length;
let autoSlide;
let dots = [];
let slidesPerView = getSlidesPerView();

// 1. 복제 슬라이드 생성
function cloneSlides() {
  const total = slides.length;
  for (let i = 0; i < slidesPerView; i++) {
    const first = slides[i].cloneNode(true);
    const last = slides[total - 1 - i].cloneNode(true);
    track.appendChild(first);
    track.insertBefore(last, track.firstChild);
  }

  slides = document.querySelectorAll(".slide");
  currentIndex = slidesPerView; // 시작 위치 설정
}

// 3. 슬라이드 위치 이동
function updateSlidePosition(animate = true) {
  slidesPerView = getSlidesPerView();
  const slideWidth = slides[0].getBoundingClientRect().width;
  const moveX = slideWidth * currentIndex;
  if (animate) {
    track.style.transition = "transform 0.5s ease-in-out";
  } else {
    track.style.transition = "none";
  }
  track.style.transform = `translateX(-${moveX}px)`;

  updateIndicators();
}

// 4. 인디케이터 생성
function createIndicators() {
  indicatorsContainer.innerHTML = "";
  const total = slideCount;
  dots = [];

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    indicatorsContainer.appendChild(dot);
    dots.push(dot);

    dot.addEventListener("click", () => {
      currentIndex = i + slidesPerView;
      updateSlidePosition();
      resetAutoSlide();
    });
  }
}

// 5. 인디케이터 상태
function updateIndicators() {
  const realIndex = (currentIndex - slidesPerView + slideCount) % slideCount;
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[realIndex]) dots[realIndex].classList.add("active");
}

// 6. 다음으로
function moveToNext() {
  currentIndex++;
  updateSlidePosition();

  // 마지막 복제 슬라이드로 넘어가면 원래 슬라이드로 전환
  setTimeout(() => {
    if (currentIndex === slideCount + slidesPerView) {
      currentIndex = slidesPerView;
      updateSlidePosition(false);
    }
  }, 510);
}

// 7. 이전으로
function moveToPrev() {
  currentIndex--;
  updateSlidePosition();

  if (currentIndex < slidesPerView) {
    setTimeout(() => {
      currentIndex = slideCount + slidesPerView - 1;
      updateSlidePosition(false);
    }, 510);
  }
}

// 8. 자동 슬라이드
function startAutoSlide() {
  autoSlide = setInterval(moveToNext, 3000);
}
function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// 버튼 이벤트
nextBtn.addEventListener("click", () => {
  moveToNext();
  resetAutoSlide();
});
prevBtn.addEventListener("click", () => {
  moveToPrev();
  resetAutoSlide();
});

// 윈도우 리사이즈 시 대응
window.addEventListener("resize", () => {
  slidesPerView = getSlidesPerView();
  updateSlidePosition(false);
  createIndicators();
});

// 초기화
window.addEventListener("load", () => {
  slidesPerView = getSlidesPerView();
  slideCount = document.querySelectorAll(".slide").length;
  cloneSlides();
  updateSlidePosition(false);
  createIndicators();
  startAutoSlide();
});
