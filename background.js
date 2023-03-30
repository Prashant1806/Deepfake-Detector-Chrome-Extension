chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { type: 'CLASSIFY_CONTENT', contentUrl: tab.url });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'DEEP_FAKE_DETECTED') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.browserAction.setBadgeText({ text: '!' });
      chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
      chrome.windows.create({
        url: 'popup.html',
        type: 'popup',
        width: 320,
        height: 150,
        top: Math.round(screen.height / 2) - 75,
        left: Math.round(screen.width / 2) - 160
      });
    });
  }
});
