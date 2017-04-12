console.log('Built by Granite.');

$(document).ready(function() {


    $('.landing.slider').slick({
        arrows: false
    });

    // adapt the coloration of the navbar while scroll
    $(window).scroll(function() {
        var scroll = getCurrentScroll();
        if (scroll > 0) {
            $('nav').addClass('colored');
        } else {
            $('nav').removeClass('colored');
        }
    });

    function getCurrentScroll() {
        return window.pageYOffset;
    }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ0J1aWx0IGJ5IEdyYW5pdGUuJyk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcblxyXG4gICAgJCgnLmxhbmRpbmcuc2xpZGVyJykuc2xpY2soe1xyXG4gICAgICAgIGFycm93czogZmFsc2VcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGFkYXB0IHRoZSBjb2xvcmF0aW9uIG9mIHRoZSBuYXZiYXIgd2hpbGUgc2Nyb2xsXHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSBnZXRDdXJyZW50U2Nyb2xsKCk7XHJcbiAgICAgICAgaWYgKHNjcm9sbCA+IDApIHtcclxuICAgICAgICAgICAgJCgnbmF2JykuYWRkQ2xhc3MoJ2NvbG9yZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCduYXYnKS5yZW1vdmVDbGFzcygnY29sb3JlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRTY3JvbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIH1cclxuXHJcbn0pOyJdLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
