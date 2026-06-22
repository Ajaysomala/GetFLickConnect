import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plane, Star, SlidersHorizontal } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { SpecBadge, Pill } from '../components/Badges';
import { useStore } from '../lib/store';

type ServiceFilter = 'All' | 'Photo' | 'Video';

export function BrowsePage() {
  const { creators } = useStore();
  const [query, setQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('All');
  const [maxBudget, setMaxBudget] = useState(250);
  const [droneOnly, setDroneOnly] = useState(false);

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      if (!c.isAvailable) return false;
      if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.specialties.some((s) => s.toLowerCase().includes(query.toLowerCase()))) return false;
      if (serviceFilter === 'Photo' && c.services === 'Videographer') return false;
      if (serviceFilter === 'Video' && c.services === 'Photographer') return false;
      if (c.hourlyRate > maxBudget) return false;
      if (droneOnly && !(c.hasDrone && c.isPart107Certified)) return false;
      return true;
    });
  }, [creators, query, serviceFilter, maxBudget, droneOnly]);

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />

      <section className="pt-32 pb-10 border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Discovery</div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-3">Find your creator</h1>
          <p className="text-text-dim max-w-xl">
            {filtered.length} creators available now, matched against verified gear and certifications.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Search + filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 flex items-center gap-3 px-5 py-3.5 rounded-full border border-line bg-panel">
              <Search size={18} className="text-text-faint flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or specialty..."
                className="bg-transparent outline-none flex-1 text-sm placeholder:text-text-faint"
              />
            </div>
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-full border border-line bg-panel">
              <SlidersHorizontal size={16} className="text-text-faint flex-shrink-0" />
              <span className="font-mono text-xs text-text-faint whitespace-nowrap">Max ${maxBudget}/hr</span>
              <input
                type="range"
                min={50}
                max={250}
                step={10}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-36"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {(['All', 'Photo', 'Video'] as ServiceFilter[]).map((f) => (
              <Pill key={f} active={serviceFilter === f} onClick={() => setServiceFilter(f)}>
                {f === 'All' ? 'All Services' : f}
              </Pill>
            ))}
            <Pill active={droneOnly} onClick={() => setDroneOnly((v) => !v)}>
              <span className="inline-flex items-center gap-1.5"><Plane size={13} /> Drone Licensed</span>
            </Pill>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-text-faint">No creators match your filters right now.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
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
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.specialties.slice(0, 3).map((s) => (
                        <span key={s} className="text-[0.68rem] bg-panel-raised text-text-faint px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
