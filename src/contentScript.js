(function(window){
  'use strict';

  var THRESHOLD = 100;

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
