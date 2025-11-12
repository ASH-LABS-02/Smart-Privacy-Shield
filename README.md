# Smart Privacy Shield  
**A Chrome Extension powered by Gemini Nano that protects your privacy and enhances your confidence.**

---

## Overview  
Smart Privacy Shield prevents accidental exposure of sensitive information during screen sharing and helps users improve their speaking confidence during interviews or presentations — all locally, with **zero data sent to servers**.

---

## Features  

### Screen-Share Privacy Guard  
- Scans all open browser tabs before a screen share.  
- Flags sensitive tabs like Gmail, WhatsApp Web, or banking pages.  
- Gives a quick alert so you can close or hide private tabs before sharing.

### AI Interview Analyzer  
- Records your voice using the browser’s Web Speech API.  
- Detects filler words, long pauses, and speech clarity issues.  
- Summarizes your delivery and provides personalized feedback.  

### 100% Local & Secure  
- Runs entirely on-device using Chrome’s **Built-in AI (Gemini Nano)**.  
- No internet or API keys required.  
- All data stays private inside your browser.

---

## Tech Stack  
- **Chrome Extension (Manifest V3)**  
- **Gemini Nano Built-in APIs:**  
  - Prompt API – detects sensitive tab content.  
  - Proofreader API – finds filler words and language issues.  
  - Summarizer API – creates concise feedback summaries.  
- **Web Speech API** – handles real-time voice recording.  
- **Chrome Tabs & Scripting APIs** – for tab scanning and automation.

---

## Testing Instructions  
1. Clone or download this repository.  
2. Open `chrome://extensions` → enable **Developer Mode** → click **Load unpacked**.  
3. Select the project folder.  
4. Open multiple tabs (e.g., Gmail, WhatsApp, LinkedIn) → click **Scan Tabs** in the popup.  
5. Try the **Interview Analyzer** → click **Start Recording**, speak, then stop to see instant feedback.  
6. Join a Google Meet → the extension auto-scans and alerts about sensitive tabs.

---

## Folder Structure  
Smart-Privacy-Shield/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
└── README.md

---

## Future Enhancements  
- Add emotion and tone analysis for more detailed speech feedback.  
- Expand support for other video meeting platforms.  
- Introduce customizable sensitivity rules for corporate users.  

---

## Hackathon Submission Summary  
Smart Privacy Shield shows how **on-device AI** can enhance both **privacy and productivity**.  
It protects what’s private — and helps you present your best self online.

---

## License  
This project is open-sourced under the MIT License.  
Feel free to fork, modify, and contribute!

---

> Built using Chrome’s Built-in AI and pure JavaScript.

