# SIMAP Client Demo

Live demo of [@tenderlift/simap-client](https://www.npmjs.com/package/@tenderlift/simap-client) with real API data.

## 🚀 Quick Start with GitHub Codespaces

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=TenderLift/simap-client-demo)

### Steps:
1. **Click the button above** to open in GitHub Codespaces
2. **Wait for setup** (~1 minute) - the terminal will show "🚀 SIMAP Demo server running"
3. **Open the demo**:
   - Look for the **PORTS** tab at the bottom of the screen
   - Find port **3000** in the list
   - Click the **globe icon** 🌐 (or right-click → "Open in Browser")
   - A new tab opens with the live demo!

### 📍 Where to find the PORTS tab:
- Bottom panel of VS Code in Codespaces
- Next to TERMINAL, PROBLEMS, OUTPUT tabs
- Shows "3000" with a green dot when ready

## 📚 What You'll See

The demo shows:
- **Swiss Cantons** - All 26 cantons with their NUTS3 codes
- **Recent Projects** - Latest procurement projects from SIMAP
- **Refresh buttons** - Get fresh data anytime
- **Live API calls** - Real data, no mocks!

## 🛠️ Local Development

If running locally:
```bash
npm install
npm start
# Open http://localhost:3000
```

## 💡 How It Works

This demo uses a Node.js server to:
1. Call the SIMAP API directly (no CORS issues)
2. Serve the data to a web interface
3. Show real procurement data from Switzerland

## 📦 Documentation

- [NPM Package](https://www.npmjs.com/package/@tenderlift/simap-client)
- [GitHub Repository](https://github.com/TenderLift/simap-client)
- [API Documentation](https://github.com/TenderLift/simap-client#readme)