const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

// 設定畫布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 泡泡參數
const bubbles = [];
const bubbleCount = 100; // 泡泡數量
const colors = ["#FFB6C1", "#87CEFA", "#FFD700", "#98FB98", "#FF69B4"];
let mouse = { x: null, y: null };

// 建立泡泡
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 20 + 10; // 泡泡大小
    this.originalRadius = this.radius; // 記錄原始大小
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 2; // 水平速度
    this.speedY = (Math.random() - 0.5) * 2; // 垂直速度
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 碰到邊界反彈
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.speedX *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.speedY *= -1;
    }

    // 滑鼠互動：當滑鼠靠近泡泡時放大
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      this.radius = Math.min(this.originalRadius * 1.5, 50); // 放大但限制最大值
    } else {
      this.radius = this.originalRadius; // 恢復原始大小
    }
  }
}

// 初始化泡泡
for (let i = 0; i < bubbleCount; i++) {
  bubbles.push(new Bubble());
}

// 動畫循環
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach((bubble) => {
    bubble.update();
    bubble.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// 滑鼠移動事件
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// 畫布大小自適應
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const codeModal = document.getElementById("codeModal");
const closeCodeModal = document.getElementById("closeCodeModal");
const dropdown = document.querySelector(".dropdown");
const submenu = document.querySelector(".submenu");
const firstWeekLink = document.querySelector(".submenu li:first-child a");
const secondWeekLink = document.querySelector(".submenu li:nth-child(2) a");
const thirdWeekLink = document.querySelector(".submenu li:nth-child(3) a");
const fourthWeekLink = document.querySelector(".submenu li:nth-child(4) a"); // 選取第四週的連結
const quizLink = document.querySelector(".menu ul li:nth-child(3) a"); // 測驗卷的連結
const tutorialLink = document.getElementById("tutorialLink"); // 教學影片按鈕
const modalIframe = document.getElementById("modalIframe");
const videoModal = document.getElementById("videoModal");
const closeVideoModal = document.getElementById("closeVideoModal");
const tutorialVideo = document.getElementById("tutorialVideo");

// 當滑鼠移到作品集時顯示子選單
dropdown.addEventListener("mouseenter", () => {
  submenu.style.display = "block"; // 顯示子選單
});

// 當滑鼠移出作品集時隱藏子選單
dropdown.addEventListener("mouseleave", () => {
  submenu.style.display = "none"; // 隱藏子選單
});

// 當點擊第一週時顯示模態視窗並載入指定網址
firstWeekLink.addEventListener("click", (event) => {
  event.preventDefault(); // 防止預設行為
  modalIframe.src = "https://yanwang010.github.io/12345678/"; // 設定 iframe 的來源
  codeModal.style.display = "flex"; // 顯示模態視窗
});

// 當點擊第二週時顯示模態視窗並載入指定網址
secondWeekLink.addEventListener("click", (event) => {
  event.preventDefault(); // 防止預設行為
  modalIframe.src = "https://yanwang010.github.io/1234567/"; // 設定 iframe 的來源
  codeModal.style.display = "flex"; // 顯示模態視窗
});

// 當點擊第三週時顯示模態視窗並載入指定網址
thirdWeekLink.addEventListener("click", (event) => {
  event.preventDefault(); // 防止預設行為
  modalIframe.src = "https://yanwang010.github.io/20250328/"; // 設定 iframe 的來源
  codeModal.style.display = "flex"; // 顯示模態視窗
});

// 當點擊第四週時顯示模態視窗並載入指定網址
fourthWeekLink.addEventListener("click", (event) => {
  event.preventDefault(); // 防止預設行為
  modalIframe.src = "https://hackmd.io/@lH4QItoUSZSYMfJXr0nzCA/r1uS3duJeg"; // 設定 iframe 的來源
  codeModal.style.display = "flex"; // 顯示模態視窗
});

// 當點擊測驗卷時顯示模態視窗並載入指定網址
quizLink.addEventListener("click", (event) => {
  event.preventDefault(); // 防止預設行為
  modalIframe.src = "https://yanwang010.github.io/12345/"; // 設定 iframe 的來源
  codeModal.style.display = "flex"; // 顯示模態視窗
});

// 當點擊教學影片時顯示模態視窗並播放影片
tutorialLink.addEventListener("click", (event) => {
  event.preventDefault(); // 防止預設行為
  videoModal.style.display = "flex"; // 顯示模態視窗
  tutorialVideo.play(); // 播放影片
});

// 當點擊關閉按鈕時隱藏模態視窗並暫停影片
closeVideoModal.addEventListener("click", () => {
  videoModal.style.display = "none";
  tutorialVideo.pause(); // 暫停影片
  tutorialVideo.currentTime = 0; // 重置影片時間
});

// 當點擊關閉按鈕時隱藏模態視窗
closeCodeModal.addEventListener("click", () => {
  codeModal.style.display = "none";
  modalIframe.src = ""; // 清空 iframe 的來源
});

const aboutButton = document.getElementById("aboutButton"); // 自我介紹按鈕
const aboutModal = document.getElementById("aboutModal");
const closeAboutModal = document.getElementById("closeAboutModal");

// 當點擊自我介紹時顯示模態視窗
aboutButton.addEventListener("click", (event) => {
  event.preventDefault(); // 防止預設行為
  aboutModal.style.display = "flex"; // 顯示模態視窗
});

// 當點擊關閉按鈕時隱藏模態視窗
closeAboutModal.addEventListener("click", () => {
  aboutModal.style.display = "none";
});