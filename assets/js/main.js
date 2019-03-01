// import * as navigation from "./modules/navigation.js";
// import * as fullscreen from "./modules/fullscreen.js";
// import * as landspace from "./modules/landspace.js";
// import * as anim from "./modules/animation.js";
// anim.init();
// fullscreen.init();
// landspace.init();



$(function() {
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

  // accordion faq
  $('.js-faq').on('click', function(e) {
      var $this = $(this);

      if ($('.faq_answer').is(':visible')) {
        $('.faq_answer').slideUp(150);
      }
      
      if ($this.next().is(':visible')) {
          $this.next().slideUp(200);
      } else {
          $this.next().slideDown(200);
      }
      
  });

  // experts slider
  $('.js-experts').slick({
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

});

