<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/js/swiper.min.js"></script>

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
//自动调节高度
autoHeight: true,
//键盘左右方向键控制
keyboardControl : true,
//鼠标滑轮控制
mousewheelControl : true,
//自动切换
//autoplay : 5000,
//懒加载
lazyLoading : true,
lazyLoadingInPrevNext : true,
//无限循环
loop : true,
});