// Respond to snippet extraction from popup or background
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.type === "GET_SNIPPET") {
    const title = document.title || "";
    const text = (document.body?.innerText || "").slice(0, 1500);
    sendResponse({ title, snippet: text, url: location.href });
  }
});

// --- Auto-detect Join Now button on Google Meet ---
(function detectMeetJoin() {
  if (!/meet\.google\.com/i.test(location.hostname)) return;

  console.log("Smart Privacy Shield active on Meet...");

  const observer = new MutationObserver(() => {
    // Look for buttons containing "Join" or "Ask to join"
    const joinBtn = [...document.querySelectorAll("button, div[role='button']")]
      .find(b => /(join now|ask to join|rejoin)/i.test(b.innerText || b.ariaLabel || ""));
    
    if (joinBtn && !joinBtn._spsBound) {
      joinBtn._spsBound = true;
      joinBtn.addEventListener("click", () => {
        console.log("Join button clicked → triggering tab scan");
        chrome.runtime.sendMessage({ type: "RUN_SCAN_AND_ALERT" });
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();