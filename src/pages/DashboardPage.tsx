import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Calendar, Wallet, Briefcase, MessageSquare, Settings,
  LifeBuoy, TrendingUp, Star, Plane, Bell, LogOut, Eye, CheckCircle2,
  Clock, XCircle, Camera, Edit3, Plus, BarChart2,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { SpecBadge } from '../components/Badges';
import { useStore, useCurrentCreator } from '../lib/store';
import type { BookingStatus } from '../types';

type Tab = 'overview' | 'bookings' | 'earnings' | 'portfolio' | 'reviews';

const STATUS_ICON: Record<BookingStatus, React.ReactNode> = {
  accepted:  <CheckCircle2 size={13} className="text-ok" />,
  pending:   <Clock size={13} className="text-warn" />,
  completed: <CheckCircle2 size={13} className="text-signal" />,
  cancelled: <XCircle size={13} className="text-danger" />,
};
const STATUS_COLOR: Record<BookingStatus, string> = {
  accepted:  'text-ok border-ok/30 bg-ok/10',
  pending:   'text-warn border-warn/30 bg-warn/10',
  completed: 'text-signal border-signal/30 bg-signal/10',
  cancelled: 'text-danger border-danger/30 bg-danger/10',
};

function StatCard({ label, value, delta, tone = 'ok', icon }: { label: string; value: string; delta?: string; tone?: 'ok' | 'muted' | 'signal'; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-6 relative overflow-hidden group hover:border-signal/30 transition-colors">
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity text-signal">{icon}</div>
      <div className="text-xs uppercase tracking-wider text-text-faint mb-3 font-mono">{label}</div>
      <div className="font-display text-3xl font-bold mb-1">{value}</div>
      {delta && (
        <div className={`text-xs flex items-center gap-1 ${tone === 'ok' ? 'text-ok' : tone === 'signal' ? 'text-signal' : 'text-text-faint'}`}>
          {tone === 'ok' && <TrendingUp size={11} />}{delta}
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, title, body, cta, to }: { icon: React.ReactNode; title: string; body: string; cta?: string; to?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-text-faint"
        style={{ background: 'rgba(99,179,237,.08)', border: '1px solid rgba(99,179,237,.12)' }}>
        {icon}
      </div>
      <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
      <p className="text-text-dim text-sm max-w-xs leading-relaxed mb-6">{body}</p>
      {cta && to && (
        <Link to={to} className="bg-signal text-ink font-bold px-6 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
          {cta} <Plus size={14} />
        </Link>
      )}
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { setAuthUser, toggleAvailability } = useStore();
  const creator = useCurrentCreator();
  const [tab, setTab] = useState<Tab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuthUser(null);
    navigate('/login');
  };

  // Not logged in / no profile yet
  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'transparent' }}>
        <div className="text-center max-w-md animate-fade-up">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)', boxShadow: '0 16px 40px rgba(99,179,237,.3)' }}>
            <Camera size={32} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-black mb-3">Set up your profile</h1>
          <p className="text-text-dim text-sm leading-relaxed mb-8">
            Complete your creator profile to start appearing in search results and receiving bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="bg-signal text-ink font-bold px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2">
              <Plus size={16} /> Complete Profile
            </Link>
            <Link to="/login" className="border border-line text-text-dim font-semibold px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:border-signal hover:text-signal transition-colors">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const NAV_TABS: { id: Tab; icon: typeof LayoutGrid; label: string }[] = [
    { id: 'overview', icon: LayoutGrid, label: 'Overview' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'earnings', icon: Wallet, label: 'Earnings' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'reviews', icon: Star, label: 'Reviews' },
  ];

  const pendingCount = creator.bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen flex" style={{ background: 'transparent' }}>

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-line bg-panel px-5 py-7 sticky top-0 h-screen z-10">
        <Logo />
        <nav className="flex flex-col gap-1 mt-10 flex-1">
          {NAV_TABS.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all w-full text-left relative ${
                tab === id ? 'bg-signal/10 text-signal-bright' : 'text-text-dim hover:bg-panel-raised hover:text-text'
              }`}>
              <Icon size={17} /> {label}
              {id === 'bookings' && pendingCount > 0 && (
                <span className="ml-auto bg-warn text-ink text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
          <div className="text-xs uppercase tracking-wider text-text-faint px-3.5 mt-6 mb-2 font-mono">Account</div>
          <Link to="/register"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-text-dim hover:bg-panel-raised hover:text-text transition-colors">
            <Settings size={17} /> Edit Profile
          </Link>
          <Link to="/support"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-text-dim hover:bg-panel-raised hover:text-text transition-colors">
            <LifeBuoy size={17} /> Support
          </Link>
        </nav>

        {/* Profile footer */}
        <div className="border-t border-line pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            {/* Availability toggle */}
            <div className="flex items-center gap-2">
              <button onClick={() => toggleAvailability(creator.id)}
                className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${creator.isAvailable ? 'bg-signal' : 'bg-line'}`}>
                <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${creator.isAvailable ? 'translate-x-5' : ''}`} />
              </button>
              <span className="text-xs text-text-dim">{creator.isAvailable ? 'Available' : 'Hidden'}</span>
            </div>
            <button onClick={handleLogout} title="Log out"
              className="text-text-faint hover:text-danger transition-colors p-1.5 rounded-lg hover:bg-danger/10">
              <LogOut size={15} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 pulse-ring"
              style={{ backgroundColor: creator.avatarColor }}>
              {creator.avatarInitials}
            </div>
            <div>
              <div className="text-sm font-semibold truncate max-w-[140px]">{creator.name}</div>
              <div className="text-text-faint text-xs truncate max-w-[140px]">{creator.email || creator.phone}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-4 lg:px-10 py-8 overflow-x-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold">
              {tab === 'overview' && `Welcome back, ${creator.name.split(' ')[0]}`}
              {tab === 'bookings' && 'Bookings'}
              {tab === 'earnings' && 'Earnings'}
              {tab === 'portfolio' && 'My Portfolio'}
              {tab === 'reviews' && 'Client Reviews'}
            </h1>
            <p className="text-text-dim text-sm mt-1">
              {tab === 'overview' && "Here's how your profile is performing."}
              {tab === 'bookings' && 'Manage your incoming and active sessions.'}
              {tab === 'earnings' && 'Track your revenue and payouts.'}
              {tab === 'portfolio' && 'Manage gear, reels and specialties.'}
              {tab === 'reviews' && 'What clients say about your work.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl border border-line text-text-dim hover:text-text hover:border-signal/30 transition-colors">
              <Bell size={18} />
              {pendingCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-warn" />}
            </button>
            <Link to="/register"
              className="hidden sm:inline-flex items-center gap-2 bg-signal text-ink font-bold px-4 py-2.5 rounded-full text-sm">
              <Edit3 size={14} /> Edit Profile
            </Link>
          </div>
        </div>

        {/* Mobile tab nav */}
        <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto pb-1">
          {NAV_TABS.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                tab === id ? 'bg-signal/15 text-signal-bright border border-signal/30' : 'border border-line text-text-dim'
              }`}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* ── TAB: Overview ── */}
        {tab === 'overview' && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Earnings" icon={<Wallet size={32} />}
                value={creator.totalEarnings > 0 ? `$${creator.totalEarnings.toLocaleString()}` : '—'}
                delta={creator.totalEarnings > 0 ? 'All time' : 'No earnings yet'} tone="ok" />
              <StatCard label="Bookings" icon={<Calendar size={32} />}
                value={creator.bookings.length > 0 ? String(creator.bookings.length) : '—'}
                delta={pendingCount > 0 ? `${pendingCount} pending` : creator.bookings.length > 0 ? 'All confirmed' : 'None yet'} tone="muted" />
              <StatCard label="Profile Views" icon={<Eye size={32} />}
                value={creator.profileViews > 0 ? creator.profileViews.toLocaleString() : '—'}
                delta={creator.profileViews > 0 ? 'Last 30 days' : 'Complete profile to appear'} tone="signal" />
              <StatCard label="Rating" icon={<Star size={32} />}
                value={creator.rating > 0 ? creator.rating.toFixed(1) : '—'}
                delta={creator.reviewCount > 0 ? `${creator.reviewCount} reviews` : 'No reviews yet'} tone="muted" />
            </div>

            {/* Profile completeness */}
            {(!creator.bio || creator.gear.bodies.length === 0 || !creator.hourlyRate) && (
              <div className="rounded-2xl border border-warn/25 bg-warn/5 p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warn/15 flex items-center justify-center flex-shrink-0">
                  <Edit3 size={18} className="text-warn" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">Your profile is incomplete</h3>
                  <p className="text-text-dim text-xs leading-relaxed">
                    Add your bio, gear list, and hourly rate so clients can find and book you.
                  </p>
                </div>
                <Link to="/register" className="bg-warn text-ink font-bold px-4 py-2 rounded-full text-xs flex-shrink-0">
                  Complete →
                </Link>
              </div>
            )}

            {/* Recent bookings */}
            <div className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg">Recent Bookings</h3>
                <button onClick={() => setTab('bookings')} className="text-signal text-sm hover:text-signal-bright">View all →</button>
              </div>
              {creator.bookings.length === 0
                ? <EmptyState icon={<Calendar size={28} />} title="No bookings yet"
                    body="Once clients discover and book you, your upcoming sessions will appear here."
                    cta="Complete Profile" to="/register" />
                : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wider text-text-faint border-b border-line">
                          <th className="pb-3 font-mono font-medium">Client</th>
                          <th className="pb-3 font-mono font-medium">Date</th>
                          <th className="pb-3 font-mono font-medium hidden md:table-cell">Type</th>
                          <th className="pb-3 font-mono font-medium">Amount</th>
                          <th className="pb-3 font-mono font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {creator.bookings.slice(0, 5).map(b => (
                          <tr key={b.id} className="border-b border-line-soft last:border-0">
                            <td className="py-3.5 font-medium">{b.clientName}</td>
                            <td className="py-3.5 font-mono text-text-dim text-xs">{b.date}</td>
                            <td className="py-3.5 text-text-dim text-xs hidden md:table-cell">{b.type}</td>
                            <td className="py-3.5 font-mono text-signal">${b.totalPaid.toLocaleString()}</td>
                            <td className="py-3.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLOR[b.status]}`}>
                                {STATUS_ICON[b.status]}{b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </div>

            {/* Gear + latest review */}
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold">Gear on Profile</h3>
                  <Link to="/register" className="text-signal text-sm hover:text-signal-bright">Edit →</Link>
                </div>
                {creator.gear.bodies.length === 0 && !creator.hasDrone
                  ? <EmptyState icon={<Camera size={24} />} title="No gear added" body="Add your camera bodies, lenses and drone to attract the right clients." cta="Add Gear" to="/register" />
                  : (
                    <div className="space-y-2">
                      {creator.gear.bodies.map(g => (
                        <div key={g} className="flex justify-between items-center px-4 py-3 bg-panel-raised rounded-xl">
                          <span className="font-mono text-xs">{g}</span>
                          <span className="text-xs text-text-faint">Camera Body</span>
                        </div>
                      ))}
                      {creator.gear.lenses.slice(0, 2).map(g => (
                        <div key={g} className="flex justify-between items-center px-4 py-3 bg-panel-raised rounded-xl">
                          <span className="font-mono text-xs">{g}</span>
                          <span className="text-xs text-text-faint">Lens</span>
                        </div>
                      ))}
                      {creator.hasDrone && (
                        <div className="flex justify-between items-center px-4 py-3 bg-panel-raised rounded-xl">
                          <span className="font-mono text-xs flex items-center gap-1.5"><Plane size={12} />{creator.droneModel || 'Drone'}</span>
                          <span className="text-xs text-signal">Part 107</span>
                        </div>
                      )}
                    </div>
                  )}
              </div>

              <div className="rounded-2xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold">Latest Reviews</h3>
                  <button onClick={() => setTab('reviews')} className="text-signal text-sm hover:text-signal-bright">View all →</button>
                </div>
                {creator.reviews.length === 0
                  ? <EmptyState icon={<Star size={24} />} title="No reviews yet" body="Reviews appear after your first completed and confirmed booking." />
                  : creator.reviews.slice(0, 2).map(r => (
                    <div key={r.id} className="p-4 bg-panel-raised rounded-xl mb-3 last:mb-0">
                      <div className="flex items-center gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? 'text-warn' : 'text-line'} />
                        ))}
                      </div>
                      <p className="text-sm text-text-dim line-clamp-2 mb-2">{r.comment}</p>
                      <span className="text-xs text-text-faint">{r.clientName} · {r.jobType}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Bookings ── */}
        {tab === 'bookings' && (
          <div className="animate-fade-up">
            <div className="rounded-2xl border border-line bg-panel p-6">
              {creator.bookings.length === 0
                ? <EmptyState icon={<Calendar size={28} />} title="No bookings yet"
                    body="When clients book you through the platform, all your sessions will appear and be manageable here."
                    cta="Complete Profile" to="/register" />
                : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wider text-text-faint border-b border-line">
                          <th className="pb-3 pr-4 font-mono font-medium">Client</th>
                          <th className="pb-3 pr-4 font-mono font-medium">Date & Time</th>
                          <th className="pb-3 pr-4 font-mono font-medium hidden md:table-cell">Location</th>
                          <th className="pb-3 pr-4 font-mono font-medium hidden sm:table-cell">Type</th>
                          <th className="pb-3 pr-4 font-mono font-medium">Amount</th>
                          <th className="pb-3 font-mono font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {creator.bookings.map(b => (
                          <tr key={b.id} className="border-b border-line-soft last:border-0 hover:bg-panel-raised/50 transition-colors">
                            <td className="py-4 pr-4 font-medium">{b.clientName}</td>
                            <td className="py-4 pr-4 font-mono text-xs text-text-dim">
                              <div>{b.date}</div>
                              <div className="text-text-faint">{b.time}</div>
                            </td>
                            <td className="py-4 pr-4 text-text-dim text-xs hidden md:table-cell">{b.location}</td>
                            <td className="py-4 pr-4 text-text-dim text-xs hidden sm:table-cell">{b.type}</td>
                            <td className="py-4 pr-4 font-mono text-signal font-semibold">${b.totalPaid.toLocaleString()}</td>
                            <td className="py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLOR[b.status]}`}>
                                {STATUS_ICON[b.status]}{b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* ── TAB: Earnings ── */}
        {tab === 'earnings' && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Earned" icon={<Wallet size={32} />}
                value={creator.totalEarnings > 0 ? `$${creator.totalEarnings.toLocaleString()}` : '—'}
                delta="All time" tone="ok" />
              <StatCard label="Avg. Per Booking" icon={<BarChart2 size={32} />}
                value={creator.bookings.length > 0 ? `$${Math.round(creator.totalEarnings / creator.bookings.length).toLocaleString()}` : '—'}
                delta="Based on completed" tone="signal" />
              <StatCard label="Pending Payout" icon={<Clock size={32} />}
                value={creator.bookings.filter(b=>b.status==='accepted').length > 0
                  ? `$${creator.bookings.filter(b=>b.status==='accepted').reduce((s,b)=>s+b.totalPaid,0).toLocaleString()}`
                  : '—'} delta="Awaiting completion" tone="muted" />
            </div>
            <div className="rounded-2xl border border-line bg-panel p-6">
              <h3 className="font-display font-bold text-lg mb-5">Payout History</h3>
              {creator.bookings.filter(b => b.status === 'completed').length === 0
                ? <EmptyState icon={<Wallet size={28} />} title="No completed bookings yet"
                    body="Payouts appear here after a client confirms their shoot is complete. Connect your bank details once you're ready." />
                : (
                  <div className="space-y-3">
                    {creator.bookings.filter(b => b.status === 'completed').map(b => (
                      <div key={b.id} className="flex items-center justify-between px-4 py-3.5 bg-panel-raised rounded-xl">
                        <div>
                          <div className="font-medium text-sm">{b.clientName}</div>
                          <div className="text-text-faint text-xs font-mono">{b.date} · {b.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-ok">+${b.totalPaid.toLocaleString()}</div>
                          <div className="text-xs text-text-faint">Paid out</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="rounded-2xl border border-signal/20 bg-signal/5 p-6">
              <h3 className="font-semibold mb-2 text-sm">Bank / UPI Details</h3>
              <p className="text-text-dim text-xs mb-4">
                {/* TODO: Connect to payment gateway — Stripe, Razorpay, or your payout provider */}
                Add your payout account to receive earnings directly. Connect your bank or UPI below.
              </p>
              <button className="border border-signal/30 text-signal text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-signal/10 transition-colors">
                Add Payout Method {/* TODO: open Razorpay/Stripe connect flow */}
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: Portfolio ── */}
        {tab === 'portfolio' && (
          <div className="space-y-6 animate-fade-up">
            <div className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg">Profile Details</h3>
                <Link to="/register" className="text-signal text-sm hover:text-signal-bright inline-flex items-center gap-1">
                  <Edit3 size={14} /> Edit
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {[
                  ['Location', creator.location || '—'],
                  ['Services', creator.services || '—'],
                  ['Hourly Rate', creator.hourlyRate ? `$${creator.hourlyRate}/hr` : '—'],
                  ['Experience', creator.yearsExperience ? `${creator.yearsExperience} yrs` : '—'],
                  ['Drone', creator.hasDrone ? `${creator.droneModel || 'Yes'} ${creator.isPart107Certified ? '· Part 107' : ''}` : 'No'],
                  ['Joined', creator.joinedDate || '—'],
                ].map(([k, v]) => (
                  <div key={k} className="px-4 py-3 bg-panel-raised rounded-xl flex justify-between items-center">
                    <span className="text-text-faint text-xs font-mono uppercase tracking-wider">{k}</span>
                    <span className="font-medium text-sm">{v}</span>
                  </div>
                ))}
              </div>
              {creator.bio && (
                <div className="mt-4 px-4 py-4 bg-panel-raised rounded-xl">
                  <div className="text-xs font-mono uppercase tracking-wider text-text-faint mb-2">Bio</div>
                  <p className="text-sm text-text-dim leading-relaxed">{creator.bio}</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold">Gear List</h3>
                <Link to="/register" className="text-signal text-sm hover:text-signal-bright inline-flex items-center gap-1"><Edit3 size={14} />Edit</Link>
              </div>
              {creator.gear.bodies.length + creator.gear.lenses.length + creator.gear.audioLighting.length === 0
                ? <EmptyState icon={<Camera size={24} />} title="No gear added yet" body="Your gear list helps clients know exactly what they're booking." cta="Add Gear" to="/register" />
                : (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[['Camera Bodies', creator.gear.bodies], ['Lenses', creator.gear.lenses], ['Audio & Lighting', creator.gear.audioLighting]].map(([label, items]) => (
                      <div key={label as string}>
                        <div className="text-xs font-mono uppercase tracking-wider text-text-faint mb-2">{label as string}</div>
                        {(items as string[]).length === 0
                          ? <p className="text-xs text-text-faint italic">None listed</p>
                          : (items as string[]).map(item => (
                            <div key={item} className="px-3 py-2.5 bg-panel-raised rounded-lg mb-2 font-mono text-xs">{item}</div>
                          ))}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {creator.specialties.length > 0 && (
              <div className="rounded-2xl border border-line bg-panel p-6">
                <h3 className="font-display font-bold mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.specialties.map(s => <SpecBadge key={s}>{s}</SpecBadge>)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Reviews ── */}
        {tab === 'reviews' && (
          <div className="animate-fade-up">
            {creator.reviews.length === 0
              ? (
                <div className="rounded-2xl border border-line bg-panel p-6">
                  <EmptyState icon={<Star size={28} />} title="No reviews yet"
                    body="After your first completed booking, clients can leave a review. They'll all appear here." />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {creator.reviews.map(r => (
                    <div key={r.id} className="p-5 rounded-2xl border border-line bg-panel hover:border-signal/30 transition-colors">
                      <div className="flex items-center gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? 'text-warn' : 'text-line'} />
                        ))}
                        <span className="ml-2 text-xs text-text-faint font-mono">{r.rating}.0</span>
                      </div>
                      <p className="text-sm text-text-dim leading-relaxed mb-4">{r.comment}</p>
                      <div className="flex items-center gap-2.5 border-t border-line pt-3">
                        <div className="w-7 h-7 rounded-full bg-signal/20 flex items-center justify-center text-signal font-bold text-[10px]">
                          {r.clientName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{r.clientName}</div>
                          <div className="text-[10px] text-text-faint font-mono">{r.jobType}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}

      </main>
    </div>
  );
}