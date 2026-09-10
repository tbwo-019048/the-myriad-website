'use client';

import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ExternalLink, FilePlus2, LogOut, Save, Shield, Upload } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { BrandMark } from './brand-mark';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type AdminTable = {
  table: string;
  label: string;
  description: string;
  titleField: string;
  seed: Record<string, unknown>;
};

const editors: AdminTable[] = [
  { table: 'homepage_sections', label: 'Homepage', description: 'Hero, calls to action and featured content.', titleField: 'section_key', seed: { section_key: 'hero', heading: '', supporting_text: '', is_published: true, display_order: 0 } },
  { table: 'series', label: 'Series', description: 'Series introductions and order.', titleField: 'name', seed: { name: '', slug: '', description: '', status: 'Active', is_published: false, display_order: 0 } },
  { table: 'books', label: 'Books', description: 'Titles, release states, synopsis and cover media.', titleField: 'title', seed: { title: '', slug: '', publication_status: 'Announced', release_label: '', is_published: false, display_order: 0 } },
  { table: 'character_groups', label: 'Groups', description: 'Dynamic personnel classifications.', titleField: 'name', seed: { name: '', description: '', is_published: true, display_order: 0 } },
  { table: 'characters', label: 'Characters', description: 'Personnel dossiers and relationships.', titleField: 'name', seed: { name: '', slug: '', status: 'Unknown', is_published: false, display_order: 0 } },
  { table: 'news_articles', label: 'News', description: 'Editorial reports, categories and SEO.', titleField: 'title', seed: { title: '', slug: '', summary: '', body: '', is_published: false, display_order: 0 } },
  { table: 'products', label: 'Store', description: 'Catalogue items and external purchase links.', titleField: 'name', seed: { name: '', slug: '', price: 0, availability: 'Available', is_published: false, display_order: 0 } },
  { table: 'social_links', label: 'Social', description: 'Social platforms and display order.', titleField: 'label', seed: { platform: '', label: '', url: '', is_enabled: true, display_order: 0 } },
  { table: 'cross_site_links', label: 'Cross-site', description: 'The configurable Shadowverse promotion.', titleField: 'site_name', seed: { site_name: 'The Shadowverse', label: 'Enter The Shadowverse', promotion_text: '', destination_url: '', is_enabled: true, open_in_new_tab: true } },
  { table: 'site_settings', label: 'Settings', description: 'Global identity, metadata and legal details.', titleField: 'key', seed: { key: '', value: {}, is_public: true } },
];

function Login({ onSession }: { onSession: (session: Session) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    if (data.session) onSession(data.session);
  }

  return (
    <main className="admin-login">
      <section className="login-panel">
        <BrandMark />
        <div className="login-classification"><Shield size={16} /> SECURE CONTENT SYSTEM</div>
        <h1>Authorised personnel only.</h1>
        <p>Sign in with an approved administrator account to manage The Myriad.</p>
        {!isSupabaseConfigured ? (
          <div className="admin-notice"><strong>Supabase connection required</strong><span>Add the project URL and public key to the environment before signing in. Setup instructions are included with the site.</span></div>
        ) : (
          <form onSubmit={signIn}>
            <label htmlFor="admin-email">Email</label><Input id="admin-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            <label htmlFor="admin-password">Password</label><PasswordInput id="admin-password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
            {message && <p role="alert" className="form-error">{message}</p>}
            <Button type="submit" disabled={loading}>{loading ? 'Authenticating…' : 'Secure sign in'}</Button>
          </form>
        )}
        <Link href="/">Return to public site <ExternalLink size={14} /></Link>
      </section>
      <aside className="login-art" aria-hidden="true"><span>ACCESS NODE // LONDON</span><strong>MYR<br />ADM<br />01</strong></aside>
    </main>
  );
}

