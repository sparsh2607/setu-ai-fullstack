# Setu AI Fullstack Starter

This package contains the original Claude-generated animated frontend plus a working Express backend and API-wired app pages.

## Folder structure

```txt
client/   React + Vite + Tailwind frontend
server/   Express backend with scheme matching, drafts, reminders, consent, WhatsApp webhook
```

## Run locally

Open two terminals.

### Terminal 1 — Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Backend: `http://localhost:8080/api/health`

### Terminal 2 — Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Click **Check eligibility** → consent → profile → results → draft.

## Backend endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend status |
| GET | `/api/schemes` | List schemes |
| GET | `/api/schemes/:id` | Scheme detail |
| POST | `/api/match` | Profile → scheme matches |
| POST | `/api/draft` | Generate application draft + checklist |
| POST | `/api/profile` | Save profile in demo memory |
| POST | `/api/consent` | Capture consent |
| DELETE | `/api/consent/:identifier` | Delete user demo data |
| POST | `/api/reminders` | Save reminder |
| POST | `/api/whatsapp/webhook` | Twilio-compatible WhatsApp webhook |

## MongoDB mode

By default the backend runs without MongoDB using the local `server/src/data/schemes.js` dataset so your demo does not get blocked.

To use MongoDB Atlas:

1. Put your Atlas URI in `server/.env`
2. Set `USE_MONGO=true`
3. Run:

```bash
cd server
npm run seed
npm run dev
```

## What is already connected

- Landing CTA opens the real app flow.
- Consent page calls `/api/consent`.
- Profile page calls `/api/profile` and `/api/match`.
- Results page shows real backend match response.
- Scheme detail calls `/api/schemes/:id`.
- Draft page calls `/api/draft` and creates reminders.
- Settings page calls backend delete endpoint.

## Next upgrades

- Replace local keyword semantic scoring with OpenAI/BGE embeddings + MongoDB Atlas Vector Search.
- Persist profiles/reminders/users fully in MongoDB.
- Add real JWT auth UI.
- Connect Twilio sandbox URL to `/api/whatsapp/webhook`.
- Add PWA service worker for offline saved matches.
