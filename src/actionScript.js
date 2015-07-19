(function(){
  'use strict';

  var L = "log",
      DURATION = "500",
      EASING = "swing";

  $("html, body").stop().animate({scrollTop:0}, DURATION, EASING);
})();
