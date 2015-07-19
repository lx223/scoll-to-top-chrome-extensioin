(function(){
  'use strict';

  chrome.webNavigation.onCompleted.addListener(function(details){
    console.log("on completed event fired...");
    chrome.browserAction.setIcon({
                                  "path" : "img/icon38_active.png",
                                  "tabId" : details.tabId
                                });
    chrome.browserAction.enable(details.tabId);
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function(lastError){
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        chrome.tabs.executeScript(null, {file: "contentScript.js"});
      }
    });
  });
})();
