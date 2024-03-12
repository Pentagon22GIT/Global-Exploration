$(function () {
    $(window).scroll(function () {
        $(".effect-fade").each(function () {
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight) {
                $(this).addClass("effect-scroll");
            } else {
                $(this).removeClass("effect-scroll");
            };
        });
    });
    jQuery(window).scroll();
});
