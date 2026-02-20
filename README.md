.# Answerforself - Spiritual Guidance Platform........
..
A modern web application for meditation guidance, astrological insights, and spiritual counseling built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## Features 

- 🧘 Meditation and Spiritual Guidance
- 🌟 Astrological Readings
- 📝 Blog Management System
- 🖼️ Gallery Management
- 📞 Contact Form with Admin Dashboard
- 🛒 Product/Service Listings
- 🔐 Secure Authentication
- 📱 Responsive Design

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Email Service:** Resend
- **File Storage:** Cloudflare R2
- **UI Components:** Shadcn/ui
- **Rich Text Editor:** TipTap
- **Form Handling:** React Hook Form
- **Validation:** Zod

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meditationastro.git
cd meditationastro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/meditationastro"

# Authentication
AUTH_SECRET="your-auth-secret"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
RESEND_TO_EMAIL="admin@yourdomain.com"

# WhatsApp Integration
WHATSAPP_NUMBER="your-whatsapp-number"

# Cloudflare R2 Storage
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_ACCOUNT_ID="your-r2-account-id"
R2_BUCKET_NAME="your-bucket-name"
R2_PUBLIC_URL="your-r2-public-url"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.






## Features in Detail

### Authentication
- Email/Password authentication
- Admin role management
- Protected routes
- Password reset functionality

### Blog System
- Rich text editor
- Image uploads
- Categories and tags
- Draft/publish functionality

### Contact Management
- Form submissions
- Admin dashboard
- Status tracking
- Export functionality

### File Storage
- Image upload to Cloudflare R2
- Automatic optimization
- Secure access control

## Thank you.


## Deploy to GitHub Pages (Static)

- This repo is configured for **static export** using `output: "export"` in `next.config.js`.
- In your GitHub repo settings, enable **Pages** and set **Build and deployment** to GitHub Actions.
- Set a repository variable named `NEXT_PUBLIC_BASE_PATH` to `/<your-repo-name>` (leading slash).
- Push to `main` to deploy.


✅ Done — I analyzed your current codebase and added a full advanced system upgrade across the site: Admin Dashboard + Gallery system + Downloads catalog + Meditation Music section + Portfolio + Tools (Vedic astrology + birth chart generator starter + life matrix + inner journey + habit planner) + upgraded Contact with email sending + sitemap expansion + speed/perf font setup.

📦 Download the complete upgraded code (ZIP)

Download clueux-all-features-admin-tools.zip


---

✅ What’s added (big features)

🔐 Admin Dashboard (protected)

/admin/login (password login)

/admin dashboard

/admin/bookings (tries Prisma booking table if exists; otherwise shows config hint)

/admin/gallery (add/delete gallery items)

/admin/downloads (lists files in /public/downloads)

/admin/music (lists files in /public/music)

Security via middleware + cookie auth

Uses ADMIN_PASSWORD from env



---

🖼 Gallery System (public + admin)

Public page: /h/gallery

Admin page manages gallery JSON store

Stored in: data/gallery.json

Works without DB



---

🎵 Meditation Music Section

Public page: /h/music

Audio player list auto-loads from: public/music/*.mp3

Just upload mp3 files and it appears



---

📚 Resources / Downloads Catalog

Public page: /h/downloads

Auto lists PDFs/zips/audio from: public/downloads/

Clean “Digital Shop (optional)” placeholder (Stripe can be added later)



---

🧘 Inner Spiritual Journey + Habit Change Tools

New tools section:

/h/tools/inner-journey

/h/tools/habit-change

/h/tools/life-matrix



---

🔯 Vedic Astrology + Birth Chart Generator (Starter System)

/h/tools/vedic-birth-chart

Includes form + API response

API: POST /api/tools/birth-chart


✅ Outputs:

Approx sidereal sun rashi

Life matrix mapping values
⚠️ Includes clear disclaimer: exact birth chart needs ephemeris integration (Swiss Ephemeris)



---

✉️ Contact form connected to Email (real sending)

/h/contact upgraded UI

API: /api/contact

Uses nodemailer (Gmail)
Env:

EMAIL_USER

EMAIL_PASS (Gmail App Password)

EMAIL_TO


Also shows:

WhatsApp: +977 9823376110

Email: meditationastro1@gmail.com



---

⚡ SEO + Speed / Performance

Added next/font/google Inter for best Core Web Vitals (swap)

Expanded sitemap to include all new pages

Strong internal linking via new menu items



---

✅ ENV setup (important)

I added .env.example with required values.

Set these on Vercel:

NEXT_PUBLIC_URL=https://your-domain.vercel.app

ADMIN_PASSWORD=change-me

EMAIL_USER=meditationastro1@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=meditationastro1@gmail.com


---

Next “Best Features” upgrade options (tell me which you want next)

Because your last request also included life prediction / full Vedic chart / matrix mapping / digital store, the next step can be:

1. ✅ Real Vedic Astrology engine (ephemeris integration)

planets, houses, ascendant, nakshatra, dasha (accurate)



2. ✅ Digital downloads shop (Stripe checkout + secure file delivery + email links)


3. ✅ Habit tracker system with user accounts (Supabase auth + dashboard)


4. ✅ Advanced blog CMS (MDX + editor + featured images + collections)


5. ✅ Retreat booking admin (full booking management + export + email templates)



Reply with just the number: 1 / 2 / 3 / 4 / 5