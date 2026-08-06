import { Link } from 'react-router-dom';
import { Search, Camera, ShieldCheck, ArrowRight, Star, Plane, Zap } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { SpecBadge } from '../components/Badges';
import { Reveal } from '../components/Reveal';
import { useStore } from '../lib/store';
import { HERO_IMAGE, PORTFOLIO_SHOWCASE, SPECIALTY_IMAGES } from '../lib/galleryImages';

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

export function LandingPage() {
  const { creators } = useStore();
  const featured = creators.filter((c) => c.isAvailable).slice(0, 3);
  const marquee = [...PORTFOLIO_SHOWCASE, ...PORTFOLIO_SHOWCASE];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'transparent' }}>
      <NavBar />

      {/* ═══ HERO — full-bleed photography ═══ */}
      <section className="relative min-h-[100svh] flex items-end lg:items-center overflow-hidden">
        <div className="hero-media" aria-hidden="true">
          <img src={HERO_IMAGE} alt="" />
        </div>
        <div className="scan-line" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:py-0">
          <div className="max-w-2xl animate-fade-up">
            <p className="font-display text-signal text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-6">
              Get Flick Connect
            </p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.75rem] font-extrabold leading-[0.98] tracking-tight mb-6">
              Book the right
              <br />
              <span className="text-shimmer">eye</span> for the shot.
            </h1>

            <p className="text-text-dim text-lg leading-relaxed max-w-md mb-10">
              Verified photographers, videographers, and Part&nbsp;107 drone pilots —
              real gear, real reels, booked in minutes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-ink bg-signal"
              >
                <Search size={18} /> Find a Creator
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 border border-line text-text font-semibold px-8 py-4 rounded-full"
              >
                <Camera size={18} /> Join as a Creator <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="shimmer-line" />

      {/* ═══ PORTFOLIO MARQUEE ═══ */}
      <section className="py-16 lg:py-20 overflow-hidden">
        <Reveal className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-3">Creative gallery</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold">
            Work that shows what you can do.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-28 z-10 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-28 z-10 bg-gradient-to-l from-ink to-transparent" />
          <div className="marquee-track pl-4">
            {marquee.map((src, i) => (
              <div key={`${src}-${i}`} className="marquee-frame">
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 lg:py-32 section-band">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal className="max-w-xl mb-16">
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">How it works</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
              From brief to final cut,
              <br />
              <span className="text-shimmer">in three steps.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW.map(({ icon, title, body }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="p-8 rounded-2xl border border-line bg-panel group h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-signal transition-transform duration-500 group-hover:scale-110"
                    style={{ background: 'rgba(212,175,110,.1)', border: '1px solid rgba(212,175,110,.22)' }}
                  >
                    {icon}
                  </div>
                  <div className="font-mono text-xs text-text-faint mb-2 uppercase tracking-wider">
                    Step 0{i + 1}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
                  <p className="text-text-dim text-sm leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED CREATORS ═══ */}
      <section className="py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="flex items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
                Featured on the platform
              </div>
              <h2 className="font-display text-4xl font-bold">Creators booking out this month</h2>
            </div>
            <Link
              to="/browse"
              className="hidden md:inline-flex items-center gap-2 text-sm text-text-dim hover:text-signal transition-colors"
            >
              Browse all <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((c, i) => (
              <Reveal key={c.id} delay={i * 100} variant="scale">
                <Link
                  to={`/browse/${c.id}`}
                  className="group block rounded-2xl border border-line bg-panel overflow-hidden h-full"
                >
                  <div className="relative aspect-[4/5] bg-panel-raised overflow-hidden">
                    <img
                      src={c.photos[0]}
                      alt={c.name}
                      className="img-lift w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink via-ink/70 to-transparent">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="h-9 w-9 rounded-full flex items-center justify-center text-ink font-bold text-xs"
                          style={{ backgroundColor: c.avatarColor }}
                        >
                          {c.avatarInitials}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{c.name}</div>
                          <div className="text-text-faint text-xs">{c.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-signal text-xs font-semibold">
                          <Star size={11} fill="currentColor" /> {c.rating.toFixed(1)}
                        </span>
                        <SpecBadge tone="ok">${c.hourlyRate}/hr</SpecBadge>
                        {c.isPart107Certified && (
                          <SpecBadge tone="signal">
                            <Plane size={11} /> Part 107
                          </SpecBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CREATOR PITCH ═══ */}
      <section className="py-24 lg:py-32 section-band">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal variant="left">
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
                For photographers & videographers
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Your craft deserves
                <br />
                a stage.
                <br />
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
                  'Appear where clients are already searching',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-dim">
                    <ShieldCheck size={16} className="text-ok flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-ink bg-signal"
              >
                Register as a Creator <ArrowRight size={16} />
              </Link>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <div className="grid grid-cols-2 gap-3">
                {PORTFOLIO_SHOWCASE.slice(0, 4).map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-2xl border border-line ${
                      i % 2 === 1 ? 'translate-y-6' : ''
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover ken-burns"
                      style={{ animationDelay: `${i * 1.2}s` }}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SPECIALTIES — image tiles ═══ */}
      <section className="py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Specialties</div>
            <h2 className="font-display text-4xl font-bold">
              Whatever the brief, there&apos;s a creator for it.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPECIALTY_IMAGES.map(({ name, image, blurb }, i) => (
              <Reveal key={name} delay={i * 60} variant="scale">
                <Link to="/browse" className="specialty-tile block group">
                  <img src={image} alt={name} loading="lazy" />
                  <div className="tile-label">
                    <div className="font-display font-bold text-lg mb-0.5">{name}</div>
                    <div className="text-text-faint text-xs font-mono group-hover:text-signal transition-colors">
                      {blurb}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 lg:py-28 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url(${PORTFOLIO_SHOWCASE[2]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(40%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />

        <Reveal className="relative z-10 max-w-3xl mx-auto px-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 float-badge bg-signal text-ink"
          >
            <Zap size={28} />
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to get
            <br />
            <span className="text-shimmer">the shot?</span>
          </h2>
          <p className="text-text-dim text-lg mb-10 leading-relaxed">
            Join Get Flick Connect — as a client looking to book, or a creator ready to be found.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-full text-ink text-lg bg-signal"
            >
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 font-semibold border border-line text-text px-10 py-4 rounded-full text-lg"
            >
              Explore Creators
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
