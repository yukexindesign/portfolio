
function changeDot() {

    const scrollValue = $(window).scrollTop();
    const heightSec2 = $('.sec2').offset().top;
    const heightSec3 = $('.sec3').offset().top;
    const heightSec4 = $('.sec4').offset().top;
    const heightSec5 = $('.sec5').offset().top;
    const heightSec6 = $('.sec6').offset().top;
    const heightSec7 = $('.sec7').offset().top;
    const heightSec8 = $('.sec8').offset().top;
    const heightSec9 = $('.sec9').offset().top;

    if (scrollValue < heightSec2) {
        $('nav li').not('.dot1').removeClass('active');
        $('.dot1').addClass('active');
    } else if (scrollValue < heightSec3) {
        $('nav li').not('.dot2').removeClass('active');
        $('.dot2').addClass('active');
    } else if (scrollValue < heightSec4) {
        $('nav li').not('.dot3').removeClass('active');
        $('.dot3').addClass('active');
    } else if (scrollValue < heightSec5) {
        $('nav li').not('.dot4').removeClass('active');
        $('.dot4').addClass('active');
    } else if (scrollValue < heightSec6) {
        $('nav li').not('.dot5').removeClass('active');
        $('.dot5').addClass('active');
    } else if (scrollValue < heightSec7) {
        $('nav li').not('.dot6').removeClass('active');
        $('.dot6').addClass('active');
    } else if (scrollValue < heightSec8) {
        $('nav li').not('.dot7').removeClass('active');
        $('.dot7').addClass('active');
    } else if (scrollValue < heightSec9) {
        $('nav li').not('.dot8').removeClass('active');
        $('.dot8').addClass('active');
    } else {
        $('nav li').not('.dot9').removeClass('active');
        $('.dot9').addClass('active');
    }
}

$(window).on("scroll", changeDot)

$('nav li').on('click', function () {
    const goToSection = '.s' + $(this).attr('id');
    if ($(this).attr('id') == "ec1") {
        $('body, html').animate({
            scrollTop: 0
        })
    } else {
        $('body, html').animate({
            scrollTop: $(goToSection).offset().top + 1
        })
    }
})