import { Link } from 'react-router-dom';
import { Search, Camera, ShieldCheck, ArrowRight, Star, Plane, Zap, Globe } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { SpecBadge } from '../components/Badges';
import { useStore } from '../lib/store';

const SPECIALTIES = [
  { name: 'Weddings', count: null, icon: '💍' },
  { name: 'Real Estate', count: null, icon: '🏠' },
  { name: 'Corporate', count: null, icon: '💼' },
  { name: 'Sports', count: null, icon: '⚡' },
  { name: 'Events', count: null, icon: '🎬' },
  { name: 'Aerial / Drone', count: null, icon: '🚁' },
  { name: 'Product', count: null, icon: '📦' },
  { name: 'Portraits', count: null, icon: '🎭' },
];

const HOW = [
  {
    icon: <Search size={22} />,
    title: 'Search & filter',
    body: 'Filter by service type, specialty, budget and drone certification to shortlist creators who match your shoot exactly.',
  },
  {
    icon: <Camera size={22} />,
    title: 'Review the reel',
    body: 'Every profile carries a verified gear list, showreel and photo gallery — know exactly what you are booking before you pay.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Book & track',
    body: 'Confirm a date, pay securely in-app, and watch your shoot move from booked to delivered from your dashboard.',
  },
];

const PLATFORM_STATS = [
  { value: '2,400+', label: 'Verified Creators' },
  { value: '18,900', label: 'Shoots Booked' },
  { value: '4.9 / 5', label: 'Avg. Client Rating' },
  { value: '47', label: 'Cities & Growing' },
];

