console.log("extension loaded!");
let speedUp = false;
let speed = 3;

const videoElement = document.querySelector("video");

function handleKeyDown(e, video) {
  if (e.key === "v" && !speedUp) {
    console.log("v key pressed!");
    video.playbackRate = speed;
    const prompt = document.createElement("div");
    prompt.textContent = `${speed}x`;
    prompt.style.fontSize = "2rem";
    prompt.style.position = "absolute";
    prompt.style.right = "1rem";
    prompt.style.top = "1rem";
    prompt.style.zIndex = "100";
    prompt.classList.add("speedup-prompt");
    video.parentElement.appendChild(prompt);
    speedUp = true;
  }
}
function handleKeyUp(e, video) {
  if (e.key === "v") {
    console.log("v key up!");
    document.querySelector(".speedup-prompt").remove();

    video.playbackRate = 1;
    speedUp = false;
  }
}

if (videoElement) {
  console.log("video founded: ", videoElement);

  window.addEventListener("click", (e) => {
    console.log("the click target is: ", e.target);
    e.target.focus();
    console.log(
      "current focus element after click is: ",
      document.activeElement
    );
  });

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e, videoElement);
  });

  window.addEventListener("keyup", (e) => {
    handleKeyUp(e, videoElement);
  });
} else {
  console.info("video not found!, set observer🫡");
  function handleVideoAdded(mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLVideoElement) {
            const video = node;
            // video.parentElement.addEventListener("click", (e) => {
            //   console.log("clicked! target is: ", e.target);
            //   console.log("the video varaiable is: ", video);
            //   video.focus();
            // });
            window.addEventListener("keydown", (e) => handleKeyDown(e, video));
            window.addEventListener("keyup", (e) => handleKeyUp(e, video));
          }
        }
      }
    }
  }

  const observer = new MutationObserver(handleVideoAdded);

  const config = { childList: true, subtree: true };

  observer.observe(document.body, config);
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.value) {
    var receivedValue = request.value;

    console.log("Value received in content script:", receivedValue);
    speed = receivedValue;
    // You can now use the receivedValue in your content script logic
  }
});
