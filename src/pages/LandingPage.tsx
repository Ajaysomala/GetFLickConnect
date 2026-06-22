import { Link } from 'react-router-dom';
import { Search, Camera, ShieldCheck, ArrowRight, Star, Plane } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Filmstrip } from '../components/Filmstrip';
import { SpecBadge } from '../components/Badges';
import { useStore } from '../lib/store';

export function LandingPage() {
  const { creators } = useStore();
  const allPhotos = creators.flatMap((c) => c.photos.slice(0, 3));

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 text-signal font-mono text-xs uppercase tracking-widest mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-signal rec-dot" />
                Live marketplace &middot; 2,400+ creators booking now
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.98] tracking-tight mb-6">
                Book the right
                <br />
                <span className="text-signal">eye</span> for the shot.
              </h1>
              <p className="text-text-dim text-lg leading-relaxed max-w-lg mb-9">
                Get Flick Connect matches you with verified photographers, videographers and
                FAA Part&nbsp;107 drone pilots. Real gear lists, real reels, booked in minutes —
                not days of back-and-forth.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/browse"
                  className="inline-flex items-center gap-2 bg-signal text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-signal-bright transition-colors"
                >
                  <Search size={18} /> Find a Creator
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 border border-line text-text font-semibold px-7 py-3.5 rounded-full hover:border-signal hover:text-signal-bright transition-colors"
                >
                  <Camera size={18} /> Join as a Creator
                </Link>
              </div>
              <div className="flex flex-wrap gap-10">
                {[
                  ['2,400+', 'Verified Creators'],
                  ['18,900', 'Shoots Booked'],
                  ['4.9 / 5', 'Avg. Client Rating'],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-3xl font-bold">{num}</div>
                    <div className="font-mono text-[0.68rem] uppercase tracking-wider text-text-faint mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <div className="rounded-2xl border border-line overflow-hidden bg-panel">
                <div className="flex items-center justify-between px-5 py-3 border-b border-line-soft">
                  <span className="font-mono text-xs text-text-faint">VIEWFINDER_01.MOV</span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal rec-dot" />
                    <span className="font-mono text-[0.68rem] text-signal">REC</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-px bg-line">
                  {allPhotos.slice(0, 9).map((src, i) => (
                    <div key={i} className="aspect-square bg-panel-raised overflow-hidden">
                      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
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

      {/* FILMSTRIP DIVIDER */}
      <Filmstrip photos={allPhotos} size="sm" scroll className="border-y border-line" />

      {/* HOW IT WORKS */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">How it works</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">
              From brief to final cut, in three bookings.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: 'Search & filter',
                body: 'Filter by service type, specialty, budget and drone certification to shortlist creators who match your shoot exactly.',
              },
              {
                icon: Camera,
                title: 'Review the reel',
                body: 'Every profile carries a verified gear list, showreel and photo gallery — know exactly what you are booking before you pay.',
              },
              {
                icon: ShieldCheck,
                title: 'Book & track',
                body: 'Confirm a date, pay securely in-app, and watch your shoot move from booked to delivered from your dashboard.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-8 rounded-2xl border border-line bg-panel hover:border-signal/40 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-signal/10 flex items-center justify-center text-signal mb-6">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CREATORS */}
      <section className="py-24 border-y border-line bg-panel/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Featured on the platform</div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold">Booking out fastest this month</h2>
            </div>
            <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-signal transition-colors">
              Browse all creators <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {creators.map((c) => (
              <Link
                key={c.id}
                to={`/browse/${c.id}`}
                className="group rounded-2xl border border-line bg-panel overflow-hidden hover:border-signal/40 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={c.photos[0]} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <SpecBadge tone="signal">${c.hourlyRate}/hr</SpecBadge>
                  </div>
                  {c.hasDrone && c.isPart107Certified && (
                    <div className="absolute top-3 left-3">
                      <SpecBadge tone="ok"><Plane size={11} /> Part 107</SpecBadge>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center text-ink font-bold text-xs flex-shrink-0"
                      style={{ backgroundColor: c.avatarColor }}
                    >
                      {c.avatarInitials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{c.name}</h4>
                      <span className="text-text-faint text-xs">{c.location}</span>
                    </div>
                  </div>
                  <p className="text-text-dim text-sm leading-relaxed mb-4 line-clamp-2">{c.bio}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-text-faint">{c.services}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-signal font-semibold">
                      <Star size={12} fill="currentColor" /> {c.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOR CREATORS */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">For photographers & videographers</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Your gear is already impressive. Let clients see it.
            </h2>
            <p className="text-text-dim leading-relaxed mb-8 max-w-md">
              List your camera bodies, lenses, lighting and drone certifications once. Clients
              filter by exactly what you carry, so the bookings that come in already fit your kit.
            </p>
            <ul className="space-y-4 mb-9">
              {[
                'Verified Part 107 drone badge on your profile',
                'Showreel + photo gallery, no external links needed',
                'Real-time earnings & booking dashboard',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="h-5 w-5 rounded-full bg-signal/10 text-signal flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/register" className="inline-flex items-center gap-2 bg-signal text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-signal-bright transition-colors">
              Register as a Creator <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-2xl border border-line bg-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-text-faint">Gear Verified</span>
              <SpecBadge tone="ok">Live</SpecBadge>
            </div>
            <div className="space-y-3">
              {[
                ['Sony FX3', 'Camera Body'],
                ['DJI Mavic 3 Pro', 'Drone · Part 107'],
                ['Aputure Amaran 200d', 'Lighting'],
              ].map(([gear, type]) => (
                <div key={gear} className="flex items-center justify-between px-4 py-3.5 bg-panel-raised rounded-xl border border-line-soft">
                  <span className="font-mono text-sm">{gear}</span>
                  <span className="text-xs text-text-faint">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="py-24 border-t border-line bg-panel/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Specialties</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-12">Whatever the brief, there is a creator for it.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ['Weddings', '412'],
              ['Real Estate', '298'],
              ['Corporate', '187'],
              ['Sports', '154'],
            ].map(([name, count]) => (
              <div key={name} className="p-6 rounded-2xl border border-line bg-panel hover:border-signal/40 transition-colors text-center">
                <h3 className="font-display text-lg font-bold mb-1">{name}</h3>
                <p className="text-text-faint text-xs">{count} specialists</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-5">Ready to get the shot?</h2>
          <p className="text-text-dim mb-10">
            Join Get Flick Connect today — as a client looking to book, or a creator ready to be found.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/signup" className="bg-signal text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-signal-bright transition-colors">
              Create Free Account
            </Link>
            <Link to="/register" className="border border-line text-text font-semibold px-7 py-3.5 rounded-full hover:border-signal hover:text-signal-bright transition-colors">
              List Your Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
