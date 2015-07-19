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

  chrome.runtime.onStartup.addListener(function() {
    console.log('Starting browser...');
    chrome.browserAction.disable();
  });

  chrome.runtime.onInstalled.addListener(function(details) {
    console.log('Installed extension...');
    chrome.browserAction.disable();
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function(lastError){
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        chrome.tabs.executeScript(null, {file: "actionScript.js"});
      }
    });
  });
})();
