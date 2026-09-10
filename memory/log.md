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
