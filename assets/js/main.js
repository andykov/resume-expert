// import * as navigation from "./modules/navigation.js";
// import * as fullscreen from "./modules/fullscreen.js";
// import * as landspace from "./modules/landspace.js";
// navigation.init();
// fullscreen.init();
// landspace.init();

$(function() {

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

});