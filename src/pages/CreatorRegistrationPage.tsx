import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Upload, Camera as CameraIcon } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useStore } from '../lib/store';
import {
  SPECIALTY_OPTIONS,
  CAMERA_BODY_OPTIONS,
  LENS_OPTIONS,
  AUDIO_LIGHTING_OPTIONS,
  DRONE_OPTIONS,
} from '../lib/mockData';
import { placeholderSet } from '../lib/placeholder';
import type { Creator, ServiceType } from '../types';

const STEPS = ['Profile', 'Services', 'Gear', 'Drone', 'Rates & Portfolio'];

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm border transition-colors ${
        selected ? 'bg-signal/10 border-signal text-signal-bright' : 'border-line text-text-dim hover:border-text-faint'
      }`}
    >
      {label}
    </button>
  );
}

export function CreatorRegistrationPage() {
  const navigate = useNavigate();
  const { addCreator } = useStore();
  const [step, setStep] = useState(0);

  const [fullName, setFullName] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const [serviceType, setServiceType] = useState<ServiceType>('Both');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [certifications, setCertifications] = useState('');

  const [bodies, setBodies] = useState<string[]>([]);
  const [lenses, setLenses] = useState<string[]>([]);
  const [audioLighting, setAudioLighting] = useState<string[]>([]);

  const [hasDrone, setHasDrone] = useState(false);
  const [droneModel, setDroneModel] = useState(DRONE_OPTIONS[0]);
  const [part107, setPart107] = useState(false);

  const [rate, setRate] = useState('');

  const toggle = (list: string[], setList: (l: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleSubmit = () => {
    const initials = fullName.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '??';
    const newId = `cam-${Date.now()}`;
    const newCreator: Creator = {
      id: newId,
      name: fullName || 'New Creator',
      avatarInitials: initials,
      avatarColor: '#FF5A1F',
      location: location || 'Unspecified',
      yearsExperience: Number(experience) || 0,
      bio: bio || 'New creator on Get Flick Connect, ready to bring your vision to life.',
      services: serviceType,
      specialties,
      certifications: certifications ? certifications.split(',').map((c) => c.trim()) : [],
      gear: { bodies, lenses, audioLighting },
      hasDrone,
      droneModel: hasDrone ? droneModel : undefined,
      isPart107Certified: hasDrone ? part107 : false,
      hourlyRate: Number(rate) || 0,
      reelTitle: `${fullName || 'New Creator'} — Showreel`,
      reelId: `reel-${Date.now()}`,
      photos: placeholderSet(newId, 9),
      isAvailable: true,
      rating: 5.0,
      reviewCount: 0,
      totalEarnings: 0,
      profileViews: 0,
      bookings: [],
      reviews: [],
      joinedDate: new Date().toISOString().slice(0, 10),
    };
    addCreator(newCreator);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />

      <section className="pt-32 pb-8 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Creator onboarding</div>
          <h1 className="font-display text-4xl font-bold mb-3">List your services on Get Flick Connect</h1>
          <p className="text-text-dim">Tell clients what you shoot, what gear you carry, and what your work looks like.</p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-3xl mx-auto px-6">
          {/* Progress */}
          <div className="h-1 bg-line rounded-full mb-3 overflow-hidden">
            <div
              className="h-full bg-signal transition-all duration-500"
              style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mb-12">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={`font-mono text-[0.68rem] uppercase tracking-wider ${
                  i === step ? 'text-signal' : i < step ? 'text-text-dim' : 'text-text-faint'
                }`}
              >
                {String(i + 1).padStart(2, '0')} {s}
              </span>
            ))}
          </div>

          {/* STEP 0: PROFILE */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Profile information</h3>
                <p className="text-text-dim text-sm mb-7">This is what clients see first.</p>

                <div className="flex items-center gap-5 mb-7">
                  <div className="h-16 w-16 rounded-full bg-signal flex items-center justify-center text-ink font-bold text-lg flex-shrink-0">
                    {fullName.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 border border-dashed border-line rounded-xl px-5 py-3.5 text-text-faint text-sm flex items-center gap-2.5">
                    <Upload size={16} /> Mock avatar generated automatically from your name
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-text-dim mb-2">Full name</label>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Marcus Chen" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dim mb-2">Years of experience</label>
                    <input type="number" min={0} value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 8" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal" />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-text-dim mb-2">Bio</label>
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell clients about your style, experience, and the shoots you love..." className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Base location</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: SERVICES */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Service type</h3>
                <p className="text-text-dim text-sm mb-6">What do you offer?</p>
                <div className="flex gap-3">
                  {(['Videographer', 'Photographer', 'Both'] as ServiceType[]).map((s) => (
                    <Chip key={s} label={s} selected={serviceType === s} onClick={() => setServiceType(s)} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Specialties</h3>
                <p className="text-text-dim text-sm mb-6">Select all that apply.</p>
                <div className="flex flex-wrap gap-3">
                  {SPECIALTY_OPTIONS.map((s) => (
                    <Chip key={s} label={s} selected={specialties.includes(s)} onClick={() => toggle(specialties, setSpecialties, s)} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Certifications</h3>
                <p className="text-text-dim text-sm mb-6">Optional, but builds trust with clients.</p>
                <input
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  placeholder="e.g. Adobe Certified Expert, PPA Certified Professional Photographer"
                  className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal"
                />
              </div>
            </div>
          )}

          {/* STEP 2: GEAR */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Camera bodies</h3>
                <p className="text-text-dim text-sm mb-6">Select every body you shoot with.</p>
                <div className="flex flex-wrap gap-3">
                  {CAMERA_BODY_OPTIONS.map((g) => (
                    <Chip key={g} label={g} selected={bodies.includes(g)} onClick={() => toggle(bodies, setBodies, g)} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Lenses</h3>
                <p className="text-text-dim text-sm mb-6">Select your primary glass.</p>
                <div className="flex flex-wrap gap-3">
                  {LENS_OPTIONS.map((g) => (
                    <Chip key={g} label={g} selected={lenses.includes(g)} onClick={() => toggle(lenses, setLenses, g)} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Audio & lighting</h3>
                <p className="text-text-dim text-sm mb-6">Supporting kit you bring on shoots.</p>
                <div className="flex flex-wrap gap-3">
                  {AUDIO_LIGHTING_OPTIONS.map((g) => (
                    <Chip key={g} label={g} selected={audioLighting.includes(g)} onClick={() => toggle(audioLighting, setAudioLighting, g)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DRONE */}
          {step === 3 && (
            <div className="rounded-2xl border border-line bg-panel p-7">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display text-lg font-bold">Drone services</h3>
                <button
                  type="button"
                  onClick={() => setHasDrone((v) => !v)}
                  className={`relative w-12 h-6.5 rounded-full transition-colors flex-shrink-0 ${hasDrone ? 'bg-signal' : 'bg-line'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-5.5 w-5.5 rounded-full bg-ink transition-transform ${hasDrone ? 'translate-x-5.5' : ''}`} />
                </button>
              </div>
              <p className="text-text-dim text-sm mb-6">Do you offer aerial coverage?</p>

              {hasDrone && (
                <div className="border-t border-line pt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-text-dim mb-2">Drone model</label>
                    <select value={droneModel} onChange={(e) => setDroneModel(e.target.value)} className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal">
                      {DRONE_OPTIONS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <label className="flex items-center gap-2.5 text-sm">
                    <input type="checkbox" checked={part107} onChange={(e) => setPart107(e.target.checked)} className="accent-signal h-4 w-4" />
                    Part 107 Commercial Drone Certified
                  </label>
                  <p className="text-xs text-text-faint">
                    Verified Part 107 status appears as a badge on your public profile and unlocks the "Drone Licensed" filter in client search.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: RATES & PORTFOLIO */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Rates</h3>
                <p className="text-text-dim text-sm mb-6">You can update this anytime from your dashboard.</p>
                <label className="block text-sm font-medium text-text-dim mb-2">Hourly rate ($/hr)</label>
                <input type="number" min={0} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 150" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal" />
              </div>

              <div className="rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold mb-1">Portfolio work</h3>
                <p className="text-text-dim text-sm mb-6">Show clients real examples before they book.</p>
                <div className="border border-dashed border-line rounded-xl p-6 text-center text-text-faint text-sm mb-4 flex flex-col items-center gap-2">
                  <CameraIcon size={22} />
                  Featured showreel — paste a link or drop a video file
                </div>
                <div className="border border-dashed border-line rounded-xl p-6 text-center text-text-faint text-sm flex flex-col items-center gap-2">
                  <Upload size={22} />
                  Upload up to 9 photos for your gallery
                </div>
                <p className="text-xs text-text-faint mt-4">A sample 9-photo gallery has been generated for your new profile so it never looks empty while you upload your own.</p>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-10">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 border border-line text-text px-6 py-3 rounded-full hover:border-signal hover:text-signal-bright transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
            ) : <span />}

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-2 bg-signal text-ink font-semibold px-6 py-3 rounded-full hover:bg-signal-bright transition-colors">
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="inline-flex items-center gap-2 bg-signal text-ink font-semibold px-7 py-3 rounded-full hover:bg-signal-bright transition-colors">
                <Check size={16} /> Submit & Go Live
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
