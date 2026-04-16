# KoinX - Tax Loss Harvesting Tool

A responsive React-based application for analyzing capital gains and optimizing tax-loss harvesting decisions. The interface provides a clear comparison between pre-harvesting and post-harvesting outcomes, helping users understand how selling selected holdings can reduce taxable gains.

---

## Features

### Capital Gains Dashboard
- Pre-harvesting summary with short-term, long-term, and net capital gains
- Post-harvesting view that updates dynamically based on selected holdings
- Real-time calculation of tax-saving opportunities
- Clear visual comparison between before and after harvesting

### Holdings Management
- Displays all holdings fetched from API
- Row-level selection using checkboxes
- Select-all functionality with indeterminate state
- “View All” option to expand full holdings list
- Auto-filled “Amount to Sell” based on selected holdings
- Visual highlight for selected rows

### Real-Time Updates
- Instant recalculation of gains and losses on selection/deselection
- Positive gains added to profits, negative to losses
- Dynamic UI feedback for optimized tax savings

### Responsive UI
- Desktop: Side-by-side comparison cards
- Mobile: Stacked layout for readability
- Horizontally scrollable table on smaller screens

### Error & Loading Handling
- Loading spinner during API calls
- Error state with retry option

---

## Tech Stack

- React (Vite)
- Tailwind CSS
- Redux Toolkit
- Node.js + Express.js (Mock Server)
- Axios

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
git clone https://github.com/gangamahesh246/KoniX.git
cd KoniX
```

### Start Mock Server
- cd server
- npm install
- npm start

Server runs at: http://localhost:5000

Endpoints:
- GET /api/holdings
- GET /api/capital-gains

### Start Client
- cd client
- npm install
- npm run dev

App runs at: http://localhost:5173

### Project Structure
```
KoniX/
├── server/
│   ├── index.js              # Express mock server
│   └── package.json
│
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx          # Entry point with Redux Provider
│   │   ├── App.jsx           # Main business logic
│   │   ├── index.css         # Tailwind imports
│   │
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   ├── holdingsSlice.js
│   │   │   └── capitalGainsSlice.js
│   │
│   │   ├── components/
│   │   │   ├── CapitalGainsCard.jsx
│   │   │   ├── HoldingsTable.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ErrorState.jsx
│   │
│   │   └── utils/
│   │       └── formatCurrency.js
│
└── README.md
```
