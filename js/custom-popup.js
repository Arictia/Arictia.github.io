document.addEventListener("DOMContentLoaded", function () {
    const popupBtn = document.getElementById('popup-btn');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.getElementById('popup-content');
    const popupClose = document.getElementById('popup-close');
    const popupWindow = document.getElementById('popup-window');
    const popupHeader = document.getElementById('popup-header'); // 获取标题元素

    // 加载 Markdown 内容
    async function loadMarkdownContent() {
        try {
            const response = await fetch('/static/neko.md');
            const markdown = await response.text();
            popupContent.innerHTML = marked.parse(markdown);
        } catch (err) {
            popupContent.innerHTML = '<p>内容加载失败，请稍后再试。</p>';
            console.error('加载失败:', err);
        }
    }

    // 显示弹窗
    popupBtn.addEventListener('click', function () {
        loadMarkdownContent();
        popupOverlay.style.display = 'block';

        // 确保每次显示弹窗时都重置为居中位置
        popupWindow.style.top = '50%';
        popupWindow.style.left = '50%';
        popupWindow.style.transform = 'translate(-50%, -50%)'; // 保持居中
    });

    // 关闭弹窗
    popupClose.addEventListener('click', function () {
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', function (e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

        // 阻止页面滚动穿透到弹窗外部
        popupContent.addEventListener('touchmove', function (e) {
            e.stopPropagation(); // 阻止事件冒泡
        });
    
        popupOverlay.addEventListener('touchmove', function (e) {
            e.preventDefault(); // 阻止底层页面滚动
        }, { passive: false }); // 禁用 passive 以允许 preventDefault()
    
        // ---------------------------------
        // 拖动功能（适配移动端）
        // ---------------------------------
        let isDragging = false; // 是否正在拖动
        let startX, startY, initialX, initialY; // 鼠标或触摸初始位置
    
        function startDrag(clientX, clientY) {
            isDragging = true;
    
            startX = clientX;
            startY = clientY;
    
            const rect = popupWindow.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
    
            popupWindow.style.transform = 'none';
            popupWindow.style.left = `${initialX}px`;
            popupWindow.style.top = `${initialY}px`;
        }
    
        function doDrag(clientX, clientY) {
            if (isDragging) {
                const dx = clientX - startX;
                const dy = clientY - startY;
    
                popupWindow.style.left = `${initialX + dx}px`;
                popupWindow.style.top = `${initialY + dy}px`;
            }
        }
    
        function stopDrag() {
            isDragging = false;
        }
    
        // 鼠标事件
        popupHeader.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => doDrag(e.clientX, e.clientY));
        document.addEventListener('mouseup', stopDrag);
    
        // 触摸事件
        popupHeader.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY));
        document.addEventListener('touchmove', (e) => doDrag(e.touches[0].clientX, e.touches[0].clientY));
        document.addEventListener('touchend', stopDrag);
    });

