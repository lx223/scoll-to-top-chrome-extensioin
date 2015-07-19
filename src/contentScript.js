(function(window){
  'use strict';

  var didScroll = false;

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
