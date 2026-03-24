# MedGuardian Frontend

React + Vite frontend for the Medicine Inventory & Expiry Alert System.

## Stack
- **React 18** + **Vite 5**
- **React Router DOM** (v6) for navigation
- **Recharts** for data visualization
- **Lucide React** for icons
- **Google Fonts**: Syne, Instrument Sans, DM Mono

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

The Vite dev server proxies `/api` requests to the Spring Boot backend at `http://localhost:8080`.

## Pages
- `/` — Dashboard with live stats, area chart, pie chart, activity feed
- `/inventory` — Full medicine table with search, filter, add modal
- `/alerts` — Expiry alerts with Twilio SMS status
- `/reports` — Analytics with monthly trend + category bar charts

## API Integration
Replace mock data in each page with `fetch('/api/...')` calls to connect to your Spring Boot backend.