export function LandingPage() {
  const { creators } = useStore();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'transparent' }}>
      <NavBar />

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden" style={{ background: 'transparent' }}>
        {/* Cinematic bg effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="hero-grid" style={{ opacity: 0.06 }} />
          <div className="scan-line" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            <div className="animate-fade-up">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 text-signal font-mono text-xs uppercase tracking-widest mb-7
                px-4 py-2 rounded-full border border-signal/20 bg-signal/5 float-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-signal rec-dot" />
                Live marketplace · {creators.length > 0 ? `${creators.length} creator${creators.length !== 1 ? 's' : ''} listed` : '2,400+ creators booking now'}
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[0.96] tracking-tight mb-7">
                Book the right<br />
                <span className="text-shimmer">eye</span>
                <span className="text-white"> for the</span>
                <br />
                <span className="text-white">shot.</span>
              </h1>

              <p className="text-text-dim text-lg leading-relaxed max-w-lg mb-10">
                Get Flick Connect matches you with verified photographers, videographers and
                FAA&nbsp;Part&nbsp;107 drone pilots. Real gear lists, real reels, booked in
                minutes — not days of back-and-forth.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <Link to="/browse"
                  className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-ink transition-all"
                  style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)', boxShadow: '0 12px 32px rgba(99,179,237,.35)' }}>
                  <Search size={18} /> Find a Creator
                </Link>
                <Link to="/signup"
                  className="inline-flex items-center gap-2 border border-line text-text font-semibold px-8 py-4 rounded-full hover:border-signal/40 hover:text-signal-bright transition-colors">
                  <Camera size={18} /> Join as a Creator <ArrowRight size={16} />
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-10">
                {PLATFORM_STATS.map(({ value, label }) => (
                  <div key={label}>
                    <div className="font-display text-3xl font-bold text-white">{value}</div>
                    <div className="font-mono text-[0.68rem] uppercase tracking-wider text-text-faint mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Viewfinder card */}
            <div className="relative animate-fade-right" style={{ animationDelay: '0.18s' }}>
              <div className="absolute -inset-4 rounded-3xl"
                style={{ background: 'radial-gradient(circle, rgba(99,179,237,.12), transparent 70%)', filter: 'blur(24px)' }} />
              <div className="relative rounded-2xl border border-line overflow-hidden bg-panel">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-line-soft">
                  <span className="font-mono text-xs text-text-faint">VIEWFINDER_01.MOV</span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal rec-dot" />
                    <span className="font-mono text-[0.68rem] text-signal">REC</span>
                  </div>
                </div>

                {/* Grid — shows real creator photos or placeholder slots */}
                <div className="grid grid-cols-3 gap-px bg-line">
                  {Array.from({ length: 9 }).map((_, i) => {
                    const photo = creators.flatMap(c => c.photos)[i];
                    return (
                      <div key={i} className="aspect-square bg-panel-raised overflow-hidden flex items-center justify-center">
                        {photo
                          ? <img src={photo} alt="" loading="lazy" className="w-full h-full object-cover ken-burns" />
                          : <Camera size={22} className="text-line" />}
                      </div>
                    );
                  })}
                </div>

                <div className="px-5 py-4 flex items-center justify-between border-t border-line-soft">
                  <SpecBadge tone="signal">f/2.8</SpecBadge>
                  <SpecBadge>24mm</SpecBadge>
                  <SpecBadge>ISO 400</SpecBadge>
                  <SpecBadge tone="ok">1/250s</SpecBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shimmer divider */}
      <div className="shimmer-line mx-0" />

      {/* ══════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: 'transparent' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16 animate-fade-up">
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">How it works</div>
            <h2 className="font-display text-4xl lg:text-5xl font-black leading-tight">
              From brief to final cut,<br />
              <span className="text-shimmer">in three steps.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW.map(({ icon, title, body }, i) => (
              <div key={title} className="p-8 rounded-2xl border border-line bg-panel hover:border-signal/30 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-signal transition-transform group-hover:scale-110"
                  style={{ background: 'rgba(99,179,237,.1)', border: '1px solid rgba(99,179,237,.2)' }}>
                  {icon}
                </div>
                <div className="font-mono text-xs text-text-faint mb-2 uppercase tracking-wider">Step {i + 1}</div>
                <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURED CREATORS
      ══════════════════════════════════ */}
      <section className="py-24 border-y border-line" style={{ background: 'rgba(10,16,32,.4)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div className="animate-fade-up">
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-3">Featured on the platform</div>
              <h2 className="font-display text-4xl font-black">
                {creators.length > 0 ? 'Booking out fastest this month' : 'Creators join every day'}
              </h2>
            </div>
            <Link to="/browse" className="hidden md:inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors">
              Browse all creators <ArrowRight size={16} />
            </Link>
          </div>

          {creators.length === 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-line bg-panel overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="aspect-[4/3] bg-panel-raised flex flex-col items-center justify-center gap-3">
                    <Camera size={32} className="text-text-faint" />
                    <span className="text-text-faint text-xs font-mono">Creator profile loading</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-signal/20 flex items-center justify-center text-signal font-bold text-xs">–</div>
                      <div>
                        <div className="h-3 w-28 bg-panel-raised rounded animate-pulse mb-1.5" />
                        <div className="h-2.5 w-20 bg-panel-raised rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-panel-raised rounded-full animate-pulse" />
                      <div className="h-6 w-16 bg-panel-raised rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {creators.slice(0, 3).map((c, i) => (
                <Link key={c.id} to={`/browse/${c.id}`}
                  className="group rounded-2xl border border-line bg-panel overflow-hidden hover:border-signal/40 transition-colors animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="relative aspect-[4/3] bg-panel-raised overflow-hidden">
                    {c.photos[0]
                      ? <img src={c.photos[0]} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ken-burns" />
                      : <div className="w-full h-full flex items-center justify-center"><Camera size={32} className="text-text-faint" /></div>}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {c.isPart107Certified && <SpecBadge tone="signal"><Plane size={11} /> Part 107</SpecBadge>}
                    </div>
                    <div className="absolute top-3 right-3">
                      <SpecBadge tone="ok">${c.hourlyRate}/hr</SpecBadge>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-full flex items-center justify-center text-ink font-bold text-xs flex-shrink-0"
                        style={{ backgroundColor: c.avatarColor }}>
                        {c.avatarInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{c.name}</div>
                        <div className="text-text-faint text-xs">{c.location || 'Location TBD'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.rating > 0 && (
                        <div className="flex items-center gap-1 text-warn text-xs">
                          <Star size={11} fill="currentColor" /> {c.rating.toFixed(1)}
                        </div>
                      )}
                      <SpecBadge>{c.services}</SpecBadge>
                      {c.specialties.slice(0, 1).map(s => <SpecBadge key={s}>{s}</SpecBadge>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════
          CREATOR PITCH
      ══════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: 'transparent' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-left">
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">For photographers & videographers</div>
              <h2 className="font-display text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Your gear is already<br />
                impressive.<br />
                <span className="text-shimmer">Let clients see it.</span>
              </h2>
              <p className="text-text-dim text-base leading-relaxed mb-8">
                List your camera bodies, lenses, lighting and drone certifications once.
                Clients filter by exactly what you carry, so the bookings that come in
                already fit your kit.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Verified Part 107 drone badge on your profile',
                  'Showreel + photo gallery, no external links needed',
                  'Real-time earnings & booking dashboard',
                  'Appear in the mobile app used by clients',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-dim">
                    <ShieldCheck size={16} className="text-ok flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/signup"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-ink"
                style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)', boxShadow: '0 12px 32px rgba(99,179,237,.30)' }}>
                Register as a Creator <ArrowRight size={16} />
              </Link>
            </div>

            <div className="animate-fade-right" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-2xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-line-soft">
                  <span className="font-mono text-xs text-text-faint uppercase tracking-wider">Gear Verified</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold text-ok border border-ok/30 bg-ok/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ok rec-dot" /> Live
                  </span>
                </div>
                {[
                  { name: 'Sony FX3', type: 'Camera Body' },
                  { name: 'DJI Mavic 3 Pro', type: 'Drone · Part 107' },
                  { name: 'Aputure Amaran 200d', type: 'Lighting' },
                  { name: 'Sigma 35mm f/1.4', type: 'Lens' },
                ].map(({ name, type }) => (
                  <div key={name} className="flex items-center justify-between py-3.5 border-b border-line-soft last:border-0">
                    <span className="font-mono text-sm">{name}</span>
                    <span className="text-text-faint text-xs">{type}</span>
                  </div>
                ))}
                <div className="mt-5 p-4 rounded-xl bg-signal/5 border border-signal/15">
                  <div className="flex items-center gap-2 text-signal text-sm font-semibold mb-1">
                    <Globe size={14} /> Available for hire
                  </div>
                  <div className="text-text-faint text-xs">Profile visible to clients on web & mobile app</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SPECIALTIES
      ══════════════════════════════════ */}
      <section className="py-24 border-t border-line" style={{ background: 'rgba(10,16,32,.4)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-up">
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Specialties</div>
            <h2 className="font-display text-4xl font-black">Whatever the brief, there's a creator for it.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPECIALTIES.map(({ name, icon }, i) => (
              <Link key={name} to="/browse"
                className="p-6 rounded-2xl border border-line bg-panel text-center hover:border-signal/35 hover:bg-signal/5 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                <div className="font-display font-bold text-base mb-1">{name}</div>
                <div className="text-text-faint text-xs font-mono">Browse creators →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section className="py-24 lg:py-28 text-center" style={{ background: 'transparent' }}>
        <div className="max-w-3xl mx-auto px-6 animate-fade-up">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 float-badge"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)', boxShadow: '0 16px 40px rgba(99,179,237,.30)' }}>
            <Zap size={28} className="text-white" />
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Ready to get<br /><span className="text-shimmer">the shot?</span>
          </h2>
          <p className="text-text-dim text-lg mb-10 leading-relaxed">
            Join Get Flick Connect today — as a client looking to book, or a creator ready to be found.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup"
              className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-full text-ink text-lg"
              style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)', boxShadow: '0 14px 36px rgba(99,179,237,.35)' }}>
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link to="/signup"
              className="inline-flex items-center gap-2 font-semibold border border-line text-text px-10 py-4 rounded-full hover:border-signal/40 hover:text-signal transition-colors text-lg">
              List Your Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}