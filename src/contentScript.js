(function(window){
  'use strict';

  var didScroll = false,
      INTERVAL = 200,
      THRESHOLD = 100;

  window.onscroll = function(){
    if (window.scrollY > THRESHOLD) {
      chrome.runtime.sendMessage(null, "activate");
    } else {
      chrome.runtime.sendMessage(null, "deactivate");
    }
  };
})(window);
