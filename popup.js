const applyButton = document.querySelector("button");
applyButton.addEventListener("click", () => {
  const speedValue = document.querySelector("input").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { value: speedValue },
      function (response) {
        console.log("Value sent to content script:", speedValue);
      }
    );
  });
});
