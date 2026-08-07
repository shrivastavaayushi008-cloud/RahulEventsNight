'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  LayoutDashboard, Calendar, Image, MessageSquare, Users, Settings,
  LogOut, Menu, X, Sparkles, Plus, Pencil, Trash2, Check, Mail, Phone, Loader2,
  Music, Youtube, Star, Mic, Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ImageUpload } from '@/components/site/image-upload';
import type { Route } from '@/lib/types';

interface AdminPageProps {
  navigate: (r: Route) => void;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

type Tab = 'dashboard' | 'events' | 'gallery' | 'artists' | 'videos' | 'upcoming' | 'testimonials' | 'inquiries' | 'settings';

export function AdminPage({ navigate }: AdminPageProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then(r => (r.ok ? r.json() : Promise.reject(r)))
      .then(d => setAdmin(d.admin))
      .catch(() => setAdmin(null))
      .finally(() => setChecking(false));
  }, []);

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setAdmin(null);
    navigate('home');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!admin) {
    return <LoginScreen onSuccess={a => setAdmin(a)} navigate={navigate} />;
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'artists', label: 'Artists', icon: Music },
    { id: 'videos', label: 'Videos', icon: Youtube },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
    { id: 'testimonials', label: 'Testimonials', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-gold/20 flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-5 border-b border-gold/10 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <div>
            <div className="font-display text-sm font-bold text-foreground">RahulEventsNight</div>
            <div className="text-[10px] uppercase tracking-wider text-foreground/40">Admin Panel</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-foreground/60">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scroll-gold">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSidebarOpen(false); }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                tab === t.id ? 'bg-gold-gradient text-white font-medium' : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gold/10">
          <div className="px-3 py-2 mb-2">
            <div className="text-xs text-foreground/40">Signed in as</div>
            <div className="text-sm text-foreground font-medium truncate">{admin.name}</div>
            <div className="text-xs text-foreground/40 truncate">{admin.email}</div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-20 bg-card border-b border-gold/20 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-display font-bold text-foreground">Admin</span>
          <span className="w-6" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {tab === 'dashboard' && <DashboardTab onNavigate={setTab} />}
          {tab === 'events' && <EventsTab />}
          {tab === 'gallery' && <GalleryTab />}
          {tab === 'artists' && <ArtistsTab />}
          {tab === 'videos' && <VideosTab />}
          {tab === 'upcoming' && <UpcomingTab />}
          {tab === 'testimonials' && <TestimonialsTab />}
          {tab === 'inquiries' && <InquiriesTab />}
          {tab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Login ----------------------------- */
function LoginScreen({ onSuccess, navigate }: { onSuccess: (a: AdminUser) => void; navigate: (r: Route) => void }) {
  const [email, setEmail] = useState('admin@rahuleventsnight.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true); setErr('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Login failed');
      }
      const d = await res.json();
      toast({ title: 'Welcome back!', description: d.admin.name });
      onSuccess(d.admin);
    } catch (e: any) {
      setErr(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots opacity-30" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient shadow-gold mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Login</h1>
          <p className="mt-2 text-sm text-foreground/50">RahulEventsNight Management Panel</p>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-gold/20 bg-card p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80">Email</Label>
            <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="bg-background border-gold/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground/80">Password</Label>
            <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="bg-background border-gold/20" />
          </div>
          {err && <div className="text-sm text-red-400 bg-red-500/10 rounded-md px-3 py-2">{err}</div>}
          <Button type="submit" disabled={loading} className="w-full bg-gold-gradient text-white hover:opacity-90 font-semibold shadow-gold h-11">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
          </Button>
          <div className="text-xs text-foreground/40 text-center pt-2 border-t border-gold/10">
            Demo credentials are pre-filled. Click Sign In to continue.
          </div>
        </form>
        <button onClick={() => navigate('home')} className="mt-5 w-full text-center text-sm text-foreground/50 hover:text-gold transition-colors">
          ← Back to website
        </button>
      </div>
    </div>
  );
}

/* ----------------------------- Dashboard ----------------------------- */
function DashboardTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [stats, setStats] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats', { credentials: 'include' }).then(r => r.json()).then(setStats).catch(() => {});
    fetch('/api/admin/inquiries', { credentials: 'include' }).then(r => r.json()).then(d => setRecent((d.items || []).slice(0, 5))).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Events', value: stats?.events ?? '—', icon: Calendar, tab: 'events' as Tab },
    { label: 'Gallery Items', value: stats?.gallery ?? '—', icon: Image, tab: 'gallery' as Tab },
    { label: 'Artists', value: stats?.artists ?? '—', icon: Music, tab: 'artists' as Tab },
    { label: 'Videos', value: stats?.videos ?? '—', icon: Youtube, tab: 'videos' as Tab },
    { label: 'New Inquiries', value: stats?.newInquiries ?? '—', icon: MessageSquare, tab: 'inquiries' as Tab },
    { label: 'Testimonials', value: stats?.testimonials ?? '—', icon: Users, tab: 'testimonials' as Tab },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-foreground/60">Overview of your event management platform.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <button key={c.label} onClick={() => onNavigate(c.tab)} className="text-left rounded-2xl border border-gold/15 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-gold/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <c.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-display text-3xl font-bold">{c.value}</div>
            <div className="text-xs text-foreground/60 uppercase tracking-wider mt-1">{c.label}</div>
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-gold/15 bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold">Recent Inquiries</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('inquiries')}>View all</Button>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-foreground/60 py-8 text-center">No inquiries yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map(i => (
              <li key={i.id} className="py-3 flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold font-semibold text-sm">{i.name.charAt(0)}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{i.name}</div>
                  <div className="text-xs text-foreground/60 truncate">{i.eventType || 'General'} · {i.email}</div>
                </div>
                <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium',
                  i.status === 'new' && 'bg-gold/15 text-gold',
                  i.status === 'contacted' && 'bg-blue-500/15 text-blue-400',
                  i.status === 'closed' && 'bg-green-500/15 text-green-400')}>
                  {i.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- Inquiries ----------------------------- */
function InquiriesTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/inquiries', { credentials: 'include' }).then(r => r.json()).then(d => setItems(d.items || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/inquiries/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }), credentials: 'include' });
    toast({ title: 'Status updated' }); load();
  };
  const remove = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE', credentials: 'include' });
    toast({ title: 'Inquiry deleted' }); load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Inquiries</h1>
        <p className="text-sm text-foreground/60">{items.length} total · {items.filter(i => i.status === 'new').length} new</p>
      </div>
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 rounded-2xl bg-card animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-gold/15 bg-card p-12 text-center text-foreground/60">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-50" /> No inquiries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(i => (
            <div key={i.id} className="rounded-2xl border border-gold/15 bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold font-bold">{i.name.charAt(0)}</div>
                  <div className="min-w-0">
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-xs text-foreground/60 flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                      {i.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{i.email}</span>}
                      {i.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{i.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select value={i.status} onChange={e => updateStatus(i.id, e.target.value)} className="text-xs h-8 rounded-md border border-input bg-background px-2">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button onClick={() => remove(i.id)} className="p-2 rounded-md text-red-400 hover:bg-red-500/10" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-4 grid sm:grid-cols-3 gap-2 text-xs">
                {i.eventType && <div><span className="text-foreground/50">Type:</span> {i.eventType}</div>}
                {i.eventDate && <div><span className="text-foreground/50">Date:</span> {new Date(i.eventDate).toLocaleDateString('en-IN')}</div>}
                <div><span className="text-foreground/50">Received:</span> {new Date(i.createdAt).toLocaleDateString('en-IN')}</div>
              </div>
              <p className="mt-3 text-sm bg-foreground/5 rounded-lg p-3">{i.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Events ----------------------------- */
function EventsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/events', { credentials: 'include' }).then(r => r.json()).then(d => setItems(d.events || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE', credentials: 'include' });
    toast({ title: 'Event deleted' }); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Events</h1>
          <p className="text-sm text-foreground/60">{items.length} events</p>
        </div>
        <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> Add Event</Button>
      </div>
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-48 rounded-2xl bg-card animate-pulse" />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(e => (
            <div key={e.id} className="rounded-2xl border border-gold/15 bg-card overflow-hidden">
              <div className="relative aspect-video">
                <img src={e.coverImage} alt={e.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-gradient text-white font-semibold">{e.category}</span>
                  {e.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-maroon/70 text-gold">★</span>}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2">{e.title}</h3>
                <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{e.description}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(e)} className="flex-1"><Pencil className="h-3.5 w-3.5 mr-1" /> Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => remove(e.id)} className="text-red-400 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {(editing || creating) && <EventModal event={editing} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { setEditing(null); setCreating(false); load(); }} />}
    </div>
  );
}

function EventModal({ event, onClose, onSaved }: { event: any; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: event?.title || '', slug: event?.slug || '', category: event?.category || 'Spiritual',
    subCategory: event?.subCategory || '', description: event?.description || '', longDesc: event?.longDesc || '',
    coverImage: event?.coverImage || '/images/events/jagran.jpg', eventDate: event?.eventDate || '', location: event?.location || '',
    featured: event?.featured || false, published: event?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const save = async () => {
    setSaving(true);
    try {
      const url = event ? `/api/admin/events/${event.id}` : '/api/admin/events';
      const method = event ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form), credentials: 'include' });
      if (!res.ok) throw new Error('Save failed');
      toast({ title: event ? 'Event updated' : 'Event created' });
      onSaved();
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-gold/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scroll-gold" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold">{event ? 'Edit Event' : 'New Event'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-foreground/10 rounded-md"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: form.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })} /></div>
            <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['Spiritual', 'Singing', 'Wedding', 'Family', 'Corporate', 'Stage Shows'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2"><Label>Sub-Category</Label><Input value={form.subCategory} onChange={e => setForm({ ...form, subCategory: e.target.value })} placeholder="e.g. Jagran, Track Singing" /></div>
          </div>
          <div className="space-y-2"><Label>Short Description</Label><Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div className="space-y-2"><Label>Long Description</Label><Textarea rows={4} value={form.longDesc} onChange={e => setForm({ ...form, longDesc: e.target.value })} /></div>
          <ImageUpload label="Cover Image" value={form.coverImage} onChange={url => setForm({ ...form, coverImage: url })} folder="events" aspect="aspect-[4/3]" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Event Date</Label><Input type="date" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} /></div>
            <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-[var(--gold)]" /> Featured</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-[var(--gold)]" /> Published</label>
          </div>
        </div>
        <div className="p-5 border-t border-gold/10 flex justify-end gap-2 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-gold-gradient text-white hover:opacity-90">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
            {event ? 'Save Changes' : 'Create Event'}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Gallery ----------------------------- */
function GalleryTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/gallery', { credentials: 'include' }).then(r => r.json()).then(d => setItems(d.items || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE', credentials: 'include' });
    toast({ title: 'Item deleted' }); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl sm:text-3xl font-bold">Gallery</h1><p className="text-sm text-foreground/60">{items.length} items</p></div>
        <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> Add Item</Button>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square rounded-xl bg-card animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map(g => (
            <div key={g.id} className="group relative rounded-xl overflow-hidden border border-gold/15 bg-card aspect-square">
              <img src={g.thumbnail || g.url} alt={g.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end gap-1">
                  <button onClick={() => remove(g.id)} className="p-1.5 rounded-md bg-red-500/80 text-white hover:bg-red-500" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
                <div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-gradient text-white font-semibold">{g.category}</span>
                  <div className="text-xs text-white mt-1 line-clamp-2">{g.title}</div>
                </div>
              </div>
              {g.type === 'video' && <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-maroon/60 text-[10px] text-gold">Video</div>}
            </div>
          ))}
        </div>
      )}
      {creating && <GalleryModal onClose={() => setCreating(false)} onSaved={() => { setCreating(false); load(); }} />}
    </div>
  );
}

function GalleryModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: '', category: 'Spiritual', type: 'photo' as 'photo' | 'video',
    url: '/images/events/jagran.jpg', thumbnail: '', youtubeId: '', description: '', eventDate: '', location: '', published: true,
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, thumbnail: form.thumbnail || form.url, youtubeId: form.youtubeId || null }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Save failed');
      toast({ title: 'Gallery item added' }); onSaved();
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-gold/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scroll-gold" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold">New Gallery Item</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-foreground/10 rounded-md"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['Spiritual', 'Singing', 'Wedding', 'Family', 'Corporate', 'Stage Shows'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
          <ImageUpload label="Image / Poster" value={form.url} onChange={url => setForm({ ...form, url: url, thumbnail: url })} folder="gallery" aspect="aspect-[4/3]" />
          {form.type === 'video' && (
            <div className="space-y-2"><Label>YouTube Video ID</Label><Input value={form.youtubeId} onChange={e => setForm({ ...form, youtubeId: e.target.value })} placeholder="e.g. dQw4w9WgXcQ" /></div>
          )}
          <div className="space-y-2"><Label>Description</Label><Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
        </div>
        <div className="p-5 border-t border-gold/10 flex justify-end gap-2 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-gold-gradient text-white hover:opacity-90">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />} Add Item
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Artists ----------------------------- */
function ArtistsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/artists', { credentials: 'include' }).then(r => r.json()).then(d => setItems(d.items || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this artist?')) return;
    await fetch(`/api/admin/artists/${id}`, { method: 'DELETE', credentials: 'include' });
    toast({ title: 'Artist deleted' }); load();
  };

  const toggleFeatured = async (a: any) => {
    await fetch(`/api/admin/artists/${a.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ featured: !a.featured }), credentials: 'include' });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl sm:text-3xl font-bold">Artists</h1><p className="text-sm text-foreground/60">{items.length} artists</p></div>
        <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> Add Artist</Button>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-card animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(a => (
            <div key={a.id} className="rounded-2xl border border-gold/15 bg-card overflow-hidden">
              <div className="aspect-square relative">
                <img src={a.avatar} alt={a.name} className="h-full w-full object-cover" loading="lazy" />
                {a.featured && <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2 py-0.5 text-[10px] font-bold text-white"><Star className="h-2.5 w-2.5 fill-white" /> Top</span>}
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm">{a.name}</div>
                <div className="text-xs text-gold">{a.role}</div>
                {a.specialty && <div className="text-xs text-foreground/50 mt-0.5">{a.specialty}</div>}
                <div className="mt-2 flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => toggleFeatured(a)} className="h-7 px-2 text-xs">{a.featured ? 'Unfeature' : 'Feature'}</Button>
                  <Button size="sm" variant="outline" onClick={() => remove(a.id)} className="text-red-400 hover:text-red-400 h-7 px-2"><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {creating && <ArtistModal onClose={() => setCreating(false)} onSaved={() => { setCreating(false); load(); }} />}
    </div>
  );
}

function ArtistModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: '', role: 'Singer', specialty: '', bio: '', avatar: '/images/artists/artist-1.jpg', phone: '', order: 0, featured: false, published: true });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/artists', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, social: {}, order: Number(form.order) }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Save failed');
      toast({ title: 'Artist added' }); onSaved();
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-gold/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scroll-gold" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold">New Artist</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-foreground/10 rounded-md"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>Role</Label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['Singer', 'Anchor', 'Musician', 'Band Member'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2"><Label>Specialty</Label><Input value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} placeholder="e.g. Bhajan, Bollywood, Sufi" /></div>
          <ImageUpload label="Singer/Artist Photo" value={form.avatar} onChange={url => setForm({ ...form, avatar: url })} folder="artists" aspect="aspect-square" />
          <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="9999999999" /></div>
          <div className="space-y-2"><Label>Bio</Label><Textarea rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} /></div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-[var(--gold)]" /> Featured</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-[var(--gold)]" /> Published</label>
          </div>
        </div>
        <div className="p-5 border-t border-gold/10 flex justify-end gap-2 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-gold-gradient text-white hover:opacity-90">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />} Add Artist
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Videos ----------------------------- */
function VideosTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/videos', { credentials: 'include' }).then(r => r.json()).then(d => setItems(d.items || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    await fetch(`/api/admin/videos/${id}`, { method: 'DELETE', credentials: 'include' });
    toast({ title: 'Video deleted' }); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl sm:text-3xl font-bold">Videos</h1><p className="text-sm text-foreground/60">{items.length} videos</p></div>
        <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> Add Video</Button>
      </div>
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-video rounded-2xl bg-card animate-pulse" />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(v => (
            <div key={v.id} className="rounded-2xl border border-gold/15 bg-card overflow-hidden">
              <div className="relative aspect-video">
                <img src={v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`} alt={v.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute top-2 left-2"><span className="text-[10px] px-2 py-0.5 rounded-full bg-maroon/80 backdrop-blur text-gold font-semibold">{v.category}</span></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-1">{v.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-foreground/50"><Youtube className="h-3.5 w-3.5 text-gold" /> {v.youtubeId}</div>
                <Button size="sm" variant="outline" onClick={() => remove(v.id)} className="mt-3 text-red-400 hover:text-red-400 w-full"><Trash2 className="h-3.5 w-3.5 mr-1" /> Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {creating && <VideoModal onClose={() => setCreating(false)} onSaved={() => { setCreating(false); load(); }} />}
    </div>
  );
}

function VideoModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ title: '', category: 'Spiritual', youtubeId: '', description: '', published: true });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), credentials: 'include',
      });
      if (!res.ok) throw new Error('Save failed');
      toast({ title: 'Video added' }); onSaved();
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-gold/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scroll-gold" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold">New Video</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-foreground/10 rounded-md"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="space-y-2">
            <Label>Category</Label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {['Spiritual', 'Singing', 'Wedding', 'Family', 'Corporate', 'Stage Shows'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2"><Label>YouTube Video ID</Label><Input value={form.youtubeId} onChange={e => setForm({ ...form, youtubeId: e.target.value })} placeholder="e.g. dQw4w9WgXcQ" /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-[var(--gold)]" /> Published</label>
        </div>
        <div className="p-5 border-t border-gold/10 flex justify-end gap-2 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-gold-gradient text-white hover:opacity-90">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />} Add Video
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Upcoming Events ----------------------------- */
function UpcomingTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/upcoming', { credentials: 'include' }).then(r => r.json()).then(d => setItems(d.items || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/admin/upcoming/${id}`, { method: 'DELETE', credentials: 'include' });
    toast({ title: 'Event deleted' }); load();
  };

  const toggleBooking = async (u: any) => {
    await fetch(`/api/admin/upcoming/${u.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookingOpen: !u.bookingOpen }), credentials: 'include' });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl sm:text-3xl font-bold">Upcoming Events</h1><p className="text-sm text-foreground/60">{items.length} scheduled</p></div>
        <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> Add Event</Button>
      </div>
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 rounded-2xl bg-card animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-gold/15 bg-card p-12 text-center text-foreground/60"><Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" /> No upcoming events.</div>
      ) : (
        <div className="space-y-3">
          {items.map(u => (
            <div key={u.id} className="rounded-2xl border border-gold/15 bg-card p-4 flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gold-gradient text-white shrink-0">
                <span className="font-display text-xl font-bold leading-none">{new Date(u.eventDate).getDate()}</span>
                <span className="text-[10px] uppercase">{new Date(u.eventDate).toLocaleDateString('en-IN', { month: 'short' })}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{u.title}</h3>
                <div className="text-xs text-foreground/60 mt-0.5">{u.venue}{u.city ? `, ${u.city}` : ''} · {u.eventTime || ''}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', u.bookingOpen ? 'bg-green-500/15 text-green-400' : 'bg-foreground/10 text-foreground/50')}>
                  {u.bookingOpen ? 'Booking Open' : 'Closed'}
                </span>
                <Button size="sm" variant="outline" onClick={() => toggleBooking(u)} className="h-7 px-2 text-xs">Toggle</Button>
                <Button size="sm" variant="outline" onClick={() => remove(u.id)} className="text-red-400 hover:text-red-400 h-7 px-2"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {creating && <UpcomingModal onClose={() => setCreating(false)} onSaved={() => { setCreating(false); load(); }} />}
    </div>
  );
}

function UpcomingModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ title: '', category: 'Spiritual', eventDate: '', eventTime: '', venue: '', city: '', description: '', coverImage: '/images/events/jagran.jpg', bookingOpen: true, published: true });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/upcoming', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), credentials: 'include',
      });
      if (!res.ok) throw new Error('Save failed');
      toast({ title: 'Event added' }); onSaved();
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-gold/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scroll-gold" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold">New Upcoming Event</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-foreground/10 rounded-md"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['Spiritual', 'Singing', 'Wedding', 'Family', 'Corporate', 'Stage Shows'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2"><Label>Date</Label><Input type="date" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Time</Label><Input value={form.eventTime} onChange={e => setForm({ ...form, eventTime: e.target.value })} placeholder="08:00 PM" /></div>
            <div className="space-y-2"><Label>City</Label><Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Venue</Label><Input value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} /></div>
          <ImageUpload label="Cover Image" value={form.coverImage} onChange={url => setForm({ ...form, coverImage: url })} folder="upcoming" aspect="aspect-[4/3]" />
          <div className="space-y-2"><Label>Description</Label><Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.bookingOpen} onChange={e => setForm({ ...form, bookingOpen: e.target.checked })} className="accent-[var(--gold)]" /> Booking Open</label>
        </div>
        <div className="p-5 border-t border-gold/10 flex justify-end gap-2 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-gold-gradient text-white hover:opacity-90">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />} Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Testimonials ----------------------------- */
function TestimonialsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/testimonials', { credentials: 'include' }).then(r => r.json()).then(d => setItems(d.items || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE', credentials: 'include' });
    toast({ title: 'Testimonial deleted' }); load();
  };
  const togglePublish = async (t: any) => {
    await fetch(`/api/admin/testimonials/${t.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !t.published }), credentials: 'include' });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl sm:text-3xl font-bold">Testimonials</h1><p className="text-sm text-foreground/60">{items.length} testimonials</p></div>
        <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </div>
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 rounded-2xl bg-card animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-gold/15 bg-card p-12 text-center text-foreground/60">No testimonials yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map(t => (
            <div key={t.id} className="rounded-2xl border border-gold/15 bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold font-bold">{t.name.charAt(0)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-foreground/60">{t.role}{t.company ? `, ${t.company}` : ''}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < t.rating ? 'text-gold' : 'text-foreground/20'}>★</span>)}</div>
                      <button onClick={() => togglePublish(t)} className={cn('text-xs px-2 py-0.5 rounded-full', t.published ? 'bg-green-500/15 text-green-400' : 'bg-foreground/10 text-foreground/50')}>
                        {t.published ? 'Published' : 'Hidden'}
                      </button>
                      <button onClick={() => remove(t.id)} className="p-1.5 rounded-md text-red-400 hover:bg-red-500/10"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm italic text-foreground/70">&ldquo;{t.message}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {creating && <TestimonialModal onClose={() => setCreating(false)} onSaved={() => { setCreating(false); load(); }} />}
    </div>
  );
}

function TestimonialModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: '', role: '', company: '', rating: 5, message: '', event: '', published: true });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form), credentials: 'include' });
      if (!res.ok) throw new Error('Save failed');
      toast({ title: 'Testimonial added' }); onSaved();
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-gold/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scroll-gold" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold">New Testimonial</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-foreground/10 rounded-md"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Role</Label><Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Event</Label><Input value={form.event} onChange={e => setForm({ ...form, event: e.target.value })} /></div>
            <div className="space-y-2"><Label>Rating</Label>
              <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} stars</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2"><Label>Message</Label><Textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-[var(--gold)]" /> Published</label>
        </div>
        <div className="p-5 border-t border-gold/10 flex justify-end gap-2 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-gold-gradient text-white hover:opacity-90">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />} Add Testimonial
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Settings ----------------------------- */
function SettingsTab() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCat, setUploadingCat] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/admin/settings', { credentials: 'include' }).then(r => r.json()).then(d => setSettings(d.settings || {})).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings }), credentials: 'include' });
      toast({ title: 'Settings saved' });
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  // Category images stored as JSON in settings.categoryImages
  const categoryImages: Record<string, string> = (() => {
    try {
      const raw = settings.categoryImages;
      if (!raw) return {};
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch { return {}; }
  })();

  const setCategoryImage = (cat: string, url: string) => {
    const updated = { ...categoryImages, [cat]: url };
    setSettings({ ...settings, categoryImages: JSON.stringify(updated) });
  };

  const handleCatImageUpload = async (cat: string, file: File) => {
    setUploadingCat(cat);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'categories');
      const res = await fetch('/api/upload', { method: 'POST', body: formData, credentials: 'include' });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setCategoryImage(cat, data.url);
      toast({ title: 'Image uploaded' });
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.message, variant: 'destructive' });
    } finally {
      setUploadingCat(null);
    }
  };

  if (loading) return <div className="h-64 rounded-2xl bg-card animate-pulse" />;

  const fields: { key: string; label: string }[] = [
    { key: 'companyName', label: 'Company Name' },
    { key: 'companyNameHindi', label: 'Company Name (Hindi)' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'taglineHindi', label: 'Tagline (Hindi)' },
    { key: 'tagline2', label: 'Tagline 2' },
    { key: 'phone', label: 'Phone (for tel: links)' },
    { key: 'phoneDisplay', label: 'Phone Display' },
    { key: 'whatsapp', label: 'WhatsApp Number' },
    { key: 'email', label: 'Email' },
    { key: 'website', label: 'Website' },
    { key: 'address', label: 'Address' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'facebook', label: 'Facebook URL' },
    { key: 'youtube', label: 'YouTube URL' },
    { key: 'stats_events', label: 'Stats: Events' },
    { key: 'stats_clients', label: 'Stats: Clients' },
    { key: 'stats_years', label: 'Stats: Years' },
    { key: 'stats_artists', label: 'Stats: Artists' },
  ];

  const categoryList = [
    { key: 'Spiritual', label: 'Spiritual Events', icon: '🛕' },
    { key: 'Singing', label: 'Singing Events', icon: '🎤' },
    { key: 'Wedding', label: 'Wedding Events', icon: '💍' },
    { key: 'Family', label: 'Family Events', icon: '🎉' },
    { key: 'Corporate', label: 'Corporate Events', icon: '🏢' },
    { key: 'Stage Shows', label: 'Stage Shows', icon: '🎭' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-sm text-foreground/60">Manage site-wide contact details and stats.</p>
      </div>

      {/* General Settings */}
      <div className="rounded-2xl border border-gold/15 bg-card p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold mb-4">General Settings</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key} className="space-y-2">
              <Label>{f.label}</Label>
              <Input value={settings[f.key] || ''} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })} />
            </div>
          ))}
        </div>
      </div>

      {/* Category Images */}
      <div className="rounded-2xl border border-gold/15 bg-card p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold mb-1">Event Category Images</h2>
        <p className="text-sm text-foreground/60 mb-4">Upload background images for each category card on the home page. If no image is set, the emoji icon will be used.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryList.map(cat => (
            <div key={cat.key} className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium text-sm">{cat.label}</span>
              </div>
              {categoryImages[cat.key] ? (
                <div className="relative mb-3 rounded-lg overflow-hidden aspect-[4/3]">
                  <img src={categoryImages[cat.key]} alt={cat.label} className="h-full w-full object-cover" loading="lazy" />
                  <button
                    onClick={() => setCategoryImage(cat.key, '')}
                    className="absolute top-1 right-1 p-1.5 rounded-md bg-red-500/80 text-white hover:bg-red-500"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mb-3 rounded-lg border-2 border-dashed border-border aspect-[4/3] flex items-center justify-center text-foreground/30">
                  <Image className="h-8 w-8" />
                </div>
              )}
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleCatImageUpload(cat.key, file);
                  }}
                />
                <span className="inline-flex items-center justify-center w-full h-9 rounded-md bg-gold-gradient text-white text-sm font-medium cursor-pointer hover:opacity-90">
                  {uploadingCat === cat.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <>
                    <Plus className="h-4 w-4 mr-1" /> Upload Image
                  </>}
                </span>
              </label>
              <Input
                className="mt-2 text-xs"
                placeholder="or paste image URL"
                value={categoryImages[cat.key] || ''}
                onChange={e => setCategoryImage(cat.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={save} disabled={saving} className="bg-gold-gradient text-white hover:opacity-90">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />} Save All Settings
        </Button>
      </div>
    </div>
  );
}
