📊 Trade Journal – Frontend Assignment

A modern Trade Journal UI built using React that allows traders to manage trades with multiple BUY and SELL legs.
This project focuses on clean state management, scalable UI architecture, and intuitive UX.

⸻

🚀 Features
• 📌 View multiple trades in a structured layout
• ➕ Add BUY / SELL legs dynamically
• ✏️ Inline editing (price, quantity, date)
• ❌ Delete individual trade legs
• 🔄 Toggle trade status (OPEN / CLOSED)
• 🚫 Disable actions when trade is CLOSED
• 📈 Average Buy / Sell price calculation
• 📦 Local persistence using localStorage
• 🎨 Professional dark trading dashboard UI

⸻

🧠 Core Concepts
• Trade as the source of truth
• BUY and SELL are managed as nested arrays
• Immutable state updates using React state
• Predictable updates using trade_id as key
• Grid-based layout for flexible UI composition

⸻

🏗️ Tech Stack
• ⚛️ React (JavaScript)
• 🎨 CSS (Custom styling, no UI libraries)
• ⚡ Vite (for fast development)

---

📂 Project Structure

src/
├── components/
│ ├── TradeJournal.jsx
│ ├── TradeRow.jsx
│
├── data/
│ └── journal.js
│
├── App.jsx
├── main.jsx

---

🖥️ UI Layout

The application follows a 3-column layout:

BUY (Left) | TRADE INFO (Center) | SELL (Right)

• BUY → Entry legs
• TRADE → Symbol, status, insights
• SELL → Exit legs

---

📊 Data Model

{
"trade_id": "trade-001",
"symbol": "AAA",
"direction": "LONG",
"status": "OPEN",
"buy": [],
"sell": []
}

⚙️ State Management
• Single source of truth (journal)
• Managed using React useState
• Persisted using localStorage
• Immutable updates for all operations

⸻

🧪 Edge Cases Handled
• Trades with no BUY / SELL legs
• Asymmetrical BUY / SELL entries
• Zero quantity / price inputs
• Disabled interactions when CLOSED
