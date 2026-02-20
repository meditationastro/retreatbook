
# Clue UX — Premium Retreats + Answers Hub (Next.js)

## Features
- Multi-retreat listing + retreat detail pages
- Calendar grid UI for selecting start dates
- Stripe payments: deposit / full / balance
- Email notifications + confirmation (nodemailer)
- Admin analytics page for bookings (requires DB + auth setup)
- Sitemap-style content hub (Answers, Guides & Tools, Resources, Community, Legal)

## Quick start
```bash
npm install
npm run dev
```

## Environment variables
Copy `.env.example` → `.env` and fill values.

## Deploy
Recommended: Vercel + Postgres (Neon/Supabase/etc).


## Contact configuration
- WhatsApp: 9779823376110 (edit in `components/WhatsAppButton.tsx`)
- Admin booking inbox: set `EMAIL_TO` (default: meditationastro1@gmail.com)
