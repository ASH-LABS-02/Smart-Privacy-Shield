chrome.runtime.onInstalled.addListener(() => {
  console.log("Smart Privacy Shield installed.");
});

let lastFlaggedTabs = [];

// --- Safe helper ---
async function getTabSnippet(tabId, url) {
  if (/^(chrome|chrome-extension|edge|about|devtools|chrome-search):/i.test(url)) {
    return null;
  }
  try {
    return await chrome.tabs.sendMessage(tabId, { type: "GET_SNIPPET" });
  } catch {
    return null;
  }
}

// --- Core scan function ---
async function runSensitiveScan() {
  const tabs = await chrome.tabs.query({});
  const flagged = [];

  for (const tab of tabs) {
    const snippet = (await getTabSnippet(tab.id, tab.url)) || {
      title: tab.title,
      url: tab.url,
      snippet: ""
    };

    const text = `${snippet.title} ${snippet.url} ${snippet.snippet}`.toLowerCase();
    const sensitivePattern = /(mail|gmail|bank|wallet|upi|slack|whatsapp|linkedin|facebook|invoice|github|aws|drive|docs|account|login)/i;
    if (sensitivePattern.test(text)) {
      flagged.push({ title: tab.title, url: tab.url });
    }
  }

  lastFlaggedTabs = flagged;
  return flagged;
}

// --- Message handling ---
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "RUN_SCAN") {
    await runSensitiveScan();
    sendResponse({ success: true });
  }

  if (msg.type === "GET_LATEST_SCAN") {
    sendResponse({ flagged: lastFlaggedTabs });
  }

  // 🔥 New trigger for auto-scan + alert
  if (msg.type === "RUN_SCAN_AND_ALERT") {
    const flagged = await runSensitiveScan();
    if (flagged.length > 0) {
      const message = flagged.map(f => `• ${f.title}`).join("\n");
      // Show a basic in-browser alert
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: (msg) => alert(`⚠️ Sensitive Tabs Detected:\n\n${msg}`),
        args: [message]
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: () => alert("✅ No sensitive tabs found. You're good to go!")
      });
    }
  }
});