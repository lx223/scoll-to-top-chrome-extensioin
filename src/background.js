chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "contentScript.js"}, function(){
    console.log("content script executed...");
  });
});
