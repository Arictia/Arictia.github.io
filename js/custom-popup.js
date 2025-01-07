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

    // ---------------------------------
    // 拖动功能
    // ---------------------------------
    let isDragging = false; // 是否正在拖动
    let startX, startY, initialX, initialY; // 鼠标和窗口初始位置

    // 按下鼠标事件（鼠标事件）
    popupHeader.addEventListener('mousedown', (e) => {
        isDragging = true;

        // 获取初始鼠标位置
        startX = e.clientX;
        startY = e.clientY;

        // 获取弹窗初始位置
        const rect = popupWindow.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        // 停止使用 transform 居中，切换到像素定位
        popupWindow.style.transform = 'none';
        popupWindow.style.left = `${initialX}px`;
        popupWindow.style.top = `${initialY}px`;

        document.body.style.cursor = 'move'; // 鼠标样式改为拖动
    });

    // 鼠标移动事件（鼠标事件）
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX; // 鼠标水平偏移量
            const dy = e.clientY - startY; // 鼠标垂直偏移量

            // 更新弹窗位置
            popupWindow.style.left = `${initialX + dx}px`;
            popupWindow.style.top = `${initialY + dy}px`;
        }
    });

    // 鼠标释放事件（鼠标事件）
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false; // 结束拖动
            document.body.style.cursor = 'default'; // 恢复鼠标样式
        }
    });

    // ---------------------------------
    // 适配触摸屏（移动端）
    // ---------------------------------

    // 按下触摸事件
    popupHeader.addEventListener('touchstart', (e) => {
        isDragging = true;

        // 获取初始触摸位置
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        // 获取弹窗初始位置
        const rect = popupWindow.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        // 停止使用 transform 居中，切换到像素定位
        popupWindow.style.transform = 'none';
        popupWindow.style.left = `${initialX}px`;
        popupWindow.style.top = `${initialY}px`;

        document.body.style.cursor = 'move'; // 鼠标样式改为拖动
    });

    // 触摸移动事件
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const dx = e.touches[0].clientX - startX; // 触摸点水平偏移量
            const dy = e.touches[0].clientY - startY; // 触摸点垂直偏移量

            // 更新弹窗位置
            popupWindow.style.left = `${initialX + dx}px`;
            popupWindow.style.top = `${initialY + dy}px`;
        }
    });

    // 触摸释放事件
    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false; // 结束拖动
            document.body.style.cursor = 'default'; // 恢复鼠标样式
        }
    });
});
