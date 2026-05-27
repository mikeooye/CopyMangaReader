
// --- 1. 获取当前漫画 ID ---
const getComicId = () => {
  const match = window.location.pathname.match(/\/comic\/([^\/]+)/);
  return match ? match[1] : null;
};

const currentId = getComicId();

// --- 2. 数据初始化（从存储读取历史记录） ---
const savedWidth = localStorage.getItem("customComicWidth");
// 结构: { "id1": "Webtoon", "id2": "纵向阅读" }
let modeHistory = JSON.parse(
  localStorage.getItem("customComicModeHistory") || "{}",
);
// 结构: ["id1", "id2"] 用于维护顺序
let modeQueue = JSON.parse(
  localStorage.getItem("customComicModeQueue") || "[]",
);

let currentWidth = savedWidth ? parseInt(savedWidth) : 640;
// 如果当前漫画有记录则使用，否则默认 Webtoon
let currentMode =
  currentId && modeHistory[currentId] ? modeHistory[currentId] : "Webtoon";

// --- 3. 样式注入 ---
import styles from './styles/base.css?raw'

const styleNode = document.createElement("style");
document.head.appendChild(styleNode);

const updateStyles = () => {
  styleNode.innerHTML = styles;

  document.documentElement.style.setProperty('--comic-width', currentWidth + 'px');

  if (currentMode === 'Webtoon') {
    document.body.classList.remove('mode-scroll');
  } else {
    document.body.classList.add('mode-scroll');
  }
};

// --- 4. 存储逻辑更新 ---
const saveModeData = () => {
  if (!currentId) return;

  // 更新映射表
  modeHistory[currentId] = currentMode;

  // 更新队列（维护最近5个）
  modeQueue = modeQueue.filter((id: string) => id !== currentId); // 移除旧位置
  modeQueue.push(currentId); // 放到最后（最新）

  if (modeQueue.length > 5) {
    const oldId = modeQueue.shift(); // 移除最早的
    delete modeHistory[oldId];
  }

  localStorage.setItem("customComicModeHistory", JSON.stringify(modeHistory));
  localStorage.setItem("customComicModeQueue", JSON.stringify(modeQueue));
};

// --- 5. UI 更新逻辑 ---
const updateHeader = () => {
  const header = document.querySelector(".header");
  if (header) {
    let badge = header.querySelector(".mode-badge") as HTMLElement;
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "mode-badge";
      header.appendChild(badge);
    }
    badge.innerText = `模式: ${currentMode}`;
  }
};

const applyAll = () => {
  updateStyles();
  updateHeader();
  localStorage.setItem("customComicWidth", currentWidth.toString());
  saveModeData();
};

// --- 6. 键盘监听 ---
window.addEventListener(
  "keydown",
  (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? ''))
      return;

    let changed = false;

    if (e.key === "1") {
      currentMode = "Webtoon";
      changed = true;
    } else if (e.key === "2") {
      currentMode = "纵向阅读";
      changed = true;
    }

    if (currentMode === "Webtoon") {
      if (e.key === "=" || e.key === "+") {
        currentWidth += 100;
        changed = true;
      } else if (e.key === "-" || e.key === "_") {
        currentWidth = Math.max(300, currentWidth - 100);
        changed = true;
      } else if (e.key === "0") {
        currentWidth = 640;
        changed = true;
      }
    }

    if (changed) {
      e.preventDefault();
      applyAll();
    }
  },
  true,
);

const init = () => {
  const checkHeader = setInterval(() => {
    if (document.querySelector(".header")) {
      applyAll();
      clearInterval(checkHeader);
    }
  }, 200);
};

init();
