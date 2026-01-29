function activate(tabId) {
  console.log("activating...");
  chrome.action.setIcon({
    path: "img/icon38_active.png",
    tabId: tabId,
  });
  chrome.action.enable(tabId);
}

function deactivate(tabId) {
  console.log("deactivating...");
  if (tabId != null) {
    chrome.action.setIcon({
      path: "img/icon38_inactive.png",
      tabId: tabId,
    });
    chrome.action.disable(tabId);
  } else {
    chrome.action.setIcon({ path: "img/icon38_inactive.png" });
    chrome.action.disable();
  }
}

chrome.runtime.onMessage.addListener(function (message, sender) {
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

chrome.runtime.onInstalled.addListener(function (details) {
  console.log("Installed extension...");
  deactivate(null);

  // Re-inject scripts to cope with extension updates
  chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
      window.tabs.forEach(function (tab) {
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id },
            files: ["contentScript.js"],
          })
          .catch(function () {
            // Ignore permission errors (e.g. chrome:// pages)
          });
      });
    });
  });
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      files: ["jquery.min.js", "actionScript.js"],
    })
    .then(function () { })
    .catch(function (err) {
      console.error(err.message);
    });
});
