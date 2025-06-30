const track = document.querySelector(".track"); // 트랙 요소 선택 track은 img를 감싸고 있는 div
const slides = track.children; // 이미지 슬라이드 목록 div의 자식요소임으로 img
let index = 1; // 현재 슬라이드 인덱스 (1부터 시작)
const width = track.children[0].offsetWidth; // 슬라이드 너비 자동계산
// ADDED: 인디케이터 생성 및 클릭 이벤트 등록
const indicatorContainer = document.querySelector(".indicators"); //컴테이너를 감싸고 있는 div
const actualSlideCount = slides.length - 2; // 실제 슬라이드 수 (복제 제외)
for (let i = 0; i < actualSlideCount; i++) {
  const indicator = document.createElement("span");
  indicator.dataset.slide = i + 1; // 실제 슬라이드 인덱스 (1부터 시작)
  indicatorContainer.appendChild(indicator);
  // 인디케이터 클릭 시 해당 슬라이드로 이동
  indicator.addEventListener("click", () => {
    moveTo(parseInt(indicator.dataset.slide));
  });
}

// ADDED: 인디케이터 활성화 업데이트 함수
function updateIndicators() {
  const dots = indicatorContainer.querySelectorAll("span");
  let activeIndex;
  if (index === 0) {
    activeIndex = actualSlideCount - 1;
  } else if (index === slides.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex = index - 1;
  }
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIndex);
  });
}

// 슬라이드 이동 함수
function moveTo(i, isInstant = false) {
  track.style.transition = isInstant ? "none" : "transform 0.4s ease";
  track.style.transform = `translateX(-${width * i}px)`;
  index = i;
}

function moveTo(i, isInstant = false) {
  track.style.transition = isInstant ? "none" : "transform 0.4s ease";
  track.style.transform = `translateX(-${width * i}px)`;
  index = i;
  updateIndicators(); // MODIFIED: 인디케이터 업데이트 추가
}

// 오른쪽 버튼 클릭 시 다음 슬라이드
document.querySelector(".next").onclick = () => {
  if (index >= slides.length - 1) return;
  moveTo(index + 1);
};

// 왼쪽 버튼 클릭 시 이전 슬라이드
document.querySelector(".prev").onclick = () => {
  if (index <= 0) return;
  moveTo(index - 1);
};

// 슬라이드 전환이 끝났을 때 무한 루프 처리
track.addEventListener("transitionend", () => {
  if (index === slides.length - 1) {
    moveTo(1, true);
  }
  if (index === 0) {
    moveTo(slides.length - 2, true);
  }
});

// ADDED: 자동 슬라이드 (3초마다 다음 슬라이드로 이동)
let autoSlide = setInterval(() => {
  if (index < slides.length - 1) {
    moveTo(index + 1);
  }
}, 3000);

// 기존 자동 슬라이드 변수

// 슬라이드 이동 함수 (자동 재생용)
function nextSlide() {
  if (index < slides.length - 1) {
    moveTo(index + 1);
  }
}

// 이미지 위에 마우스를 올리면 자동 슬라이드 정지
track.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

// 마우스를 떼면 다시 자동 슬라이드 시작
track.addEventListener("mouseleave", () => {
  autoSlide = setInterval(nextSlide, 3000);
});

// ADDED: 페이지 로드 시 초기 슬라이드 위치와 인디케이터 설정
window.onload = () => {
  moveTo(1, true);
};
