# Supabase setup

1. Create a Supabase project and run supabase/schema.sql in the SQL editor.
2. Create the administrator in Authentication → Users.
3. Copy that user UUID into the final insert into public.admin_users statement in the schema comments and run it.
4. Copy .env.example to .env.local, then add the project URL and public anon key.
5. Restart the development server.

Public read access is limited by publication/enabled flags. All content writes and Storage mutations require an authenticated user listed in admin_users.
