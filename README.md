# Reson8 — synced listening rooms for two

A private, code-gated room where two people listen to a curated playlist in sync, live. Built on a fresh, isolated Supabase project (`couple-sync-listen`) — separate from any other Supabase project you have.

## Pages

- `index.html` — the public homepage. Explains what Reson8 is, how it works, and has a contact section (Telegram link, pulled from a database setting you edit in the admin panel).
- `room.html` — where the code is entered and the synced player lives. Linked from the homepage's "Connect" button.
- `admin.html` — sign-in-gated dashboard: create rooms, upload songs, edit the homepage contact info.

## How it works

- **You (admin)** sign in at `admin.html`, create a room, and upload songs + thumbnails to it. Creating a room generates a random 6-digit code. You also set your Telegram username there — it appears on the public homepage footer automatically.
- **The couple** goes to `room.html` (via the "Connect" button on the homepage), types the code, and lands in a private room with the songs you picked.
- **Sync**: playback state (current song, position, playing/paused) lives in one database row per room. Whoever presses play/pause/skip writes to that row; the other browser is subscribed via Supabase Realtime and snaps to match (position corrected if drift exceeds ~1.2s, which allows for normal network jitter without visible stutter).
- **Presence**: a lightweight Realtime presence channel shows a live green dot + "both of you are here" only when both browsers are actually connected to the room.
- **No accounts for the couple** — the 6-digit code is the only gate. Anyone with the code can join, which is intentional for a gift link, not meant to be bank-grade security.

## One-time setup

1. **Create your admin login.** In the Supabase dashboard (Authentication → Users) for project `couple-sync-listen`, manually add one user with your email + a password. That's your only login — there's no public sign-up.
2. **Host the files.** `index.html`, `admin.html`, `app.js`, `admin.js`, `config.js` are static files — deploy them anywhere (Vercel, Netlify, GitHub Pages, or your existing portfolio host). `admin.html` isn't discoverable from `index.html` — keep its URL private, and remember it's gated by real login, not just an unlisted link.
3. Visit `admin.html`, sign in, create a room, upload songs. Share the resulting code with the couple.

## Forking for multiple couples

Right now this is single-admin, single-project: you curate every room by hand from one dashboard, which is right for a personal/gift use case but won't scale past a handful of rooms before you're the bottleneck. If you outgrow that:
- Each fork = new Supabase project + its own `config.js` values (URL + anon key from that project's API settings) + its own admin user.
- The schema is reproduced below so a fresh project can be brought up in one migration.

## Schema (for reference / re-deploying)

```sql
create table settings (
  key text primary key,
  value text
);
-- seed row: insert into settings (key, value) values ('telegram_username', '');

create table rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  couple_name text,
  created_at timestamptz default now(),
  active boolean default true
);

create table songs (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references rooms(id) on delete cascade,
  title text not null,
  artist text,
  audio_url text not null,
  thumbnail_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table playback_state (
  room_id uuid primary key references rooms(id) on delete cascade,
  current_song_id uuid references songs(id),
  is_playing boolean default false,
  position_seconds numeric default 0,
  updated_at timestamptz default now()
);
```

RLS: anyone can `select` (access is gated by the code, not by RLS — don't rely on this for anything more sensitive than mixtapes). Only an authenticated admin can insert/update rooms and songs. Both partners (anonymous) can update `playback_state`, since that's the shared control.

## What's genuinely simple here vs. what to watch

- **Simple:** room codes, admin CRUD, storage uploads, presence dot.
- **The one real complication:** sync drift. This nudges two independent audio players to stay aligned (~1 second tolerance) — it is not sample-accurate synced audio, and shouldn't be treated as one. Good enough for "listening together," not a broadcast.
- **Storage limits:** Supabase's free tier caps storage and bandwidth. Fine for one or a few couples' worth of songs; if you fork this for many people, watch your usage.
