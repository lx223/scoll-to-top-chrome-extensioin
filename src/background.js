(function(){
  'use strict';

  function activate(tabId) {
    console.log("activating...");
    chrome.browserAction.setIcon({
                                  "path" : "img/icon38_active.png",
                                  "tabId" : tabId
                                });
    chrome.browserAction.enable(tabId);
  }

  function deactivate(tabId) {
    console.log("deactivating...");
    chrome.browserAction.setIcon({
                                  "path" : "img/icon38_inactive.png",
                                  "tabId" : tabId
                                });
    chrome.browserAction.disable(tabId);
  }

  chrome.runtime.onMessage.addListener(function(message, sender){
    switch (message) {
      case "activate":
        activate(sender.tab.id);
        break;
      case "deactivate":
        deactivate(sender.tab.id);
        break;
      default:
    }
  });

  chrome.runtime.onInstalled.addListener(function(details) {
    console.log('Installed extension...');
    deactivate(); // Default to inactive state

    // Re-inject scripts to cope with extension updates
    chrome.windows.getAll({populate:true},function(windows){
      windows.forEach(function(window){
        window.tabs.forEach(function(tab){
          chrome.tabs.executeScript(tab.id, {file: "contentScript.js"}, function(){
            if(chrome.runtime.lastError) return; // Ingore the permission errors
          });
        });
      });
    });
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function(){
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        chrome.tabs.executeScript(null, {file: "actionScript.js"}, function(){
          if(chrome.runtime.lastError) console.error(chrome.runtime.lastError.message);
        });
      }
    });
  });
})();
