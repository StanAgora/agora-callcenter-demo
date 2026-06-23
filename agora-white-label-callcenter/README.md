# Call Center Console

A white-label outbound voice call-center platform. Upload a call script, let AI (Claude) generate the voice-agent prompt and quota structure, launch outbound campaigns, and monitor outcomes in real time.

The UI is fully brandable (product name, logo, colors, copy) through a single config with environment overrides — see [Branding](#branding) below.

---

## Feature Overview

| Module | Description |
|--------|-------------|
| **Script upload** | Accepts PDF (recommended), DOCX, and XLSX files |
| **AI prompt generation** | Claude reads the call script and streams a JSON object with a greeting plus structured sections, which become the voice-agent system prompt |
| **Section editing** | The generated prompt is shown section by section — each can be collapsed/expanded and edited independently; the greeting is stored separately for the voice platform |
| **Structured output** | Automatically extracts a variable schema (name / type / answer codes) that you can edit by hand |
| **Simulated conversation** | Chat with the AI directly in the prompt editor to test the call flow before going live |
| **Quota management** | AI recommendation + natural-language adjustment + manual slider/number editing |
| **Real-time dashboard** | WebSocket push of quota progress, call records, and live transcripts |
| **Internationalization** | Korean / English / Chinese / Japanese (i18next) |

---

## Tech Stack

### Frontend (`frontend/`)

| Tech | Version |
|------|---------|
| React | 19 |
| Vite | 8 |
| TypeScript | 5.9 |
| React Router | 7 |
| TanStack Query | 5 |
| Tailwind CSS | 3 |
| i18next | 26 |

### Backend (`backend/`)

| Tech | Version |
|------|---------|
| FastAPI | 0.115 |
| SQLAlchemy (async) | 2.0 |
| aiosqlite | 0.20 |
| Pydantic Settings | 2.5 |
| Anthropic SDK | 0.34 |
| httpx | 0.27 |
| pdfplumber | 0.11 |
| python-docx | 1.1 |
| openpyxl | 3.1 |

---

## Project Structure

```
agora-white-label-callcenter/
├── frontend/
│   └── src/
│       ├── brand.config.ts         # White-label config (name, logo, colors, copy)
│       ├── types/index.ts          # Shared TypeScript types
│       ├── pages/
│       │   ├── auth/               # Login
│       │   ├── campaigns/          # Campaign list / detail / agent prompt
│       │   ├── dashboard/          # Real-time dashboard
│       │   ├── quotas/             # Quota editor
│       │   └── settings/           # System settings
│       ├── components/
│       │   ├── Layout.tsx          # Sidebar navigation shell
│       │   └── ui/                 # Badge, ProgressBar
│       ├── i18n/locales/           # ko / en / zh / ja
│       ├── mocks/                  # Static dev data & MockWebSocket
│       └── lib/utils.ts
├── backend/
│   └── app/
│       ├── main.py                 # FastAPI entrypoint + CORS + lifespan
│       ├── core/
│       │   ├── config.py           # Pydantic Settings (.env)
│       │   └── database.py         # Async SQLAlchemy + init_db
│       ├── models/                 # SQLAlchemy ORM models
│       ├── schemas/                # Pydantic I/O schemas
│       ├── api/                    # Campaign, quota, callback, websocket routers
│       └── services/
│           ├── parsers/            # PDF / DOCX / XLSX text extraction
│           ├── voice_prompt_generator.py  # Claude streaming prompt + schema extraction
│           ├── quota_agent_notifier.py     # Prepends quota-closed notices to the agent prompt
│           ├── campaign_runner.py  # asyncio polling task per campaign
│           └── ws_hub.py           # WebSocket broadcast hub
├── memory/                         # Project notes (non-runtime)
└── CLAUDE.md                       # Guidance for AI-assisted development
```

---

## Quick Start

> **Requirements:** Node 18+ and Python 3.11–3.13 (recommended).
> On **Python 3.14**, bump `sqlalchemy` to `>=2.0.43` in `requirements.txt` first — the older pin crashes on 3.14.

The demo runs **entirely on SQLite with no external services and no API keys**. AI and voice features stay inert until you add keys (see [Environment Variables](#environment-variables-backendenv)).

### 1. Clone

```bash
git clone <repo-url>
cd agora-white-label-callcenter
```

### 2. Backend → http://localhost:8000

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

By default the app uses **SQLite** (`dev.db`, created automatically on first run) — **no `.env` is needed to run the demo.**

> ⚠️ Do **not** run `cp .env.example .env` unless you have PostgreSQL running: that template points `DATABASE_URL` at Postgres and the backend will fail to start. Only create a `.env` to add API keys or change the database (see [Environment Variables](#environment-variables-backendenv)).

### 3. Frontend → http://localhost:5173

```bash
cd frontend
npm install --legacy-peer-deps   # --legacy-peer-deps avoids a recharts / React 19 peer conflict
npm run dev
```

### 4. Open the demo

Go to **http://localhost:5173** and sign in with **`demo` / `demo`** (configurable — see [Branding](#branding)).

The database starts empty, so the campaign / agent / phone-number lists show their empty states. For a fully populated real-time view with **no setup at all**, open the built-in mock dashboard:

```
http://localhost:5173/surveys/survey-001/dashboard
```

To create real campaigns and use AI script generation, add `ANTHROPIC_API_KEY` (and the Agora keys for live calls) to `backend/.env` and restart the backend.

---

## Branding

All white-label settings live in `frontend/src/brand.config.ts` and can be overridden with `VITE_*` environment variables (e.g. in `frontend/.env`). With no overrides, the app ships with neutral defaults.

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_BRAND_PRODUCT_NAME` | `Call Center Console` | App name (sidebar, login, browser tab) |
| `VITE_BRAND_LOGO_URL` | _(empty → initial-letter mark)_ | Logo image URL |
| `VITE_BRAND_PRIMARY_COLOR` | `#2563EB` | Primary theme color (drives the whole UI) |
| `VITE_BRAND_ACCENT_COLOR` | `#059669` | Accent color |
| `VITE_BRAND_FOOTER_TEXT` | `Powered by Voice AI Platform` | Login footer |
| `VITE_BRAND_LOGIN_SUBTITLE` | `Manage campaigns, agents, and call outcomes` | Login subtitle |
| `VITE_BRAND_SIDEBAR_USER_LABEL` | `Demo Admin` | Sidebar user name |
| `VITE_BRAND_SIDEBAR_USER_ROLE` | `Administrator` | Sidebar user role |
| `VITE_BRAND_DEMO_BANNER` | `true` | Toggle the "demo / not for production" banner |
| `VITE_BRAND_DEMO_BANNER_TEXT` | `Demo environment. Not for production use.` | Banner text |
| `VITE_DEMO_USERNAME` / `VITE_DEMO_PASSWORD` | `demo` / `demo` | Demo login credentials |

The theme color is applied at runtime as CSS variables (`--brand-primary`), so changing `VITE_BRAND_PRIMARY_COLOR` re-skins the entire app.

---

## Environment Variables (`backend/.env`)

`backend/.env` is **optional** — every setting has a default (see `app/core/config.py`), and the defaults run the demo on SQLite with all features inert. Create a `.env` only to switch the database or enable AI / voice features. A template lives in `backend/.env.example` (note: it defaults `DATABASE_URL` to PostgreSQL).

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite+aiosqlite:///./dev.db` | DB connection. SQLite for dev; `postgresql+asyncpg://…` for production |
| `ANTHROPIC_API_KEY` | _(empty)_ | Claude API key — required for AI prompt & quota generation |
| `AGORA_CONVERSATIONAL_API_KEY` | _(empty)_ | Base64-encoded Agora Conversational AI key — required for live outbound calls |
| `AGORA_PROJECT_ID` | _(demo id)_ | Agora project ID |
| `AGORA_CONVERSATIONAL_BASE_URL` | `https://api.agora.io/conversational-ai/v2` | Agora Conversational AI base URL |
| `OPENAI_API_KEY` | _(empty)_ | Used for transcript-based quota extraction |
| `QUOTA_TRANSCRIPT_MODEL` | `gpt-4o-mini` | Model for transcript quota evaluation |
| `QUOTA_TRANSCRIPT_MIN_CONFIDENCE` | `0.5` | Minimum confidence (0–1) to accept an extracted quota value |
| `POLL_INTERVAL_SECONDS` | `5` | How often to poll for call status (seconds) |
| `MAX_CONCURRENT_CALLS` | `10` | Maximum concurrent outbound calls |

---

## Key Data Flows

```
Upload PDF/DOCX → extract text → store as the campaign call script
Generate prompt → stream JSON sections → frontend renders sections → backend extracts structured_output_schema
               → voice-agent prompt (sections joined) + greeting stored separately
AI quota suggest → Claude analyzes the call script → generates QuotaCell list
Start campaign  → campaign_runner reads prompt + greeting → attaches them to each outbound call
               → polls the voice platform → broadcasts live progress over WebSocket
Voice callback  → POST /api/callbacks/call-result → updates QuotaCell.completed
Campaign done   → status = completed → triggers webhook delivery
```

---

## WebSocket Message Types

| type | Data fields | Description |
|------|-------------|-------------|
| `quota_update` | `cell`, `overallStats` | Quota cell completion update |
| `call_started` | `call` | New call started |
| `transcript_update` | `callId`, `line` | Live transcript line |
| `call_completed` | `callId`, `resultCode`, `responses` | Call ended |
| `campaign_completed` | — | All quotas filled |
| `campaign_status` | `status` | Campaign status changed |

---

## Call Outcome Codes

| Code | Meaning |
|------|---------|
| 0 | Completed |
| 1 | Invalid Number |
| 2 | Business/Fax |
| 3 | Declined |
| 4 | Soft Decline |
| 5 | No Answer |
| 6 | Busy |
| 7 | Not Eligible |
| 8 | Quota Full |
| 9 | Abandoned |
| 10 | Other |

---

## Development Commands

```bash
# Backend smoke check (venv activated)
cd backend && python -c "from app.main import app"

# Frontend type-check
cd frontend && npm run build   # runs tsc -b + vite build (authoritative)
```

---

## Roadmap / Known Issues

- [ ] **DashboardPage** currently uses mock data; wire it to the real backend API + WebSocket
- [ ] **SettingsPage** save action needs to be connected to the backend config endpoint
- [ ] **Voice platform** integration is an httpx stub pending a finalized API spec
- [ ] Production database migration to PostgreSQL + Alembic

---

## License

MIT
