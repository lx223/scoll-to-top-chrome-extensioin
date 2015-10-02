// Google analytics snippets
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-68403903-1', 'auto');

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
  // Track browser action count via Google analytics
  ga('send', 'event', 'BrowserAction', 'execute', {
    hitCallback: function() {
      console.log('Event hit recorded...');
    }
  });

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
