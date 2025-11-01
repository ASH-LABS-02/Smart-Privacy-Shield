// ----- Sensitive Tabs Scanner -----
document.getElementById("scanTabs").addEventListener("click", async () => {
  const resultDiv = document.getElementById("tabsResult");
  resultDiv.textContent = "Scanning tabs...";

  const tabs = await chrome.tabs.query({});
  const flagged = [];

  for (const tab of tabs) {
    let snippet = null;
    try {
      snippet = await chrome.tabs.sendMessage(tab.id, { type: "GET_SNIPPET" });
    } catch (e) {}

    const title = (snippet?.title || tab.title || "").toLowerCase();
    const url = (snippet?.url || tab.url || "").toLowerCase();
    const content = `${title} ${url} ${(snippet?.snippet || "").toLowerCase()}`;

    const sensitiveMatch = /(mail|gmail|bank|wallet|upi|slack|whatsapp|linkedin|facebook|invoice|github|aws|drive|docs|account|login)/i;
    if (sensitiveMatch.test(content)) flagged.push(tab.title);
  }

  resultDiv.innerHTML =
    flagged.length > 0
      ? `<div class="warn">⚠️ Sensitive Tabs Detected:</div><ul>${flagged.map(t => `<li>${t}</li>`).join("")}</ul>`
      : `<div class="ok">✅ No sensitive tabs found.</div>`;
});

// ----- Voice Analyzer -----
let recognition;
let recognizing = false;

document.getElementById("toggleRecord").addEventListener("click", async () => {
  const status = document.getElementById("speechStatus");
  const summary = document.getElementById("speechSummary");
  const suggestions = document.getElementById("speechSuggestions");

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    status.textContent = "Speech recognition not supported.";
    return;
  }

  if (!recognition) {
    recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
  }

  if (!recognizing) {
    recognizing = true;
    status.textContent = "🎤 Listening...";
    let transcript = "";

    recognition.onresult = (e) => {
      const res = e.results[e.results.length - 1];
      if (res.isFinal) transcript += res[0].transcript + " ";
    };

    recognition.onend = () => {
      recognizing = false;
      status.textContent = "✅ Recording stopped.";
      analyzeSpeech(transcript, summary, suggestions);
    };

    recognition.start();
  } else {
    recognizing = false;
    recognition.stop();
    status.textContent = "🛑 Stopping...";
  }
});

function analyzeSpeech(text, summary, suggestions) {
  if (!text.trim()) {
    summary.textContent = "No speech detected.";
    return;
  }

  const words = text.split(/\s+/);
  const fillers = (text.match(/\b(um+|uh+|like|you know|sort of)\b/gi) || []).length;
  const wpm = Math.round(words.length / (text.length / 1000 / 60));
  summary.textContent = `Words: ${words.length}\nFillers: ${fillers}\nWPM: ${wpm}`;
  suggestions.textContent =
    fillers > 0
      ? "Try reducing filler words for clarity."
      : "Good pacing and clear speech!";
}