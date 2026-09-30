<div align="center">

# 🏆 Elite Tracker

**Build consistent habits and stay focused. A daily habit tracker with a Pomodoro timer and monthly statistics.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)

[About](#-about) •
[Screens](#-screens) •
[Getting started](#-getting-started) •
[Structure](#-structure) •
[Sign-in flow](#-sign-in-flow) •
[Backend](#-backend)

</div>

---

## 📖 About

**Elite Tracker** is a web app for people who want to improve with consistency. With it you can:

- ✅ create **daily habits** and check off what you’ve done today;
- 📅 see on a **calendar** the days each habit was completed, along with the month’s completion rate;
- ⏱️ use a **focus and rest timer** (Pomodoro style) that records every cycle;
- 📊 view **statistics** on total cycles and total focus time per day.

All with **GitHub sign-in**, no account needed.

> 🇧🇷 The app’s interface is in Brazilian Portuguese.

## 🖼️ Screens

| Screen | Route | What’s in it |
|---|---|---|
| 🔑 **Sign in** | `/entrar` | "Sign in with GitHub" button |
| 🔄 **Authentication** | `/autenticacao` | Receives the GitHub `code` and completes sign-in |
| ✅ **Daily Habits** | `/` | Habit list, today’s checkbox, delete, calendar and metrics for the selected habit |
| ⏱️ **Focus Time** | `/foco` | Focus/rest setup (+5 min), timer, calendar and statistics |

> The `/` and `/foco` routes are **private**: without a signed-in user you are redirected to `/entrar`.

### ⏱️ How the timer works

```mermaid
stateDiagram-v2
    [*] --> Paused
    Paused --> Focusing: Start
    Focusing --> Resting: Start Rest (saves the cycle)
    Focusing --> Resting: Time's up (saves the cycle)
    Resting --> Focusing: Resume
    Focusing --> Paused: Cancel
    Resting --> Paused: Cancel
```

Each completed focus cycle is sent to the API (`POST /focus-time`) and shows up marked on the calendar.

## 🚀 Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- The **[Elite Tracker API](https://github.com/agustinhopneto/dc-elitetracker-api)** running (by default at `http://localhost:4000`)

### Step by step

```bash
# 1. Clone the repository
git clone https://github.com/agustinhopneto/dc-elitetracker-front.git
cd dc-elitetracker-front

# 2. Install the dependencies
npm install

# 3. Set up the environment variables (.env file at the project root)

# 4. Run in development mode
npm run dev
```

Open **http://localhost:5173** 🎉

### Environment variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | API base URL | `http://localhost:4000` |
| `VITE_LOCALSTORAGE_KEY` | Prefix of the key used in `localStorage` | `elitetracker` |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server (Vite) |
| `npm run build` | Type check + production build |
| `npm run preview` | Preview the production build |

## 🗂️ Structure

```
src/
├── components/        # Reusable components
│   ├── app-container/ #   Base layout
│   ├── button/        #   Button (info/error variants)
│   ├── header/        #   Header with title and date
│   ├── info/          #   Metric card
│   └── sidebar/       #   Avatar, navigation and sign-out
├── hooks/
│   └── use-user.tsx   # Auth context (sign-in/sign-out/localStorage)
├── routes/
│   ├── index.tsx      # Route definitions
│   └── private-route.tsx
├── screens/           # Screens: login, auth, habits, focus
├── services/
│   └── api.ts         # Axios with an interceptor that injects the Bearer token
├── styles/
│   └── global.css     # Color tokens and reset
├── app.tsx
└── main.tsx
```

## 🔐 Sign-in flow

```mermaid
sequenceDiagram
    actor U as User
    participant F as Frontend
    participant A as API
    participant G as GitHub

    U->>F: Clicks "Sign in with GitHub"
    F->>A: GET /auth
    A-->>F: { redirectUrl }
    F->>G: Redirects to OAuth
    G-->>F: /autenticacao?code=...
    F->>A: GET /auth/callback?code=...
    A->>G: Exchanges code for access_token + fetches user
    A-->>F: { id, name, avatarUrl, token }
    F->>F: Saves to localStorage and redirects to /
```

## 🎨 Palette

| Token | Color |
|---|---|
| `--black-blue` | ![#04141C](https://placehold.co/15x15/04141C/04141C.png) `#04141C` |
| `--dark-blue` | ![#001E2B](https://placehold.co/15x15/001E2B/001E2B.png) `#001E2B` |
| `--info` | ![#016BF8](https://placehold.co/15x15/016BF8/016BF8.png) `#016BF8` |
| `--error` | ![#DB3030](https://placehold.co/15x15/DB3030/DB3030.png) `#DB3030` |
| `--light` | ![#828282](https://placehold.co/15x15/828282/828282.png) `#828282` |

Font: **[Lexend](https://fonts.google.com/specimen/Lexend)**

## 🔗 Backend

The API that powers this app lives at
👉 **[dc-elitetracker-api](https://github.com/agustinhopneto/dc-elitetracker-api)**

## 🛠️ Tech stack

- **[React 18](https://react.dev/)** + **[Vite](https://vitejs.dev/)**
- **[Mantine](https://mantine.dev/)** (`@mantine/core` and `@mantine/dates`): calendar and indicators
- **[React Router](https://reactrouter.com/)**: public and private routes
- **[react-timer-hook](https://github.com/amrlabib/react-timer-hook)**: focus/rest timer
- **[Phosphor Icons](https://phosphoricons.com/)**: icons
- **[Axios](https://axios-http.com/)** + **[Day.js](https://day.js.org/)** + **[clsx](https://github.com/lukeed/clsx)**
- **CSS Modules** + **PostCSS**
- **ESLint + Prettier**

---

<div align="center">

Made with 💙 by **[Agustinho Neto](https://github.com/agustinhopneto)**

</div>
