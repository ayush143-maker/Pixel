# Pixel Studio — Redesigned

Charcoal + Soft Emerald redesign, fully connected to your Supabase project, with a working admin CMS.

## What changed

- **Fixed the mobile clipping bug**: your `globals.css` used a `.section` class everywhere, but it was never defined — so every section had zero padding and no max-width. That's why cards looked cut off edge-to-edge on phones. It's defined now with proper responsive padding.
- **New color system**: Charcoal (`#0A0A0A` / `#111111`) + Emerald (`#10B981` / `#34D399`) throughout. All purple removed.
- **New logo**: your uploaded leaf icon is now the favicon and navbar/footer mark.
- **Connected to your real Supabase project** (`ttcdlvkfmojqxvxqmwkb`) — Portfolio, Pricing, FAQ, About values, Hero/Bio/Contact text, and contact form leads are all stored in the database and editable from `/admin`.
- **Admin CMS** at `/admin` — login, then edit every section of the site live.

## Run locally

```bash
npm install
npm run dev
```

The `.env` file already has your Supabase URL + anon key filled in (the anon key is safe to expose in a frontend — it only has the access your Row Level Security policies grant it).

## Admin login

Go to `/admin` (e.g. `https://your-site.vercel.app/admin`).

- **ID:** `byh@ayush`
- **Password:** `byhayush`

This is a real Supabase Auth account, not a hardcoded check — so it's properly secured by Row Level Security: only a signed-in user can create/edit/delete content or read contact form messages. Everyone else only has read access to published content and can submit the contact form.

**One thing worth doing yourself:** log into your [Supabase dashboard](https://supabase.com/dashboard/project/ttcdlvkfmojqxvxqmwkb/auth/users) → Authentication → Users, and change that password to something stronger once you've confirmed everything works. I generated it exactly as you asked, but `byh@ayush` / `byhayush` is easy to guess.

## What you can edit from /admin

- **Portfolio** — add/edit/delete projects, tags, links, case study & GitHub buttons
- **Pricing** — plans, features, "Most Popular" highlight
- **FAQ** — questions & answers
- **About Values** — the 8 value cards (icon name from lucide-react + title + description)
- **Site Settings** — hero headline/subtext/stats, about bio paragraphs, contact email/Telegram
- **Messages** — every contact form submission, mark read/unread, delete

Deleting content from `/admin` is permanent — there's a confirm step but no undo.

## Deploying

This is a standard Vite + React app. `vercel.json` is included so the `/admin` route resolves correctly on Vercel (SPA rewrite). If you deploy elsewhere (Netlify, etc.), make sure your host has an equivalent "redirect all routes to index.html" rule.

## Database

All tables, RLS policies, and seed content were created directly in your Supabase project via migration — nothing further to run. If you ever want to see the schema, check Supabase Dashboard → Database → Tables (`portfolio_projects`, `pricing_plans`, `faqs`, `about_values`, `site_settings`, `contact_submissions`).
