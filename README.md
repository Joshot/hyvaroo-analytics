# Hyvaroo Analytics

> A premium SaaS analytics dashboard built as a portfolio showcase by **Hyvaroo Labs**.

![Status](https://img.shields.io/badge/Status-Live-22C55E?style=flat-square) ![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06b6d4?style=flat-square&logo=tailwindcss) ![Recharts](https://img.shields.io/badge/Recharts-2-8b5cf6?style=flat-square)

## Overview

Hyvaroo Analytics is a high-end SaaS-style analytics dashboard UI inspired by Stripe, Vercel, and Linear. Built to demonstrate Hyvaroo Labs' capability to deliver enterprise-grade data dashboards. All data is generated and persisted using browser `localStorage` — no backend required.

## Pages

| Page | Description |
|---|---|
| **Overview** | KPI stat cards, line chart, bar chart, pie chart, date range & category filters |
| **User Analytics** | Sortable/searchable user table with pagination, session time, status badges |
| **Event Tracking** | Simulate live events, real-time activity feed, per-type event counters |
| **Settings** | Dark/light mode toggle, notification toggle, data reset with confirm flow |

## Features

- 📊 **3 Chart types** — Line (growth), Bar (sessions), Pie (traffic sources)
- 🎛️ **Range filter** — 7 days / 30 days toggle
- 🔍 **Category filter** — All / Traffic / Sales / Users
- 👥 **User table** — sortable columns, search, pagination
- ⚡ **Event simulation** — click buttons to fire live events into the feed
- 🌙 **Dark mode default** + light mode toggle
- 🔢 **Animated counters** — count-up animation on KPI cards
- ✨ **Glow effects** on hover for stat cards
- 💾 **localStorage** — all data seeded and persisted in browser
- 📱 **Fully responsive** — mobile sidebar slide-in

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool |
| TailwindCSS 3 | Styling |
| Recharts 2 | Charts |
| Lucide React | Icons |
| localStorage | Data persistence |

## Getting Started

```bash
git clone https://github.com/Joshot/hyvaroo-analytics.git
cd hyvaroo-analytics
npm install
npm run dev
```

## Design System

- **Primary BG:** `#0A0F1C` (dark) / `#F8FAFC` (light)
- **Accent Gradient:** `#4F46E5 → #8B5CF6`
- **Data Cyan:** `#22D3EE`
- **Font:** Inter
- **Style:** Linear / Vercel inspired

## License

MIT — built with precision by [Hyvaroo Labs](https://hyvaroolabs.com)
