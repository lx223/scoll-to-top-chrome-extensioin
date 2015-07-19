(function(window){
  'use strict';

  var didScroll = false,
      INTERVAL = 200,
      THRESHOLD = 100;

  function checkIfTop() {
      didScroll = true;
  }

  setInterval(function() {
      if(didScroll) {
          didScroll = false;
          if (window.scrollY > THRESHOLD) {
            chrome.runtime.sendMessage(null, "activate");
          } else {
            chrome.runtime.sendMessage(null, "deactivate");
          }
      }
  }, INTERVAL);

  window.onscroll = checkIfTop;
})(window);
