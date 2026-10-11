// left.js - 左側選單 (42px × 425px 方框黑底，內含 6 顆 #6c6c6c 30×65 膠囊)
(function () {
  let recentColors = []; // 儲存最多 4 個點擊過的色碼

  // 1. 建立左側邊欄主體
  const sidebar = document.createElement('div');
  sidebar.id = 'left-sidebar-container';

  Object.assign(sidebar.style, {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: '42px',
    height: '425px',
    backgroundColor: '#000000',
    color: '#ffffff',
    zIndex: '99999',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0', // 上下各 5px 空白
    boxSizing: 'border-box',
    userSelect: 'none'
  });

  // 6 個工具按鈕定義
  const tools = [
    { name: '色碼庫', action: openColorPalette },
    { name: '設定', action: () => alert('點擊了設定') },
    { name: 'tool3', action: () => {} },
    { name: 'tool4', action: () => {} },
    { name: 'tool5', action: () => {} },
    { name: 'tool6', action: () => {} }
  ];

  tools.forEach((t) => {
    const btn = document.createElement('div');
    btn.innerText = t.name;
    Object.assign(btn.style, {
      width: '30px',
      height: '65px',
      backgroundColor: '#6c6c6c',
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
      writingMode: 'vertical-lr',
      letterSpacing: '1px',
      cursor: 'pointer',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      transition: 'background-color 0.15s, color 0.15s'
    });

    btn.onmousedown = () => (btn.style.backgroundColor = '#444444');
    btn.onmouseup = () => (btn.style.backgroundColor = '#6c6c6c');

    btn.onclick = (e) => {
      e.stopPropagation();
      t.action();
    };
    sidebar.appendChild(btn);
  });

  function mount() {
    const target = document.getElementById('leftSidebar') || document.body;
    target.appendChild(sidebar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  // ==========================================
  // 2. 「色碼庫」彈窗邏輯
  // ==========================================
  function openColorPalette() {
    closeModal(); // 開啟時清空舊彈窗

    const mask = document.createElement('div');
    mask.id = 'color-modal-mask';
    Object.assign(mask.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.25)',
      zIndex: '100000'
    });

    const modal = document.createElement('div');
    modal.id = 'color-modal-body';
    Object.assign(modal.style, {
      position: 'fixed',
      left: '47px', // 緊貼 42px 邊欄旁
      top: '5px',
      width: '400px',
      maxWidth: 'calc(100vw - 55px)',
      maxHeight: 'calc(100vh - 20px)',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
      
      boxSizing: 'border-box'
    });

    const header = document.createElement('div');
    Object.assign(header.style, {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 14px',
      
      backgroundColor: '#fff'
    });

    const title = document.createElement('div');
    title.innerText = '色碼庫 (400×300)';
    Object.assign(title.style, {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#111'
    });

    const closeBtn = document.createElement('div');
    closeBtn.innerText = '✕';
    Object.assign(closeBtn.style, {
      cursor: 'pointer',
      fontSize: '16px',
      color: '#666',
      fontWeight: 'bold'
    });
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeModal();
    };

    header.appendChild(title);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    // 上方 4 個獨立紀錄框區域
    const historyContainer = document.createElement('div');
    Object.assign(historyContainer.style, {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      padding: '10px 14px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e5e5e5'
    });

    function renderHistory() {
      historyContainer.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        const hex = recentColors[i] || null;

        const item = document.createElement('div');
        Object.assign(item.style, {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: hex ? 'pointer' : 'default'
        });

        const colorBox = document.createElement('div');
        Object.assign(colorBox.style, {
          width: '100%',
          height: '24px',
          borderRadius: '3px',
          
          backgroundColor: hex || '#eeeeee',
          boxSizing: 'border-box'
        });

        const textLabel = document.createElement('div');
        textLabel.innerText = hex || '------';
        Object.assign(textLabel.style, {
          fontSize: '11px',
          fontFamily: 'monospace',
          marginTop: '4px',
          color: hex ? '#111111' : '#999999',
          fontWeight: hex ? 'bold' : 'normal'
        });

        if (hex) {
          item.title = '點擊清除此顏色';
          item.onclick = (e) => {
            e.stopPropagation();
            recentColors.splice(i, 1);
            renderHistory();
            navigator.clipboard.writeText(recentColors.join(','));
          };
        }

        item.appendChild(colorBox);
        item.appendChild(textLabel);
        historyContainer.appendChild(item);
      }
    }

    renderHistory();
    modal.appendChild(historyContainer);

    // 下方主色盤 (16 欄)
    const grid = document.createElement('div');
    Object.assign(grid.style, {
      display: 'grid',
      gridTemplateColumns: 'repeat(16, 1fr)',
      gap: '1px',
      padding: '10px',
      backgroundColor: '#fff'
    });

    const colors = generatePaletteColors();
    colors.forEach((hex) => {
      const cell = document.createElement('div');
      cell.className = 'color-cell';
      Object.assign(cell.style, {
        width: '100%',
        aspectRatio: '1',
        backgroundColor: hex,
        cursor: 'pointer',
        boxSizing: 'border-box',
        position: 'relative'
      });

      cell.title = hex;

      cell.onclick = (e) => {
        e.stopPropagation();

        grid.querySelectorAll('.color-cell').forEach((c) => {
          c.style.outline = 'none';
          c.style.boxShadow = 'none';
          c.style.zIndex = '1';
        });

        cell.style.outline = '2px solid #ffffff';
        cell.style.outlineOffset = '-2px';
        cell.style.boxShadow = '0 0 0 2px #000000, 0 0 8px rgba(0,0,0,0.8)';
        cell.style.zIndex = '10';

        if (recentColors.length >= 4) {
          recentColors.shift();
        }
        recentColors.push(hex);
        renderHistory();

        navigator.clipboard.writeText(recentColors.join(','));
      };

      grid.appendChild(cell);
    });

    modal.appendChild(grid);
    mask.appendChild(modal);
    document.body.appendChild(mask);

    function handleOutsideClick(e) {
      if (!modal.contains(e.target)) {
        closeModal();
      }
    }

    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 50);

    mask._outsideListener = handleOutsideClick;
  }

  function closeModal() {
    recentColors = [];

    const mask = document.getElementById('color-modal-mask');
    if (mask) {
      if (mask._outsideListener) {
        window.removeEventListener('click', mask._outsideListener);
      }
      if (mask.parentNode) {
        mask.parentNode.removeChild(mask);
      }
    }
  }

  function generatePaletteColors() {
    const list = [];
    const rows = 12;
    const grays = [
      '#000000','#1a1a1a','#333333','#4d4d4d',
      '#666666','#808080','#999999','#b3b3b3',
      '#cccccc','#e6e6e6','#f2f2f2','#ffffff'
    ];
    const hues = [0, 320, 290, 260, 230, 200, 180, 150, 120, 90, 60, 40, 25, 15, 5];

    for (let r = 0; r < rows; r++) {
      list.push(grays[r]);
      const lightness = 10 + Math.round((r / (rows - 1)) * 82);

      for (let c = 0; c < hues.length; c++) {
        const h = hues[c];
        const s = r === rows - 1 ? 30 : 90;
        list.push(hslToHex(h, s, lightness));
      }
    }
    return list;
  }

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    let a = s * Math.min(l, 1 - l);
    let f = (n) => {
      let k = (n + h / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }
})();
