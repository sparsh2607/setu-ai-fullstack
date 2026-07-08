# SETU AI

### Bridging Citizens to the Opportunities They Deserve

SETU AI is a full-stack civic-tech platform designed to help citizens discover government schemes they may be eligible for through a simple web interface and a WhatsApp-based assistant.

The platform simplifies scheme discovery by collecting basic user profile details, matching them with relevant welfare schemes, and explaining eligibility in clear, user-friendly language.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [WhatsApp Bot Demo](#whatsapp-bot-demo)
- [API Modules](#api-modules)
- [Privacy Approach](#privacy-approach)
- [Future Scope](#future-scope)
- [Team](#team)
- [License](#license)

---

## About the Project

Millions of citizens are eligible for government schemes but are often unable to access them because scheme information is scattered, eligibility rules are difficult to understand, and application discovery is time-consuming.

SETU AI acts as a bridge between citizens and welfare opportunities.

Users can enter details such as age, state, district, income, occupation, education, category, area, and support needs. Based on this information, SETU AI recommends relevant schemes, explains why the user matches, and provides a WhatsApp-based assistant for continued discovery.

---

## Problem Statement

Citizens often miss out on welfare schemes because:

- Scheme information is spread across different portals
- Eligibility criteria are difficult to understand
- Users do not know which schemes apply to them
- Application discovery can be confusing and time-consuming
- Many citizens prefer WhatsApp over installing new apps
- Existing systems often lack simple reasoning for eligibility

---

## Solution

SETU AI provides a simple and accessible solution for scheme discovery.

The platform allows users to:

- Create a profile through a consent-first flow
- Check eligibility for available schemes
- View personalized scheme recommendations
- Understand why they match a scheme
- Access results through a clean dashboard
- Continue the discovery journey on WhatsApp

---

## Key Features

### Web Application

- Modern landing page with responsive UI
- Consent-first user onboarding
- Profile-based scheme discovery
- Personalized scheme recommendations
- Dashboard with profile, matches, drafts, WhatsApp, and privacy sections
- Scheme detail pages
- Logout confirmation before clearing saved profile
- Local demo profile storage
- Clean and professional user experience

### WhatsApp Assistant

- Twilio WhatsApp Sandbox integration
- Step-by-step profile collection through chat
- Scheme matching through WhatsApp
- Text-based recommendations
- Accessible experience for users who prefer messaging apps

### Dashboard

- Overview of user profile and match status
- Saved profile details
- Eligible scheme matches
- Application-style draft support
- WhatsApp redirect
- Privacy and consent controls

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- LocalStorage

### Backend

- Node.js
- Express.js
- MongoDB configuration
- REST API architecture
- Twilio WhatsApp Sandbox
- Controller-Service-Route pattern

### Development Tools

- Git
- GitHub
- VS Code
- ngrok
- Docker
- Vercel configuration

---

## Project Architecture

```txt
User
 │
 │
 ├── Web App
 │     ├── Landing Page
 │     ├── Consent Flow
 │     ├── Profile Form
 │     ├── Results Page
 │     └── Dashboard
 │
 │
 ├── WhatsApp Bot
 │     ├── Twilio Sandbox
 │     ├── Webhook Endpoint
 │     └── Chat-based Profile Collection
 │
 │
 └── Backend API
       ├── Auth Module
       ├── Consent Module
       ├── Profile Module
       ├── Scheme Module
       ├── Match Module
       ├── Draft Module
       ├── Reminder Module
       └── WhatsApp Module
```

---

## User Flow

```txt
Landing Page
     ↓
Check Eligibility
     ↓
Consent Page
     ↓
Profile Form
     ↓
Scheme Matching
     ↓
Results Page
     ↓
Dashboard
     ↓
WhatsApp Assistance
```

---

## Project Structure

```txt
setu-ai-fullstack/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── BridgeScene.jsx
│   │   │   ├── Counter.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── DashboardPreview.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── FinalCTA.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MagneticButton.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   ├── Reveal.jsx
│   │   │   ├── ScrollProgress.jsx
│   │   │   ├── TiltCard.jsx
│   │   │   ├── Trust.jsx
│   │   │   ├── TrustStrip.jsx
│   │   │   └── WhatsAppBot.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AppShell.jsx
│   │   │   ├── ConsentPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── DraftPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   ├── SchemeDetailPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   ├── navigation.js
│   │   │   └── storage.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── consentController.js
│   │   │   ├── draftController.js
│   │   │   ├── matchController.js
│   │   │   ├── profileController.js
│   │   │   ├── reminderController.js
│   │   │   ├── schemeController.js
│   │   │   └── whatsappController.js
│   │   │
│   │   ├── data/
│   │   │   └── schemes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validate.js
│   │   │
│   │   ├── models/
│   │   │   ├── Reminder.js
│   │   │   ├── Scheme.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── consentRoutes.js
│   │   │   ├── draftRoutes.js
│   │   │   ├── index.js
│   │   │   ├── matchRoutes.js
│   │   │   ├── profileRoutes.js
│   │   │   ├── reminderRoutes.js
│   │   │   ├── schemeRoutes.js
│   │   │   └── whatsappRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── matchingService.js
│   │   │   ├── schemeStore.js
│   │   │   └── whatsappService.js
│   │   │
│   │   ├── utils/
│   │   │   └── ApiError.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── Dockerfile
│   └── package.json
│
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB connection string
- Twilio account for WhatsApp Sandbox testing

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run at:

```txt
http://localhost:5173
```

---

## Backend Setup

Open a new terminal and run:

```bash
cd server
npm install
npm run dev
```

Backend will run at:

```txt
http://localhost:8080
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

Important:

```txt
Do not push .env files to GitHub.
```

---

## WhatsApp Bot Demo

SETU AI uses Twilio WhatsApp Sandbox for chatbot testing.

### Demo Instructions

First, join the Twilio Sandbox.

Send this message on WhatsApp:

```txt
join ball-military
```

to:

```txt
+1 415 523 8886
```

After joining the sandbox, send:

```txt
hi
```

The SETU AI WhatsApp assistant will start the scheme discovery conversation.

---

## Local Webhook Setup With ngrok

To test WhatsApp webhook locally, run:

```bash
ngrok http 8080
```

Copy the HTTPS forwarding URL from ngrok and add this webhook in Twilio Sandbox settings:

```txt
https://your-ngrok-url/api/whatsapp/webhook
```

Method:

```txt
POST
```

---

## Test WhatsApp Bot Locally

You can test the bot logic directly from the browser:

```txt
http://localhost:8080/api/whatsapp/test?phone=whatsapp:%2B917906861357&message=hi
```

Example response:

```json
{
  "success": true,
  "phone": "whatsapp:+917906861357",
  "message": "hi",
  "replies": [
    "Hi, I am Setu AI assistant..."
  ]
}
```

---

## API Modules

The backend contains separate modules for clean maintainability.

| Module | Purpose |
|---|---|
| Auth | Handles user authentication-related logic |
| Consent | Manages user consent flow |
| Profile | Stores and manages user profile details |
| Schemes | Provides scheme data |
| Match | Matches user profile with schemes |
| Draft | Generates application-style draft support |
| Reminder | Handles reminder-related functionality |
| WhatsApp | Handles Twilio webhook and chatbot flow |

---

## Important Routes

| Route | Method | Description |
|---|---|---|
| `/api/auth` | GET/POST | Auth-related routes |
| `/api/consent` | GET/POST | Consent flow routes |
| `/api/profile` | GET/POST | User profile routes |
| `/api/schemes` | GET | Scheme data routes |
| `/api/match` | POST | Scheme matching routes |
| `/api/drafts` | GET/POST | Draft support routes |
| `/api/reminders` | GET/POST | Reminder routes |
| `/api/whatsapp/webhook` | POST | Twilio WhatsApp webhook |
| `/api/whatsapp/test` | GET/POST | WhatsApp bot test route |

---

## Privacy Approach

SETU AI is designed with a privacy-first user experience.

For the current demo:

- Profile creation starts only after consent
- Users can update their profile
- Users can clear saved local profile data
- Logout confirmation appears before profile removal
- WhatsApp demo runs through Twilio Sandbox
- SETU AI is not an official government platform

---

## Current Status

| Feature | Status |
|---|---|
| Landing Page | Completed |
| Profile Flow | Completed |
| Consent Flow | Completed |
| Results Page | Completed |
| Dashboard | Completed |
| WhatsApp Bot | Working with Twilio Sandbox |
| Backend APIs | Completed |
| Demo Flow | Ready |

---

## Built For

```txt
Lenovo Leap Hackathon 2026
```

SETU AI is built as a hackathon-ready civic-tech solution focused on accessibility, explainability, and real-world impact.

---

## Future Scope

- Real government scheme database integration
- Multilingual chatbot support
- Voice-based scheme discovery
- WhatsApp Business API production deployment
- AI-powered document checklist
- PDF application draft generation
- Admin dashboard for scheme management
- Regional language support
- Scheme deadline reminders
- Real-time eligibility updates

---

## Team

| Name | Role |
|---|---|
| Sparsh Gahoi | Frontend, UI/UX, Integration |
| Yash Saxena | Backend, APIs |

---

## Disclaimer

SETU AI is an independent scheme discovery platform. It is not an official government website or government service. The current version is built for demo and hackathon purposes.

---

## License

This project is licensed under the MIT License.

---

## Credits

```txt
© 2026 SETU AI. Built by Sparsh Gahoi & Yash Saxena.
```
