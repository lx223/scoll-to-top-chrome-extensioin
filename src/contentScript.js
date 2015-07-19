(function(){
  'use strict';

  var L = "log",
      DURATION = "750",
      EASING = "swing";

  $("html, body").stop().animate({scrollTop:0}, DURATION, EASING);
})();
