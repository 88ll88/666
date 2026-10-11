// right.js - 右側選單 (42px × 425px 方框黑底，內含 6 顆 #6c6c6c 30×65 膠囊，當頁高亮白膠囊)
document.addEventListener("DOMContentLoaded", function () {
  // 1. 建立右側邊欄主體
  const sidebar = document.createElement("div");
  sidebar.id = "right-sidebar-container";

  Object.assign(sidebar.style, {
    position: "fixed",
    right: "0px",
    top: "0px",
    width: "42px",
    height: "425px",
    backgroundColor: "#000000",
    color: "#ffffff",
    zIndex: "99999",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0", // 上下各 5px 空白，對應 7 個 5px 縫隙
    boxSizing: "border-box",
    userSelect: "none"
  });

  // 2. 6 個選單對應的檔名與文字
  const rightCapsules = [
    { text: "分佈", url: "分佈.html" },
    { text: "尾數", url: "尾數.html" },
    { text: "三分", url: "三分.html" },
    { text: "遺漏", url: "遺漏.html" },
    { text: "拖牌", url: "拖牌.html" },
    { text: "統計", url: "統計.html" }
  ];

  // 3. 自動辨識當前網址檔名
  const currentPath = decodeURIComponent(window.location.pathname);
  let currentFile = currentPath.split("/").pop();

  if (!currentFile || currentFile === "" || currentFile === "index.html") {
    currentFile = "遺漏.html"; // 預設頁面
  }

  // 4. 渲染 6 顆右側膠囊按鈕
  rightCapsules.forEach(function (item) {
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.text;

    Object.assign(a.style, {
      width: "30px",
      height: "65px",
      backgroundColor: "#6c6c6c", // 預設深灰膠囊
      color: "#ffffff",
      fontSize: "12px",
      fontWeight: "bold",
      textAlign: "center",
      writingMode: "vertical-lr",
      letterSpacing: "1px",
      cursor: "pointer",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      boxSizing: "border-box",
      transition: "background-color 0.15s, color 0.15s"
    });

    // 當前開啟的頁面：切換為高亮白膠囊 (白底黑字)
    if (currentFile === item.url || window.location.href.includes(encodeURIComponent(item.url))) {
      a.style.backgroundColor = "#ffffff";
      a.style.color = "#000000";
    }

    sidebar.appendChild(a);
  });

  // 自動掛載至 HTML 中的 #rightSidebar 或 document.body
  const target = document.getElementById("rightSidebar") || document.body;
  target.appendChild(sidebar);
});
