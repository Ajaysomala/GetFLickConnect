import { Link } from 'react-router-dom';
import {
  LayoutGrid, Calendar, Wallet, Briefcase, MessageSquare, Settings,
  LifeBuoy, Search, TrendingUp, Star, Plane,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { SpecBadge } from '../components/Badges';
import { useStore, useCurrentCreator } from '../lib/store';

const SIDEBAR_LINKS = [
  { icon: LayoutGrid, label: 'Overview', active: true },
  { icon: Calendar, label: 'Bookings' },
  { icon: Wallet, label: 'Earnings' },
  { icon: Briefcase, label: 'My Portfolio', to: '/register' },
  { icon: MessageSquare, label: 'Messages' },
];

function StatCard({ label, value, delta, deltaTone = 'ok' }: { label: string; value: string; delta?: string; deltaTone?: 'ok' | 'muted' }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-6">
      <div className="text-xs uppercase tracking-wider text-text-faint mb-3">{label}</div>
      <div className="font-display text-3xl font-bold">{value}</div>
      {delta && (
        <div className={`text-xs mt-2 flex items-center gap-1 ${deltaTone === 'ok' ? 'text-ok' : 'text-text-faint'}`}>
          {deltaTone === 'ok' && <TrendingUp size={12} />} {delta}
        </div>
      )}
    </div>
  );
}

export function DashboardPage() {
  const { creators, setCurrentCreatorId, toggleAvailability } = useStore();
  const creator = useCurrentCreator();

  return (
    <div className="min-h-screen flex bg-ink">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-line bg-panel px-5 py-7 sticky top-0 h-screen">
        <Logo />
        <nav className="flex flex-col gap-1 mt-10 flex-1">
          {SIDEBAR_LINKS.map(({ icon: Icon, label, active, to }) => {
            const content = (
              <span className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                active ? 'bg-signal/10 text-signal-bright' : 'text-text-dim hover:bg-panel-raised hover:text-text'
              }`}>
                <Icon size={17} /> {label}
              </span>
            );
            return to ? <Link key={label} to={to}>{content}</Link> : <div key={label}>{content}</div>;
          })}
          <div className="text-xs uppercase tracking-wider text-text-faint px-3.5 mt-6 mb-2">Account</div>
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-text-dim hover:bg-panel-raised hover:text-text transition-colors cursor-pointer">
            <Settings size={17} /> Settings
          </div>
          <Link to="/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-text-dim hover:bg-panel-raised hover:text-text transition-colors">
            <LifeBuoy size={17} /> Support
          </Link>
        </nav>

        {/* Switch profile (prototype affordance, since there's no real auth) */}
        <div className="border-t border-line pt-4">
          <label className="text-xs text-text-faint mb-2 block">Viewing as</label>
          <select
            value={creator.id}
            onChange={(e) => setCurrentCreatorId(e.target.value)}
            className="w-full bg-panel-raised border border-line rounded-lg px-3 py-2 text-sm mb-4"
          >
            {creators.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-ink font-bold text-xs flex-shrink-0" style={{ backgroundColor: creator.avatarColor }}>
              {creator.avatarInitials}
            </div>
            <div className="text-sm">
              <div className="font-semibold">{creator.name}</div>
              <Link to="/login" className="text-text-faint text-xs hover:text-text">Log out</Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="font-display text-3xl font-bold">Welcome back, {creator.name.split(' ')[0]}</h1>
            <p className="text-text-dim text-sm mt-1">Here's how your creator profile is performing.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-line bg-panel text-text-faint">
              <Search size={15} />
              <input placeholder="Search bookings, clients..." className="bg-transparent outline-none text-sm w-44 placeholder:text-text-faint" />
            </div>
            <button
              onClick={() => toggleAvailability(creator.id)}
              className={`relative w-12 h-6.5 rounded-full transition-colors flex-shrink-0 ${creator.isAvailable ? 'bg-signal' : 'bg-line'}`}
            >
              <span className={`absolute top-0.5 left-0.5 h-5.5 w-5.5 rounded-full bg-ink transition-transform ${creator.isAvailable ? 'translate-x-5.5' : ''}`} />
            </button>
            <span className="text-sm text-text-dim whitespace-nowrap">Available for hire</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total earnings" value={`$${creator.totalEarnings.toLocaleString()}`} delta="18% this month" />
          <StatCard label="Active bookings" value={String(creator.bookings.length)} delta={creator.bookings.some(b=>b.status==='pending') ? '1 pending' : 'all confirmed'} deltaTone="muted" />
          <StatCard label="Profile views" value={creator.profileViews.toLocaleString()} delta="6% this week" />
          <StatCard label="Avg. rating" value={creator.rating.toFixed(1)} delta={`from ${creator.reviewCount} reviews`} deltaTone="muted" />
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mb-8">
          <div className="rounded-2xl border border-line bg-panel p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold">Incoming & active bookings</h3>
            </div>
            {creator.bookings.length === 0 ? (
              <p className="text-text-faint text-sm py-8 text-center">No bookings yet. Get hired through the discovery page to see updates here in real time.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-text-faint border-b border-line">
                      <th className="pb-3 font-semibold">Client</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creator.bookings.map((b) => (
                      <tr key={b.id} className="border-b border-line-soft last:border-0">
                        <td className="py-3.5">{b.clientName}</td>
                        <td className="py-3.5 font-mono text-text-dim">{b.date}</td>
                        <td className="py-3.5 font-mono text-signal">${b.totalPaid.toLocaleString()}</td>
                        <td className="py-3.5">
                          <SpecBadge tone={b.status === 'accepted' ? 'ok' : b.status === 'pending' ? 'muted' : 'default'}>
                            {b.status}
                          </SpecBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-panel p-7">
            <h3 className="font-display text-lg font-bold mb-5">Gear on profile</h3>
            <div className="space-y-2.5">
              {creator.gear.bodies.map((g) => (
                <div key={g} className="flex items-center justify-between px-4 py-3 bg-panel-raised rounded-xl">
                  <span className="font-mono text-xs">{g}</span>
                  <span className="text-xs text-text-faint">Camera</span>
                </div>
              ))}
              {creator.hasDrone && (
                <div className="flex items-center justify-between px-4 py-3 bg-panel-raised rounded-xl">
                  <span className="font-mono text-xs flex items-center gap-1.5"><Plane size={12} /> {creator.droneModel}</span>
                  <span className="text-xs text-signal">Drone</span>
                </div>
              )}
            </div>
            <Link to="/register" className="block text-center mt-6 border border-line rounded-full py-2.5 text-sm hover:border-signal hover:text-signal-bright transition-colors">
              Edit Portfolio
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-7">
          <h3 className="font-display text-lg font-bold mb-5">Recent client reviews</h3>
          {creator.reviews.length === 0 ? (
            <p className="text-text-faint text-sm">No reviews yet — they'll show up here after your first completed booking.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {creator.reviews.map((r) => (
                <div key={r.id} className="p-5 bg-panel-raised rounded-xl">
                  <div className="flex items-center gap-1 text-signal mb-2.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? '' : 'text-line'} />
                    ))}
                  </div>
                  <p className="text-sm text-text-dim mb-3">{r.comment}</p>
                  <span className="text-xs text-text-faint">{r.clientName}, {r.jobType}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
