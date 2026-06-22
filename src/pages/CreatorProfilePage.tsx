import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Plane, MapPin, ShieldCheck, ChevronLeft, Check } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { SpecBadge } from '../components/Badges';
import { useStore } from '../lib/store';

export function CreatorProfilePage() {
  const { id } = useParams();
  const { creators, updateCreator } = useStore();
  const creator = creators.find((c) => c.id === id);
  const [tab, setTab] = useState<'reel' | 'gallery'>('reel');
  const [booked, setBooked] = useState(false);

  if (!creator) {
    return (
      <div className="min-h-screen flex flex-col bg-ink">
        <NavBar />
        <div className="flex-1 flex items-center justify-center text-text-dim">Creator not found.</div>
        <Footer />
      </div>
    );
  }

  const handleBook = () => {
    const amount = creator.hourlyRate * 4;
    updateCreator(creator.id, {
      totalEarnings: creator.totalEarnings + amount,
      bookings: [
        {
          id: `bk-${Date.now()}`,
          clientName: 'You (New Booking)',
          date: '2026-07-12',
          time: '10:00',
          type: creator.specialties[0] ?? 'Shoot',
          duration: 4,
          status: 'pending',
          totalPaid: amount,
          location: 'TBD',
        },
        ...creator.bookings,
      ],
    });
    setBooked(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />

      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Link to="/browse" className="inline-flex items-center gap-1.5 text-text-faint hover:text-text text-sm mb-8">
            <ChevronLeft size={16} /> Back to discovery
          </Link>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
            {/* Left: profile card */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center text-ink font-bold text-xl flex-shrink-0"
                  style={{ backgroundColor: creator.avatarColor }}
                >
                  {creator.avatarInitials}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">{creator.name}</h1>
                  <div className="flex items-center gap-1.5 text-text-faint text-sm mt-1">
                    <MapPin size={13} /> {creator.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center gap-1 text-signal font-semibold text-sm">
                  <Star size={14} fill="currentColor" /> {creator.rating} ({creator.reviewCount})
                </span>
                <span className="font-mono text-sm text-text-dim">${creator.hourlyRate}/hr</span>
                <span className="text-xs text-text-faint">{creator.yearsExperience} yrs exp.</span>
              </div>

              <p className="text-text-dim text-sm leading-relaxed mb-6">{creator.bio}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {creator.specialties.map((s) => (
                  <span key={s} className="text-xs bg-panel-raised text-text-dim px-3 py-1.5 rounded-full border border-line-soft">{s}</span>
                ))}
              </div>

              {/* Gear & tech specs */}
              <div className="rounded-2xl border border-line bg-panel p-6 mb-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-ok" /> Gear & Tech Specs
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-text-faint text-xs uppercase tracking-wide">Camera Bodies</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {creator.gear.bodies.map((g) => <SpecBadge key={g}>{g}</SpecBadge>)}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-faint text-xs uppercase tracking-wide">Lenses</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {creator.gear.lenses.map((g) => <SpecBadge key={g}>{g}</SpecBadge>)}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-faint text-xs uppercase tracking-wide">Audio / Lighting</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {creator.gear.audioLighting.map((g) => <SpecBadge key={g}>{g}</SpecBadge>)}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-faint text-xs uppercase tracking-wide">Drone</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {creator.hasDrone ? (
                        <>
                          <SpecBadge tone="signal"><Plane size={11} /> {creator.droneModel}</SpecBadge>
                          {creator.isPart107Certified ? (
                            <SpecBadge tone="ok">Part 107 Certified</SpecBadge>
                          ) : (
                            <SpecBadge tone="muted">Not Part 107 Certified</SpecBadge>
                          )}
                        </>
                      ) : (
                        <span className="text-text-faint text-xs">No drone services offered</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={booked}
                className={`w-full py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 ${
                  booked ? 'bg-ok text-ink' : 'bg-signal text-ink hover:bg-signal-bright'
                }`}
              >
                {booked ? (
                  <><Check size={18} /> Booking Confirmed</>
                ) : (
                  `Book Now · $${creator.hourlyRate * 4} for 4hrs`
                )}
              </button>
            </div>

            {/* Right: work showcase */}
            <div>
              <div className="flex gap-1 bg-panel-raised rounded-full p-1 mb-6 w-fit">
                <button
                  onClick={() => setTab('reel')}
                  className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                    tab === 'reel' ? 'bg-signal text-ink' : 'text-text-dim'
                  }`}
                >
                  <Play size={14} /> Video Reel
                </button>
                <button
                  onClick={() => setTab('gallery')}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    tab === 'gallery' ? 'bg-signal text-ink' : 'text-text-dim'
                  }`}
                >
                  Photo Gallery
                </button>
              </div>

              {tab === 'reel' ? (
                <div className="relative rounded-2xl overflow-hidden border border-line aspect-video bg-panel-raised">
                  <img src={creator.photos[0]} alt="" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-signal flex items-center justify-center mb-4">
                      <Play size={26} className="text-ink" fill="currentColor" />
                    </div>
                    <span className="font-mono text-xs bg-ink/70 px-3 py-1.5 rounded-full">{creator.reelTitle}</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {creator.photos.map((src, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-line-soft">
                      <img src={src} alt={`Work sample ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Reviews */}
              <div className="mt-10">
                <h3 className="font-display font-bold text-lg mb-4">Client reviews</h3>
                <div className="space-y-4">
                  {creator.reviews.map((r) => (
                    <div key={r.id} className="p-5 rounded-xl border border-line-soft bg-panel">
                      <div className="flex items-center gap-1 text-signal mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={13} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? '' : 'text-line'} />
                        ))}
                      </div>
                      <p className="text-sm text-text-dim mb-2">{r.comment}</p>
                      <span className="text-xs text-text-faint">{r.clientName} · {r.jobType}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
