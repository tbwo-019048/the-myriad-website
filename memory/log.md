# The Myriad Website — Work Log

## 2026-09-09 — Project intake

- Received the full website specification for The Myriad.
- Confirmed the workspace initially contained no site files and was not a Git repository.
- Scaffolded a new OpenAI Sites/Vinext project with the Shadcn add-on.
- Selected the visual direction: premium thriller publishing presented through a restrained contemporary intelligence-dossier language.
- Constraints: Supabase credentials and a Git remote were not supplied. The implementation will include a complete Supabase-ready schema, client integration, admin authentication flow, and local fallback content; publishing/push will be attempted and any credential or remote blocker recorded.

## 2026-09-10 — Full website implementation

- Completed the responsive public site: cinematic homepage, books sequence, individual book files, grouped characters, individual dossiers, intelligence/news index and articles, About Toby, store, privacy notice, social links, footer login and configurable Shadowverse promotion.
- Added original generated hero artwork at public/images/myriad-harbour-hero.png. Prompt direction: premium contemporary espionage editorial; rain-darkened European harbour city at night; lone rooftop operative; charcoal, gunmetal and restrained olive palette; no text, logos, neon or game aesthetics. Generated with the built-in image tool.
- Added Supabase client integration with database-backed public content and local fallback content when environment credentials are absent.
- Added secure Supabase Auth administration with editable content modules, publication controls, ordering controls, cross-site/social settings and Storage media upload.
- Added a complete PostgreSQL schema with UUID entities, content relationships, Row Level Security policies, authorised-admin checks, media bucket policies and updated-at triggers.
- Added setup documentation and environment key template.
- Verified the production build and all representative public/detail/admin routes. Project-owned source passes oxlint; untouched scaffold UI primitives retain their upstream lint warnings.
- The two context-based Shadcn wrappers used for admin tabs/dialogs caused a Vinext renderer conflict; the admin now uses semantic native navigation and dialog controls while retaining Shadcn button/input/textarea primitives.

## 2026-09-10 — Production deployment diagnosis

- Checked https://the-myriad-website.vercel.app/ in a browser and via HTTP: it returns Vercel 404 NOT_FOUND and is not attached to the successful deployment.
- Verified GitHub/Vercel reports commit 830cc08 as successfully deployed.
- Verified the generated deployment URL redirects to Vercel Login, confirming Deployment Protection is enabled rather than the application failing at runtime.
- A second Vercel project/deployment named the-myriad-website-g4im is recorded for the same commit but its generated URL returns 410 GONE.
- Required Vercel-side correction: choose the intended project, assign the-myriad-website.vercel.app as its production domain/alias, and disable Deployment Protection for Production (or allow public access). No source-code change is required for this specific failure.

## 2026-09-10 — Native Vercel/Next.js conversion

- Confirmed the repository was a Cloudflare Worker-oriented Vinext project rather than a native Vercel Next.js application.
- Replaced Vinext development/build/start commands with native Next.js 16.3.4 commands and changed the Node requirement to the supported Next.js baseline.
- Removed Vinext, Wrangler, Vite, Cloudflare Worker types/plugins and the OpenAI Sites hosting record.
- Added the standard Next.js PostCSS configuration and cleaned Cloudflare/Vinext-only TypeScript types.
- Verified native next build completes with TypeScript checking and prerendering.
- Verified the production server returns HTTP 200 for the homepage, all public indexes, representative dynamic book/character/news routes, the store, privacy page and secure admin login.
- Project-owned source passes oxlint after the conversion.
