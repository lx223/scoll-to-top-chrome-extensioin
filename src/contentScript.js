(function(window){
  'use strict';

<<<<<<< HEAD
  var THRESHOLD = 100;
=======
  var didScroll = false;
>>>>>>> master

  if (window.scrollY > THRESHOLD) {
    chrome.runtime.sendMessage(null, "activate");
  } else {
    chrome.runtime.sendMessage(null, "deactivate");
  }

  window.onscroll = function(){
    if (window.scrollY > THRESHOLD) {
      chrome.runtime.sendMessage(null, "activate");
    } else {
      chrome.runtime.sendMessage(null, "deactivate");
    }
  };
})(window);