function RecordEditor({ config }: { config: AdminTable }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [payload, setPayload] = useState(JSON.stringify(config.seed, null, 2));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  async function load() {
    if (!supabase) return;
    const { data, error } = await supabase.from(config.table).select('*').order('display_order', { ascending: true });
    if (error && !error.message.includes('display_order')) {
      setMessage(error.message);
      return;
    }
    setRows(data ?? []);
  }

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    void client.from(config.table).select('*').order('display_order', { ascending: true }).then(({ data }) => setRows(data ?? []));
  }, [config.table]);

  function startNew() {
    setEditingId(null);
    setPayload(JSON.stringify(config.seed, null, 2));
    setOpen(true);
  }

  function startEdit(row: Record<string, unknown>) {
    setEditingId(String(row.id));
    const editable = { ...row };
    delete editable.id;
    delete editable.created_at;
    delete editable.updated_at;
    setPayload(JSON.stringify(editable, null, 2));
    setOpen(true);
  }

  async function save() {
    if (!supabase) return;
    try {
      const parsed = JSON.parse(payload);
      const query = editingId
        ? supabase.from(config.table).update(parsed).eq('id', editingId)
        : supabase.from(config.table).insert(parsed);
      const { error } = await query;
      if (error) throw error;
      setOpen(false);
      setMessage('Record saved.');
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save record.');
    }
  }

  async function move(row: Record<string, unknown>, direction: -1 | 1) {
    if (!supabase || typeof row.display_order !== 'number') return;
    await supabase.from(config.table).update({ display_order: row.display_order + direction }).eq('id', row.id);
    await load();
  }

  return (
    <section className="admin-editor">
      <div className="editor-heading"><div><p className="kicker">CONTENT MODULE</p><h2>{config.label}</h2><p>{config.description}</p></div>
        <Button onClick={startNew}><FilePlus2 /> Add record</Button>
      </div>
      {open && <dialog open className="admin-dialog"><button className="dialog-close" aria-label="Close editor" onClick={() => setOpen(false)}>×</button><header><h3>{editingId ? 'Edit' : 'Add'} {config.label} record</h3><p>Edit the full record payload. Fields follow the supplied Supabase schema.</p></header><Textarea rows={18} value={payload} onChange={(event) => setPayload(event.target.value)} spellCheck={false} /><footer><Button onClick={save}><Save /> Save record</Button></footer></dialog>}
      {message && <output className="admin-message">{message}</output>}
      <div className="admin-table" aria-label={config.label + ' records'}>
        <div className="admin-table-head"><span>Record</span><span>Status</span><span>Order</span><span>Action</span></div>
        {rows.length ? rows.map((row) => <div className="admin-table-row" key={String(row.id)}>
          <button className="record-name" onClick={() => startEdit(row)}>{String(row[config.titleField] ?? row.id)}</button>
          <span>{row.is_published === false || row.is_enabled === false ? 'Draft / disabled' : 'Live'}</span>
          <span className="order-controls"><button aria-label="Move up" onClick={() => move(row, -1)}><ArrowUp size={14} /></button><button aria-label="Move down" onClick={() => move(row, 1)}><ArrowDown size={14} /></button></span>
          <Button variant="outline" onClick={() => startEdit(row)}>Edit</Button>
        </div>) : <div className="admin-empty">No records in this module yet. Add the first record to begin.</div>}
      </div>
    </section>
  );
}

function MediaManager() {
  const [message, setMessage] = useState('');
  async function upload(file: File | null) {
    if (!file || !supabase) return;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = String(Date.now()) + '-' + safeName;
    const { error } = await supabase.storage.from('media').upload(path, file);
    if (error) return setMessage(error.message);
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    await supabase.from('media').insert({ storage_path: path, public_url: data.publicUrl, filename: file.name, mime_type: file.type, alt_text: '' });
    setMessage('Media uploaded and added to the library.');
  }
  return <section className="admin-editor"><div className="editor-heading"><div><p className="kicker">ASSET LIBRARY</p><h2>Media</h2><p>Upload reusable images and artwork to Supabase Storage.</p></div><label className="upload-button"><Upload size={16} /> Upload media<input type="file" accept="image/*,video/*" onChange={(event) => upload(event.target.files?.[0] ?? null)} /></label></div>{message && <p className="admin-message">{message}</p>}<div className="admin-empty">Uploaded files appear here after your Supabase project is connected.</div></section>;
}

function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    async function loadCounts() {
      const client = supabase;
      if (!client) return;
      const tables = ['series', 'books', 'characters', 'news_articles', 'products'];
      const results = await Promise.all(tables.map(async (table) => {
        const { count } = await client.from(table).select('*', { count: 'exact', head: true });
        return [table, count ?? 0] as const;
      }));
      setCounts(Object.fromEntries(results));
    }
    void loadCounts();
  }, []);
  return <section className="admin-editor"><div className="editor-heading"><div><p className="kicker">SYSTEM OVERVIEW</p><h2>Dashboard</h2><p>Published content, drafts and upcoming operations.</p></div></div><div className="dashboard-cards">{[
    ['Series', counts.series], ['Books', counts.books], ['Characters', counts.characters], ['Articles', counts.news_articles], ['Products', counts.products]
  ].map(([label, count], index) => <div key={String(label)}><span>0{index + 1}</span><strong>{count ?? '—'}</strong><small>{label}</small></div>)}</div><div className="admin-empty">Use the modules above to add content, reorder records and control publication status.</div></section>;
}

function AdminWorkspace({ session }: { session: Session }) {
  const [active, setActive] = useState('dashboard');
  const tabs = useMemo(() => ['dashboard', ...editors.map((editor) => editor.table), 'media'], []);
  return (
    <main className="admin-workspace">
      <aside className="admin-sidebar"><BrandMark compact /><div className="admin-user"><span>{session.user.email}</span><small>Authorised administrator</small></div><nav>{tabs.map((tab) => <button className={active === tab ? 'active' : ''} onClick={() => setActive(tab)} key={tab}>{tab === 'dashboard' ? 'Dashboard' : tab === 'media' ? 'Media' : editors.find((item) => item.table === tab)?.label}</button>)}</nav><Button variant="outline" onClick={() => { void supabase?.auth.signOut(); }}><LogOut /> Sign out</Button></aside>
      <div className="admin-main"><header><div><span className="status-dot" /> SECURE SESSION // ACTIVE</div><Link href="/">View public site <ExternalLink size={14} /></Link></header>{active === 'dashboard' ? <Dashboard /> : active === 'media' ? <MediaManager /> : <RecordEditor config={editors.find((editor) => editor.table === active) ?? editors[0]} />}</div>
    </main>
  );
}

export function AdminConsole() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);
  return session ? <AdminWorkspace session={session} /> : <Login onSession={setSession} />;
}
