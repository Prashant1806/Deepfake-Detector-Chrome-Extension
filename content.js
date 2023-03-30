// Define the API endpoint and your API keys
const apiUrl = 'https://api.sightengine.com/1.0/check.json';
const apiUser = '934352663';
const apiSecret = 'V4phpkwG2uYgedeGPfc5';

// Function to classify the current tab's content using the Sightengine API
function classifyTabContent() {
  // Get the active tab's video and audio elements
  const videoElement = document.querySelector('video');
  const audioElement = document.querySelector('audio');

  // Make sure the video and audio elements exist and are playing
  if (videoElement && !videoElement.paused) {
    // Construct the API request body
    const requestBody = new URLSearchParams({
      url: videoElement.currentSrc,
      models: 'deepfakes'
    });

    // Send the API request using the fetch() method
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'api-user': apiUser,
        'api-secret': apiSecret,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody.toString()
    })
    .then(response => response.json())
    .then(data => {
      // Check if the API returned a result indicating a deep fake
      if (data?.weapon?.matches.length > 0) {
        // Display a warning popup
        alert('WARNING: This video may be a deep fake!');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  if (audioElement && !audioElement.paused) {
    // Construct the API request body
    const requestBody = new URLSearchParams({
      url: audioElement.currentSrc,
      models: 'deepfakes'
    });

    // Send the API request using the fetch() method
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'api-user': apiUser,
        'api-secret': apiSecret,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody.toString()
    })
    .then(response => response.json())
    .then(data => {
      // Check if the API returned a result indicating a deep fake
      if (data?.weapon?.matches.length > 0) {
        // Display a warning popup
        alert('WARNING: This audio may be a deep fake!');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
}

// Add an event listener to trigger the deep fake detection when the tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    classifyTabContent();
  }
});
